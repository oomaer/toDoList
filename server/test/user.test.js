
const supertest = require('supertest')
const { app } = require('../index')
const jwt = require('jsonwebtoken')
require('dotenv').config()


describe('User', () => {
    
    describe('POST /user/register', () => {

        describe('when email is invalid', () => {
            it('should return 400', async () => {
                const response = await supertest(app).post('/user/register').send({
                    name: 'test',
                    email: 'test',
                    password: 'test1234'
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when password is invalid', () => {
            it('should return 400', async () => {
                const response = await supertest(app).post('/user/register').send({
                    name: 'test',
                    email: 'testing1234@gmail.com',
                    password: 'test'
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when name is invalid', () => {
            it('should return 400', async () => {
                const response = await supertest(app).post('/user/register').send({
                    name: 'te',
                    email: 'test@gmail.com',
                    password: 'test12345'
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when all of the details are valid', () => {
            it('should return 201, 400 if using same email', async () => {
                const response = await supertest(app).post('/user/register').send({
                    name: 'test',
                    email: 'test@gmail.com',
                    password: 'test12345'
                })
                if(response.body.message === 'Account already exists'){
                    expect(response.statusCode).toBe(400)
                    return
                }
                expect(response.statusCode).toBe(201)

            })
        })

    })

    describe('POST /user/login', () => {

        describe('when user does not exist / invalid email', () => {
            it('should return 400', async () => {
                const response = await supertest(app).post('/user/login').send({
                    email: 'test',
                    password: 'test1234'
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when invalid password entered', () => {
            it('should return 400', async () => {
                const response = await supertest(app).post('/user/login').send({
                    email: 'test@gmail.com',
                    password: 'test123'
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when email and password are correct', () => {
            it('should return 200', async () => {
                const response = await supertest(app).post('/user/login').send({
                    email: 'test@gmail.com',
                    password: 'test12345'
                })
                expect(response.statusCode).toBe(200)
            })
        })

    })

    describe('GET /user/authenticate', () => {
        
        describe('when jwt is not provided', () => {
            it('should return 401', async () => {
                const response = await supertest(app).get('/user/authenticate')
                expect(response.statusCode).toBe(401)
            })
        })

        describe('when jwt is invalid', () => {
            it('should return 401', async () => {
                const response = await supertest(app).get('/user/authenticate').set('authorization', 'Bearer test')
                expect(response.statusCode).toBe(401)
            })
        })

        describe('when jwt is valid', () => {
            it('should return 200', async () => {
                const validToken = jwt.sign({
                    email: 'test@gmail.com'
                }, process.env.JWT_KEY)
                const response = await supertest(app).get('/user/authenticate').set('authorization', `Bearer ${validToken}`)
                expect(response.statusCode).toBe(200)
            })
        })

    })

})
