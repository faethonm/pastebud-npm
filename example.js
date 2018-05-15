const pastebud = require('./'); // require the `index.js` file from the same directory.
const command = 'get'
const content = 'hello'

pastebud(command, content)
  .then((resp) => {
    console.log(resp);
  })
  .catch((err) =>{
    if (err) {
      console.log(err);
    } else {
      console.log('Error');
    }
  });

