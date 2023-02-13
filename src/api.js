const { Configuration, OpenAIApi } = require('openai')
const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const bodyParser = require('body-parser')

const configuration = new Configuration({
  organization: 'org-Rczq0D04AfAI7WQuppyUdjtv',
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)

const app = express()

const router = express.Router()

app.use(bodyParser.json())
app.use(cors())

router.post('/', async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Say this is a test`,
      temperature: 0.6,
      max_tokens: 3000,
    })

    res.json({
      data: response.data.choices[0].text,
    })
  } catch (error) {
    console.log('Its an error')
    console.error(error)
    res.sendStatus(500)
  }
})

app.use(`/.netlify/functions/api`, router)

// Export the app and the serverless function
module.exports = app
module.exports.handler = serverless(app)
