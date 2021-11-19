
//region validation
const validation = {};

validation.isNameValid = (name = "") => {
    return name.length && /^[A-ZА-Яa-zа-я -]+$/i.test(name);
}
// validation.isRankingValid = (ranking = "") => {
//     return ranking.length && Number(ranking.toString()) <= 5 && Number(ranking) >= 1;
// }
validation.isEmailValid = (email = "") => {
    return email.length && /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i.test(email);
}
validation.nowDate = () => {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2).toISOString().split('T')[0]
}
validation.finalDate = () => {
    return new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).toISOString().split('T')[0]
}
validation.isDateValid = (date = "") => {
    return date.length && Date.parse(date.split('T')[0]) <= Date.parse(validation.finalDate()) && Date.parse(date.split('T')[0]) >= Date.parse(validation.nowDate()) && Number(date.split('T')[1].split(':')[0]) <= 17 && Number(date.split('T')[1].split(':')[0]) >= 8;
}
//endregion
module.exports = validation