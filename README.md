# react-multiple-entries
path.js
appPages: [
    {
      name: "order",
      title: "order",
      appHtml: resolveApp("public/order.html"),
      appIndexJs: resolveApp("src/order/index.js")
    },
    {
      name: "index",
      title: "index",
      appHtml: resolveApp("public/index.html"),
      appIndexJs: resolveApp("src/index/index.js")
    },
    {
      name: "ticket",
      title: "ticket",
      appHtml: resolveApp("public/ticket.html"),
      appIndexJs: resolveApp("src/ticket/index.js")
    },
    {
      name: "query",
      title: "query",
      appHtml: resolveApp("public/query.html"),
      appIndexJs: resolveApp("src/query/index.js")
    }
  ]
  webpack.config.js
  const htmlPlugins = [];
 
  paths.appPages.forEach(appPage => {
    htmlPlugins.push(
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: appPage.appHtml,
            filename: `${appPage.name}.html`,
            title: appPage.title,
            chunks: [appPage.name]
          },
          isEnvProduction
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
            : undefined
        )
      ),
    )
  });

  let entries = {};
 
  paths.appPages.forEach(appPage => {
    entries[appPage.name] = [
      appPage.appIndexJs,
      isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient')
    ].filter(Boolean);
  });




  output: {
    filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        // : isEnvDevelopment && 'static/js/bundle.js',
        : isEnvDevelopment && 'static/js/[name].js',
  }

  new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          // const entrypointFiles = entrypoints.map(i=>i.filter(
          //   fileName => !fileName.endsWith('.map')
          // ));
          let entrypointFiles = []
          for (let [entryFile, fileName] of Object.entries(entrypoints)) {
            let notMapFiles = fileName.filter(fileName => !fileName.endsWith('.map'))
            entrypointFiles =  entrypointFiles.concat(notMapFiles)
          }

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },



build.js
paths.appPages.forEach(appPage => {
  if(!checkRequiredFiles([appPage.appHtml, appPage.appIndexJs])) {
    process.exit(1);
  }
});

function copyPublicFolder() {
  paths.appPages.forEach(appPage => {
    fs.copySync(paths.appPublic, paths.appBuild, {
      dereference: true,
      filter: file => file !== paths.appHtml,
    });
  });
}

start.js
paths.appPages.forEach(appPage => {
  if(!checkRequiredFiles([appPage.appHtml, appPage.appIndexJs])) {
    process.exit(1);
  }
});