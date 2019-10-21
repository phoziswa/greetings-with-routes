const assert = require('assert');
const GreetingFactory = require('../greetings');


describe('GreetingFactory function', function () {
    it('should greet a person in English ', function () {

        var instance = GreetingFactory();

        assert.equal("Hello, Victor", instance.greetInDiffLanguages("Victor", "English"));
    });
    it('should greet a person in isiXhosa', function () {

        var instance = GreetingFactory();
-
        assert.equal("Molo, Victor", instance.greetInDiffLanguages("Victor", "isiXhosa"));
    });
    it('should greet a person in Afrikaans', function () {

        var instance = GreetingFactory();

        assert.equal("Hallo, Victor", instance.greetInDiffLanguages("Victor", "Afrikaans"));
    });

    it('should not increment the counter if the name entered is already greeted ', function () {

        var instance = GreetingFactory();

        instance.greetInDiffLanguages('Phoziswa', "English")
        instance.greetInDiffLanguages('Phoziswa', "English")
        instance.greetInDiffLanguages('Sihle', "isiXhosa")


        assert.deepEqual(2, instance.counter());
    });
    it('should only greet the name entered if its letters not numbers', function () {

        var instance = GreetingFactory();

        instance.greetInDiffLanguages('Phoziswa', "English")
        instance.greetInDiffLanguages('21453')
        instance.greetInDiffLanguages('Sihle', "isiXhosa")

        assert.deepEqual(2, instance.counter());
    });
    
    it('should return "First select the language" if the name is greeted without selecting the language', function () {

        var instance = GreetingFactory();
       
        assert.deepEqual(instance.greetInDiffLanguages("First select the language"), instance.greetInDiffLanguages());
    });

        it('should keep track of the names greeted', function () {

        var instance = GreetingFactory();

        instance.greetInDiffLanguages('Phoziswa', "English")
        instance.greetInDiffLanguages('Asa', "English")
        instance.greetInDiffLanguages('Vee', "isiXhosa")

    assert.deepEqual(instance.counter(),3);
 });
 it('should take only the valid names not numbers and other characters', function () {

    var instance = GreetingFactory();

    instance.greetInDiffLanguages('Phoziswa', "English")
    instance.greetInDiffLanguages('-90=2',  "isiXhosa")
    
assert.deepEqual(instance.takesLetter('Phoziswa'),true);
});
it('should not take numbers and other characters', function () {

    var instance = GreetingFactory();

    instance.greetInDiffLanguages('Phoziswa', "English")
    instance.greetInDiffLanguages('-90=2',  "isiXhosa")
    
assert.deepEqual(instance.takesLetter('-90=2'),false);
});

});