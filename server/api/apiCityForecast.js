const apiCityForecast = (date, lat, long) => {
    return {
        method: 'GET',
        url: 'https://weather338.p.rapidapi.com/weather/forecast',
        params: {
            date: date,
            latitude: lat,
            longitude: long,
            language: 'en-US',
            units: 'm'
        },
        headers: {
            'X-RapidAPI-Key': '80e5c5a195mshe603234bd5ff9b0p146bdbjsnda3c6432995c',
            'X-RapidAPI-Host': 'weather338.p.rapidapi.com',
        }
    }
}
const apiCityDetail = (id) => {
    return {
        method: 'GET',
        url: 'https://weather338.p.rapidapi.com/locations/get-details',
        params: {
            placeid: id,
            language: 'en-US'
        },
        headers: {
            'X-RapidAPI-Key': '80e5c5a195mshe603234bd5ff9b0p146bdbjsnda3c6432995c',
            'X-RapidAPI-Host': 'weather338.p.rapidapi.com',
        }
    }
}
module.exports = {
    apiCityForecast
}