import {property} from "../../util/config";

describe('test config', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules()
        process.env = { ...OLD_ENV };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    test('should get property value by key', () => {
        process.env.TEST_PROP_KEY = 'TEST_PROP_VALUE';

        const actual = property('TEST_PROP_KEY')
        expect(actual).toEqual('TEST_PROP_VALUE')
    })

    test('should throw error if property not found', () => {

        expect(() => property('UNKNOWN_PROP_KEY'))
            .toThrowError(`required environment variable 'UNKNOWN_PROP_KEY' is not defined`)
    })
})