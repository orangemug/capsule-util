# capsule-util
Some tooling for capsule

[![Build Status](https://travis-ci.org/orangemug/capsule-util.svg?branch=master)](https://travis-ci.org/orangemug/capsule-util)
[![Dependency Status](https://david-dm.org/orangemug/capsule-util.svg)](https://david-dm.org/orangemug/capsule-util)
[![Dev Dependency Status](https://david-dm.org/orangemug/capsule-util/dev-status.svg)](https://david-dm.org/orangemug/capsule-util#info=devDependencies)


## Install
To install

    npm install -g git://github.com/teamguideio/capsule-util.git


## Setup
To setup you'll just need to put your API key and subdomain of your capsule account

    ~/.config/capsule-util
    {
      "api": {
        "subdomain": "CAPSULE_SUBDOMAIN_FOR_ACCOUT",
        "user": "API_KEY_HERE"
      }
    }


## Usage
See some usage

    capsule-util --help

Render all the history as individual case studies

    capsule-util history 

You can also pass a [glob matched pattern](https://en.wikipedia.org/wiki/Glob_(programming))

    capsule-util history [title partial]

For example imaging you had a bunch of notes with the title `# customer conversations` render all your mentoring just run

    capsule-util history "customer conversation"

If you had a bunch of different types of conversation just run

    capsule-util history "conversation"

It'll treat your capsule history as markdown so for example the following will be bold

    **this will be bold**


## Examples
To render all "customer conversations" to `customer_convos.html`

    capsule-util history "customer conversations" > customer_convos.html


## License
[MIT](LICENSE)
