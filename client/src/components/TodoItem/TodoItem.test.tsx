import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { vi } from "vitest";

import TodoItem from "./TodoItem";
import { TodoType } from "../../types/todo.type";

describe("Todo Item Component", () => {

    const todoItem:TodoType = {_id: "2", description: "todo 1", createdAt: "2021-10-10", updatedAt: "2021-10-10", completed: false}

    test("component renders correctly", () => {
        render(<TodoItem item={todoItem} handleCheck={()=>{}} handleDelete={()=>{}} />);
        const item = screen.getByText(/todo 1/i);
        expect(item).toBeInTheDocument();
    });


    test("handle check is called", async () => {
        const mockFunction = vi.fn();
        render(<TodoItem item={todoItem} handleCheck={mockFunction} handleDelete={()=>{}} />);
        const button = screen.getByRole("button", {name: /check/i});
        await user.click(button);
        expect(mockFunction).toHaveBeenCalled();
    });

    test("handle delete is called", async () => {
        const mockFunction = vi.fn();
        render(<TodoItem item={todoItem} handleCheck={()=>{}} handleDelete={mockFunction} />);
        const button = screen.getByRole("button", {name: /menu/i});
        await user.click(button);
        const deleteButton = await screen.findByRole("button", {name: /delete/i}, {timeout: 1000});
        await user.click(deleteButton);
        expect(mockFunction).toHaveBeenCalled();
    });




});


