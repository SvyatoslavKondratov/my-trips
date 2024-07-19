/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    // images: { unoptimized: true }
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '**',
          },
        ],
      },
};

export default nextConfig;
