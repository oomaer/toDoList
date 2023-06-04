
const supertest = require('supertest')
const { app } = require('../index')

describe('User', () => {
    
    describe('GET /users', () => {
        
        it('should return 200 OK', async () => {
            const {body, statusCode} = await supertest(app).get('/users')
            expect(statusCode).toBe(200)
        })

    })


})