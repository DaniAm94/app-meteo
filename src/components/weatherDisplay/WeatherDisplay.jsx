const WeatherDisplay = ({ weatherConditions }) => {

    // Se le condizioni meteorologiche sono null blocco il rendering del componente
    if (weatherConditions === null) return;

    // Destrutturo weatherConditions e rinomino eventuali attributi
    const {
        place,
        country,
        temperature_2m: temperature,
        apparent_temperature: apparentTemperature,
        weather_code: weatherCode,
        relative_humidity_2m: humidity,
        precipitation,
        cloud_cover: cloudCover,
        wind_speed_10m: windSpeed,
        wind_direction_10m: windDirection
    } = weatherConditions;


    return (
        <section>
            <h2>{place}</h2>
        </section>
    )
}
export default WeatherDisplay;