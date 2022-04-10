async function login (link) {
    await browser.url(link);
    await $('#login').setValue('walker@jw.com');
    await $('#password').setValue('password');
    await $('button').click();
    await $('#spinner').waitForDisplayed({reverse: false, timeout: 10000});
    await $('#spinner').waitForDisplayed({reverse: true, timeout: 10000});
}   



async function waitForUnits(unit, timeout, selector, units) {
    units.push({ num: unit });
    await browser.waitUntil(
        async () => {
            const dataBase = await JSON.parse(await $(selector).getHTML(false));
            console.log('parsed', dataBase);
            console.log('my db', units);
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


async function inputData(data, selector, timeout, database, units) {
    const digits = String(data);
    for (let num of digits) {
        await $(selector).addValue(`${num}`);
        await waitForUnits(`${num}`, timeout, database, units);
    }
}

module.exports = {login, waitForUnits, inputData};
