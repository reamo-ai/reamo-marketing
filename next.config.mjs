/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/request-access',
        destination: '/waitlist',
        permanent: true,
      },
      {
        source: '/access',
        destination: '/waitlist',
        permanent: true,
      },
      {
        source: '/calculator',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
