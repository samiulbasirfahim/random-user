import express, { Request, Response } from "express"

const router = express.Router()

router.all("*", (req: Request, res: Response) => {
  res
    .json({
      message: "Route not found",
      status: false,
    })
    .status(404)
})

export default router
