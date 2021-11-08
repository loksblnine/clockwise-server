const validation = require('../index')
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
    })
    describe('Test validation.isDateValid()', () => {
        it('should return false', () => {
            const result = validation.isDateValid("2021-10-10T14:00:00.000000")
            expect(result).to.be.false;
        });
        it('should return true', () => {
            const result = validation.isDateValid("2021-11-10T14:00:00.000000")
            expect(result).to.be.true;
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
    describe('Test validation.isRankingValid()', () => {
        it('should return false', () => {
            const result = validation.isRankingValid("0")
            expect(result).to.be.false;
        });
        it('should return false', () => {
            const result = validation.isRankingValid("8")
            expect(result).to.be.false;
        });
        it('should return false', () => {
            const result = validation.isRankingValid("-4")
            expect(result).to.be.false;
        });
        it('should return false', () => {
            const result = validation.isRankingValid("3,5")
            expect(result).to.be.false;
        });
        it('should return true', () => {
            const result = validation.isRankingValid("3.5")
            expect(result).to.be.true;
        });
        it('should return true', () => {
            const result = validation.isRankingValid("4.85")
            expect(result).to.be.true;
        });
    })
    describe('Test validation.isAdmin()', () => {
        it('should return false', () => {
            const result = validation.isAdmin("randomwrong")
            expect(result).to.be.false;
        });
        it('should return false', () => {
            const result = validation.isAdmin("сука неправильный имеил)")
            expect(result).to.be.false;
        });
    })
});