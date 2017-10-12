# Website-Template-Boostrap-4

Simon Richards - Dewynters - May 2017

This is a skeleton template to help start building the front end of a website.

The following needs to be installed on your local machine:

Node / NPM - https://docs.npmjs.com/getting-started/installing-node

GULP - https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

SASS - http://sass-lang.com/install

<strong>Step 1:</strong>

Clone the repository to your local machine (ideally within a local server XAMPP, WAMP etc.) open the terminal on your machine and change directory to where you have cloned the project. e.g cd /Applications/XAMPP/htdocs/project-name

<strong>Step 2:</strong>

Next we need to install the modules required to use gulp, these are used in our 'gulpfile.js' file. The modules required are declared in the 'package.json' file. To make sure the modules listed in the package.json file are the latest version type the commands:

<i>npm i -g npm-check-updates <br/>
npm-check-updates -u <br/>
npm install </i>

To install the modules type the following command: <i>npm install</i>

Note: If you are recieving write access errors add sudo in front: sudo npm install

<strong>Step 3:</strong>

Next we need to run the build tool gulp.

Type the following command: <i>gulp</i>

Gulp will start and run any tasks setup in 'gulpfile.js'. It will watch for any changes in the /src directory and automatically compile the scripts and output them in public_html.

<strong>Step 4:</strong>

Make sure any js or css edits are made in the /src/ directory. Gulp will output the final minified versions in the distribution/build directory.

Code away!!

NOTES:

To add bootstrap JS edit the gulpfile.js and comment out the ones required.
