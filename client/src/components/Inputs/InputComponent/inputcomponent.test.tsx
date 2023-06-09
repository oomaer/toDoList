import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import InputComponent from "./InputComponent";
import { vi } from "vitest";

describe("Input Component", () => {

    test("input component renders correctly", () => {
        render(<InputComponent value="" setValue={()=>{}} />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();
    });

    
    test("input component has correct value ", () => {
        render(<InputComponent value="hello" setValue={()=>{}} />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveValue("hello");
    });


    test("input component has correct placeholder ", () => {
        render(<InputComponent value="" setValue={()=>{}} placeholder="placeholder" />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveAttribute("placeholder", "placeholder");
    });


    test("input component calls onChange Correctly", async () => {
        
        const setValue = (value: string) => {
            return value;
        };

        const mockFunction = vi.fn(setValue);

        render(<InputComponent value="" setValue={mockFunction} />);
        const inputElement = screen.getByRole("textbox");
        await user.type(inputElement, "w");
        expect(mockFunction).toBeCalledWith("w");

    });

    

});


