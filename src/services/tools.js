import persianDate from 'persian-date/dist/persian-date'
import {getLanguage} from "react-multi-lang/lib";

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

const obj2Timestamp = function (obj) {
    const locale = getLanguage();
    if(locale==='fa'){
        return new persianDate([obj.year,obj.month,obj.day]).unix()*1000
    }else{
        return new Date(obj.year,obj.month,obj.day).getTime()
    }
}

const detectLang = function (text) {
    if (/^[a-zA-Z]+$/.test(text[0])) {
        return "en";
    } else {
        return "fa";
    }
}

export {
    timestamp2Str,
    timestamp2Obj,
    obj2Timestamp,
    detectLang
}