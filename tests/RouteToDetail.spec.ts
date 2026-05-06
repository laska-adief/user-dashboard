import { test, expect } from "@playwright/test";

test("Route to detail user from user list", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Users" }).click();
  await page
    .getByRole("row", { name: "Leanne Graham Bret Sincere@" })
    .getByRole("button")
    .click();
  await page.getByText("Leanne Graham").click();
  await expect(page.getByText("Leanne Graham")).toBeVisible();
});
