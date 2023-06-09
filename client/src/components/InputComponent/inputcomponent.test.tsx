import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import InputComponent from "./InputComponent";

describe("Input Component", () => {

    test("input component renders correctly", () => {

        render(<InputComponent />);

        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();

    });

    test.only("input component has correct value on text change", async () => {

        render(<InputComponent />);

        const inputElement = screen.getByRole("textbox");
        await user.type(inputElement, "Hello World");
        expect(inputElement).toHaveValue("Hello World");

    });

});


