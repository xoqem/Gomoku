TicTacToe
=========

Simple Tic Tac Toe game, which is customizable enough to play a Go style game as well.  Built as a side project to experiment with Ember, Handlebars, and Bootstrap.

Building:

1. Install node: http://nodejs.org/download/

2. In the project directory run:

    npm install

3. To globally install the smart grunt runner (so it will run the version of grunt in your project directory) run:

    npm install -g grunt-cli

4. Then run grunt to build project:

    grunt

5. Run the app by loading the index.html file in either tmp/debug or tmp/release.  Compressed release and debug packages can be found in the dist folder after building.

Note: if you are running the app via file:// you'll need to update the index.html page to to have http:// in front of the link and script urls.  They only have // to play nicely with https or http.