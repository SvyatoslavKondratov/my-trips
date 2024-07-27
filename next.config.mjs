/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
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
