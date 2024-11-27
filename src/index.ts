import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from "./core/infrastructure/route";

const app: express.Application = express()
const port = process.env.PORT || 4000

app.use(cors())

app.use(session({ resave: true, saveUninitialized: true, secret: 'hits' }))
app.use((_req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    next()
})

app.use('/upload-image', express.static('upload-image'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

export const appModule = app