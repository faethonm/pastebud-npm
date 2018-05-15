# PasteBud

A Node.js package to send and receive content from pastebud

## Usage

First, install the package using npm:

    npm install pastebud --save

Then, require the package and use it like so:

    var pasteBud = require('pastebud);

    pastebud('send', 'example')
      .then((resp) => {
        // example key here
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })

    pastebud('get', 'example key here')
      .then((resp) => {
        // response here this case 'example'
      })

## License

Apache 2.0
