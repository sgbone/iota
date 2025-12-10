/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push(
      "pino-pretty",
      "encoding",
      "bufferutil",
      "utf-8-validate"
    );
    config.resolve.fallback = { fs: false, net: false, tls: false };
    // Fix lỗi SDK của ví ảo
    config.resolve.alias = {
      ...config.resolve.alias,
      "@react-native-async-storage/async-storage": false,
    };
    return config;
  },
};

export default nextConfig;
