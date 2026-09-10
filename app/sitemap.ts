import type { MetadataRoute } from 'next';
import { projects } from './work/projects';
import { siteUrl, indexable } from '../lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl || !indexable) return [];
  return ['', '/clients', ...projects.map((p) => '/work/' + p.slug)].map(
    (path) => ({ url: siteUrl + path }),
  );
}
