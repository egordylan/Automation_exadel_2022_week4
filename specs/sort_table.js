const {login} = require('./helper.js');

describe('Sort table', async function () {

    before('prepering data', async function() {
       await login('https://viktor-silakov.github.io/course-sut/index.html?quick');
    });

    context('Checking the correctness of sorting', async function () {
        it('ascending sort of id', async function() {
            const elem = await $('//div[@class="tabulator-col tabulator-sortable" and @tabulator-field="id"]');
            await elem.click();
            await expect(elem).toHaveAttr('aria-sort', 'asc');

            const id = await $('//*[@class="tabulator-table"]')
                            .$$('.//div[contains(@tabulator-field, "id")]');

            const idPromises = id.map(async (id) => {
                return await id.getText();
            });

            const idNums = await Promise.all(idPromises);
            const idRecieved = idNums.map(Number);
            let idSorted = JSON.parse(JSON.stringify(idRecieved)).map(Number).sort((a, b) => a - b); 

            await expect(idRecieved).toEqual(idSorted);

        });

        it('ascending sort of name', async function() {
            const elem = await $('//div[@class="tabulator-col tabulator-sortable" and @tabulator-field="name"]');
            await elem.click();
            await expect(elem).toHaveAttr('aria-sort', 'asc');

            const name = await $('//*[@class="tabulator-table"]')
                                .$$('.//div[contains(@tabulator-field, "name")]');
            const namePromises = name.map(async (name) => {
                return await name.getText();
            });

            const nameRecieved = await Promise.all(namePromises);
            let nameSorted = JSON.parse(JSON.stringify(nameRecieved)).sort(); 
            await expect(nameRecieved).toEqual(nameSorted);
        });

        it('ascending sort of age', async function() {
            const elem = await $('//div[@class="tabulator-col tabulator-sortable" and @tabulator-field="age"]');
            await elem.click();
            await expect(elem).toHaveAttr('aria-sort', 'asc');

            const age = await $('//*[@class="tabulator-table"]')
                            .$$('.//div[contains(@tabulator-field, "age")]');
            const agePromises = age.map(async (age) => {
                return await age.getText();
            });

            const ageNums = await Promise.all(agePromises);
            const ageRecieved = ageNums.map(Number);
            let ageSorted = JSON.parse(JSON.stringify(ageRecieved)).map(Number).sort((a, b) => a - b); 
            await expect(ageRecieved).toEqual(ageSorted);
        });

        it('descending sort of id', async function() {
            const elem = await $('//div[@class="tabulator-col tabulator-sortable" and @tabulator-field="id"]');

            await elem.waitUntil(
                async function ()  {
                    await elem.click();
                    return (await this.getAttribute('aria-sort')) === 'desc'; 
            },
            {
                timeout: 5000,
                timeoutMsg: `expected attribute is different`,
            }
            );
            // await elem.click();
            // await elem.click();
            // await expect(elem).toHaveAttr('aria-sort', 'desc');

            const id = await $('//*[@class="tabulator-table"]')
                            .$$('.//div[contains(@tabulator-field, "id")]');
            const idPromises = id.map(async (id) => {
                return await id.getText();
            });
            const idNums = await Promise.all(idPromises);
            const idRecieved = idNums.map(Number);
            let idSorted = JSON.parse(JSON.stringify(idRecieved)).map(Number).sort((a, b) => b - a); 
            
            await expect(idRecieved).toEqual(idSorted);
        });

        it('descending sort of name', async function() {
            const elem = await $('//div[@class="tabulator-col tabulator-sortable" and @tabulator-field="name"]');

            await elem.waitUntil(
                async function ()  {
                    await elem.click();
                    return (await this.getAttribute('aria-sort')) === 'desc'; 
            },
            {
                timeout: 5000,
                timeoutMsg: `expected attribute is different`,
            }
            );
            // await elem.click();
            // await elem.click();
            // await expect(elem).toHaveAttr('aria-sort', 'desc');

            const name = await $('//*[@class="tabulator-table"]')
                                .$$('.//div[contains(@tabulator-field, "name")]');
            const namePromises = name.map(async (name) => {
                return await name.getText();
            });
            const nameRecieved = await Promise.all(namePromises);
            let nameSorted = JSON.parse(JSON.stringify(nameRecieved)).sort().reverse(); 
            await expect(nameRecieved).toEqual(nameSorted);
        });

        it('descending sort of age', async function() {
            const elem = await $('//div[@class="tabulator-col tabulator-sortable" and @tabulator-field="age"]');

            await elem.waitUntil(
                    async function ()  {
                        await elem.click();
                        return (await this.getAttribute('aria-sort')) === 'desc'; 
                },
                {
                    timeout: 5000,
                    timeoutMsg: `expected attribute is different`,
                }
            );
          
            // const elem = await $('//div[@class="tabulator-col tabulator-sortable" and @tabulator-field="age"]');
            // await elem.click();
            // await elem.click();
            // await expect(elem).toHaveAttr('aria-sort', 'desc');

            const age = await $('//*[@class="tabulator-table"]')
                            .$$('.//div[contains(@tabulator-field, "age")]');
            const agePromises = age.map(async (age) => {
                return await age.getText();
            });

            const ageNums = await Promise.all(agePromises);
            const ageRecieved = ageNums.map(Number);
            let ageSorted = JSON.parse(JSON.stringify(ageRecieved)).map(Number).sort((a, b) => b - a); 

            await expect(ageRecieved).toEqual(ageSorted);
            
        });
    });
});

// npx wdio wdio.conf.js --spec specs/sort_table.js