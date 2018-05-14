const pastebud = require('./'); // require the `index.js` file from the same directory.
var args = process.argv.slice(2);
console.log('args',args)
const command = args[0];
const content = args[1];
pastebud(command, content, (err, resp) => {
    if (err) {
        console.log(err);
    }

    console.log(resp);
});
