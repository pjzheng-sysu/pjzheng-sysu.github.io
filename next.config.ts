import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'homepage'; 

const nextConfig: NextConfig = {
  /**
   * 将网站导出为纯静态 HTML/CSS/JS 文件。
   * 这对于部署到不支持 Node.js 环境的平台（如 GitHub Pages）是必需的。
   */
  output: 'export',

  /**
   * 为生产环境（GitHub Pages）设置正确的资源文件（JS, CSS, 图片等）加载路径。
   * 它告诉浏览器所有资源都位于 /<仓库名>/ 目录下。
   */
  assetPrefix: isProd ? `/${repoName}/` : undefined,

  /**
   * 为生产环境（GitHub Pages）设置基础路径。
   * 这让 Next.js 的路由系统知道网站的根目录是 /<仓库名>。
   */
  basePath: isProd ? `/${repoName}` : '',
};

export default nextConfig;
