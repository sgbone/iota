/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // 1. Bỏ qua các module gây lỗi (chỉ dùng cho server/mobile)
    config.externals.push(
      "pino-pretty",
      "encoding",
      "bufferutil",
      "utf-8-validate"
    );

    // 2. Fallback cho các module Node.js không có trên browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // 3. Fix lỗi Metamask SDK đòi import thư viện của React Native
    config.resolve.alias = {
      ...config.resolve.alias,
      "@react-native-async-storage/async-storage": false,
    };

    return config;
  },
};

export default nextConfig;
