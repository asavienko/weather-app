##Application description

The application allows users to see actual weather ordered by cities. Users can see detailed weather by clicking at the favorite city.

## Running the application:

In console

 `git clone git@github.com:asavienko/weather-app.git` - to clone repository

 `cd .\weather-app\` - enter folder

`npm i` - install packages

 `npm start` - start application

## Available scripts:

 `npm start` - start application

 `npm eslint` - get list of eslint warnings

 `npm eslint-fix` - fix files with eslint

##Documentation:

- .style.js - extension keeps styles for styled-components
- services/fetchUtils.js - contains fetch reusable functions
- services/weatherServices.js - contains request function
- /actions- redux actions
- /constants/constantsActions.js - action const types
- /reducers - redux reducer
- /utils/utils.js - formatTemp function - formats number (0=> "0", 1=>"+1", -1=>"-1")