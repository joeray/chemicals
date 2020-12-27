## Launch browser without cors security

To be able to run app queries is necessary to disable CORS security on browser. In Chrome you can launch this script through console:
'open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security'

## Available Scripts

In the project directory, you can run:

### `yarn start`
Launch Frontend 
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn server`

Launch `npm run server`.\
 It will load server into [http://localhost:3080](http://localhost:3080)


### Folders structure

* Backend
  * Controllers: Files that manage api logic to each call
  * Data: Files with data source
  * Models: File with data schema
  * Server.js Main file of api that manage controllers

* Frontend
  * Assets: SVG files
  * Components: Reused styled components
  * Pages: Pages where user navigates into app that reuse the sections
  * Sections: Different regions of the pages
  * Styles: Definition of main guides of app
  * Utils: Reusable funcionality
  * App.js Main file of frontend

