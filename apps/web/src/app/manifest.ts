import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Medtour Georgia',
    short_name: 'Medtour',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F8F7',
    theme_color: '#2E6B66',
  };
}
