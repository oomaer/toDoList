
const supertest = require('supertest')
const { app } = require('../index')

describe('User', () => {
    
    describe('GET /users', () => {
        
        it('should return 200 OK', async () => {
            const {body, statusCode} = await supertest(app).get('/users')
            expect(statusCode).toBe(200)
        })

    })

    describe('POST /users/register', () => {
        it('should return 201 OK', async () => {
            const {body, statusCode} = await supertest(app).post('/users/register').send({
                name: 'test',
                email: 'test@gmail.com',
                password: 'test'
            })
            
        })   
    })


})