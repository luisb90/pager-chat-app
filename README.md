# pager-chat-app

React chat application with realtime updating, username initial avatars, and giphy integration. Below are the steps I took to setup the application.

## 1. Setup package.json

First things first, after cloning an empty initial repo from github, I created and setup package.json, adding react and react-dom to dependencies and to devDependencies all of the loaders and plugins I'll need to setup webpack and Babel. Babel will allow me to write ES6+ code that will be transpiled into ES5 code supported by most modern browsers. Webpack will be crucial to both running a development server to debug code locally, and building a production optimized bundle ready to deploy. I also setup prettier to keep styling consistent across my components.

## 2. Setting up Babel and Webpack

To setup Babel, I create a .babelrc file and load two presets into it: @babel/preset-env which will allow transpiling of code into es5, and @babel/preset-react, which will transpile jsx into es5. Next, I create a webpack.config.js to setup the loaders needed for the application:

- The babel-loader searches for js and jsx files to apply transpilation to. node_modules are excluded.
- The html-loader looks for html files for webpack to bundle
- For css files, we setup different loaders based on if it's a development or production build. For development, the css-loader creates source maps for the css files, and I've enabled css modules to avoid style leaks and global conflicts. These are then passed to the style-loader for webpack to bundle. In production, no sourcemaps are created, and the css-loader instead passes it to the MiniCssExtractPlugin's loader. This plugin will create a separate bundle for the css that is minified chunked, with hashes in the name for easier cache busting.

Below the rules for the loaders, I instantiate the CleanWebpackPlugin, HtmlWebpackPlugin and miniCSSExtract plugins, and below that the resolve attribute will let me import js and jsx files without having to specify the extension. The output property lets me specify the output path for the bundled files when i run webpack build. I've set it to output to a "dist" folder at root.

## 3. Scaffolding the React app

To setup the react application, I set up the index.js and index.html file. I created a simple placeholder App.js, which in index.js i bootstrapped to the root "container" dom node using ReactDOM.render. I wrapped the App component in React.StrictMode to enable useful developer error checks like unsafe lifecycle methods and deprecated methods. I also added a simple favicon to the app.
