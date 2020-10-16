# pager-chat-app

React chat application with realtime updating, username initial avatars, and giphy integration. Below are the steps I took to setup the application.

## 1. Setup package.json

First things first, after cloning an empty initial repo from github, I created and setup package.json, adding react and react-dom to dependencies and to devDependencies all of the loaders and plugins I'll need to setup webpack and Babel. Babel will allow me to write ES6+ code that will be transpiled into ES5 code supported by most modern browsers. Webpack will be crucial to both running a development server to debug code locally, and building a production optimized bundle ready to deploy. I also setup prettier to keep styling consistent across my components.
