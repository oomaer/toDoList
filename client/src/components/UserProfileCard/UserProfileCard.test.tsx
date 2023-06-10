import UserProfileCard from "./UserProfileCard"
import { render, screen } from "../../utils/test-utils"

describe('UserProfileCard', () => {


    test("should render Username if user is not null", async () => {
        render(<UserProfileCard user={{_id: "123", name: "Test User", email: "testuser@gmail.com"}} />)
        const username = await screen.findByTestId("username", {}, {timeout: 1000});
        expect(username).toHaveTextContent("Test User")
    })

    test("should render Guest User if user is null", async () => {
        render(<UserProfileCard user={null} />)
        const username = await screen.findByTestId("username", {}, {timeout: 1000});
        expect(username).toHaveTextContent("Guest User")

    })

})