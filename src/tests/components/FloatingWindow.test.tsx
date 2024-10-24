import FloatingWindow from "@/components/FloatingWindow"
import { fireEvent, render, screen } from "@testing-library/react"

import "@testing-library/jest-dom"

describe("FloatingWindow", () => {
  const mockElement = document.createElement("div")
  mockElement.className = "text-2xl bg-blue-500"

  const mockProps = {
    element: mockElement,
    position: { x: 0, y: 0 },
    isFixed: false,
    onDeactivate: jest.fn(),
    onClassChange: jest.fn()
  }

  test("renders correctly with initial classes", () => {
    render(<FloatingWindow {...mockProps} />)
    expect(screen.getByText("text-2xl")).toBeInTheDocument()
    expect(screen.getByText("bg-blue-500")).toBeInTheDocument()
  })

  test("allows adding new classes", () => {
    render(<FloatingWindow {...mockProps} />)
    const input = screen.getByRole("combobox")
    fireEvent.change(input, { target: { value: "text-red-500" } })
    fireEvent.click(screen.getByText("text-red-500"))
    expect(mockProps.onClassChange).toHaveBeenCalled()
  })
})