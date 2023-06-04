const supertest = require('supertest')
const { app } = require('../index')

describe('Todo', () => {

    describe('POST /todo', () => {

        describe('when jwt is not provided', () => {
            it('should return 401', async () => {
                const response = await supertest(app).post('/todo').send({
                    description: 'This is the todo task',
                    completed: false,
                })
                expect(response.statusCode).toBe(401)
            })
        })

    })

})