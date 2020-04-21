# relevo24-back

## iTerm:

```bash
$ mkdir relevo24-back && cd relevo24-back
$ express --no-view --git relevo24-back
$ cd relevo24-back && npm install
$ npm i -D nodemon eslint eslint-config-airbnb-base eslint-plugin-import
$ touch .eslintrc.json
$ git init
$ code .
```

## VSC:

**package.json**

add:

```json
{
  ...
  "scripts": {
    "start": "node ./bin/www",
    "start:dev": "nodemon ./bin/www",
    "seed": "node ./bin/seed.js"
    ...
  },
  ...
}
```

**.eslintrc.json**

add:

```json
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": "airbnb-base",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {}
}
```

## iTerm:

```bash
$ git status
$ git add .
$ git commit -m "initial commit"
```

## GitHub:

https://github.com/new
Repository name: relevo24-back
Click “Create repository”

## iTerm:

```bash
$ git remote add origin git@github.com:yourGitHubName/relevo24-back.git
$ git push -u origin master
```

## GitHub:

https://github.com/yourGitHubName/relevo24-back

Click “Add a README”
Click “Commit new file”

## iTerm:

```bash
$ git pull origin master
$ git checkout -b dev
$ npm install bcrypt connect-mongo express-session hbs http-errors mongoose cors dotenv connect-flash
$ git add .
$ git commit -m "create dev branch and add npm packages"
$ git push origin dev
```

## GitHub:

https://github.com/yourGitHubName/relevo24-back/tree/master

Click “Compare and Pull Request”
base: master - compare: dev
Click “Create Pull Request”
Click “Merge Pull Request” + “Confirm”

https://github.com/yourGitHubName/relevo24-back/settings/branches

Change default branch to “dev”
Click update and confirm

Before you start a new branch (feature) always:

## iTerm:

```bash
$ git pull origin dev
$ git checkout -b feature/#number-name-of-branch
```

Now you enjoy :) writing your code and as soon as you finish:

```bash
$ git status
$ git add .
$ git commit -m “closes:#number done tasks-in-present-tense”
$ git push origin <branch>
```

## GitHub:

Click “Compare and Pull Request”
base: dev - compare: <branch>
Click “Create Pull Request”
Add reviewers (your team)
The colleague who checks on your code, (hopefully) accepts it and merges your code to dev.

From now on you are in a loop - what a surprise, ey? ;)

## iTerm:

```bash
$ git pull origin dev
$ git checkout -b feature/#number-name-of-branch
$ git status
$ git add .
$ git commit -m “closes:#number done tasks-in-present-tense”
$ git push origin <branch>
```

## GitHub:

Click “Compare and Pull Request”
base: dev - compare: <branch>
Click “Create Pull Request”
Add reviewers (your team)
Approve and merge

## iTerm:

```bash
$ git pull origin dev
...
```
