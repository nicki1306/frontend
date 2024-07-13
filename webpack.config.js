const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Punto de entrada de la aplicación
    output: {
        path: path.resolve(__dirname, 'dist'), // Carpeta de salida
        filename: 'bundle.js', // Nombre del archivo de salida
        publicPath: '/', // Para el routing de React
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Archivos a los que se les aplicará Babel
                exclude: /node_modules/, // Excluir node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/, // Archivos CSS
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i, // Archivos de imagen
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Extensiones que Webpack resolverá
    },
    devServer: {
        historyApiFallback: true, // Para el routing de React
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Template HTML
            filename: 'index.html',
        }),
    ],
};
