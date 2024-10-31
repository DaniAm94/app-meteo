const WeatherDisplay = ({ weatherConditions }) => {

    // Se arrivano delle weather conditions, destrutturo l'oggetto (per comodità)
    if (weatherConditions !== null) {
        const { location, country, temperature_2m: temperature, apparent_temperature: apparentTemperature, weather_code: weatherCode, relative_humidity_2m: humidity, precipitation, cloud_cover: cloudCover, wind_speed_10m: windSpeed, wind_direction_10m: windDirection } = weatherConditions;
    }

    return (
        weatherConditions === null ?
            '' :
            <section>
                <h2>{weatherConditions.location}</h2>
            </section>
    )
}
export default WeatherDisplay;