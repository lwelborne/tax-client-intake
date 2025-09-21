// Import testing utilities from React Testing Library
import { render, screen } from "@testing-library/react";

// Import the component you want to test
import App from "./App";

// Define a test case
test("renders learn react link", () => {
  // Render the <App /> component into a virtual DOM
  render(<App />);

  // Find an element containing the text "learn react" (case-insensitive /i flag)
  const linkElement = screen.getByText(/learn react/i);

  // Assert (expect) that this element is present in the document
  expect(linkElement).toBeInTheDocument();
});
