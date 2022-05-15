import React from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import {
  render,
  screen,
  within,
  cleanup,
  fireEvent,
  logRoles,
} from "@testing-library/react";
import HelloWorld from "@/components/HelloWorld";

afterEach(() => {
  cleanup();
});

describe("HelloWorld", () => {
  it("Renders message from props", () => {
    const message = "Hello World"
    const component = render(<HelloWorld message={message} />)
    expect(component).toBeDefined()
    expect(component.getByText(message)).toBeDefined()
  })
})