# matrix-js-snippets

[![npm version](https://badge.fury.io/js/matrix-js-snippets.svg)](https://www.npmjs.com/package/matrix-js-snippets)
[![TravisCI badge](https://travis-ci.org/turt2live/matrix-js-snippets.svg?branch=master)](https://travis-ci.org/turt2live/matrix-js-snippets)

A small collection of snippets for repetitive tasks normally performed by matrix bots.

# Installing

This package can be found on [npm](https://www.npmjs.com):
```
npm install matrix-js-snippets
```


# Usage (matrix-js-sdk)

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