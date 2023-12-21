/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CardWeather from './CardWeather'
const CardContainer = ({ data }) => {

    const handleCalculatePriority = (temp, humid, windspeed) => {

        const weatherData = {
            temperature: temp,
            relativeHumidity: humid,
            windSpeed: windspeed,
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
        <div className="grid grid-cols-2 gap-4 mt-4">
            {data?.dayOfWeek.map((item, index) => {
                return (
                    <CardWeather
                        dayofweek={item}
                        date={data?.validTimeLocal[index]}
                        windspeedDay={data?.daypart[0].windSpeed[index * 2]}
                        windspeedNight={data?.daypart[0].windSpeed[index * 2 + 1]}
                        uvdesDay={data?.daypart[0].uvDescription[index * 2]}
                        uvdesNight={data?.daypart[0].uvDescription[index * 2 + 1]}
                        temperatureDay={data?.daypart[0].temperature[index * 2]}
                        temperatureMax={data?.calendarDayTemperatureMax[index]}
                        temperatureMin={data?.calendarDayTemperatureMin[index]}
                        temperatureNight={data?.daypart[0].temperature[index * 2 + 1]}
                        prioritypoint={handleCalculatePriority}
                        humidDay={data?.daypart[0].relativeHumidity[index * 2]}
                        humidNight={data?.daypart[0].relativeHumidity[index * 2 + 1]}
                        ccp={data?.narrative[index]}
                        key={index}
                        index={index}
                    />
                )
            }
            )}
        </div>
    )
}

export default CardContainer