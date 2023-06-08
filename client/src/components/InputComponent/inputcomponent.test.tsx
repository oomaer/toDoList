import { render, screen } from "@testing-library/react";
import InputComponent from "./InputComponent";

describe("InputComponent", () => {

    test("input component renders correctly", () => {

        render(<InputComponent />);

        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();

    });

});