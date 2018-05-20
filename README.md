# PasteBud

A Node.js package to send and receive content from pastebud

## Usage

First, install the package using npm:

    npm install pastebud

Then, require the package and use it like so:

    var pastebud = require('pastebud);

    pastebud('post', 'example text here')
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

### CLI Usage:

```bash

$ npm i -g pastebud
$  pastebud post hello
including3850
$ pastebud get including3850
hello

```

## License
Apache 2.0
