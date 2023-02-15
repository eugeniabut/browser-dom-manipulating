const puppeteer = require("puppeteer");
const path = require('path');
let browser;
let page;
            
beforeAll(async () => {
   browser = await puppeteer.launch()
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'))
});

afterAll(async () => {
    await browser.close()
}, 30000);
describe('Book Details', () => {
    it('Book details are rendered to HTML', async () => {
        await page.waitForSelector('.book-list');
        const htmlContent = await page.$eval('.book-list', el => el.textContent);
        // expect the htmlContent to contain multiple books details
        expect(htmlContent.replace(/\s+/g, '').toLowerCase()).toContain('thedesignofeverydaythings');
        expect(htmlContent.replace(/\s+/g, '').toLowerCase()).toContain("eloquentjavascript");
        expect(htmlContent.replace(/\s+/g, '').toLowerCase()).toContain("christian");
        expect(htmlContent.replace(/\s+/g, '').toLowerCase()).toContain("marijn");
    })
    it('Book image is displayed above book details', async () => {
        const imgIndex = await page.evaluate(() => {
            const imgs = document.querySelectorAll('.book-list *'); // you don't need to specify the class .container in the ReadMe file because already exist in the index.html file
            return Array.from(imgs).findIndex(img => img.src && img.src.includes('cover'));
        });
        const detilesIndex = await page.evaluate(() => {
            const detiles = document.querySelectorAll('.book-list *');
            return Array.from(detiles).findIndex(detile => detile.textContent.includes('Haverbeke'));
        });
        expect(imgIndex + detilesIndex).toBeGreaterThanOrEqual(0)
        expect(imgIndex).toBeGreaterThan(detilesIndex);
        //expect(imgIndex).toBeLessThan(detilesIndex);
    })
});
describe('Status', () => {
    it('"Read" and "To read" status badges should be styled differently', async () => {
        await page.waitForSelector('.book-list') 
        
        const readStyle = await page.$$eval("main *", els => getComputedStyle(els.find(el => el.textContent.toLowerCase().includes("read"))))
        const toReadStyle = await page.$$eval("main *", els => getComputedStyle(els.find(el => el.textContent.toLowerCase().includes("to read"))))
        
        expect(readStyle).not.toBe(toReadStyle);
    })
});
describe('Order', () => {
    it('Author\'s name is displayed in the format "[last name], [first name]"', async () => {
        await page.waitForSelector('.book-list');
        const htmlContent = await page.$eval('.book-list', el => el.textContent);
        expect(htmlContent.replace(/\s+/g, '').toLowerCase()).toContain("christian,brian");
        expect(htmlContent.replace(/\s+/g, '').toLowerCase()).toContain("lupton,ellen");
    })
    it('Books are sorted alphabetically by auuthor\'s last name', async () => {
        await page.waitForSelector('.book-list');
        const firstBook = await page.evaluate(() => {
            const detiles = document.querySelectorAll('.book-list *');
            return Array.from(detiles).findIndex(detile => detile.textContent.includes('Christian'));
        });
        await page.waitForSelector('.book-list');
        const secoundBook = await page.evaluate(() => {
            const detiles = document.querySelectorAll('.book-list *');
            return Array.from(detiles).findIndex(detile => detile.textContent.includes('Haverbeke'));
        });
        await page.waitForSelector('.book-list');
        const thBook = await page.evaluate(() => {
            const detiles = document.querySelectorAll('.book-list *');
            return Array.from(detiles).findIndex(detile => detile.textContent.includes('Ellen' ));
        });
        expect(secoundBook).toBeLessThan(thBook);
        expect(firstBook).toBeLessThan(secoundBook);
        expect(firstBook).toBe(0);

    })

});