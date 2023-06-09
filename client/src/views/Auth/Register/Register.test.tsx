import { rest } from 'msw'
import { server } from '../../../mocks/server'
import { render, screen } from '../../../utils/test-utils'
import user from '@testing-library/user-event'
import Register from './Register'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000"

describe("Register View", () => {

    test("display error on empty name", async () => {
        user.setup()
        render(<Register />)
        await user.click(screen.getByRole("button", {name: "Sign Up"}))
        const errorMessage = await screen.queryByTestId("error-message")
        expect(errorMessage).toHaveTextContent("Please enter your name")

    })

    test("display error on empty email", async () => {
        user.setup()
        render(<Register />)
        await user.type(screen.getByRole("textbox", {name: "Name"}), "testuser")
        await user.click(screen.getByRole("button", {name: "Sign Up"}))
        const errorMessage = await screen.queryByTestId("error-message")
        expect(errorMessage).toHaveTextContent("Please enter your email")

    })

    test("display error on invalid email", async () => {
        user.setup()
        render(<Register />)
        await user.type(screen.getByRole("textbox", {name: "Name"}), "testuser")
        await user.type(screen.getByRole("textbox", {name: "Email"}), "testusergmai")
        await user.click(screen.getByRole("button", {name: "Sign Up"}))
        const errorMessage = await screen.queryByTestId("error-message")
        expect(errorMessage).toHaveTextContent("Please enter a valid email")
    })

    test("display error on empty password", async () => {
        user.setup()
        render(<Register />)
        await user.type(screen.getByRole("textbox", {name: "Name"}), "testuser")
        await user.type(screen.getByRole("textbox", {name: "Email"}), "testuser@gmail.com")
        await user.click(screen.getByRole("button", {name: "Sign Up"}))
        const errorMessage = await screen.queryByTestId("error-message")
        expect(errorMessage).toHaveTextContent("Please enter your password")
    })

    test("display error on invalid password", async () => {
        user.setup()
        render(<Register />)
        await user.type(screen.getByRole("textbox", {name: "Name"}), "testuser")
        await user.type(screen.getByRole("textbox", {name: "Email"}), "testuser@gmail.com")
        await user.type(screen.getByRole("textbox", {name: "Password"}), "test")
        await user.click(screen.getByRole("button", {name: "Sign Up"}))
        const errorMessage = await screen.queryByTestId("error-message")
        expect(errorMessage).toHaveTextContent("Password must be at least 6 characters long")
    })

    
    test("displays error message when register fails", async () => {
        user.setup()
        render(<Register />)
        server.use(
            rest.post(SERVER_URL + "/user/register", (req, res, ctx) => {
              return res(ctx.status(400), ctx.json({ success:false, message: 'Invalid credentials' }))
            }),
        )
        
        await user.type(screen.getByRole("textbox", {name: "Name"}), "testuser")
        await user.type(screen.getByRole("textbox", {name: "Email"}), "testuser@gmail.com")
        await user.type(screen.getByRole("textbox", {name: "Password"}), "testpassword")
        await user.click(screen.getByRole("button", {name: "Sign Up"}))

        const errorMessage = await screen.findByTestId("error-message")

        expect(errorMessage).toBeInTheDocument()

    })

    test("displays no error message when register pass", async () => {
        user.setup()
        render(<Register />)

        await user.type(screen.getByRole("textbox", {name: "Name"}), "testuser")
        await user.type(screen.getByRole("textbox", {name: "Email"}), "testuser@gmail.com")
        await user.type(screen.getByRole("textbox", {name: "Password"}), "testpassword")
        await user.click(screen.getByRole("button", {name: "Sign Up"}))

        const errorMessage = await screen.queryByTestId("error-message")

        expect(errorMessage).not.toBeInTheDocument()

    })

})