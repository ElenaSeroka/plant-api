/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @author Elena Seroka
 * @version 1.0.0
 */

// import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// import dotenv from 'dotenv'

// dotenv.config();

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectToDB } from './config/db.js'

/**
 * The main function of the application.
 */
const main = async () => {
  await connectToDB()

  const app = express()
  app.use(express.static('/'))


  app.use(express.urlencoded({ extended: false }))

  app.use((req, res, next) => {
    next()
  })

  app.use(express.json({ limit: '500kb' }))
  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'default-src': ["'self'"],
          'script-src': ["'self'"],
        }
      },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginEmbedderPolicy: false
    })
  )

  app.set('trust proxy', 1)
  app.use(cors(), router)

  app.use(logger('dev'))
  app.use('/', router)

  // Parse requests of the content type application/json.
  app.use(express.json())

  // Register routes.

  // Executes middleware before the routes.


  // Error handler.
  app.use( (err, req, res, next) => {
    err.status = err.status || 500
    res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message
      })
    return
  })


  const PORT = process.env.PORT
  // const portnr = process.env.PORT_NR

  // Starts the HTTP server listening for connections.
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
