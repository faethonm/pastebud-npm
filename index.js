"use strict";

var request = require('request');
const url = 'https://pastebud.herokuapp.com:443/api/v1';

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
        // eslint-disable-next-line no-console
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
      if (error) {
        // eslint-disable-next-line no-console
        reject(error)
      } else {
        const body = JSON.parse(response.body);
        resolve(body.content);
      }
    });
  });
}

module.exports = function pastebud(command, content, callback) {
  return new Promise((resolve, reject) => {
    if (command === null) {
      const errorMsg = 'need to speficy command'
      reject(errorMsg);
      return callback(errorMsg);
    } else if (command === 'send') {
      sendContent(content).then((content) => {
        resolve(content);
        return callback(null, content);
      }).catch((err) => {
        reject(err);
        return callback(err);
      })
    } else if (command === 'get') {
      getContent(content).then((content) => {
        resolve(content);
        return callback(null, content);
      }).catch((err) => {
        reject(err);
        return callback(err);
      })
    };
  });
}
