import { expect, test } from "@playwright/test"

test("mobile navigation opens without shifting page content", async ({ page }) => {
  await page.goto("/")

  const main = page.locator("main")
  const mainBefore = await main.boundingBox()

  await page.getByRole("button", { name: "Open navigation" }).click()

  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" })
  ).toBeVisible()
  await expect(
    page.getByRole("button", { name: "Close navigation" })
  ).toBeVisible()

  const mainAfter = await main.boundingBox()
  expect(mainAfter?.y).toBe(mainBefore?.y)

  await page.keyboard.press("Escape")
  await expect(
    page.getByRole("button", { name: "Open navigation" })
  ).toBeVisible()
})