const supertest = require('supertest')
const { app } = require('../index')
const jwt = require('jsonwebtoken')

describe('Todo', () => {

    // describe('POST /todo/create', () => {

    //     describe('when user authorization token missing', () => {
    //         it('should return 401', async () => {
    //             const response = await supertest(app).post('/todo/create').send({
    //                 description: 'This is the todo task',
    //                 completed: false,
    //             })
    //             expect(response.statusCode).toBe(401)
    //         })
    //     })

    //     describe("when user authotization token invalid", () => {
    //         it('should return 401', async () => {
    //             const response  = await supertest(app).post('/todo/create').set('authorization', `test`)
    //             .send({
    //                 description: 'This is the todo task',
    //             })
    //             expect(response.statusCode).toBe(401)
    //         })
    //     })

    //     describe('when todo description is missing', () => {
    //         it('should return 400', async () => {
    //             const validToken = jwt.sign({
    //                 id: '647c3a549ab5aa5376a8abb8',
    //                 email: 'test@gmail.com'
    //             }, process.env.JWT_KEY)
    //             const response = await supertest(app).post('/todo/create').set('authorization', `Bearer ${validToken}`)
    //             .send({
    //                 description: '',
    //             })
    //             expect(response.statusCode).toBe(400)
    //         })
    //     })

    //     describe('when user is logged in and todo description is valid', () => {
    //         it('should return 200', async () => {
    //             const validToken = jwt.sign({
    //                 id: '647c3a549ab5aa5376a8abb8',
    //                 email: 'test@gmail.com'
    //             }, process.env.JWT_KEY)
    //             const response = await supertest(app).post('/todo/create').set('authorization', `Bearer ${validToken}`)
    //             .send({
    //                 description: 'This is the todo task',
    //             })
    //             expect(response.statusCode).toBe(200)
    //         })
    //     })

    // })

    describe('GET /todo/get', () => {
 
        describe('when user authorization token missing', () => {
            it('should return 401', async () => {
                const userId = '647c3a549ab5aa5376a8abb8'
                const response = await supertest(app).get(`/todo/get/${userId}`)
                expect(response.statusCode).toBe(401)
            })
        })

        describe("when user authotization token invalid", () => {
            it('should return 401', async () => {
                const userId = '647c3a549ab5aa5376a8abb8'
                const response  = await supertest(app).get(`/todo/get/${userId}`).set('authorization', `test`)
                expect(response.statusCode).toBe(401)
            })
        })

        describe('when user id invalid', () => {
            it('should return 400', async () => {
                const validToken = jwt.sign({
                    id: '647c3a549ab5aa5376a8abb8',
                    email: 'test@gmail.com'
                }, process.env.JWT_KEY)
                const response = await supertest(app).get(`/todo/get/invalidId`).set('authorization', `Bearer ${validToken}`)
                
            })
        })

        describe('when user id is valid', () => {
            it('should return 200', async () => {
                const userId = '647c3a549ab5aa5376a8abb8'
                const validToken = jwt.sign({
                    id: userId,
                    email: 'test@gmail.com'
                }, process.env.JWT_KEY)
                const response  = await supertest(app).get(`/todo/get/${userId}`).set('authorization', `Bearer ${validToken}`)
                expect(response.statusCode).toBe(200)  
            })
        })

    })

    describe('PUT /todo/changecompletestatus', () => {

        describe('when user authorization token missing', () => {
            it('should return 401', async () => {
                const todoId = '647c61cd7e51e3c24e3153f8'
                const response = await supertest(app).put(`/todo/changecompletestatus/${todoId}`).send({
                    completed: true
                })
                expect(response.statusCode).toBe(401)
            })
        })

        describe("when user authotization token invalid", () => {
            it('should return 401', async () => {
                const todoId = '647c61cd7e51e3c24e3153f8'
                const response  = await supertest(app).put(`/todo/changecompletestatus/${todoId}`).set('authorization', `test`).send({
                    completed: true
                })
                expect(response.statusCode).toBe(401)
            })
        })

        describe("when todo id is incorrect", () => {
            it('should return 400', async () => {
                const validToken = jwt.sign({
                    id: '647c3a549ab5aa5376a8abb8',
                    email: 'test@gmail.com'
                }, process.env.JWT_KEY)
                const response  = await supertest(app).put(`/todo/changecompletestatus/1234`).set('authorization', `Bearer ${validToken}`).send({
                    completed: true
                })
                console.log(response.body)
                expect(response.statusCode).toBe(400)
            })
        })

        describe("when todo id does not exist in db", () => {
            it('should return 404', async () => {
                const todoId = '647c61cd7e51e3c24e0000a0'
                const validToken = jwt.sign({
                    id: '647c3a549ab5aa5376a8abb8',
                    email: 'test@gmail.com'
                }, process.env.JWT_KEY)
                const response  = await supertest(app).put(`/todo/changecompletestatus/${todoId}`).set('authorization', `Bearer ${validToken}`).send({
                    completed: true
                })
                expect(response.statusCode).toBe(404)
            })
        })

        describe("when complete status is missing in the body", () => {
            it('should return 404', async () => {
                const todoId = '647c61cd7e51e3c24e3153f8'
                const validToken = jwt.sign({
                    id: '647c3a549ab5aa5376a8abb8',
                    email: 'test@gmail.com'
                }, process.env.JWT_KEY)
                const response  = await supertest(app).put(`/todo/changecompletestatus/${todoId}`).set('authorization', `Bearer ${validToken}`)
                expect(response.statusCode).toBe(400)
            })
        })

        describe("when complete status set to true", () => {
            it('should return completed of todo as true', async () => {
                const todoId = '647c61cd7e51e3c24e3153f8'
                const validToken = jwt.sign({
                    id: '647c3a549ab5aa5376a8abb8',
                    email: 'test@gmail.com'
                }, process.env.JWT_KEY)
                const response  = await supertest(app).put(`/todo/changecompletestatus/${todoId}`).set('authorization', `Bearer ${validToken}`).send({
                    completed: true
                })
                expect(response.body.todo.completed).toBe(true)
            })
        })

        describe("when complete status set to false", () => {
            it('should return completed of todo as false', async () => {
                const todoId = '647c61cd7e51e3c24e3153f8'
                const validToken = jwt.sign({
                    id: '647c3a549ab5aa5376a8abb8',
                    email: 'test@gmail.com'
                }, process.env.JWT_KEY)
                const response  = await supertest(app).put(`/todo/changecompletestatus/${todoId}`).set('authorization', `Bearer ${validToken}`).send({
                    completed: false
                })
                expect(response.body.todo.completed).toBe(false)
            })
        })

    })

})