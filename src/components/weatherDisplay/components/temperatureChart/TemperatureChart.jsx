import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useEffect, useState } from 'react';
const baseUrl = import.meta.env.VITE_BASE_METEO_URL;
import { format } from "date-fns"
import axios from 'axios';
import temperatureChart from "./temperatureChart.module.scss";


const TemperatureChart = ({ location }) => {


    // State che salva l'andamento della temperatura
    const [tempTrend, setTempTrend] = useState(null)


    /**
     * Funzione che raccoglie l'andamento della temperatura di una località da oggi a domani
     */
    const fetchWeatherData = async () => {

        // Configurazione dei parametri per la richiesta API
        const params = {
            "latitude": location.latitude,
            "longitude": location.longitude,
            "hourly": "temperature_2m",
            "timezone": "auto",
            "forecast_days": 2
        }

        try {
            const { data: res } = await axios.get(baseUrl, { params });

            setTempTrend(res.hourly.time.map((time, index) => ({
                time,
                temperature: res.hourly.temperature_2m[index]
            })));
        } catch (err) {
            console.error("Errore durante il recupero dei dati meteo: ", err)
        }
    }


    // Use effect per fetchare i dati al montaggio del componente
    useEffect(() => {
        fetchWeatherData();
    }, [])




    // Componente tooltip personalizzato per il grafico
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const formattedDate = format(new Date(label), "HH:mm dd/MM/yyyy");
            return (
                <div style={{
                    backgroundColor: '#f5f5f5',
                    color: '#000',
                    padding: '3px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '10px'
                }}>
                    <p style={{ margin: 0 }}>{`Ora: ${formattedDate}`}</p>
                    <p style={{ margin: 0 }}>{`Temperatura: ${payload[0].value}°C`}</p>
                </div>
            );
        }

        return null;
    };

    //  Per avere l'ora attuale in formato ISO
    const currentDate = new Date();
    const currentHourISO = `${currentDate.toISOString().slice(0, 10)}T${currentDate.getHours().toString().padStart(2, '0')}:00`;



    const renderLineChart = (
        <ResponsiveContainer width="100%" height={160} >

            <AreaChart data={tempTrend} margin={{ top: 5, right: 0, bottom: -10, left: -45 }}>
                <Area type="monotone" dataKey="temperature" stroke="#8884d8" />
                <CartesianGrid stroke="#6a6a6a" strokeDasharray="2 2" />
                <XAxis
                    dataKey="time"
                    tickFormatter={(time) => format(new Date(time), 'HH:mm')}
                    tick={{ fontSize: 6, fill: 'white' }}
                    stroke='white'
                />
                <YAxis
                    tick={{ fontSize: 6, fill: 'white' }}
                    stroke='white'

                    // Setta il dominio dell'asse y (temperatura minima -2, temperatura massima +2)
                    domain={[
                        tempTrend && tempTrend.length > 0 ? Math.min(...tempTrend.map(t => t.temperature)) - 2 : 0,
                        tempTrend && tempTrend.length > 0 ? Math.max(...tempTrend.map(t => t.temperature)) + 2 : 5,
                    ]}
                />
                <Tooltip
                    content={<CustomTooltip />}
                />

                {/* Marca l'ora attuale */}
                <ReferenceLine
                    x={currentHourISO}
                    stroke="red"
                    strokeDasharray="3 3"
                    label={{ value: "Adesso", fill: "red", fontSize: 8, angle: 90, offset: 10, position: 'right' }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );



    return (
        <>
            {tempTrend?.length > 0 && <>
                {renderLineChart}
                <div
                    className={`${temperatureChart.caption} text-center`}>
                    <strong>Temperatura nelle prossime 24 ore</strong>
                </div>
            </>
            }
        </>
    )
}
export default TemperatureChart;