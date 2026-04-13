import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("loads and shows featured recipe + category sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByText("Recipe Book").first()).toBeVisible();
    await expect(page.getByText("Featured Recipe")).toBeVisible();
    await expect(page.getByText("Browse by Category")).toBeVisible();
    await expect(page.getByText("Italian Favorites")).toBeVisible();
    await expect(page.getByText("Chicken Recipes")).toBeVisible();
  });

  test("search from header navigates to results", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator("header input[placeholder*='Search']");
    await searchInput.fill("chicken");
    await searchInput.press("Enter");

    await expect(page).toHaveURL(/\/meals\?q=chicken/);
    await expect(page.locator("text=result")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Search Page", () => {
  test("shows results for a query", async ({ page }) => {
    await page.goto("/meals?q=pasta");

    await expect(page.getByText(/result/)).toBeVisible({ timeout: 10000 });
    const cards = page.locator('a[href^="/meals/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });

  test("shows empty state with no query", async ({ page }) => {
    await page.goto("/meals");
    await expect(page.getByText("Search above to find recipes")).toBeVisible();
  });
});

test.describe("Meal Detail Page", () => {
  test("displays meal info with ingredients and instructions", async ({ page }) => {
    await page.goto("/meals?q=arrabiata");
    const firstCard = page.locator('a[href^="/meals/"]').first();
    await firstCard.click();

    // Wait for detail page article
    await expect(page.locator("article").first()).toBeVisible({ timeout: 10000 });

    await expect(page.getByRole("heading", { name: "Ingredients" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Instructions" })).toBeVisible();
  });
});

test.describe("Categories", () => {
  test("lists all categories", async ({ page }) => {
    await page.goto("/categories");

    await expect(page.getByRole("heading", { name: "Categories" })).toBeVisible();
    const categoryLinks = page.locator('a[href^="/categories/"]');
    expect(await categoryLinks.count()).toBeGreaterThan(5);
  });

  test("clicking a category shows meals", async ({ page }) => {
    await page.goto("/categories");

    await page.locator('a[href="/categories/Seafood"]').first().click();
    await expect(page).toHaveURL(/\/categories\/Seafood/);

    const cards = page.locator('a[href^="/meals/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("My Recipes (unauthenticated)", () => {
  test("redirects to sign-in when not logged in", async ({ page }) => {
    await page.goto("/my-recipes");
    await expect(page).toHaveURL(/\/sign-in/, { timeout: 10000 });
  });
});

test.describe("API - Recipes (unauthenticated)", () => {
  test("GET /api/recipes returns 401 without auth", async ({ request }) => {
    const res = await request.get("/api/recipes");
    expect(res.status()).toBe(401);
  });

  test("POST /api/recipes returns 401 without auth", async ({ request }) => {
    const res = await request.post("/api/recipes", {
      data: { name: "Test Recipe" },
    });
    expect(res.status()).toBe(401);
  });
});

test.describe("Browsing Flow", () => {
  test("home -> category -> meal detail", async ({ page }) => {
    await page.goto("/");

    // Click a category from home page
    const categoryLink = page.locator('a[href^="/categories/"]').first();
    await categoryLink.click();

    // Should show meals
    const cards = page.locator('a[href^="/meals/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });

    // Click a meal
    await cards.first().click();

    // Should show ingredients and instructions
    await expect(page.getByRole("heading", { name: "Ingredients" })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("heading", { name: "Instructions" })).toBeVisible();
  });
});

test.describe("Meal Plan (unauthenticated)", () => {
  test("redirects to sign-in when not logged in", async ({ page }) => {
    await page.goto("/meal-plan");
    await expect(page).toHaveURL(/\/sign-in/, { timeout: 10000 });
  });
});

test.describe("Community Page", () => {
  test("loads community page with sections", async ({ page }) => {
    await page.goto("/community");

    await expect(page.getByRole("heading", { name: "Community" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recently Favorited" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Shared Recipes" })).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("all nav links work", async ({ page }) => {
    await page.goto("/");

    await page.locator('header a[href="/meals"]').click();
    await expect(page).toHaveURL("/meals");

    await page.locator('header a[href="/categories"]').click();
    await expect(page).toHaveURL("/categories");

    await page.locator('header a[href="/community"]').click();
    await expect(page).toHaveURL("/community");

    await page.locator('header a[href="/"]').click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("404 Page", () => {
  test("shows not found for invalid routes", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await expect(page.getByText("404")).toBeVisible();
  });
});
