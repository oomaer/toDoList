

import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { vi } from "vitest";
import InputWithLabel from "./InputWithLabel";

describe("Input Component with Label", () => {

    test("renders correctly", () => {
        render(<InputWithLabel value="" onChange={()=>{}} label="test-label" id="test-input-1" />);
        const inputElement = screen.getByRole("textbox", {
            name: "test-label"
        });
        expect(inputElement).toBeInTheDocument();
    });


    test("has correct placeholder ", () => {
        render(<InputWithLabel value="" onChange={()=>{}} label="label" id="test-input-2" placeholder="placeholder value" />);
        const inputElement = screen.getByRole("textbox", {
            name: "label"
        });
        expect(inputElement).toHaveAttribute("placeholder", "placeholder value");
    });


    test("calls onChange Correctly", async () => {
        
        const mockFunction = vi.fn();

        render(<InputWithLabel value="" onChange={mockFunction} label="label" id="test-input-3" />);
        const inputElement = screen.getByRole("textbox", {
            name: "label"
        });
        await user.type(inputElement, "world");
        expect(mockFunction).toBeCalledTimes(5);

    });

    

});


