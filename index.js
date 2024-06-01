import express, { response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

const app = express()
app.use(express.json())

const port = 3000

app.get("/users", async (req, res) => {

    const users = await prisma.user.findMany()

    return res.status(200).json(users)
})

app.get("/users/:id", async (req, res) => {

    const user = await prisma.user.findUnique({
        where:{
        id: req.params.id
        }
    })

    return res.status(200).json(user)
})

app.post("/users", async (req, res) => {
    const creatUser = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    return res.status(201).json(creatUser)
})

app.put("/users/:id", async (req, res) => {
    const updateUser = await prisma.user.update({
        where:{
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    return res.status(200).json(updateUser)
})

app.delete("/users/:id", async (req, res) => {
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })
    return res.status(200).json({message: "User deleted sucesfully"})
})

app.listen(port, () => {
    console.log(`Started server on port ${port}`)
})
