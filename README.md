# Website-Template

Simon Richards - Dewynters - May 2017

This is a skeleton template to help start building the front end of a website.

The following needs to be installed on your local machine:

Node / NPM - https://docs.npmjs.com/getting-started/installing-node

GULP - https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

SASS - http://sass-lang.com/install

Step 1:

Clone the repository to your local machine (ideally within a local server XAMPP, WAMP etc.) open the terminal on your machine and change directory to where you have cloned the project. e.g cd /Applications/XAMPP/htdocs/project-name

Step 2:

Next we need to install the modules required to use gulp, these are used in our 'gulpfile.js' file. The modules required are declared in the 'package.json' file. To make sure the modules listed in the package.json file are the latest version type the commands:

npm i -g npm-check-updates <br/>
npm-check-updates -u <br/>
npm install <br/>

To install the modules type the following command: npm install

Note: If you are recieving write access errors add sudo in front: sudo npm install

Step 3:

Next we need to run the build tool gulp.

Type the following command: gulp

Gulp will start and run any tasks setup in 'gulpfile.js'. It will watch for any changes in the /src directory and automatically compile the scripts and output them in public_html.

Step 4:

Make sure any js or css edits are made in the /src/ directory. GULP will output the final minified versions in the distribution/build directory.

Code away!!

NOTES:

To add bootstrap features/plugins edit the gulpfile.js and comment out the ones required.

Some plugins are included under /src/js/vendor, delete ones you do not plan on using also check they are up to date.
