import userController from "../controllers/user.controoler"
import express from "express"

const router = express.Router()

// @route get random user /user/random *method=get
router.get("/random", userController.random)

// @route get all user /user/all *method=get
router.get("/all", userController.all)

// @route add user /user/save *method=post
router.post("/save", userController.save)

// @route update user by id /user/(id of user) *method=patch
router.patch("/:id", userController.update)

// @route get user by id /user/(id of user) *method=get
router.get("/:id", userController.getOne)

// @route delete user by id /user/(id of user) *method=delete
router.delete("/:id", userController.deleteUser)

export default router
