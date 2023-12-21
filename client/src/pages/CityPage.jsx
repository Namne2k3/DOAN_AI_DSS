/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CardWeather from '../components/CardWeather';
import CardContainer from '../components/CardContainer';
const CityPage = () => {
    const { id } = useParams();

    const [city, setCity] = useState({})
    const [infos, setinfos] = useState({});

    useEffect(() => {

        const convertDate = () => {
            const timestamp = Date.now();
            const currentDate = new Date(timestamp);

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}${month}${day}`;
            console.log("Check convertDate >>> ", formattedDate);
            return formattedDate
        }

        const handleFetchCityForeCast = async () => {
            const options = {
                method: 'GET',
                url: 'https://weather338.p.rapidapi.com/weather/forecast',
                params: {
                    date: convertDate(),
                    latitude: city.lat,
                    longitude: city.long,
                    language: 'en-US',
                    units: 'm'
                },
                headers: {
                    'X-RapidAPI-Key': '80e5c5a195mshe603234bd5ff9b0p146bdbjsnda3c6432995c',
                    'X-RapidAPI-Host': 'weather338.p.rapidapi.com',
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setinfos({
                    infoCurrent: response.data['v3-wx-observations-current'],
                    infoNext15Days: response.data['v3-wx-forecast-daily-15day'],
                    infoNowCast: response.data.vt1nowcast,
                    infoVt1wwir: response.data.vt1wwir
                });
            } catch (error) {
                console.error(error);
            }
        }

        const handleFetchCityDetail = async () => {

            const options = {
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
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setCity({
                    name: response.data.location.displayName,
                    district: response.data.location.adminDistrict,
                    country: response.data.location.country,
                    lat: response.data.location.latitude,
                    long: response.data.location.longitude
                })
            } catch (error) {
                console.error(error);
            }
        }

        handleFetchCityDetail();
        handleFetchCityForeCast();
    }, [id, city.lat, city.long])

    const handleCalculatePriority = (infoCurrent) => {

        const weatherData = {
            temperature: infoCurrent?.temperature,
            relativeHumidity: infoCurrent?.relativeHumidity,
            windSpeed: infoCurrent?.windSpeed,
        }

        const temperatureWeight = 0.4;
        const humidityWeight = 0.3;
        const windSpeedWeight = 0.3;
        const priorityPoint =
            temperatureWeight * weatherData.temperature +
            humidityWeight * weatherData.relativeHumidity -
            windSpeedWeight * weatherData.windSpeed;

        return priorityPoint.toFixed(2) / 100;
    }

    return (
        <div className='md:p-10 lg:px-[100px] mt-2'>
            <div className="flex flex-col items-center justify-center">
                <h1 className='text-[32px] font-bold bg-[#e5e7eb] w-full text-center rounded-lg p-4'>-   Current State   -</h1>
                <h1 className='text-[32px] font-bold bg-[#e5e7eb] w-full text-center rounded-lg p-4'>{city?.name} - {city?.district} - {city?.country}</h1>

                <div className="flex flex-col bg-[#e5e7eb] mt-4 p-10 gap-4 rounded-lg w-full">
                    <h1 className='text-center text-[33px] font-bold'>{infos?.infoNowCast?.narrative512Char}</h1>
                    <p className='text-center text-[22px] font-semibold'>{infos?.infoVt1wwir?.phrase}</p>
                    <div className="flex flex-col gap-2">
                        <h2 className='font-semibold text-[30px]'>Day_of_week: <span className="font-normal italic">{infos?.infoCurrent?.dayOfWeek}</span></h2>
                        <h2 className='font-semibold text-[24px]'>Date: <span className="font-normal italic">{new Date(infos?.infoCurrent?.validTimeLocal).toLocaleDateString()}</span></h2>
                        <p className='font-semibold text-[24px]'>Cloud_Cover_Phrase: <span className='font-normal italic'>{infos?.infoCurrent?.cloudCoverPhrase}</span></p>
                        <p className="font-semibold text-[24px]">Temperature: <span className='font-normal italic'>{infos?.infoCurrent?.temperature}C</span></p>
                        <p className="font-semibold text-[24px]">Temperature_Feels_Like: <span className='font-normal italic'>{infos?.infoCurrent?.temperatureFeelsLike}C</span></p>
                        <p className="font-semibold text-[24px]">Relative_Humidity: <span className='font-normal italic'>{infos?.infoCurrent?.relativeHumidity}%</span></p>
                        <p className='font-semibold text-[24px]'>UV_Index: <span className='font-normal italic'>{infos?.infoCurrent?.uvIndex} - {infos?.infoCurrent?.uvDescription}</span></p>
                        <p className='font-semibold text-[24px]'>Wind_Speed: <span className='font-normal italic'>{infos?.infoCurrent?.windSpeed} km/h</span></p>
                        <p className='font-semibold text-[24px]'>Comfort level: <span className='font-normal italic'>{handleCalculatePriority(infos?.infoCurrent)}</span></p>
                    </div>
                </div>

                <div className="w-full">
                    <CardContainer data={infos?.infoNext15Days} />
                </div>
            </div>

        </div>
    )
}

export default CityPage