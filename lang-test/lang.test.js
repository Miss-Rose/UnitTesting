const unitTestingTask = require('../unitTestingTask');

const todayDate = new Date(2022, 7, 3, 23, 7, 20, 4);

const expectedLangRes = {
    'be': {id: require('../lang/be'), MMMM: 'жнівень', MMM: 'жні', MM: '08', M: '8', DDD: 'серада', DD: 'сер', D: 'сер', A: 'вечара'},
    'cs': {id: require('../lang/cs'), MMMM: 'září', MMM: 'srp', MM: '08', M: '8', DDD: 'středa', DD: 'stř', D: 'stř', A: 'odpoledne'},
    'kk': {id: require('../lang/kk'), MMMM: 'тамыз', MMM: 'там', MM: '08', M: '8', DDD: 'сәрсенбі', DD: 'ср', D: 'ср'},
    'pl': {id: require('../lang/pl'), MMMM: 'sierpeń', MMM: 'sie', MM: '08', M: '8', DDD: 'środa', DD: 'śr', D: 'Śr', A: ''},
    'ru': {id: require('../lang/ru'), MMMM: 'август', MMM: 'авг', MM: '08', M: '8', DDD: 'среда', DD: 'ср', D: 'ср', A: 'вечера'},
    'tr': {id: require('../lang/tr'), MMMM: 'Ağustos', MMM: 'Ağu', MM: '08', M: '8', DDD: 'Çarşamba', DD: 'Çar', D: 'Ça'},
    'tt': {id: require('../lang/tt'), MMMM: 'август', MMM: 'авг', MM: '08', M: '8', DDD: 'чәршәмбе', DD: 'чш', D: 'чш'},
    'uk': {id: require('../lang/uk'), MMMM: 'серпень', MMM: 'серп', MM: '08', M: '8', DDD: 'середа', DD: 'ср', D: 'ср', A: 'вечора'},
}

describe('Test using different languages', () => {

    Object.keys(expectedLangRes).forEach((key) => {
        const currentLang = key;

        describe((`When we use ${currentLang} language`), () => {
            beforeAll(() => unitTestingTask.lang(`${currentLang}`, expectedLangRes[currentLang].id));

            it(`should show full name of month in ${currentLang} language`, () => {
                expect(unitTestingTask('MMMM', todayDate)).toBe(`${expectedLangRes[currentLang].MMMM}`);
            });

            it(`should show short name of month in ${currentLang} language`, () => {
                expect(unitTestingTask('MMM', todayDate)).toBe(`${expectedLangRes[currentLang].MMM}`);
            });

            it(`should show ISO8601-compatible number of month`, () => {
                expect(unitTestingTask('MM', todayDate)).toBe(`${expectedLangRes[currentLang].MM}`);
            });

            it(`should show number of month in year without zero-padding`, () => {
                expect(unitTestingTask('M', todayDate)).toBe(`${expectedLangRes[currentLang].M}`);
            });

            it(`should show full name of day in ${currentLang} language`, () => {
                expect(unitTestingTask('DDD', todayDate)).toBe(`${expectedLangRes[currentLang].DDD}`);
            });

            it(`should show short name of day in ${currentLang} language`, () => {
                expect(unitTestingTask('DD', todayDate)).toBe(`${expectedLangRes[currentLang].DD}`);
            });

            it(`should show min name of day in ${currentLang} language`, () => {
                expect(unitTestingTask('D', todayDate)).toBe(`${expectedLangRes[currentLang].D}`);
            });

            if (expectedLangRes[key].A) {
                it(`should show AM/PM`, () => {
                    expect(unitTestingTask('A', todayDate)).toBe(`${expectedLangRes[currentLang].A}`);
                });
            }
        });
    });
});
