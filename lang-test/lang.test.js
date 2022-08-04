const unitTestingTask = require('../unitTestingTask');

const todayDate = new Date(2022, 7, 3, 23, 7, 20, 4);

const obj = {
    'be': {id: require('../lang/be'), MMMM: 'жнівень', MMM: 'жні', MM: '08', M: '8', DDD: 'серада', DD: 'сер', D: 'сер', A: 'вечара'},
    'cs': {id: require('../lang/cs'), MMMM: 'září', MMM: 'srp', MM: '08', M: '8', DDD: 'středa', DD: 'stř', D: 'stř', A: 'odpoledne'},
    'kk': {id: require('../lang/kk'), MMMM: 'тамыз', MMM: 'там', MM: '08', M: '8', DDD: 'сәрсенбі', DD: 'ср', D: 'ср'},
    'pl': {id: require('../lang/pl'), MMMM: 'sierpeń', MMM: 'sie', MM: '08', M: '8', DDD: 'środa', DD: 'śr', D: 'Śr', A: ''},
    'ru': {id: require('../lang/ru'), MMMM: 'август', MMM: 'авг', MM: '08', M: '8', DDD: 'среда', DD: 'ср', D: 'ср', A: 'вечера'},
    'tr': {id: require('../lang/tr'), MMMM: 'Ağustos', MMM: 'Ağu', MM: '08', M: '8', DDD: 'Çarşamba', DD: 'Çar', D: 'Ça'},
    'tt': {id: require('../lang/tt'), MMMM: 'август', MMM: 'авг', MM: '08', M: '8', DDD: 'чәршәмбе', DD: 'чш', D: 'чш'},
    'uk': {id: require('../lang/uk'), MMMM: 'серпень', MMM: 'серп', MM: '08', M: '8', DDD: 'середа', DD: 'ср', D: 'ср', A: 'вечора'},
}

describe('testing countries', () => {

    Object.keys(obj).forEach((key) => {

        describe((`${key} Language`), () => {
            beforeAll(() => unitTestingTask.lang(`${key}`, obj[key].id));

            it('full name of month', () => {
                expect(unitTestingTask('MMMM', todayDate)).toBe(`${obj[key].MMMM}`);
            });

            it('short name of month', () => {
                expect(unitTestingTask('MMM', todayDate)).toBe(`${obj[key].MMM}`);
            });

            it('ISO8601-compatible number of month', () => {
                expect(unitTestingTask('MM', todayDate)).toBe(`${obj[key].MM}`);
            });

            it('number of month in year without zero-padding', () => {
                expect(unitTestingTask('M', todayDate)).toBe(`${obj[key].M}`);
            });

            it('full name of day', () => {
                expect(unitTestingTask('DDD', todayDate)).toBe(`${obj[key].DDD}`);
            });

            it('short name of day', () => {
                expect(unitTestingTask('DD', todayDate)).toBe(`${obj[key].DD}`);
            });

            it('min name of day', () => {
                expect(unitTestingTask('D', todayDate)).toBe(`${obj[key].D}`);
            });

            if (obj[key].A) {
                it('AM/PM', () => {
                    expect(unitTestingTask('A', todayDate)).toBe(`${obj[key].A}`);
                });
            }
        });
    });
});
