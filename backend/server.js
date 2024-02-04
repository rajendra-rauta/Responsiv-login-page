import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import { OAuth2Client } from 'google-auth-library'

const app = express()
const db = mongoose.connect
const port = 3001
const __dirname = path.dirname('../')

dotenv.config()
app.use(cors({
  origin: "*",
}))

app.use('/', express.static('../'))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../') })
})

const client = new OAuth2Client();
async function verify() {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);

mongoose.connect(process.env.DB_URL)
//db.on('error', (error) => { console.log(error) })
//db.once('open', () => { console.log("Database Connected") })

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
