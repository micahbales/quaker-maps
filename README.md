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