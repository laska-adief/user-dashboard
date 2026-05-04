"use server";

export const getUsers = async () => {
  const url = `${process.env.API_URL}/users`
  const res = await fetch(url, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
}