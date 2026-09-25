import { writeFile } from "node:fs/promises"
import { expect, test, type Page, type TestInfo } from "@playwright/test"

async function captureNavigationReference(
  page: Page,
  testInfo: TestInfo,
  name: string,
) {
  const header = page.locator("header").first()
  const navigation = page.locator("nav:visible").last()
  const reference = await page.evaluate(() => ({
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
    },
    stylesheets: Array.from(document.styleSheets).map((stylesheet) => stylesheet.href),
    scripts: Array.from(document.scripts).map((script) => script.src || "inline"),
  }))
  const elements = await Promise.all(
    [header, navigation].map(async (locator) => ({
      html: await locator.evaluate((element) => element.outerHTML),
      box: await locator.boundingBox(),
      style: await locator.evaluate((element) => {
        const computed = window.getComputedStyle(element)
        return {
          backgroundColor: computed.backgroundColor,
          borderBottomColor: computed.borderBottomColor,
          color: computed.color,
          display: computed.display,
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          gap: computed.gap,
          lineHeight: computed.lineHeight,
          padding: computed.padding,
          position: computed.position,
          zIndex: computed.zIndex,
        }
      }),
    })),
  )

  await page.screenshot({
    path: testInfo.outputPath(`${name}.png`),
    animations: "disabled",
    fullPage: false,
  })
  await writeFile(
    testInfo.outputPath(`${name}.json`),
    JSON.stringify({ ...reference, elements }, null, 2),
  )
}

test("mobile navigation opens without shifting page content", async ({ page }) => {
  await page.goto("/")

  const main = page.locator("main")
  const mainBefore = await main.boundingBox()

  await page.getByRole("button", { name: "Open navigation" }).click()

  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" })
  await expect(mobileNav).toBeVisible()
  await expect(
    page.getByRole("button", { name: "Close navigation" })
  ).toBeVisible()
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden")
  await expect(page.getByRole("menuitem").first()).toBeFocused()

  await page.screenshot({
    path: "test-results/mobile-nav-screenshot.png",
    animations: "disabled",
  })

  const mainAfter = await main.boundingBox()
  expect(mainAfter?.y).toBe(mainBefore?.y)

  await page.keyboard.press("Escape")
  await expect(
    page.getByRole("button", { name: "Open navigation" })
  ).toBeVisible()
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden")
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused()
})

test("closes mobile navigation after route navigation", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open navigation" }).click()

  await page.getByRole("menuitem", { name: "About" }).click()

  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden()
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible()
})

test("resets mobile navigation when switching to desktop", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open navigation" }).click()

  await page.setViewportSize({ width: 1024, height: 768 })

  await expect(page.getByRole("button", { name: "Open navigation" })).toBeHidden()
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden()
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden")
})

test("captures Vercel and local mobile navigation references", async ({ page }, testInfo) => {
  await page.goto("https://vercel.com", { waitUntil: "domcontentloaded" })
  const vercelMenu = page.locator('button[aria-label="Open menu"]')
  await expect(vercelMenu).toBeVisible({ timeout: 20000 })
  await vercelMenu.click()
  await captureNavigationReference(page, testInfo, "vercel-mobile-nav-reference")

  await page.goto("http://localhost:5173")
  const localMenuButton = page.getByRole("button", { name: /open navigation/i })
  await expect(localMenuButton).toBeVisible({ timeout: 20000 })
  await localMenuButton.click()
  const localMobileNav = page.getByRole("navigation", { name: "Mobile navigation" })
  await expect(localMobileNav).toBeVisible()
  await captureNavigationReference(page, testInfo, "local-mobile-nav-reference")
})