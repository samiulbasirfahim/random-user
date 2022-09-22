import userController from "../controllers/user.controoler"
import express from "express"

const router = express.Router()

router.get("/random", userController.random)

router.get("/all", userController.all)

export default router
