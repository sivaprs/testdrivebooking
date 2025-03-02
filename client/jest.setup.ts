// Mock react-router-dom (if needed)
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));
  
  // Extend Jest with extra matchers (for better assertions)
  import "@testing-library/jest-dom";
  
  // Export empty object to satisfy --isolatedModules
  export {};
  