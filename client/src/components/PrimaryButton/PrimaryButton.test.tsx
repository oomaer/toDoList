import { render, screen } from "../../utils/test-utils";
import user from "@testing-library/user-event";
import {vi} from 'vitest';
import PrimaryButton from "./PrimaryButton";

describe("Primary Button", () => {
    
    test("Primary Button renders correctly", () => {
        render(
            <PrimaryButton onClick={()=>{}}>
                <span>Click Me</span>
            </PrimaryButton>
        )

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    test("Primary Button renders children correctly", () => {
        render(
            <PrimaryButton onClick={()=>{}}>
                <span>Click Me</span>
            </PrimaryButton>
        )

        const button = screen.getByRole("button");
        expect(button).toHaveTextContent("Click Me");
    })

    test.only("Primary Button calls onClick when clicked", async () => {
        user.setup();
        const onClick = vi.fn();
        render(
            <PrimaryButton onClick={onClick}>
                <span>Click Me</span>
            </PrimaryButton>
        )

        const button = screen.getByRole("button");
        await user.click(button);
        expect(onClick).toHaveBeenCalled();
    })

})