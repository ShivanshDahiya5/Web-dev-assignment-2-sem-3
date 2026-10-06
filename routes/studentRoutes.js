import express from 'express'
import fs from 'fs'
import {parse} from 'path'

const router = express.Router()

function getData(){
    let data = fs.readFileSync('database/student.json', 'utf-8')
    data = JSON.parse(data)
    return data
}

const getUser = (req, res)=>{
    let data = getData()

    res.status(200).json({
        message: "Data get successfully...",
        status: true,
        data:data
    })
}

const getUserById = (req, res)=>{
    const {id} = req.params

    let data = getData()

    let user = data.find((element)=>{
        return element.id === Number(id)
    })

    if(!user){
        return res.status(404).json({
            message: "Data did not Fetched by id...",
            status: false,
        })
    }
    res.status(200).json({
        message: "Data Fetched successfully by id...",
        success: true,
        user
    })
}

const createUser = (req, res)=>{
    let {name, age, id} = req.body

    if(!name || !age || !id){
        res.status(404).json({
            message: "Data not found...",
            success: false
        })
    }

    let data = getData()

    data.push({name, age, id})

    fs.writeFileSync('./database/student.json', JSON.stringify(data, null, 3))

    res.status(201).json({
        message: "data created successfully...",
        success: true,
        data
    })
}

const updateUser = (req, res)=>{
    let {name, age} = req.body

    let id = req.params.id

    let data = getData()

    let user = data.find((e)=>e.id === Number(id))

    if(name){
        user.name = name
    }

    if(age){
        user.age = age
    }

    fs.writeFileSync('./database/student.json', JSON.stringify(data, null, 3))

    res.status(200).json({
        message: "data updated successfully...",
        success: true,
        data
    })
}

const delUser = (req, res)=>{
    let id = req.params.id

    let data = getData()

    let user = data.find((e)=>e.id === Number(id))

    let index = data.indexOf(user)

    data.splice(index, 1)

    fs.writeFileSync('./database/student.json', JSON.stringify(data, null, 3))

    res.status(200).json({
        message: "User deleted successfully...",
        success: true,
        data
    })
}

router.get('/students', getUser)

router.get('/students/:id', getUserById)

router.post('/students', createUser)

router.put('/students/:id', updateUser)

router.delete('/students/:id', delUser)

export default router