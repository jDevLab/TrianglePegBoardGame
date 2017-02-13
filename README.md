# Triangle Peg Board Game

To work with the project must be in the console go to the project folder:
$ cd <project-folder>

Then you need to install the npm packages:
$ npm install

To build the solution:
$ gulp build

To deploy the solution:
$ gulp deploy 
    and go to http://localhost:9000/

$ gulp        ----- Performs the deployment of the project, as well as monitoring the change files. 
In the event of a change project rebuilds. For the change can be followed by refreshing the page in a browser.

Places the application on the server.
$ gulp host --host ___ --user ___ --pass ___ --path ___



To perform the test, go to the directory:
$ cd <project-folder>/tests/unit

Install components:
$ npm install -g karma-cli
$ npm install -g jasmine

Run the tests:
$ karma start