import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TemperatureChart = () => {

    const hourlyTemp = [
        { time: '00:00', temperature: 12 },
        { time: '01:00', temperature: 11 },
        { time: '02:00', temperature: 10 },
        { time: '03:00', temperature: 9 },
        { time: '04:00', temperature: 8 },
        { time: '05:00', temperature: 7 },
        { time: '06:00', temperature: 6 },
        { time: '07:00', temperature: 10 }
    ];

    const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];
    const renderLineChart = (
        <ResponsiveContainer width="100%" height={300}>

            <AreaChart data={hourlyTemp} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Area type="monotone" dataKey="temperature" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
            </AreaChart>
        </ResponsiveContainer>
    );
    return (
        <>
            {renderLineChart}
        </>
    )
}
export default TemperatureChart;