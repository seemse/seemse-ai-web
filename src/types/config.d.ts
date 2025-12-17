// 全局配置接口
interface AppConfig {
  VITE_GLOB_API_URL: string;
}

// 扩展Window接口
interface Window {
  APP_CONFIG?: AppConfig;
}