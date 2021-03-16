
'use strict';
// [START import]
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const {Storage} = require('@google-cloud/storage');
//const storage = new Storage({keyFilename: "key.json"});
const bucketName = 'cloud-functionsp.appspot.com';
const filename = 'aaa.pdf';
const filename1 = 'a1.jpg';
const filename2 = 'file.txt';
exports.getDataname1 = functions.storage.object().onFinalize((object) => {
    const fileBucket = object.bucket;
    const bucket = admin.storage().bucket(fileBucket);
    function uploadFile() {
    bucket.upload(filename2, {
      gzip: true,
      metadata: {
        cacheControl: 'no-cache',
      },
    });
    console.log(`${filename2} uploaded to ${bucketName}.`);
  }
  uploadFile().catch(console.error);
});
