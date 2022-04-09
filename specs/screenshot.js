/*
* This test should fail.
*/

describe('SUPER TEST', () => {
    it('my super test to make screenshot', async function(){
        await browser.url('https://www.oxfordlearnersdictionaries.com/');
        const fileName = encodeURIComponent(test.title.replace(/[\s\/]/g, '_'));
        const scrName = new Date().toLocaleString().replace(/[\s\/]/g, '_');
        const filePath = this.screenshotPath + fileName + scrName  + '.png'
        await browser.saveScreenshot(filePath);
    });
});

// npx wdio wdio.conf.js --spec specs/screenshot.js
