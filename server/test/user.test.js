
const supertest = require('supertest')
const { app } = require('../index')

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


})