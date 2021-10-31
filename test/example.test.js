const validation = require('../index')
const expect = require('chai').expect;

describe('Test validation', () => {
    describe('Test validation.isNameValid()', ()=>
    {
        it('should return true', () => {
            const result = validation.isNameValid("Илюхан")
            expect(result).to.be.true;
        });
        it('should return false', () => {
            const result = validation.isNameValid("Днепропетровск123")
            expect(result).to.be.false;
        });
    })
    describe('Test validation.isEmailValid()', ()=>
    {
        it('should return true', () => {
            const result = validation.isEmailValid("admin@example.com")
            expect(result).to.be.true;
        });
        it('should return false', () => {
            const result = validation.isEmailValid("сука неправильный имеил)")
            expect(result).to.be.false;
        });
    })
});