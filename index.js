#!/usr/bin/env node

const request = require('request');
const url = 'https://pastebud.herokuapp.com:443/api/v1';

function pasteBud(command, content) {
  function post(value) {
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json',
      };
      request.post({
        url: `${url}/posts`,
        headers,
        body: JSON.stringify({post: value})
      }, (error, response) => {
        if (error) {
          reject(error)
        } else {
          const id = response.body
          resolve(id);
        }
      });
    });
  }

  function get(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject('key cannot be null');
      }
      const headers = {
        'Content-Type': 'application/json',
      };
      request.get({
        url: `${url}/posts/${id}`,
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
      const errorMsg = 'command can be get or post';
      reject(errorMsg);
    } else if (content === null) {
      const errorMsg = 'content cannot be empty ';
      reject(errorMsg);
    } else if (command === 'post') {
      post(content).then((result) => {
        resolve(result);
        return callback(null, result);
      }).catch((err) => {
        reject(err);
      })
    } else if (command === 'get') {
      get(content).then((result) => {
        resolve(result);
        return callback(null, result);
      }).catch((err) => {
        reject(err);
      })
    } else {
      const errorMsg = 'command can be get or post';
      reject(errorMsg);
    }
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
