// Import required AWS SDK clients and commands for Node.js.
import aws from "aws-sdk"
import uuidv4 from "uuid"
import { SECRET_ACCESS_KEY, ACCESS_KEY_ID, REGION, S3BUCKET } from "../config"

// update AWS config env data
aws.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
})
const s3 = new aws.S3({ region: REGION })

// my default params for s3 upload
// a max upload size of 1 MB
const s3Params = {
  ACL: "public-read",
  Bucket: S3BUCKET,
  Conditions: [
    ["content-length-range", 0, 1024000], // 1 Mb
    { acl: "public-read" },
  ],
}

// the actual upload happens here
const handleFileUpload = async file => {
  const { createReadStream, filename } = await file

  const key = uuidv4()

  return new Promise((resolve, reject) => {
    s3.upload(
      {
        ...s3Params,
        Body: createReadStream(),
        Key: `images/${key}/${filename}`,
      },
      (err, data) => {
        if (err) {
          console.log("error uploading...", err)
          reject(err)
        } else {
          console.log("successfully uploaded file...", data)
          resolve(data)
        }
      }
    )
  })
}

export default handleFileUpload
