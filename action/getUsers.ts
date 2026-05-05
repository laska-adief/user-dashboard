"use server";

import { Post } from "@/types/post";
import { Todo } from "@/types/todo";
import { User } from "@/types/user";

export const getUsers = async () => {
  const url = `${process.env.API_URL}/users`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

export const getUsersData = async () => {
  const fetchUsers = fetch(`${process.env.API_URL}/users`);
  const fetchPosts = fetch(`${process.env.API_URL}/posts`);
  const fetchTodos = fetch(`${process.env.API_URL}/todos`);

  const [users, posts, todos] = await Promise.all([
    fetchUsers,
    fetchPosts,
    fetchTodos,
  ]);

  if (!users.ok || !posts.ok || !todos.ok) {
    throw new Error("Failed to fetch users or posts");
  }

  const postCounts = new Map();
  const completedTodoCounts = new Map();
  const pendingTodoCounts = new Map();

  const userData = await users.json();
  const postData = await posts.json();
  const todoData = await todos.json();

  postData.forEach((post: Post) => {
    postCounts.set(post.userId, (postCounts.get(post.userId) || 0) + 1);
  });

  todoData.forEach((todo: Todo) => {
    if (todo.completed) {
      completedTodoCounts.set(
        todo.userId,
        (completedTodoCounts.get(todo.userId) || 0) + 1,
      );
    } else {
      pendingTodoCounts.set(
        todo.userId,
        (pendingTodoCounts.get(todo.userId) || 0) + 1,
      );
    }
  });

  const resultData = userData.map((user: User) => ({
    ...user,
    postCounts: postCounts.get(user.id) || 0,
    completedTodoCounts: completedTodoCounts.get(user.id) || 0,
    pendingTodoCounts: pendingTodoCounts.get(user.id) || 0,
  }));

  return {
    data: resultData,
  };
};
