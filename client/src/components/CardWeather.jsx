/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const CardWeather = ({
    dayofweek,
    date,
    windspeedDay,
    windspeedNight,
    uvdesDay,
    uvdesNight,
    temperatureDay,
    temperatureMax,
    temperatureMin,
    temperatureNight,
    prioritypoint,
    humidDay,
    humidNight,
    ccp,
    index,
}) => {

    return (
        <div className={`
        ${prioritypoint(temperatureDay, humidDay, windspeedDay) >= 0.32 || prioritypoint(temperatureNight, humidNight, windspeedNight) >= 0.32
                ? 'bg-green-400' : 'bg-orange-400'
            }
            rounded-lg col-span-1 p-4 flex flex-col gap-4`}
        >
            <div className="flex justify-between items-center gap-4 italic font-semibold">
                <h1>{dayofweek}</h1>
                <h1>{new Date(date).toLocaleDateString()}</h1>
            </div>

            <div className="flex justify-between gap-2 p-2 rounded-md bg-[#c1c3c8]">
                <div className="flex flex-col flex-1 ">
                    <h1 className="text-[20px] font-semibold">Day</h1>
                    <div className="flex justify-start items-center gap-4 italic font-semibold">
                        <h1>WindSpeed: {windspeedDay} km/h</h1>
                        <h1>UV: {uvdesDay}</h1>
                    </div>
                    <div className="flex justify-start items-center gap-4 italic font-semibold">
                        <h1>Temp: {temperatureDay}C</h1>
                        <h1>Humid: {humidDay}%</h1>
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <h1 className="text-[20px] font-semibold">Night</h1>
                    <div className="flex justify-start items-center gap-4 italic font-semibold">
                        <h1>WindSpeed: {windspeedNight} km/h</h1>
                        <h1>UV: {uvdesNight}</h1>
                    </div>
                    <div className="flex justify-start items-center gap-4 italic font-semibold">
                        <h1>Temp: {temperatureNight}C</h1>
                        <h1>Humid: {humidNight}%</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 p-2 rounded-md bg-[#c1c3c8]">
                <h1 className="font-semibold font-serif italic ">{ccp}</h1>
                <h1 className="font-semibold font-serif italic ">tempMax: {temperatureMax}C  -   tempMin: {temperatureMin}C</h1>
                <h1 className="font-semibold font-serif italic ">Comfort Level Day: {prioritypoint(temperatureDay, humidDay, windspeedDay)}</h1>
                <h1 className="font-semibold font-serif italic ">Comfort Level Night: {prioritypoint(temperatureNight, humidNight, windspeedNight)}</h1>
            </div>
        </div>
    )
}

export default CardWeather