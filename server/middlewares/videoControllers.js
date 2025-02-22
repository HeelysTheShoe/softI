const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require('dotenv').config();

const s3 = new AWS.S3({
  //the access key id and secret access key are protected in an .env file
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey, 
  region: "us-east-1",
});

const videoControllers = {};

videoControllers.uploadFile = async (req, res, next) => {
  if (req.file == null) {
    return res.status(400).json({ message: "file not sent by the client" });
  }
  const getNum = () => {
    return new Promise((resolve, reject) => {
      s3.listObjects({ Bucket: "softi-iteration" }, function (err, result) {
        if (err) reject(err);
        if (result) resolve(result.Contents.length);
      });
    });
  };

  let num = await getNum() + 1


  const file = req.file;
  //const extension = /[^.]+$/.exec(file.originalname)[0];
  file.originalname = `${req.query.title}_${req.query.image}.webm`;
  const fileStream = fs.createReadStream(file.path);
  const params = {
    Bucket: "softi-iteration",
    //once users are created,add ${username}
    Key: `record_${num}.webm`,
    Body: fileStream,
  };
  await s3.upload(params, function (err, data) {
    if (err) {
      next({
        log: "error while uploading image to s3",
        status: 500,
        message: err,
      });
    }
  });

  next();
};

videoControllers.fetchFiles = async (req, res, next) => {
  const params = {
    Bucket: "softi-iteration",
  };
  console.log(process.env.accessKeyId);

  const getNum = () => {
    return new Promise((resolve, reject) => {
      s3.listObjects(params, function (err, result) {
        if (err) reject(err);
        if (result) resolve(result.Contents.length);
      });
    });
  };

  const getObject = (i) => {
    const objParam = {
      Bucket: "softi-iteration",
      Key: "record_" + i + ".webm",
    };

    return new Promise((resolve, reject) => {
      s3.getObject(objParam, async function (err, result) {
        if (err) reject(err);
        if (result) resolve(result.Body);
      });
    });
  };

  const num = await getNum();
  let array = [];

  for (let i = 1; i <= num; i++) {
    let file = await getObject(i);
    array.push(file);
  }

  res.locals.files = array;
  next();
};
// get the numbers of files in the buckets
//   await s3.listObjects(params, function (err, data) {
//     if (err) throw err;
//     const num = data.Contents.length;
//     const files = [];

// for (let i = 1; i <= num; i++) {
//   const objParam = {
//     Bucket: "softi-nyoi2",
//     Key: "record_" + i + ".webm",
//   };
//   s3.getObject(objParam, async function (err, data) {
//     if (err) throw err;
//     const file = await data.Body;
//     files.push(file);
//   });
// }

// console.log(files);
//   });

// };

module.exports = videoControllers;
