import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import InputComponent from "./InputComponent";
import { vi } from "vitest";

describe("Input Component", () => {

    test("input component renders correctly", () => {
        render(<InputComponent value="" onChange={()=>{}} />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();
    });

    
    test("input component has correct value ", () => {
        render(<InputComponent value="hello" onChange={()=>{}} />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveValue("hello");
    });


    test("input component has correct placeholder ", () => {
        render(<InputComponent value="" onChange={()=>{}} placeholder="placeholder" />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveAttribute("placeholder", "placeholder");
    });


    test("input component calls onChange Correctly", async () => {
 

        const mockFunction = vi.fn();

        render(<InputComponent value="" onChange={mockFunction} />);
        const inputElement = screen.getByRole("textbox");
        await user.type(inputElement, "hello");
        expect(mockFunction).toBeCalledTimes(5);

    });

    

});


