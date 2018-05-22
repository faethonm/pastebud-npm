const pastebud = require('./'); // require the `index.js` file from the same directory.
const command = 'get'
const value = 'hello'

pastebud(command, value)
  .then((result) => {
    console.log(result);
  })
  .catch((err) =>{
    if (err) {
      console.log(err);
    } else {
      console.log('Error');
    }
  });

