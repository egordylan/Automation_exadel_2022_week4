const {login, ascClick, descClick} = require('./helper.js');
const selectorID = '//div[@class="tabulator-col tabulator-sortable" and @tabulator-field="id"]';
const selectorName = '//div[@class="tabulator-col tabulator-sortable" and @tabulator-field="name"]';
const selectorAge = '//div[@class="tabulator-col tabulator-sortable" and @tabulator-field="age"]';
const selectorTable = '//*[@class="tabulator-table"]';
const attribute = 'aria-sort';
const attrExpectedA = 'asc';
const attrExpectedD = 'desc';
const timeout = 5000;


describe('Sort table', async function () {

    before('prepering data', async function() {
       await login('https://viktor-silakov.github.io/course-sut/index.html?quick');
    });

    context('Checking the correctness of sorting', async function () {
        it('ascending sort of id', async function() {
            await ascClick(selectorID, attribute, attrExpectedA);

            const id = await $(selectorTable).$$('.//div[contains(@tabulator-field, "id")]');
            const idPromises = id.map(async (id) => {
                return await id.getText();
            });

            const idNums = await Promise.all(idPromises);
            const idRecieved = idNums.map(Number);
            const idSorted = idRecieved.slice().sort((a, b) => a - b);
            console.log('id sorted',idSorted );

            await expect(idRecieved).toEqual(idSorted);
        });

        it('ascending sort of name', async function() {
            await ascClick(selectorName, attribute, attrExpectedA);

            const name = await $(selectorTable).$$('.//div[contains(@tabulator-field, "name")]');
            const namePromises = name.map(async (name) => {
                return await name.getText();
            });

            const nameRecieved = await Promise.all(namePromises);
            const nameSorted  = nameRecieved.slice().sort();
            await expect(nameRecieved).toEqual(nameSorted);
        });

        it('ascending sort of age', async function() {
            await ascClick(selectorAge, attribute, attrExpectedA);

            const age = await $(selectorTable).$$('.//div[contains(@tabulator-field, "age")]');
            const agePromises = age.map(async (age) => {
                return await age.getText();
            });

            const ageNums = await Promise.all(agePromises);
            const ageRecieved = ageNums.map(Number);
            console.log('asc from promise',ageRecieved);

            const ageSorted = ageRecieved.slice().sort((a, b) => a - b); 
            console.log('asc by me',ageSorted)

            await expect(ageRecieved).toEqual(ageSorted);
        });

        it('descending sort of id', async function() {
            const elem = await $(selectorID);
            await descClick(attribute, attrExpectedD, timeout, elem);

            const id = await $(selectorTable).$$('.//div[contains(@tabulator-field, "id")]');
            const idPromises = id.map(async (id) => {
                return await id.getText();
            });
            const idNums = await Promise.all(idPromises);
            const idRecieved = idNums.map(Number);
            const idSorted = idRecieved.slice().sort((a, b) => b - a); 
            
            await expect(idRecieved).toEqual(idSorted);
        });

        it('descending sort of name', async function() {
            const elem = await $(selectorName);
            await descClick(attribute, attrExpectedD, timeout, elem);
        
            const name = await $(selectorTable).$$('.//div[contains(@tabulator-field, "name")]');
            const namePromises = name.map(async (name) => {
                return await name.getText();
            });
            const nameRecieved = await Promise.all(namePromises);
            const nameSorted = nameRecieved.slice().sort().reverse(); 
            await expect(nameRecieved).toEqual(nameSorted);
        });

        it('descending sort of age', async function() {
            const elem = await $(selectorAge);

            await descClick(attribute, attrExpectedD, timeout, elem);

            const age = await $(selectorTable).$$('.//div[contains(@tabulator-field, "age")]');
            const agePromises = age.map(async (age) => {
                return await age.getText();
            });

            const ageNums = await Promise.all(agePromises);
            const ageRecieved = ageNums.map(Number);
            console.log('desc from promise',ageRecieved)
            const ageSorted = ageRecieved.slice().sort((a, b) => b - a); 
            console.log('desc sorted by me', ageSorted)
            await expect(ageRecieved).toEqual(ageSorted);
            
        });
    });
});

// npx wdio wdio.conf.js --spec specs/sort_table.js
// npx wdio wdio.conf_for_local_tests.js --spec specs/sort_table.js