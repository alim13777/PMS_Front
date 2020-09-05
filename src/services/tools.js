import persianDate from 'persian-date/dist/persian-date'

const timestamp2Str = function (timestamp,locale) {
    return new persianDate(timestamp).toLocale(locale).format('YYYY/MM/DD');
}
const timestamp2Obj = function (timestamp,locale) {
    const date = new persianDate(timestamp).toLocale(locale)
    return {
        day: date.dates(),
        month: date.month(),
        year: date.year()
    };
}

export {
    timestamp2Str,
    timestamp2Obj
}