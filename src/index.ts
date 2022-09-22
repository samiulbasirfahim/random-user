import express from "express"
import userRouter from "./routes/users.route"
import config from "./utils/config"

const app: any = express()

app.use(express.json())

app.config = config

app.use("/user", userRouter)

app.listen(app.config.port, () =>
  console.log(`app listening on port ${app.config.port}`)
)
