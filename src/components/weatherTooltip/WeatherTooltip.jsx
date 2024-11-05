

const WeatherTooltip = ({ children, text, className = '' }) => {
    return (
        <span className={`tooltip_wrapper ${className}`}>
            <span className="weather_tooltip">{text}</span>
            {children}
        </span>
    )
}
export default WeatherTooltip;