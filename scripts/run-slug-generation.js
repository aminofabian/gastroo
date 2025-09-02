const { execSync } = require('child_process');

console.log('🚀 Running event slug generation script...');

try {
  // Run the TypeScript file directly with tsx
  execSync('npx tsx scripts/generate-event-slugs.ts', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('✅ Event slug generation completed successfully!');
} catch (error) {
  console.error('❌ Event slug generation failed:', error.message);
  process.exit(1);
}
