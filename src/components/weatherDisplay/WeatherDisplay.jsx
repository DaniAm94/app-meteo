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
            <hr />
            <h2>{`${place} - ${country}`}</h2>
            <h4>{`${Math.round(temperature)}°C | ${weatherCodeMap[weatherCode]}`}</h4>
            <div>
                <h5>Temperatura percepita</h5>
                {`${apparentTemperature}°C`}
            </div>
            <div>
                <h5>Vento</h5>
                {`${windSpeed}km/h da ${windDirection}`}
            </div>
            <div>
                <h5>Umidità</h5>
                {`${humidity}%`}
            </div>
            <div>
                <h5>Precipitazioni</h5>
                {`${precipitation}mm`} <address>negli ultimi 15 min</address>
            </div>
            <div>
                <h5>Nuvolosità</h5>
                {`${cloudCover}%`}
            </div>

        </section>
    )
}
export default WeatherDisplay;