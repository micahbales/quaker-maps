# The Quaker Maps Project

Quaker Maps helps people discover Quaker communities throughout the world. Anyone can easily search for Quaker congregations by location and a variety of other criteria - including organizational affiliation, theology, and welcome to the LGBT community.

We release this project to the world under the [+CAL license](https://legaldesign.org/cal-ethical-ip), which helps ensure that our code never used to harm either human rights or the environment. See `LICENSE` for more details.

# Development Setup Guide

## Requirements

* Node 16+ (recommended: Node 18+)
* TypeScript 5+
* npm 8+

## Technology Stack

* **React 18** with TypeScript
* **MUI v5** (Material-UI) for UI components and theming
* **React Router v6** for client-side routing
* **Google Maps React 2.1** for interactive mapping
* **Styled Components 5.3** for additional styling
* **ESLint** for code linting (migrated from TSLint)
* **Create React App 5** with TypeScript template

## Install Project Dependencies

```
$ cd quaker-maps-client
$ npm install
```

## Set Up Google Maps API Key

To run this project, you'll need an API key for Google Maps. This requires setting up an account with Google Cloud Platform and [following the steps detailed here](https://developers.google.com/maps/documentation/javascript/get-api-key).

Once you've got your API key, create a super-top-secret `.env` file:

```
$ cp .env.example .env
```

Then add your API key to the new `.env` file.

## Run Project Locally

```bash
$ npm start
```

## Available Scripts

In the project directory, you can run:

* `npm start` - Runs the app in development mode
* `npm test` - Launches the test runner
* `npm run build` - Builds the app for production
* `npm run lint` - Runs ESLint to check code quality
* `npm run lint:fix` - Automatically fixes ESLint issues
* `npm run type-check` - Runs TypeScript compiler to check types
* `npm run format` - Formats code using Prettier
* `npm run format:check` - Checks if code is properly formatted

## Deploy Project to Firebase
_The following steps assume that you have a firebase account and have set up a project_

### Set up Firebase on your local
```
$ npm install -g firebase
$ firebase login
```

### Deployment to dev or prod
```
$ npm run deploy-dev
```
```
$ npm run deploy
```
