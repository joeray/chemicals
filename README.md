## Main description
This is an app that includes backend server and frontend side.
# Backend
Backend API runs under Node.js and is developed using Express to expose REST service.\
Data source is indexed into MongoDB through Mongoose.

# Frontend
Frontend has React Hooks as main library. 
Also Axios is used to retrieve queries data through REST Api calls.
Data persistence is achieved with React Hooks Context to make communication easier between components.
## Launch browser without cors security

To be able to run app queries is necessary to disable CORS security on browser.\ 
In MacOS Chrome you can launch this script through console:
`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`.\
In Firefox you can use [Allow CORS: Access-Control-Allow-Origin](https://outgoing.prod.mozaws.net/v1/53c52801cca6862c2ec9f96530b07875f9d5c3611be5b7f8e2483622ff9f0360/https%3A//mybrowseraddon.com/access-control-allow-origin.html)

## Available Scripts

First of all is necessary to run `npm install` to load all dependencies locally.

In the project directory, you can run:

### `yarn start`
Launches Frontend.\
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn server`

Launches Backend server.\
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

