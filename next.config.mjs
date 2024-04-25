/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     // bỏ qua bundle webpack build vì file qua lớn
  //     // config.externals.push("puppeteer");
  //     config.externals.push("chrome-aws-lambda");
  //     config.externals.push("puppeteer-core");
  //   }
  //   return config;
  // },
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer",
      // "puppeteer-core",
      // "@sparticuz/chromium",
      "@sparticuz/chromium-min",
    ],
    externalDir: true,
  },
};

export default nextConfig;
