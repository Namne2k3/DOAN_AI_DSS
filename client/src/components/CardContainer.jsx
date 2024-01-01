/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CardWeather from './CardWeather'
const CardContainer = ({ data }) => {

    const normalize = (value, min, max) => {
        return (value - min) / (max - min);
    }

    const calculateWeatherScore = (temp, humid, windspeed) => {

        const weightHumidity = 0.3;
        const weightWindspeed = 0.2;
        const weightTemperature = 0.5;

        const normalizedHumidity = normalize(humid, 0, 100);
        const normalizedWindspeed = normalize(windspeed, 0, 10);
        const normalizedTemperature = normalize(temp, -10, 40);

        const weatherScore =
            weightHumidity * normalizedHumidity +
            weightWindspeed * normalizedWindspeed +
            weightTemperature * normalizedTemperature;

        return weatherScore;
    }

    const categorizeWeather = (weatherScore) => {
        if (weatherScore > 0.8) {
            return "Excellent";
        } else if (weatherScore > 0.7) {
            return "Good";
        } else if (weatherScore > 0.6) {
            return "Fair";
        } else {
            return "Bad";
        }
    }
    // categorizeWeather(calculateWeatherScore(28,80,8))

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
                        categorizeWeather={categorizeWeather}
                        calculateWeatherScore={calculateWeatherScore}
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