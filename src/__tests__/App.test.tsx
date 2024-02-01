import React from "react"
import { render } from "@testing-library/react"
import App from "../App"

test("renders software engineer header", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Software Engineer/i)
  expect(linkElement).toBeInTheDocument()
})
