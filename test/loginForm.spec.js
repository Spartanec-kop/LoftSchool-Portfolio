const fs = require("fs");
const webdriverio = require("webdriverio");
const options = require("../wdio.conf");
const client = webdriverio.multiremote(options);

jest.setTimeout(30000);

beforeAll(() => {
  return client.init().url("http://localhost:8080/admin#/login");
});

test('На странице есть кнопка “Авторизоваться"', () => {
  return client
    .isExisting("#sendLoginForm")
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .screenshot()
    .then(browsers => {
      for (const browserName in browsers) {
        fs.writeFileSync(
          `./screenshots/login_${browserName}_has_buttonSend.png`,
          browsers[browserName].value,
          "base64"
        );
      }
    });
});

test("Форма имеет все необходимые поля", () => {
  return client
    .isExisting("#login")
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .isExisting("#password")
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .screenshot()
    .then(browsers => {
      for (const browserName in browsers) {
        fs.writeFileSync(
          `./screenshots/login_${browserName}_has_input.png`,
          browsers[browserName].value,
          "base64"
        );
      }
    });
});

test("Кнопка “Отправить” заблокирована до тех пор, пока не введены все необходимые данные", () => {
  return client
    .isEnabled("#sendLoginForm")
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(false);
      }
    })
    .screenshot()
    .then(browsers => {
      for (const browserName in browsers) {
        fs.writeFileSync(
          `./screenshots/login_${browserName}_before_set_input.png`,
          browsers[browserName].value,
          "base64"
        );
      }
    })
    .setValue("#login", "test123")
    .setValue("#password", "test123")
    .isEnabled("#sendLoginForm")
    .then(browsers => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .screenshot()
    .then(browsers => {
      for (const browserName in browsers) {
        fs.writeFileSync(
          `./screenshots/login_${browserName}_after_set_input.png`,
          browsers[browserName].value,
          "base64"
        );
      }
    });
});

afterAll(() => {
  return client.end();
});
