# Release process

## Approach
* We follow the [semver](https://semver.org/) versioning pattern, which means we follow this versioning pattern: `MAJOR:MINOR:PATCH`.

## Requirements
* Git, node.js and NPM installed on your system
* You are able to build the library and have push access to the remote repository
* Secret `NPM_TOKEN` value is set on the remote repository
* Secret `ACCESS_TOKEN` value is set on the remote repository

## Usage
```sh
$ git checkout main
$ npm version [major|minor|patch] # Choose the appropriate version tag
$ git push origin main
$ git push origin v1.4.2 # Replace the version number with the one just created above
```
The actual release steps are all run on Github Actions CI. After the action has finished running, you may want to view the release on Github and modify the release note if required (eg. separate all-contributor bot commits with other commits).

## Security tokens
For the release steps to run fully, two [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) must be set as below.

* `NPM_TOKEN` can be created by following the steps [here](https://docs.npmjs.com/creating-and-viewing-access-tokens) to create a read and publish token. The user the token belongs to must have publish access to the project on NPM.
* `ACCESS_TOKEN` is a personal access token for a user that has access to `p5.js`, `p5.js-website`, and `p5.js-release` repositories. The token can be generated using the steps [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and for scopes, choose only `public_repo`. It is recommended to use an organization specific account for this (ie. not from a personal account) and limit the account's write access to only the required repositories.

## What's actually happening
The Github Action ["New p5.js release"](../.github/workflows/release.yml) is triggered on a tag that matches the pattern `v*.*.*` which is created by the `npm version ___` command.

Once triggered, it will run the following steps:

1. Clone the repository, setup node.js, extract version number, install dependencies with `npm`, and run test with `npm test`.
2. Create the release files that will be uploaded to Github releases.
3. Create a release on Github and publish latest version on NPM.
4. Update website files
	1. Clone the website repository
	2. Copy `data.json` and `data.min.json` to the right location
	3. Copy `p5.min.js` and `p5.sound.min.js` to the right location
	4. Update `data.yml` file with latest version number
	5. Update `en.json` file based on `data.min.json`
	6. Commit and push the changes back to the website repository
5. Update Bower files
	1. Clone the Bower release repository
	2. Copy all libraries files to the right location
	3. Commit and push the changes back to the website repository

In principle, we try to concentrate as many steps as possible to be run in one place, ie. in the CI environment. If a new step that is only run on release is required, it should probably be defined in the CI workflow and not as part of the build configuration.

## Testing
As the release steps are run in CI, testing them can be difficult. Using [act](https://github.com/nektos/act) to test running of the steps locally is possible (and was how they were tested while being developed) but require some temporary modifications to the workflow definition, we'll roughly document here as the precise steps will likely change over time.

The test steps will not run because not all system requirements are present to run the mocha Chrome tests. Some system dependencies will likely be needed to be installed with `apt` before setting up the rest of the environment. Keep an eye on the error messages which should give some information on what packages are missing.

The steps concerning pushing changes to remote repositories should be commented out to avoid accidentally pushing unintended changes.