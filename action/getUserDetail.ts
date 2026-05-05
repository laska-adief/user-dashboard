"use server";

export const getUserDetail = async (id: string) => {
  const fetchUser = fetch(`${process.env.API_URL}/users/${id}`);
  const fetchPosts = fetch(`${process.env.API_URL}/posts?userId=${id}`);
  const fetchTodos = fetch(`${process.env.API_URL}/todos?userId=${id}`);

  const [users, posts, todos] = await Promise.all([
    fetchUser,
    fetchPosts,
    fetchTodos,
  ]);

  if (!users.ok || !posts.ok || !todos.ok) {
    throw new Error("Failed to fetch users or posts");
  }

  const userData = await users.json();
  const postData = await posts.json();
  const todoData = await todos.json();

  return {
    ...userData,
    posts: postData,
    todos: todoData,
  };
};