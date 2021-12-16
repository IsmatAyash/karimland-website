import React from "react"
import { IMAGE_UPLOAD } from "../../graphql/mutations"
import { useMutation } from "@apollo/client"

const UploadFile = () => {
  const [imageUpload, { loading, error }] = useMutation(IMAGE_UPLOAD)
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && imageUpload({ variables: { file } })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>

  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
    </React.Fragment>
  )
}

export default UploadFile
