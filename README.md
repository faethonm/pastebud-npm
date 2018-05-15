# PasteBud

A Node.js package to send and receive content from pastebud

## Usage

First, install the package using npm:

    npm install pastebud

Then, require the package and use it like so:

    var pastebud = require('pastebud);

    pastebud('send', 'example text here')
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })

    pastebud('get', 'example key here')
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })

## License
Apache 2.0
