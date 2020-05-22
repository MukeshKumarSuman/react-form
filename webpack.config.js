const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}, options) => {
  const isProduction = env.production === true;
  console.log(env);
  console.log(options);
  return {
          entry: './src/index.js',
          output: { // this is the transpile version of script.js
              path: path.resolve(__dirname, './dist'),
              filename: 'bundle.js',
              publicPath: ''
          },
          mode: isProduction ? 'production' : 'development',
          devtool: 'cheap-module-source-map',
            devServer: {
                contentBase: path.resolve(__dirname, './dist'),
                index: 'index.html',
                port: 9000,
              open: true
            },
          plugins: [
            new HtmlWebpackPlugin({
              template: __dirname + '/src/index.html',
              filename: 'index.html',
              inject: 'body'
            }),
            new MiniCssExtractPlugin()
          ],
          module: {
              rules: [
                  {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                      {
                        loader: 'babel-loader',
                        options: {
                          presets: ['@babel/preset-env', '@babel/preset-react'],
                          plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties']
                        }
                      },
                      {
                        loader: 'eslint-loader',
                        options: {
                          // eslint options (if necessary)
                        }
                      },
                    ],
                  },

                  {
                    test: /\.s[ac]ss$/i,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                      MiniCssExtractPlugin.loader,
                      // Translates CSS into CommonJS
                      {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 1,
                          modules: {
                            localIdentName: "[name]__[local]__[hash:base64:5]",
                          }
                        }
                      },
                      // Compiles Sass to CSS
                      'sass-loader',
                    ],
                  },

                  {
                    test: /\.css$/i,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                      MiniCssExtractPlugin.loader,
                      // Translates CSS into CommonJS
                      {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 1,
                          modules: {
                            localIdentName: "[name]__[local]__[hash:base64:5]",
                          }
                        }
                      }
                    ],
                  },
              ]
          },
        } 

}
