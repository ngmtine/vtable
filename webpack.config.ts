import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default () => ({
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", "jsx"],
    },
    devtool: "source-map",
    devServer: {
        host: "0.0.0.0",
        port: 5173,
        hot: true,
        historyApiFallback: true,
    },
});
