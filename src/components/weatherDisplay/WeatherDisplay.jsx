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

    // Mappatura per il weatherCode
    const weatherCodeMap = {
        0: "Cielo sereno",
        1: "Principalmente sereno",
        2: "Parzialmente nuvoloso",
        3: "Nuvoloso",
        45: "Nebbia",
        48: 45,
        51: "Pioviggine",
        53: 51,
        55: 51,
        56: 51,
        57: 51,
        61: "Pioggia",
        63: 61,
        65: 61,
        66: 61,
        67: 61,
        71: "Neve",
        73: 71,
        75: 71,
        77: 71,
        80: "Acquazzone",
        81: 80,
        82: 80,
        85: "Nevischio",
        86: 85,
        95: "Temporale",
        96: "Grandine",
        99: 96
    }


    return (
        <section>
            <h2>{place}</h2>
        </section>
    )
}
export default WeatherDisplay;