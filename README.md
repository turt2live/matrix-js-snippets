# matrix-js-snippets

[![npm version](https://badge.fury.io/js/matrix-js-snippets.svg)](https://www.npmjs.com/package/matrix-js-snippets)
[![TravisCI badge](https://travis-ci.org/turt2live/matrix-js-snippets.svg?branch=master)](https://travis-ci.org/turt2live/matrix-js-snippets)
[![Greenkeeper badge](https://badges.greenkeeper.io/turt2live/matrix-js-snippets.svg)](https://greenkeeper.io/)
[![Targeted for next release](https://badge.waffle.io/turt2live/matrix-js-snippets.png?label=sorted&title=Targeted+for+next+release)](https://waffle.io/turt2live/waffle-matrix?utm_source=badge)
[![WIP](https://badge.waffle.io/turt2live/matrix-js-snippets.png?label=wip&title=WIP)](https://waffle.io/turt2live/waffle-matrix?utm_source=badge)

A small collection of snippets for repetitive tasks normally performed by matrix bots.

# Installing

This package can be found on [npm](https://www.npmjs.com):
```
npm install matrix-js-snippets
```

**Note**: This package is ES6 compatible and does *not* transpile automatically. 


# Usage

```javascript
var matrixUtils = require("matrix-js-snippets");
var sdk = require("matrix-js-sdk");

// Create your client
var client = sdk.createClient({ /* your arguments here */ });

// Enable the utiltiies you'd like to use
matrixUtils.autoAcceptInvites(client); // supports optional callback

// Don't forget to actually start the client too!
client.startClient();
```