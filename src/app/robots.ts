import { serverEnv } from '@/config/server-env';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: serverEnv.NOINDEX
      ? {
          userAgent: '*',
          disallow: '/',
        }
      : {
          userAgent: '*',
          allow: '/',
        },
    sitemap: 'https://oucrc.net/sitemap.xml',
  };
}
