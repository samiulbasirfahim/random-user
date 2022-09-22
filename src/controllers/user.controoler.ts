import { Request, Response } from "express"
import usersData from "../data/users.json"
import path from "path"
import fs from "fs"
import { json } from "stream/consumers"

/* funciton for genarate random number */
const randomNumber = (limit: number): number => {
  const randomNumb: number = Math.floor(Math.random() * limit)
  if (limit > randomNumb) {
    return randomNumb
  } else {
    return randomNumber(limit)
  }
}

/* for get a random user */
const random = (req: Request, res: Response) => {
  try {
    res.header({ "Content-type": "application/json" })
    res.status(200)
    res.json(usersData[randomNumber(usersData.length)])
  } catch (error) {
    res.status(500)
    res.json({ message: "Something went wrong", status: false })
  }
}

/* for get all users */
const all = (req: Request, res: Response) => {
  try {
    res.header({ "Content-type": "application/json" })
    res.json(usersData).status(200)
  } catch (error) {
    res.json({ message: "Something went wrong", status: false }).status(500)
  }
}

/* for add a user */
const save = (req: Request, res: Response) => {
  try {
    let userDetails = req.body
    const id = usersData.length + 1
    userDetails = { id, ...userDetails }
    res.header({ "Content-type": "application/json" })
    if (!userDetails.name) {
      res
        .json({
          message: "User name is required",
          status: false,
        })
        .status(204)
    } else if (!userDetails.gender) {
      res
        .json({
          message: "User gender is required",
          status: false,
        })
        .status(204)
    } else if (!userDetails.contact) {
      res
        .json({
          message: "User contact is required",
          status: false,
        })
        .status(204)
    } else if (!userDetails.photoUrl) {
      res
        .json({
          message: "User photo url is required",
          status: false,
        })
        .status(204)
    } else if (!userDetails.address) {
      res
        .json({
          message: "User address is required",
          status: false,
        })
        .status(204)
    } else {
      const pathName = path.join(__dirname, "../data/users.json")
      usersData.push(userDetails)
      fs.writeFile(pathName, JSON.stringify(usersData), (err) => {
        if (err) {
          console.log(err)
        } else {
          res.status(200).json({
            message: "data added succesfully",
            status: false,
          })
        }
      })
    }
  } catch (error) {
    res.header({ "Content-type": "application/json" })
    res.json({ message: "Something went wrong", status: false }).status(500)
  }
}

/* for update a user */
const update = (req: Request, res: Response) => {
  const user = usersData.find((user) => user.id === Number(req.params.id))
  if (!user) {
    res
      .json({
        message: "User not found",
        status: false,
      })
      .status(404)
  }
}

export default {
  random,
  all,
  save,
  update,
}
