const {login, waitForUnits, inputData} = require('./helper.js');
const database = 'script#database';
const sumToBuy = '#sum-to-buy';
const timeout = 7000;
const number = 1234;

describe('Currency exchange table', async function () {

    before('prepering data', async function() {
       await login('https://viktor-silakov.github.io/course-sut/index.html?quick');
    });

    context('Should input the correct sum and check the result of exchange', async function () {
        it(`buy ${number} units of currency`, async function() {
            const units = [];
            await $(sumToBuy).waitForDisplayed({reverse: false, timeout: 5000});
            
            await inputData(number, sumToBuy, timeout, database, units);
            await $('[onclick="withdraw()"]').click();

            const rate = await $('#currency-rate').getText();
            console.log('Rate of exchange', rate);

            const exchngResultString = await $('//*[@id="withdrew"]').getText();
            console.log('String with changed currency', exchngResultString);

            const result = exchngResultString.replace(`${number} => `, '');
            await expect(Number(result)).toEqual(rate * number);
        });
    });
});


// npx wdio wdio.conf_for_local_tests.js --spec specs/exchange.js