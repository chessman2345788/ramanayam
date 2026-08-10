import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ramayanam.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account/', '/checkout/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
