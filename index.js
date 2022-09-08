const { request, response, json } = require('express')

const express = require('express')
const uuid = require('uuid')
const port = 3000

const app = express()
app.use(express.json())

const orders = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = orders.findIndex(clientId => clientId.id === id)

    if (index < 0) {
        return response.status(404).json({ error: 'Order not found' })
    }

    request.userIndex = index
    request.userId = id


    next()
}

const requests = (request, response, next) => {
    const method = request.route.methods
    const url = request.route.path

    console.log(method, url)

    next()
}

app.get('/orders', requests, (request, response) => {
    return response.json(orders)
})

app.post('/orders', requests, (request, response) => {
    const { order, clientName, price } = request.body
    const status = "Em preparação"

    const clientId = { id: uuid.v4(), order, clientName, price, status }

    orders.push(clientId)

    return response.status(201).json(clientId)
})

app.put('/orders/:id',checkUserId,requests, (request,response)=>{
    const{order,clientName,price} = request.body
    const status = "Em Preparação"
    const id = request.userId
    const index = request.userIndex

    const updatedUser = {id,order,clientName,price, status}

    orders[index] = updatedUser

    return response.json(updatedUser)
})

app.delete ('/orders/:id',checkUserId,requests,(request,response)=>{
    const index = request.userIndex
    orders.splice(index,1)

    return response.status(204).json(orders)
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})