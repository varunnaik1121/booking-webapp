import {test,expect} from "@playwright/test"
import path from "path";
const UI_URL="http://localhost:5173"
test.beforeEach(async ({page})=>{
    await page.goto(UI_URL);
  //get the sign in button
  await page.getByRole("link",{name:"Sign-in"}).click();
  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();
  await page.locator("[name=email]").fill("varunnaik1121@gmail.com");
  await page.locator("[name=password]").fill("21477930varun");
  await page.getByRole("button",{name:"Login"}).click();
  await expect(page.getByText("Sign in successful")).toBeVisible();

})

test("should allow user to add a hotel",async({page})=>{
    await page.goto(`${UI_URL}/add-hotel`)
    await page.locator('[name="name"]').fill("test hotel");
    await page.locator('[name="city"]').fill("test city");
    await page.locator('[name="country"]').fill("test country");
    await page.locator('[name="description"]').fill("test description this is the test desc to just checking the demo.");
    await page.locator('[name="pricePerNight"]').fill(Math.floor(Math.random()*100).toString());
    await page.selectOption('select[name="starRating"]',"4");
    await page.getByText("Budget").click();
    await page.getByLabel("Free WiFi").check()
    await page.getByLabel("Parking").check()
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("1");
    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname,"files","1.png"),
        path.join(__dirname,"files","2.jpg"),
    ])

    await page.getByRole('button',{name:"Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();

})

test("should display hotels",async({page})=>{
    await page.goto(`${UI_URL}/my-hotels`)
    await expect(page.getByText("Dublin Getaways")).toBeVisible();
    await expect(page.getByText("Lorem ipsum dolor sit amet, consectetur")).toBeVisible();
    await expect(page.getByText("Dublin,Ireland")).toBeVisible();
    await expect(page.getByText("All Inclusive")).toBeVisible();
    await expect(page.getByText("$119 per night")).toBeVisible();
    await expect(page.getByText("2 adults,3 children")).toBeVisible();
    await expect(page.getByText("2 Star Rating")).toBeVisible();
    await expect(page.getByRole("link",{name:"View Details"})).toBeVisible()





})