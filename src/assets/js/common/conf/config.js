let prodUrl="//vueshop.glbuys.com";//生产环境
let devUrl="/proxy";//开发者环境
let baseUrl=process.env.NODE_ENV=='production'?prodUrl:devUrl;
export default {
  domain:baseUrl,
  token:"1ec949a15fb709370f",
  path:'/'
}
