const pastebud = require('./'); // require the `index.js` file from the same directory.

pastebud('send','sAAAAteady367', (err, resp) => {
    if (err) {
        console.log(err);
    }

    console.log(resp);
});
