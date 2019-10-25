const assert = require('assert');
const GreetingFactory = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/names_greeted';

const pool = new Pool({
  connectionString
});

describe('The database web app', function () {
  it('should be able to greet a person', async function () {
    let instance = GreetingFactory(pool);
    await instance.greetInDiffLanguages("Yanga", "English");
    let greetMe = await instance.greetingMessage();
    assert.equal("Hello, Yanga", greetMe);
  });

  it('should count the names greeted', async function () {
    let instance = GreetingFactory(pool);
    await instance.greetInDiffLanguages("Asa");
    let greeting = await instance.counter();
    assert.equal(1, greeting);
  });

  after(function () {
    pool.end();
  })
});
