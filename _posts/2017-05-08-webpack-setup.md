---
title: I just want to be one of the (web)pack
comments: true
layout: post
category: personal
read-time: 3
---

Loads of people say that it will drive you crazy to set up a React project. And yes, I have thought to myself several times today: this is madness! Why is this so hard? All I wanted was to get to a basic setup with webpack to develop my innovative web app idea.

<!--break-->

Initially I thought that it can’t be that bad. I’ve used Grunt, Gulp and Brunch before, surely I can use webpack too.

## Webpack vs Gulp and Grunt

Turns out that according to the documentation, webpack is not necessarily interchangeable with the task runners I have experience with. The documentation differentiates webpack as a module bundler which has a lower level focus than a task runner.

Great! The world of JavaScript has invented yet another config file that I can add to my project. I’m convinced that all these complicated setups were dreamt up by bored front end developers who were fed up with trying to vertically center elements and decided to distract themselves by writing task runners and module bundlers instead.

Anyway, webpack is basically a file processor. You can tell it to run your code through certain loaders. For example it can transform React code or ES6 code to standard JavaScript code so that all browser can understand it. It can be run from the command line or from a task runner. But it can also deal with transpiling SCSS to CSS, for example. And there are post-css loaders for it. It also deals with asset management. The differentiation that the documentation makes, however, is that task runners will deal with higher level activities like running tests, linting and building the project.

Hm, I’m not sure about that. I’ve seen that there is an ESLint loader module for webpack. Maybe that was created after the documentation claimed that webpack is not a task runner. But I guess I can stop researching a webpack Jest plugin to run my tests. I better leave that task to my package.json.

## Browserify?

I’m currently working on a project which uses Browserify and it seems that this bundler has some similarities with webpack. However, Browserify was originally made with Node.js in mind and webpack is specifically made for browser side code.
Browserify is driven by convention while webpack is a lot more flexible, which also makes it a bit harder to learn.

Webpack comes with a dev server which you can run while you’re coding. It will watch your changes and reload the page so you can see your changes instantly. It’s beautiful. So simple and fast! You can even install a React Hot-Loading plugin which updates the React component that you’re working on only and doesn’t refresh the whole page, so that the state of the other components remains unchanged.

Now that I know how easy it is to develop with this webpage auto-refresh that webpack dev server provides, I really need to install something like that for Browserify. The constant `npm run build` and hard refreshing of the page is driving me nuts and seems a bit antiquated. It seems like watchify could be a viable option here but I need to research it more.

Anyway, I’m getting off topic here. Back to setting up a React project with Webpack.

## Webpack 2, not 1

It doesn’t help that most of the tutorials and blog posts online refer to webpack 1, which is now deprecated. Even when searching for the documentation I came across webpack 1 several times and starting reading it until I realised that I’m reading outdated information. So be warned! Make sure you’re looking at the right documentation.

On the plus side, now that I’ve read a bit of both webpack 1 and 2 documentation I can say that the webpack 2 documentation is a bit more accessible than the older version. So that’s something.

But still, when looking at the documentation and examples, I felt pretty overwhelmed. All I wanted was to find the most basic setup to get going for now. It took some time but I think I’ve got it now.

## Basic webpack config

You need an entry point to tell webpack where to start running through your files. And you also need an output path to tell webpack where to place the processed file. Then come the loaders, which are basically little build tasks that can do different stuff to your code. In this most basic example I’m just using babel-loader to transpire my React/ES6 code.

<pre><code class="language-javascript">
// webpack.config.js

const path = require('path')

const config = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config

</code></pre>

I find the `test` property a bit confusing. At first I thought this had to do with unit testing. But it doesn’t! This property is where you specify for which files the loader should be responsible. So I guess when it looks at a file, it first “tests” if it is the correct file before it applies the loader processing.

In the webpack 1 config file you need to specify which presets you want to use for Babel. But I couldn’t find an example for this in the webpack 2 config file. Finally I realized that I needed to add a specific Babel config file, which specifies which presets to use.

<pre><code class="language-javascript">
// .babelrc

{
  "presets":[
    "es2015", "react"
  ]
}


</code></pre>

And now I can run the `webpack` command and it does its magic.

But I was so fascinated by the webpack dev server, that I installed this dependency as well. I know I only wanted a very basic configuration but this dev server is really cool. I guess it’s a slippery slope in this world of npm packages. I predict by next week my package.json file will have grown by 300%.

Anyway, now I can run the command `webpack-dev-server --content-base dist` and the server will watch for any file changes and reload the web page.

And what's next? Onto step two: installing a test framework!



