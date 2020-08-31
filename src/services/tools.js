import persianDate from 'persian-date/dist/persian-date'

const timestamp2Str = function (timestamp,locale) {
    return new persianDate(timestamp).toLocale(locale).format('YYYY/MM/DD');
}

export {
    timestamp2Str
}