#!/usr/bin/env node

const request = require('request');
const url = 'https://pastebud.herokuapp.com:443/api/v1';

function pasteBud(command, content) {
  function sendContent(content) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json',
      };
      request.post({
        url: `${url}/posts`,
        headers,
        body: JSON.stringify({content: content})
      }, (error, response) => {
        if (error) {
          reject(error)
        } else {
          const body = JSON.parse(response.body);
          resolve(body.id);
        }
      });
    });
  }

  function getContent(code) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json',
      };
      request.get({
        url: `${url}/posts/${code}`,
        headers,
      }, (error, response) => {
        if (response.statusCode === 200) {
          const body = JSON.parse(response.body);
          resolve(body.content);
        } else {
          reject(response.body);        }
      });
    });
  }

  return new Promise((resolve, reject) => {
    if (command === null) {
      const errorMsg = 'need to speficy command'
      reject(errorMsg);
    } else if (command === 'send') {
      sendContent(content).then((content) => {
        resolve(content);
        return callback(null, content);
      }).catch((err) => {
        reject(err);
      })
    } else if (command === 'get') {
      getContent(content).then((content) => {
        resolve(content);
        return callback(null, content);
      }).catch((err) => {

        reject(err);
      })
    };
  });
}

module.exports = pasteBud;
module.exports.pasteBud = pasteBud;

if (require.main === module) {
  var args = process.argv.slice(2);
  const command = args[0];
  const content = args[1];
  pasteBud(command, content)
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


}
