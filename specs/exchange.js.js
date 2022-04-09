const {login} = require('./helper.js');

describe('Currency exchange table', async function () {

    before('prepering data', async function() {
       await login('https://viktor-silakov.github.io/course-sut/index.html?quick');
    });

    context('Should input the correct sum and check the result of exchange', async function () {
        it('buy 1234 units of currency', async function() {
            const units = [];

            await $('#sum-to-buy').waitForDisplayed({reverse: false, timeout: 5000});

            async function waitForUnits(unit, timeout, selector) {
                units.push({ num: unit });
                await browser.waitUntil(
                    async () => {
                        const dataBase = await JSON.parse(await $(selector).getHTML(false));
                        console.log(dataBase);

                        try {
                            await expect(dataBase).toEqual(units);
                            return true;
                        } catch {
                            return false;
                        }
                    },
                    {
                        timeout: timeout,
                        timeoutMsg: `expected amount is different after ${timeout}`,
                    }
                );
            }
        
            await $('#sum-to-buy').addValue('1');
            await waitForUnits('1', 5000,'script#database');

            await $('#sum-to-buy').addValue('2');
            await waitForUnits('2', 5000,'script#database');

            await $('#sum-to-buy').addValue('3');
            await waitForUnits('3', 5000,'script#database');

            await $('#sum-to-buy').addValue('4');
            await waitForUnits('4', 5000,'script#database');

            await $('[onclick="withdraw()"]').click();


            const rate = await $('#currency-rate').getText();
            console.log(rate);

            const exchngResultString = await $('//*[@id="withdrew"]').getText();
            console.log(exchngResultString);

            const result = exchngResultString.replace('1234 => ', '');

            await expect(Number(result)).toEqual(rate * 1234);
        });
    });
});


// npx wdio wdio.conf.js --spec specs/eschange.js