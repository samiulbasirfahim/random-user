import { Request, Response } from "express"
import usersData from "../data/users.json"

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
    res.end("Something wrong here")
  }
}

/* for get all users */
const all = (req: Request, res: Response) => {
  try {
    res.header({ "Content-type": "application/json" })
    res.status(200)
    res.json(usersData)
  } catch (error) {
    res.status(500)
    res.end("Something wrong here")
  }
}

const save = (req: Request, res: Response) => {
  try {
    const userDetails = req.body
    userDetails.id = usersData.length + 1
    if (!userDetails.name) {
      res.status(204)
      res.end("Name is required")
    } else if (!userDetails.gender) {
      res.status(204)
      res.end("Gender is required")
    } else if (!userDetails.contact) {
      res.status(204)
      res.end("Contact is missing")
    } else if (!userDetails.photoUrl) {
      res.status(204)

      res.end("Photo url is required")
    } else if (!userDetails.address) {
      res.status(204)
      res.end("address is required")
    } else {
      try {
        usersData.push(userDetails)
        res.status(200)
        res.end("data save succesuflly")
      } catch (error) {
        if (error) {
          res.status(500)
          res.end("Something wrong here")
        }
      }
    }
  } catch (error) {
    res.status(500)
    res.end("Something wrong here")
  }
}

export default {
  random,
  all,
  save,
}
