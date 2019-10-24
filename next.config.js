const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const withPlugins = require("next-compose-plugins")

module.exports = withPlugins([withSass,withCss], {
  webpack: (config, {isServer}) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config
  },
});


// module.exports = withCss({
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       const antStyles = /antd\/.*?\/style\/css.*?/
//       const origExternals = [...config.externals]
//       config.externals = [
//         (context, request, callback) => {
//           if (request.match(antStyles)) return callback()
//           if (typeof origExternals[0] === 'function') {
//             origExternals[0](context, request, callback)
//           } else {
//             callback()
//           }
//         },
//         ...(typeof origExternals[0] === 'function' ? [] : origExternals),
//       ]
//
//       config.module.rules.unshift({
//         test: antStyles,
//         use: 'null-loader',
//       })
//     }
//     return config
//   },
// })

// module.exports = withSass({
  /* config options here */
  // cssModules: true,
  // cssLoaderOptions: {
  //   importLoaders: 1,
  //   localIdentName: "[local]___[hash:base64:5]",
  // }
  // exportPathMap: async function (defaultPathMap) {
  //   return {
  //     '/': { page: '/' },
  //     '/about': { page: '/about' },
  //   }
  // }
// });

