# Event Slug Issue Resolution

## Problem Description
Event slugs work in development but not in production environment.

## Root Causes Identified

### 1. Base URL Resolution Issues
**Problem**: The event slug page was using inadequate environment variable fallbacks for API calls in production.

**Original Code**:
```typescript
const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
```

**Issues**:
- `VERCEL_URL` doesn't include protocol (`https://`)
- Missing `NEXT_PUBLIC_APP_URL` fallback
- Poor error handling for network requests

### 2. Database Connection Issues
**Problem**: Inconsistent Prisma client usage between `lib/db.ts` and `lib/prisma.ts`

### 3. Insufficient Debugging Information
**Problem**: Limited logging made it difficult to diagnose production issues

## Solutions Implemented

### 1. Enhanced Base URL Resolution
Created `lib/api-utils.ts` with robust URL resolution:
```typescript
export function getBaseUrl(): string {
  if (typeof window === 'undefined') {
    // Server-side
    if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
  }
  // Client-side
  return window.location.origin;
}
```

### 2. Improved API Route with Debug Information
Enhanced `/api/events/[slug]/route.ts` with:
- Better parameter validation
- Comprehensive logging
- Debug information showing available events
- Fallback ID lookup
- Better error responses

### 3. Updated Event Slug Page
Modified `app/events/[slug]/page.tsx` to:
- Use the new `serverFetch` utility
- Add comprehensive logging
- Handle errors gracefully

### 4. Debug Tools
Created debugging scripts:
- `scripts/debug-production-slugs.ts` - Comprehensive slug debugging
- `scripts/generate-event-slugs.ts` - Generate missing slugs
- Added npm scripts: `debug-slugs` and `generate-slugs`

## Environment Variables to Check

Ensure these are properly set in production:

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth secret key

### Recommended for URL Resolution
- `NEXTAUTH_URL` - Full app URL (e.g., `https://gastro.or.ke`)
- `NEXT_PUBLIC_APP_URL` - Public app URL
- `VERCEL_URL` - Auto-set by Vercel (domain only, no protocol)

## Troubleshooting Steps

### 1. Check Event Slugs in Database
```bash
npm run debug-slugs
```

### 2. Generate Missing Slugs
```bash
npm run generate-slugs
```

### 3. Test API Endpoint Directly
Visit: `https://your-domain.com/api/events/your-event-slug`

### 4. Check Production Logs
Look for console logs with prefixes:
- `[EVENT_SLUG_API]` - API route logs
- `[EVENT_PAGE]` - Page component logs
- `[METADATA]` - Metadata generation logs
- `[SERVER_FETCH]` - API utility logs

## Common Issues and Solutions

### Issue: "Event not found" in production
**Causes**:
1. Events don't have proper slugs in production database
2. Base URL resolution failing
3. Database connection issues

**Solutions**:
1. Run `npm run generate-slugs` to create missing slugs
2. Check environment variables
3. Verify database connection

### Issue: API calls failing
**Causes**:
1. Incorrect base URL construction
2. Missing environment variables
3. CORS issues

**Solutions**:
1. Verify `NEXTAUTH_URL` or `NEXT_PUBLIC_APP_URL` is set
2. Check network logs for actual URLs being called
3. Ensure API routes are properly deployed

### Issue: Different behavior in dev vs production
**Causes**:
1. Environment variable differences
2. Database content differences
3. Build/deployment issues

**Solutions**:
1. Compare environment variables between environments
2. Use debug tools to compare database content
3. Check build logs for errors

## Files Modified

1. `app/events/[slug]/page.tsx` - Enhanced URL resolution and error handling
2. `app/api/events/[slug]/route.ts` - Added comprehensive debugging and validation
3. `lib/api-utils.ts` - New utility for consistent API calls
4. `scripts/debug-production-slugs.ts` - New debugging script
5. `package.json` - Added debug scripts

## Next Steps

1. Deploy the changes to production
2. Run the debug script to verify event slugs exist
3. Test event slug URLs in production
4. Monitor logs for any remaining issues

## Prevention

To prevent similar issues in the future:
1. Always test environment variable resolution in production
2. Use the provided debug tools before deploying
3. Ensure consistent database content between environments
4. Monitor production logs regularly
