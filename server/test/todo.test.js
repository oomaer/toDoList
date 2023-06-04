const supertest = require('supertest')
const { app } = require('../index')
const jwt = require('jsonwebtoken')

describe('Todo', () => {

    describe('POST /todo/create', () => {

        describe('when user authorization token missing', () => {
            it('should return 401', async () => {
                const response = await supertest(app).post('/todo/create').send({
                    description: 'This is the todo task',
                    completed: false,
                })
                expect(response.statusCode).toBe(401)
            })
        })

        describe("when user authotization token invalid", () => {
            it('should return 401', async () => {
                const response  = await supertest(app).post('/todo/create').set('authorization', `test`)
                .send({
                    description: 'This is the todo task',
                })
                expect(response.statusCode).toBe(401)
            })
        })

        describe('when todo description is missing', () => {
            it('should return 400', async () => {
                const validToken = jwt.sign({
                    id: '647c3a549ab5aa5376a8abb8',
                    email: 'test@gmail.com'
                }, process.env.JWT_KEY)
                const response = await supertest(app).post('/todo/create').set('authorization', `Bearer ${validToken}`)
                .send({
                    description: '',
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when user is logged in and todo description is valid', () => {
            it('should return 200', async () => {
                const validToken = jwt.sign({
                    id: '647c3a549ab5aa5376a8abb8',
                    email: 'test@gmail.com'
                }, process.env.JWT_KEY)
                const response = await supertest(app).post('/todo/create').set('authorization', `Bearer ${validToken}`)
                .send({
                    description: 'This is the todo task',
                })
                expect(response.statusCode).toBe(200)
            })
        })

    })

})