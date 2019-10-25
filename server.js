const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware').default

const nextI18next = require('./i18n')

const port = process.env.PORT || 80
const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({ dev: dev})
const handle = app.getRequestHandler();

// const devProxy = {
//   '/huobi_api': {
//     target: 'https://api.huobi.pro',
//     pathRewrite: { '^/huobi_api': '/' },
//     changeOrigin: true
//   }
// };


(async () => {
  await app.prepare()
  const server = express()

  // if (devProxy) {
  //   const proxyMiddleware = require('http-proxy-middleware')
  //   Object.keys(devProxy).forEach(function (context) {
  //     server.use(proxyMiddleware(context, devProxy[context]))
  //   })
  // }

  server.use(nextI18NextMiddleware(nextI18next))

  server.get('*', (req, res) => handle(req, res))

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()