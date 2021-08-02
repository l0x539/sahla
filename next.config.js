const withReactSvg = require('next-react-svg')
const path = require('path')


let exp = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          // { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS, PATCH, DELETE, POST ,PUT" },
          { key: "Access-Control-Allow-Headers", value: "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization" },
        ]
      }
    ]
  },
  ...withReactSvg({
  include: path.resolve(__dirname, 'assets'),
  webpack(config, options) {
    return config
  }
})
}
console.log(exp);
exp.env = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000'
}

module.exports = exp