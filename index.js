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

