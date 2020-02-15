const fs = require('fs');
const webdriverio = require('webdriverio');
const options = require('../wdio.conf');
const client = webdriverio.multiremote(options);

jest.setTimeout(30000);

beforeAll(() => {
    return client.init().url('http://localhost:8080/admin#/login');
});

test('на странице есть кнопка "открыть"', () => {
    return client
        .isExisting('#sendLoginForm')
        .then(browsers => {
            for (const browserName in browsers) {
                expect(browsers[browserName]).toBe(true);
            }
        })
        .screenshot()
        .then(browsers => {
            for (const browserName in browsers) {
                fs.writeFileSync(`./screenshots/overlay_${browserName}_has_open.png`, browsers[browserName].value, 'base64');
            }
        });
});

// test('при нажатии на "открыть" появляется оверлей', () => {
//     return client
//         .click('.openOverlay')
//         .isVisible('.overlay')
//         .then(browsers => {
//             for (const browserName in browsers) {
//                 expect(browsers[browserName]).toBe(true);
//             }
//         })
//         .screenshot()
//         .then(screenshots => {
//             for (const browserName in screenshots) {
//                 fs.writeFileSync(`./screenshots/overlay_${browserName}_has_overlay.png`, screenshots[browserName].value, 'base64');
//             }
//         })
// });

// test('при нажатии на "закрыть" оверлей должен быть закрыт', () => {
//     return client
//         .click('.close')
//         .isVisible('.overlay')
//         .then(browsers => {
//             for (const browserName in browsers) {
//                 expect(browsers[browserName]).toBe(false);
//             }
//         })
//         .screenshot()
//         .then(screenshots => {
//             for (const browserName in screenshots) {
//                 fs.writeFileSync(`./screenshots/overlay_${browserName}_overlay_closed.png`, screenshots[browserName].value, 'base64');
//             }
//         })
// });

// test('при нажатии вне оверлея он должен быть закрыт', () => {
//     return client
//         .click('.openOverlay')
//         .click('body')
//         .isVisible('.overlay')
//         .then(browsers => {
//             for (const browserName in browsers) {
//                 expect(browsers[browserName]).toBe(false);
//             }
//         })
//         .screenshot()
//         .then(screenshots => {
//             for (const browserName in screenshots) {
//                 fs.writeFileSync(`./screenshots/overlay_${browserName}_overlay_closed_outside.png`, screenshots[browserName].value, 'base64');
//             }
//         })
// });

afterAll(() => {
    return client.end();
});
