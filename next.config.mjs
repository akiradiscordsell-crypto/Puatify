import JavaScriptObfuscator from 'webpack-obfuscator';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // จะทำการ Obfuscate เฉพาะตอนรัน Production (Build) เท่านั้น
    // และทำเฉพาะโค้ดฝั่ง Client เพื่อไม่ให้ระบบหลังบ้านรวน
    if (!dev && !isServer) {
      config.plugins.push(
        new JavaScriptObfuscator({
          rotateStringArray: true,
          stringArray: true,
          stringArrayThreshold: 0.75,
          debugProtection: true, // ตัวนี้แหละครับที่จะกันคนกด F12
          debugProtectionInterval: 2000,
          disableConsoleOutput: true, // ปิดคำสั่ง console.log ทั้งหมด
          selfDefending: true, // ถ้ามีคนพยายามจัด Format โค้ดให้สวย โค้ดจะพังทันที
        }, [])
      );
    }
    return config;
  },
};

export default nextConfig;