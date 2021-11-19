const validation = require('../validation/validation')
const expect = require('chai').expect;

describe('Test validation', () => {
    describe('Test validation.isNameValid()', () => {
        it('should return true', () => {
            const result = validation.isNameValid("Илюхан")
            expect(result).to.be.true;
        });
        it('should return true', () => {
            const result = validation.isNameValid("Илюха Bkmz")
            expect(result).to.be.true;
        });
        it('should return false', () => {
            const result = validation.isNameValid("Днепропетровск123")
            expect(result).to.be.false;
        });
    })
    describe('Test validation.isEmailValid()', () => {
        it('should return true', () => {
            const result = validation.isEmailValid("admin@example.com")
            expect(result).to.be.true;
        });
        it('should return false', () => {
            const result = validation.isEmailValid("сука неправильный имеил)")
            expect(result).to.be.false;
        });
        it('should return true', () => {
            const result = validation.isEmailValid("illia.zinchenko@clockwise.software)")
            expect(result).to.be.true;
        });
    })
    describe('Test validation.isDateValid()', () => {
        it('should return false', () => {
            const result = validation.isDateValid("2021-10-10T14:00:00.000000")
            expect(result).to.be.false;
        });
        it('should return false', () => {
            const result = validation.isDateValid("2021-11-10T14:00:00.000000")
            expect(result).to.be.false;
        });
        it('should return false', () => {
            const result = validation.isDateValid("2021-11-10T09:00:00.000Z")
            expect(result).to.be.false;
        });
        it('should return true', () => {
            const result = validation.isDateValid("2021-11-19T14:00:00.000Z")
            expect(result).to.be.false;
        });
        it('should return false', () => {
            const result = validation.isDateValid("2021-11-26T4:00:00.000000")
            expect(result).to.be.false;
        });
        it('should return false', () => {
            const result = validation.isDateValid("2021-10-26T11:00:00.000Z")
            expect(result).to.be.false;
        });
    })
    // describe('Test validation.isRankingValid()', () => {
    //     it('should return false', () => {
    //         const result = validation.isRankingValid("0")
    //         expect(result).to.be.false;
    //     });
    //     it('should return false', () => {
    //         const result = validation.isRankingValid("8")
    //         expect(result).to.be.false;
    //     });
    //     it('should return false', () => {
    //         const result = validation.isRankingValid("-4")
    //         expect(result).to.be.false;
    //     });
    //     it('should return false', () => {
    //         const result = validation.isRankingValid("3,5")
    //         expect(result).to.be.false;
    //     });
    //     it('should return true', () => {
    //         const result = validation.isRankingValid("3.5")
    //         expect(result).to.be.true;
    //     });
    //     it('should return true', () => {
    //         const result = validation.isRankingValid(4.5)
    //         expect(result).to.be.true;
    //     });
    // })
});