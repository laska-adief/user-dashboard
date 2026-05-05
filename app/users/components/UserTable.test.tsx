import { getUsersData } from "@/action/getUsers";
import { fireEvent, render, screen } from '@testing-library/react'
import UserTable from "./UserTable";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

jest.mock("@/action/getUsers")

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; }
  };
})();

Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

const mockedApi = getUsersData as jest.MockedFunction<typeof getUsersData>;

const mockedUsers = [{
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: [Object]
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets'
  },
  postCounts: 10,
  completedTodoCounts: 11,
  pendingTodoCounts: 9
},
{
  id: 2,
  name: 'Ervin Howell',
  username: 'Antonette',
  email: 'Shanna@melissa.tv',
  address: {
    street: 'Victor Plains',
    suite: 'Suite 879',
    city: 'Wisokyburgh',
    zipcode: '90566-7771',
    geo: [Object]
  },
  phone: '010-692-6593 x09125',
  website: 'anastasia.net',
  company: {
    name: 'Deckow-Crist',
    catchPhrase: 'Proactive didactic contingency',
    bs: 'synergize scalable supply-chains'
  },
  postCounts: 10,
  completedTodoCounts: 8,
  pendingTodoCounts: 12
}]

// Create a helper function to wrap with the provider
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Turn off retries for faster tests
    },
  },
});

const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <TooltipProvider>
        {ui}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

describe("UserTable Component", () => {
  test("Show loading state", () => {
    mockedApi.mockReturnValue(new Promise(() => { }))
    renderWithClient(<UserTable />)
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
  });

  test("Show error", async () => {
    mockedApi.mockRejectedValue(new Error("Failed to fetch users"))
    renderWithClient(<UserTable />)
    expect(await screen.findByText("Failed to load users. Please try again later.")).toBeInTheDocument()
  });

  test("Show empty data", async () => {
    mockedApi.mockResolvedValue({ data: null })
    renderWithClient(<UserTable />)
    expect(await screen.findByText("No users found")).toBeInTheDocument()
  });

  test("Show data users", async () => {
    mockedApi.mockReturnValue(new Promise((resolve) => resolve({ data: mockedUsers })))
    renderWithClient(<UserTable />)
    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument()
  });

  test("show filtered data users", async () => {
    mockedApi.mockReturnValue(new Promise((resolve) => resolve({ data: mockedUsers })))
    renderWithClient(<UserTable />);
    const input = await screen.findByPlaceholderText("Search user...")
    fireEvent.change(input, { target: { value: "Leanne" } })
    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument()
    expect(await screen.queryByText("Ervin Howell")).not.toBeInTheDocument()
  })
})