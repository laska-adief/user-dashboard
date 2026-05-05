import { render, screen } from "@testing-library/react";
import UserDetailsPage from "./page";
import { getUserDetail } from "@/action/getUserDetail";
import "@testing-library/jest-dom";
import { Todo } from "@/types/todo";
import { Post } from "@/types/post";

jest.mock("@/action/getUserDetail");
const mockedGetUserDetail = getUserDetail as jest.MockedFunction<typeof getUserDetail>;

jest.mock("./components/PostCard", () => ({
  __esModule: true,
  default: ({ post }: { post: Post }) => <div data-testid="post-card">{post.title}</div>,
}));

jest.mock("./components/AllPostsCard", () => ({
  __esModule: true,
  default: () => <div data-testid="all-posts-card">All Posts</div>,
}));

jest.mock("./components/TodosCard", () => ({
  __esModule: true,
  default: ({ todos }: { todos: Todo[] }) => <div data-testid="todos-card">{todos.length} Todos</div>,
}));

jest.mock("@/components/ui/back-button", () => ({
  __esModule: true,
  default: ({ backText }: { backText: string }) => <button>{backText}</button>,
}));

const mockUser = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
  posts: [
    { id: 1, title: "Post 1", body: "Body 1" },
    { id: 2, title: "Post 2", body: "Body 2" },
  ],
  todos: [
    { id: 1, title: "Todo 1", completed: false },
  ],
};

describe("UserDetailsPage", () => {
  it("render user detail data", async () => {
    mockedGetUserDetail.mockResolvedValue(mockUser);

    const Page = await UserDetailsPage({
      params: Promise.resolve({ id: "1" })
    });
    render(Page);

    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getByText("@Bret")).toBeInTheDocument();
    expect(screen.getByText("Sincere@april.biz")).toBeInTheDocument();
    expect(screen.getByText("Romaguera-Crona")).toBeInTheDocument();

    expect(screen.getByText("POSTS")).toBeInTheDocument();
    expect(screen.getByText("TODOS")).toBeInTheDocument();

    expect(screen.getAllByTestId("post-card")).toHaveLength(2);
    expect(screen.getByTestId("todos-card")).toBeInTheDocument();
  });

  it("throw an error when API fails", async () => {
    mockedGetUserDetail.mockRejectedValue(new Error("Failed to fetch user"));

    await expect(UserDetailsPage({
      params: Promise.resolve({ id: "999" })
    }))
      .rejects.toThrow("Failed to fetch user");
  });
});
