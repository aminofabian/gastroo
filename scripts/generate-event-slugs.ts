import { PrismaClient } from '@prisma/client';
import { generateEventSlug, generateUniqueSlug } from '../lib/slug-utils';

const prisma = new PrismaClient();

async function generateEventSlugs() {
  try {
    console.log('🚀 Starting event slug generation...');
    
    // Fetch all events
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        type: true,
        startDate: true,
        slug: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    console.log(`📊 Found ${events.length} events`);

    if (events.length === 0) {
      console.log('✅ No events found. Nothing to do.');
      return;
    }

    // Track existing slugs to ensure uniqueness
    const existingSlugs: string[] = [];
    const updates: Array<{ id: string; slug: string }> = [];

    for (const event of events) {
      // Skip events that already have a proper slug
      if (event.slug && event.slug.length > 0 && event.slug !== event.id) {
        console.log(`⏭️  Event "${event.title}" already has slug: ${event.slug}`);
        existingSlugs.push(event.slug);
        continue;
      }

      // Generate a new slug
      const baseSlug = generateEventSlug(event.title, event.type, event.startDate);
      const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);
      
      existingSlugs.push(uniqueSlug);
      updates.push({ id: event.id, slug: uniqueSlug });

      console.log(`📝 Event "${event.title}" -> slug: "${uniqueSlug}"`);
    }

    console.log(`🔄 Updating ${updates.length} events with new slugs...`);

    // Update events with new slugs
    for (const update of updates) {
      await prisma.event.update({
        where: { id: update.id },
        data: { slug: update.slug },
      });
    }

    console.log('✅ Event slug generation completed successfully!');
    console.log(`📈 Updated ${updates.length} events`);
    console.log(`📊 Total events: ${events.length}`);

  } catch (error) {
    console.error('❌ Error generating event slugs:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  generateEventSlugs()
    .then(() => {
      console.log('🎉 Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

export { generateEventSlugs };
