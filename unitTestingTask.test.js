const mockTokensObj = {
    'YYYY': {res: '2022', title: '**YYYY**: 4-digit year'},
    'YY': {res: '22', title: '**YY**: last 2 digit of year'},
    'MMMM': {res: 'August', title: '**MMMM**: full name of month'},
    'MMM': {res: 'Aug', title: '**MMM**: short name of month'},
    'MM': {res: '08', title: '**MM**: ISO8601-compatible number of month (i.e. zero-padded) in year (with January being 1st month)'},
    'M': {res: '8', title: '**M**: number of month in year without zero-padding (with January being 1st month)'},
    'DDD': {res: 'Wednesday', title: '**DDD**: full name of day'},
    'DD': {res: 'Wed', title: '**DD**: short name of day'},
    'D': {res: 'We', title: '**D**: min name of day'},
    'dd': {res: '03', title: '**dd**: zero-padded number of day in month'},
    'd': {res: '3', title: '**d**: number of day in month'},
    'HH': {res: '23', title: '**HH**: zero-padded hour in 24-hr format'},
    'H': {res: '23', title: '**H**: hour in 24-hr format'},
    'hh': {res: '11', title: '**hh**: zero-padded hour in 12-hr format'},
    'h': {res: '11', title: '**h**: hour in 12-hr format'},
    'mm': {res: '07', title: '**mm**: zero-padded minutes'},
    'm': {res: '7', title: '**m**: minutes'},
    'ss': {res: '20', title: '**ss**: zero-padded seconds'},
    's': {res: '20', title: '**s**: seconds'},
    'ff': {res: '004', title: '**ff**: zero-padded milliseconds'},
    'f': {res: '4', title: '**f**: milliseconds'},
    'A': {res: 'PM', title: '**A**: AM/PM'},
    'a': {res: 'pm', title: '**a**: am/pm'},
    'ZZ': {res: '+0300', title: '**ZZ**: time-zone in ISO8601-compatible basic format (i.e. "-0400")'},
    'Z': {res: '+03:00', title: '**Z**: time-zone in ISO8601-compatible extended format (i.e. "-04:00")'}
};

const unitTestingTask = require('./unitTestingTask');

const todayDate = new Date(2022, 7, 3, 23, 7, 20, 4);

describe('Test unitTestingTask func', () => {

    // beforeAll and afterAll routines inside of my test "describe" because fake time is only needed for this test block
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(todayDate);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    Object.keys(mockTokensObj).forEach((key) => {
        const token = key;
        it(`should show data in format ${mockTokensObj[token].title}`, function () {
            expect(unitTestingTask(token)).toBe(mockTokensObj[token].res);
        });
    });
});

describe('Test errors in unitTestingTask func', () => {

    it('When unitTestingTask func is without argument', function () {
        expect(() => unitTestingTask()).toThrowError(new TypeError('Argument `format` must be a string'));
    });

    it('When unitTestingTask func is with argument that is not a string', function () {
        expect(() => { unitTestingTask(4535) }).toThrow('Argument `format` must be a string');
    });

    it('When unitTestingTask func has argument that isn\'t a instance of Date/Unix Timestamp/ISODate String', () => {
        expect(() => {
            unitTestingTask('YYYY-MM-dd', null)
        }).toThrowError(new TypeError('Argument `date` must be instance of Date or Unix Timestamp or ISODate String'));
    });
});

describe('Test for languages and formats', () => {
    it('should return English lang default', function () {
        expect(unitTestingTask._languages.current).toBe('en');
    });

    it('should return previously set language', function () {
        expect(unitTestingTask.lang('uk')).toBe('uk');
    });

    it('should return time data according to given format', function () {
        unitTestingTask.register('myFormat', 'd MMMM');
        expect(unitTestingTask('myFormat')).toBe(unitTestingTask('d MMMM'));
    });

    const formatsISO = {
        'ISODate': 'YYYY-MM-dd',
        'ISOTime': 'hh:mm:ss',
        'ISODateTime': 'YYYY-MM-ddThh:mm:ss',
        'ISODateTimeTZ': 'YYYY-MM-ddThh:mm:ssZ',
    };

    Object.entries(formatsISO).forEach((key) => {
        const [ formatName, formatPattern ] = key;
        it(`should return data in ${formatName} format`, function () {
            expect(unitTestingTask(formatName)).toBe(unitTestingTask(formatPattern));
        });
    });
});

test('Creates formatting function and files, should return custom formats', function () {
    unitTestingTask._formatters = {
        'myform1': () => {},
        'myform2': () => {},
        'myform3': () => {},
    };
    expect(unitTestingTask.formatters())
        .toEqual(['myform1', 'myform2', 'myform3']);
});

test('returns unitTestingTask noConflict', function () {
    expect(unitTestingTask.noConflict()).toBe(unitTestingTask);
});