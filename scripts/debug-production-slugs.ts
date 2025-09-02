#!/usr/bin/env tsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function debugProductionSlugs() {
  try {
    console.log('🔍 Debugging event slugs in production...');
    
    // Check database connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Fetch all events
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        type: true,
        startDate: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    console.log(`\n📊 Found ${events.length} events in database:`);
    console.log('=' .repeat(80));
    
    const issues: string[] = [];
    
    events.forEach((event, index) => {
      const hasValidSlug = event.slug && event.slug.trim() !== '' && event.slug !== event.id;
      const status = hasValidSlug ? '✅' : '❌';
      
      console.log(`${index + 1}. ${status} ${event.title}`);
      console.log(`   ID: ${event.id}`);
      console.log(`   Slug: ${event.slug || 'MISSING'}`);
      console.log(`   Type: ${event.type}`);
      console.log(`   Date: ${event.startDate.toISOString()}`);
      console.log(`   Created: ${event.createdAt.toISOString()}`);
      console.log('');
      
      if (!hasValidSlug) {
        issues.push(`Event "${event.title}" (ID: ${event.id}) has invalid slug: "${event.slug}"`);
      }
    });
    
    if (issues.length > 0) {
      console.log('❌ Issues found:');
      issues.forEach(issue => console.log(`   - ${issue}`));
      
      console.log('\n💡 To fix these issues, run:');
      console.log('   npm run generate-slugs');
      console.log('   or');
      console.log('   npx tsx scripts/generate-event-slugs.ts');
    } else {
      console.log('✅ All events have valid slugs!');
    }
    
    // Test a few API endpoints
    console.log('\n🔗 Testing API endpoints...');
    const testEvents = events.slice(0, 3);
    
    for (const event of testEvents) {
      if (event.slug && event.slug !== event.id) {
        const baseUrl = process.env.NEXTAUTH_URL || 
                       process.env.NEXT_PUBLIC_APP_URL || 
                       'http://localhost:3000';
        
        try {
          const response = await fetch(`${baseUrl}/api/events/${event.slug}`);
          const status = response.ok ? '✅' : '❌';
          console.log(`   ${status} /api/events/${event.slug} - ${response.status} ${response.statusText}`);
          
          if (!response.ok) {
            const errorData = await response.text();
            console.log(`      Error: ${errorData.substring(0, 200)}...`);
          }
        } catch (error) {
          console.log(`   ❌ /api/events/${event.slug} - Network error: ${error}`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error debugging slugs:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Database disconnected');
  }
}

// Run the script
if (require.main === module) {
  debugProductionSlugs()
    .then(() => {
      console.log('\n🎉 Debug completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Debug failed:', error);
      process.exit(1);
    });
}

export { debugProductionSlugs };
