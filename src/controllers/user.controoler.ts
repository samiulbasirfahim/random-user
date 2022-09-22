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
  res.header({ "Content-type": "application/json" })
  res.json(usersData[randomNumber(usersData.length)])
}

const all = (req: Request, res: Response) => {
  res.header({ "Content-type": "application/json" })
  res.json(usersData)
}

export default {
  random,
  all,
}
