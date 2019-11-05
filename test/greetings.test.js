const assert = require('assert');
const GreetingFactory = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/names_greeted_test';

const pool = new Pool({
  connectionString
});

describe('Greetings with routes', function () {

  beforeEach(async function () {
    await pool.query("DELETE FROM names_table;");

  });
  it('should be able to greet a person in English', async function () {
    let instance = GreetingFactory(pool);
    await instance.greetInDiffLanguages("Yanga", "English");
    let greet = await instance.greetingMessage();
    assert.equal("Hello, Yanga", greet);
  });

  it('should count if a person is greeted', async function () {
    let instance = GreetingFactory(pool);
    await instance.greetInDiffLanguages("Asa");
    let greeting = await instance.counter();
    assert.equal(1, greeting);
  });

  it('Should be able to greet a person in isiXhosa if it selected ', async function () {
    let instance = GreetingFactory(pool);
    await instance.greetInDiffLanguages("Yanga", "isiXhosa");
    let greet = await instance.greetingMessage();
    assert.equal("Molo, Yanga", greet);
  });

  it('Should be able to greet a in Afrikaans if it is selected  ', async function () {
    const instance = GreetingFactory(pool);
    await instance.greetInDiffLanguages('Sihle', 'Afrikaans');
    let greet = await instance.greetingMessage();;
    assert.equal('Hallo, Sihle', greet);
  });

  it('Should be able to display how many people are greeted in the app ', async function () {
    const instance = GreetingFactory(pool);
    await instance.greetInDiffLanguages('Phoziswa', 'isiXhosa');
    await instance.greetInDiffLanguages('Lubanzi', 'English');
    await instance.greetInDiffLanguages('Sihe', 'Afrikaans');
    let count = await instance.counter();
    assert.deepEqual(count, '3');
  });

  it('Should not increament the counter if the person has already been greeted', async function () {
    const instance = GreetingFactory(pool);
    await instance.greetInDiffLanguages('Sihle', 'Afrikaans');
    await instance.greetInDiffLanguages('Sihle', 'English');
    let count = await instance.counter();
    assert.equal('1', count);
  });

  after(function () {
    pool.end();
  })
});
