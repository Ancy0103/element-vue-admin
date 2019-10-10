import devConfig from './dev';
import prodConfig from './prod';

// 借助jquery进行深度复制和合并
const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

export default config;
