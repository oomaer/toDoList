import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { vi } from "vitest";
import SelectComponent from "./SelectComponent";

describe("Select Component", () => {

    const items = [
        {value: "today", label: "to do today"},
        {value: "week", label: "to do this week"},
        {value: "month", label: "to do this month"},
    ]

    test("select component renders correctly", () => {
        render(<SelectComponent value={items[0]} setValue={()=>{}} items={items} />);
        
        const buttons = screen.getAllByRole("button", {name: /to do today/i});
        expect(buttons).toHaveLength(1);

    });


    test("options display on select click", async () => {
        user.setup()
        render(<SelectComponent value={items[0]} setValue={()=>{}} items={items} />);
        const button = screen.getByRole("button", {name: /to do today/i});
        await user.click(button);
        
        const options = await screen.findAllByRole("listitem", {}, {timeout: 1000});

        expect(options).toHaveLength(3);

    });


    test("option click works correctly", async () => {
        user.setup()
        const mockFunction = vi.fn();
        render(<SelectComponent value={items[0]} setValue={mockFunction} items={items} />);
        const button = screen.getByRole("button", {name: /to do today/i});
        await user.click(button);
        
        const options = await screen.queryAllByRole("button");

        await user.click(options[2]);

        expect(mockFunction).toHaveBeenCalled();
       
    });
    

    

});


