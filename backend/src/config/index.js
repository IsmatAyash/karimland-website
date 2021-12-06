import { config } from "dotenv"

const { parsed } = config()

export const {
  PORT,
  MODE,
  SECRET,
  BASE_URL,
  S3BUCKET,
  SECRET_ACCESS_KEY,
  ACCESS_KEY_ID,
  REGION,
  IN_PROD = MODE !== "prod",
  URL = `${BASE_URL}${PORT}`,
  DB = `mongodb+srv://oam007:tamso007@cinch.64m4p.mongodb.net/karimland`,
} = parsed
