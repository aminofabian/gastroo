/**
 * Generate a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove special characters except hyphens
    .replace(/[^a-z0-9-]/g, '')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate a unique slug by appending a number if the slug already exists
 * @param baseSlug - The base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug;
  let counter = 1;
  
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

/**
 * Generate a slug from event title with additional context
 * @param title - The event title
 * @param type - The event type (optional)
 * @param date - The event date (optional)
 * @returns A descriptive slug
 */
export function generateEventSlug(
  title: string, 
  type?: string, 
  date?: Date | string
): string {
  let slug = generateSlug(title);
  
  // If the title is very short, add event type
  if (slug.length < 10 && type) {
    slug = `${generateSlug(type)}-${slug}`;
  }
  
  // If we have a date and the slug is still short, add year
  if (slug.length < 15 && date) {
    const year = new Date(date).getFullYear();
    slug = `${slug}-${year}`;
  }
  
  return slug;
}
