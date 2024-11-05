import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useEffect, useState } from 'react';
const baseUrl = import.meta.env.VITE_BASE_METEO_URL;
import { format } from "date-fns"
import axios from 'axios';

const TemperatureChart = ({ location }) => {


    const [tempTrend, setTempTrend] = useState(null)

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
            console.log(res)




            setTempTrend(res.hourly.time.map((time, index) => ({
                time,
                temperature: res.hourly.temperature_2m[index]
            })));
        } catch (err) {
            console.error("Errore durante il recupero dei dati meteo: ", err)
        }
    }



    useEffect(() => {




        fetchWeatherData();
    }, [])




    // Componente tooltip personalizzato
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
                    fontSize: '10px' // Regola il font size
                }}>
                    <p style={{ margin: 0 }}>{`Ora: ${formattedDate}`}</p>
                    <p style={{ margin: 0 }}>{`Temperatura: ${payload[0].value}°C`}</p>
                </div>
            );
        }

        return null;
    };
    // Ottieni l'ora attuale in formato ISO
    const currentDate = new Date();
    const currentHourISO = `${currentDate.toISOString().slice(0, 10)}T${currentDate.getHours().toString().padStart(2, '0')}:00`;



    const renderLineChart = (
        <ResponsiveContainer width="100%" height={200} >

            <AreaChart data={tempTrend} margin={{ top: 5, right: 20, bottom: 5, left: -40 }}>
                <Area type="monotone" dataKey="temperature" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
                <XAxis
                    dataKey="time"
                    tickFormatter={(time) => format(new Date(time), 'HH:mm')}
                    tick={{ fontSize: 6 }}
                />
                <YAxis
                    tick={{ fontSize: 6 }}
                    domain={[
                        tempTrend && tempTrend.length > 0 ? Math.min(...tempTrend.map(t => t.temperature)) - 2 : 0,
                        tempTrend && tempTrend.length > 0 ? Math.max(...tempTrend.map(t => t.temperature)) + 2 : 5,
                    ]}
                />
                <Tooltip
                    content={<CustomTooltip />}
                />
                <ReferenceLine
                    x={currentHourISO}
                    stroke="red"
                    strokeDasharray="3 3"
                    label={{ value: "Adesso", fill: "red", fontSize: 8, angle: 90, offset: 10, position: 'right' }} // Modifica fontSize per rimpicciolire il testo 
                />
            </AreaChart>
        </ResponsiveContainer>
    );



    return (
        <>
            {tempTrend?.length > 0 && <>
                {renderLineChart}
                <div
                    className='text-center'>
                    <strong>Temperatura nelle prossime 24 ore</strong>
                </div>
            </>
            }
        </>
    )
}
export default TemperatureChart;