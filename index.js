const express = require('express')
const uuid = require('uuid')
const port = 3000

const app = express()
app.use(express.json())

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})


const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: 'User not found' })
    }

    request.userIndex = index
    request.userId=id
    
    
    next()
}


app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {

    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})


app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body

    const index = request.userIndex

    const id = request.userId

    const updatedUser = { id, name, age }



    users[index] = updatedUser



    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
   
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

app.get('/orders/:id', checkUserId, requests, (request, response) => {
    const index = request.userIndex
    const order = orders[index]

    return response.json(order)
})
app.patch('/orders/:id', checkUserId, requests, (request, response) => {
    const index = request.userIndex
    const { id, clientName, order, price } = orders[index]
    let status = orders[index].status
    status = "Pedido Pronto"
    const finishedOrder = { id, order, clientName, price, status }
    orders[index] = finishedOrder

    return response.json(finishedOrder)
})










