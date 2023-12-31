const optionCityForecast = (date, lat, long) => {
    return {
        method: 'GET',
        url: import.meta.env.VITE_URL_API_FORECAST,
        params: {
            date: date,
            latitude: lat,
            longitude: long,
            language: 'en-US',
            units: 'm'
        },
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_X_RAPIDAPI_HOST,
        }
    }
}

const optionCitySearch = (city) => {
    return {
        method: 'GET',
        url: import.meta.env.VITE_URL_API_SEARCH,
        params: {
            query: city,
            language: 'en-US'
        },
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_X_RAPIDAPI_HOST,
        }
    }
}

const optionCityDetail = (id) => {
    return {
        method: 'GET',
        url: import.meta.env.VITE_URL_API,
        params: {
            placeid: id,
            language: 'en-US'
        },
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_X_RAPIDAPI_HOST,
        }
    }
}
export {
    optionCityForecast,
    optionCityDetail,
    optionCitySearch
}