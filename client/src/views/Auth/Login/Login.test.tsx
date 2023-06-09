import { rest } from 'msw'
import { server } from '../../../mocks/server'
import Login from './Login'
import { render, screen } from '../../../utils/test-utils'
import user from '@testing-library/user-event'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000"

describe("Login View", () => {

    test("display error on empty email", async () => {
        user.setup()
        render(<Login />)
        await user.click(screen.getByRole("button", {name: "Login"}))
        const errorMessage = await screen.queryByTestId("error-message")
        expect(errorMessage).toHaveTextContent("Please enter your email")

    })

    test("display error on invalid email", async () => {
        user.setup()
        render(<Login />)
        await user.type(screen.getByRole("textbox", {name: "Email"}), "testusergmai")
        await user.click(screen.getByRole("button", {name: "Login"}))
        const errorMessage = await screen.queryByTestId("error-message")
        expect(errorMessage).toHaveTextContent("Please enter a valid email")
    })

    test("display error on empty password", async () => {
        user.setup()
        render(<Login />)
        await user.type(screen.getByRole("textbox", {name: "Email"}), "testuser@gmail.com")
        await user.click(screen.getByRole("button", {name: "Login"}))
        const errorMessage = await screen.queryByTestId("error-message")
        expect(errorMessage).toHaveTextContent("Please enter your password")
    })


    test("no error message on successfull login", async () => {
        user.setup()
        render(<Login />)
 
        await user.type(screen.getByRole("textbox", {name: "Email"}), "testuser@gmail.com")
        await user.type(screen.getByRole("textbox", {name: "Password"}), "testpassword")
        await user.click(screen.getByRole("button", {name: "Login"}))

        const errorMessage = await screen.queryByTestId("error-message")

        expect(errorMessage).not.toBeInTheDocument()

    })

    
    test("displays error message when login fails", async () => {
        user.setup()
        render(<Login />)
        server.use(
            rest.post(SERVER_URL + "/user/login", (req, res, ctx) => {
              return res(ctx.status(400), ctx.json({ success:false, message: 'Invalid credentials' }))
            }),
        )
        
        await user.type(screen.getByRole("textbox", {name: "Email"}), "testuser@gmail.com")
        await user.type(screen.getByRole("textbox", {name: "Password"}), "testpassword")
        await user.click(screen.getByRole("button", {name: "Login"}))

        const errorMessage = await screen.findByTestId("error-message")

        expect(errorMessage).toBeInTheDocument()

    })

})