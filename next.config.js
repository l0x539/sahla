const withReactSvg = require('next-react-svg')
const path = require('path')


let exp = withReactSvg({
  include: path.resolve(__dirname, 'assets'),
  webpack(config, options) {
    return config
  }
})

exp.env = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000'
}

module.exports = exp