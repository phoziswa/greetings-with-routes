module.exports = function GreetingFactory(pool) {
    var namesGreeted = {};
    var message = '';
    var data;

    function takesLetter(data) {
        var letters = /^[A-Za-z]+$/;
        if (data.match(letters)) {
            return true;
        } else {
            return false
        }
    }
    async function greetInDiffLanguages(name, lang) {
        message = '';

        var nameUpp = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        // data = await pool.query('select distinct greet_name greet_count from names_table;')

        if (nameUpp.length > 0) {
            var storeNAmes = await pool.query('select * from names_table WHERE  greet_name = $1;', [nameUpp])

            if (storeNAmes.rowCount === 1) {
                await pool.query('UPDATE names_table greet_name SET greet_count = greet_count + 1 WHERE greet_name = $1;', [nameUpp])
            }
            else {
                await pool.query('insert into names_table (greet_name, greet_count) values ($1, $2)', [nameUpp, 1]);
            }
        }

        if (lang === 'English') {
            message = "Hello, " + nameUpp;
        }
        else if (lang === 'isiXhosa') {
            message = "Molo, " + nameUpp;
        }
        else if (lang === 'Afrikaans') {
            message = "Hallo, " + nameUpp;
        }
        console.log(message);

    }
    async function counter() {
        var countRows = await pool.query('select count(*) from names_table')
        return countRows.rows.length;
    }

    function getNames() {
        return namesGreeted;
    }

    function greetingMessage() {
        return message;
    };
    async function allData() {
        data = await pool.query('SELECT * FROM names_table;')
        return data.rows
    }

    return {

        greetInDiffLanguages,
        counter,
        getNames,
        takesLetter,
        greetingMessage,
        allData
    }
}
