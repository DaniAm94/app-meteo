const WeatherDisplay = ({ weatherConditions }) => {
    return (
        weatherConditions === null ?
            '' :
            <section>
                <h2>{weatherConditions.location}</h2>
            </section>
    )
}
export default WeatherDisplay;