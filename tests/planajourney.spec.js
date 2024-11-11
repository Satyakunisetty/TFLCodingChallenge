const { test, expect } = require('@playwright/test');

test('Plan a Journey using Auto Suggest dropdown', async ({ page }) => {
  
    //Navigate to URl and select cookies
    await page.goto('https://tfl.gov.uk/plan-a-journey');
    await page.getByRole('button', { name: 'Accept only essential cookies' }).click();
    
    await page.waitForTimeout(3000);
    await page.reload();
    await expect(page).toHaveTitle('Plan a journey - Transport for London');

    //Select From station
    await page.locator('#InputFrom').fill('Leicester');
    await page.waitForSelector("//*[@id='InputFrom-dropdown']/div[2]/span[2]/div[1]");
    const fromStation = await page.$$("//*[@id='InputFrom-dropdown']/div[2]/span[2]/div[1]");
    for (let option of fromStation)
    {
        const value = await option.textContent();
        
        if(value.includes("Leicester Square Underground Station"))
        {
        
            await option.click();
            break;
        }
    }
    
    //Select To Station
    await page.locator('#InputTo').fill('Covent Garden');
    await page.waitForSelector("//*[@id='InputTo-dropdown']/div[2]/span[2]/div[1]");
    const toStation = await page.$$("//*[@id='InputTo-dropdown']/div[2]/span[2]/div[1]");
    for (let option1 of toStation)
    {
        const value1 = await option1.textContent();
        console.log(value1);
       if(value1.includes("Covent Garden"))
        {
            console.log(value1);
          
           await option1.click();
            break;
        }
    }


    // Click button
    await page.locator('//*[@id="plan-journey-button"]').click();
    await page.waitForTimeout(3000);

    //Valiate results
    await page.isVisible("text='Leicester Square Underground Station'");

});


test('Select Edit preferences and update Journey', async({page}) => {

    await page.goto('https://tfl.gov.uk/plan-a-journey/?cid=plan-a-journey');
    await page.getByRole('button', { name: 'Accept only essential cookies' }).click();
    await page.waitForTimeout(3000);
    await page.reload();
    await page.getByPlaceholder('From').click();
    await page.getByPlaceholder('Place or address').fill('Leicester');
    await page.getByRole('option', { name: 'Leicester Square Underground' }).click();
    await page.getByPlaceholder('To', { exact: true }).click();
    await page.getByPlaceholder('Place or address').fill('Covent');
    await page.getByRole('option', { name: 'Covent Garden Underground' }).click();
    await page.getByRole('button', { name: 'Plan my journey' }).click();
    await page.getByText('Leicester Square Underground').click();
    await page.getByRole('button', { name: 'Edit preferences' }).click();
    await page.getByRole('button', { name: 'deselect all' }).click();
    await page.getByText('Routes with least walking').click();
    await page.getByRole('button', { name: 'Update journey' }).click();
    await page.isVisible("text=Transfer to Leicester Square");
});


test('Validate View details from the Journey', async({page}) => {

    await page.goto('https://tfl.gov.uk/plan-a-journey/?cid=plan-a-journey');
    await page.getByRole('button', { name: 'Accept only essential cookies' }).click();
    await page.waitForTimeout(3000);
    await page.reload();
    await page.getByPlaceholder('From').click();
    await page.getByPlaceholder('Place or address').fill('Leicester');
    await page.getByRole('option', { name: 'Leicester Square Underground' }).click();
    await page.getByPlaceholder('To', { exact: true }).click();
    await page.getByPlaceholder('Place or address').fill('Covent');
    await page.getByRole('option', { name: 'Covent Garden Underground' }).click();
    await page.getByRole('button', { name: 'Plan my journey' }).click();
    await page.getByText('Leicester Square Underground').click();
    await page.getByRole('button', { name: 'Edit preferences' }).click();
    await page.getByRole('button', { name: 'deselect all' }).click();
    await page.getByText('Routes with least walking').click();
    await page.getByRole('button', { name: 'Update journey' }).click();
    await page.isVisible("text=Transfer to Leicester Square");
    await page.locator("//*[@id='option-1-content']/div[1]/div[5]/div[2]/button[1]").click();

    await page.locator("//*[@id='option-1-content']/div[1]/div[3]/div/div[4]/div/div/div/a[1]").isVisible();
    await page.locator("//*[@id='option-1-content']/div[1]/div[3]/div/div[4]/div/div/div/a[2]").isVisible();
    await page.locator("//*[@id='option-1-content']/div[1]/div[3]/div/div[4]/div/div/div/a[3]").isVisible();
    
    
});

test('Widget does not provide results when an invalid journey is planned', async({page}) => {

    await page.goto('https://tfl.gov.uk/plan-a-journey');
    await page.getByRole('button', { name: 'Accept only essential cookies' }).click();
    
    await page.waitForTimeout(3000);
    await page.reload();
    await expect(page).toHaveTitle('Plan a journey - Transport for London');
   
    await page.locator('#InputFrom').fill('Veera');

    await page.getByPlaceholder('To', { exact: true }).click();
    await page.getByPlaceholder('Place or address').fill('Kunisetty');
    
    await page.getByRole('button', { name: 'Plan my journey' }).click();
    await page.isVisible("text='Veera'");


});

test('Widget is unable to plan a journey if no locations are enetered', async({page}) => {

    await page.goto('https://tfl.gov.uk/plan-a-journey');
    await page.getByRole('button', { name: 'Accept only essential cookies' }).click();
    
    await page.waitForTimeout(3000);
    await page.reload();
    await expect(page).toHaveTitle('Plan a journey - Transport for London');
    await page.locator('//*[@id="plan-journey-button"]').click();

    const errMessage = page.locator("//*[@id='InputFrom-error']");
    await expect(errMessage).toHaveText('The From field is required.');


});