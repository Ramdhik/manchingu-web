import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'i.namu.wiki',
      'static.wikia.nocookie.net',
      'storage.shngm.id',
      'upload.wikimedia.org',
      'i.pinimg.com',
      'cdn.novelupdates.com',
      'pbs.twimg.com',
      'images-na.ssl-images-amazon.com',
      'mediaproxy.tvtropes.org',
      'dyn.media.forbiddenplanet.com',
      'static-wikia-nocookie-net.translate.goog',
      'i2.wp.com', // ← domain tambahan
    ],
  },
};

export default nextConfig;
