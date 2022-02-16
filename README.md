## Log Parser CLI

Usage: `ts-node ./parser.ts --input ./app.log --output ./errors.json`

### Requirements

- node >= v12.18.x
- typescript >= v4.5.5

### Installation ###
* Download and install Nodejs (https://nodejs.org/en/)
* Download and install Typescript (https://www.typescriptlang.org/)

# Steps to build and run the server
* Install dependencies with `npm install`
* In root directory run command with `ts-node parser.ts --input ./app.log --output ./errors.json`
* Other way to run the command is to just do a `npm start` as I have modified the `start` command to run `ts-node parser.ts --input app.log --output errors.json` underneath. 
* If the commands runs successfully then a `json` file for error logs should be created on the root directory

# Tests
* Run tests with `npm test`

### Lacks
Didn't add any logic when `app.log` doesn't have any `error` log. So for cases like that `errors.json` file will be created with an empty array inside.
Only six test cases were added
App needs to be run with `ts-node`