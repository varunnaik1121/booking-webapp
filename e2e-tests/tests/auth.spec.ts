import { test, expect } from '@playwright/test';

const UI_URL="http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);
  //get the sign in button
  await page.getByRole("link",{name:"Sign-in"}).click();
  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();
  await page.locator("[name=email]").fill("varunnaik1121@gmail.com");
  await page.locator("[name=password]").fill("21477930varun");
  await page.getByRole("button",{name:"Login"}).click();
  await expect(page.getByText("Sign in successful")).toBeVisible();
  await expect(page.getByRole("link",{name:'My Bookings'})).toBeVisible();
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
  await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible()
});

test("should allow user to refister",async({page})=>{
  await page.goto(UI_URL);
  await page.getByRole("link",{name:"Sign-in"}).click();
  await page.getByRole("link",{name:"Create an account here"}).click();
  await expect(page.getByRole("heading",{name:"Create an Account"})).toBeVisible()
  await page.locator("[name=firstName]").fill("test_fname")
  await page.locator("[name=lastName]").fill("test_lname");
  await page.locator("[name=email]").fill("test_register@gmail.com");
  await page.locator("[name=password]").fill("test_password");
  await page.locator("[name=confirmPassword]").fill("test_password");
  await page.getByRole("button",{name:"Create Account"}).click();
  await expect(page.getByText("Registration Success!")).toBeVisible();

})

