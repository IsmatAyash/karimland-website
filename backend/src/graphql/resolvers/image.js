import { parse, join } from "path"
import { createWriteStream } from "fs"
import { URL } from "../../config"
import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload"

export default {
  Upload: GraphQLUpload,
  Mutation: {
    imageUploader: async (_, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file
      const stream = createReadStream()

      let { ext, name } = parse(filename)

      name = name.replace(/[^a-z0-9 ]+/gi, "-").replace(" ", "_")
      console.log("FILE PATH", name)
      let serverFile = join(
        __dirname,
        `../../uploads/${name}-${Date.now()}${ext}`
      )
      console.log("SERVER FILE NAME", serverFile)

      const out = createWriteStream(serverFile)
      await stream.pipe(out)

      return {
        filename: `${URL}${serverFile.split("uploads")[1]}`,
        mimetype,
        encoding,
      }
    },
  },
}
