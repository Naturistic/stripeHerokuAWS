var urlParams = new URLSearchParams(window.location.search);
var sessionId = urlParams.get('session_id');

const AWS = require('aws-sdk')


AWS.config.update({

  accessKeyId: '???',

  secretAccessKey: '???'

})


const s3 = new AWS.S3()

const myBucket = 'naturistic'

const myKey = 'mountains/desert_mountain.jpg'

const signedUrlExpireSeconds = 60 * 5 // 5 minutes


const url = s3.getSignedUrl('getObject', {

    Bucket: myBucket,

    Key: myKey,

    Expires: signedUrlExpireSeconds

})


console.log(url)

if (sessionId) {
  fetch('/checkout-session?sessionId=' + sessionId)
    .then(function (result) {
      return result.json();
    })
    .then(function (session) {
      var sessionJSON = JSON.stringify(session, null, 2);
      document.querySelector('pre').textContent = sessionJSON;
    })
    .catch(function (err) {
      console.log('Error when fetching Checkout session', err);
    });
}
