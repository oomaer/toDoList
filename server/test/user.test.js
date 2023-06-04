
const supertest = require('supertest')
const { app } = require('../index')
const jwt = require('jsonwebtoken')
require('dotenv').config()

describe('User', () => {
    
    describe('POST /users/register', () => {

        describe('when email is invalid', () => {
            it('should return 400', async () => {
                const response = await supertest(app).post('/users/register').send({
                    name: 'test',
                    email: 'test',
                    password: 'test1234'
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when password is invalid', () => {
            it('should return 400', async () => {
                const response = await supertest(app).post('/users/register').send({
                    name: 'test',
                    email: 'testing1234@gmail.com',
                    password: 'test'
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when name is invalid', () => {
            it('should return 400', async () => {
                const response = await supertest(app).post('/users/register').send({
                    name: 'te',
                    email: 'test@gmail.com',
                    password: 'test12345'
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('register new user', () => {
            it('should return 200 if not duplicate email', async () => {
                const response = await supertest(app).post('/users/register').send({
                    name: 'test',
                    email: 'test@gmail.com',
                    password: 'test12345'
                })
                if(response.body.success === false && response.body.message === 'Email already exists'){
                    expect(response.statusCode).toBe(400)
                }
                else{
                    expect(response.statusCode).toBe(201)
                }
            })
        })

    })

    describe('POST /users/login', () => {

        describe('when user does not exist / invalid email', () => {
            it('should return 400', async () => {
                const response = await supertest(app).post('/users/login').send({
                    email: 'test',
                    password: 'test1234'
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when invalid password entered', () => {
            it('should return 400', async () => {
                const response = await supertest(app).post('/users/login').send({
                    email: 'test@gmail.com',
                    password: 'test123'
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe('when email and password are correct', () => {
            it('should return 200', async () => {
                const response = await supertest(app).post('/users/login').send({
                    email: 'test@gmail.com',
                    password: 'test12345'
                })
                expect(response.statusCode).toBe(200)
            })
        })

    })

    describe('GET /users/authenticate', () => {
        
        describe('when jwt is not provided', () => {
            it('should return 401', async () => {
                const response = await supertest(app).get('/users/authenticate')
                expect(response.statusCode).toBe(401)
            })
        })

        describe('when jwt is invalid', () => {
            it('should return 401', async () => {
                const response = await supertest(app).get('/users/authenticate').set('authorization', 'Bearer test')
                expect(response.statusCode).toBe(401)
            })
        })

        describe('when jwt is valid', () => {
            it('should return 200', async () => {
                const validToken = jwt.sign({
                    id: '647c3a549ab5aa5376a8abb8',
                    email: 'test@gmail.com'
                }, process.env.JWT_KEY)
                const response = await supertest(app).get('/users/authenticate').set('authorization', `Bearer ${validToken}`)
                expect(response.statusCode).toBe(200)
            })
        })
    })


})