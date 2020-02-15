# The Quaker Maps Project

Quaker Maps helps people discover Quaker communities throughout the world. Anyone can easily search for Quaker congregations by location and a variety of other criteria - including organizational affiliation, theology, and welcome to the LGBT community.

We release this project to the world under the [+CAL license](https://legaldesign.org/cal-ethical-ip), which helps ensure that our code never used to harm either human rights or the environment. See `LICENSE` for more details.

# Development Setup Guide

## Requirements

* Node 12
* Typescript 3

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

```
$ npm start
```

## Deploy Project to Surge

```
$ npm install -g surge
$ npm run deploy
```

## Firebase Functions

At present, Quaker Maps is an almost entirely front-end project. There is only one piece of the application that requires a backend call: the UpdateMeetings view, which forwards update meeting requests to an email that we designate.

In order for this functionality to work, we need to ensure that our Firebase function for emailing (`firebase/functions/src/controllers/email.ts`) is properly configured and deployed.

There are currently two steps to setting this up: 

1. From the `firebase` directory, run `$ firebase deploy`
2. Set up the config variables invoked near the top of `email.ts` as described in the [Firebase documentation](https://firebase.google.com/docs/functions/config-env)

(The URL for our backend call is hard-coded in `send_update_meeting_request`; this might need to be changed if we were to have multiple deployments with different emailing requirements)
