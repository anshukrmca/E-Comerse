import React, { useEffect, useRef } from 'react'

const Chart = () => {
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const lineChartRef = useRef(null);

    const barChartData = {
        labels: ['Category 1', 'Category 2', 'Category 3'],
        quantities: [20, 30, 15],
    };

    const pieChartData = {
        labels: ['Category A', 'Category B', 'Category C'],
        quantities: [70, 30, 20],
    };

    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        values: [10, 15, 25, 20, 30],
    };


    useEffect(() => {
       
        const createBarChart = () => {
            const ctx = barChartRef.current.getContext('2d');
            new window.Chart(ctx, {
                type: 'bar',
                data: {
                    labels: barChartData.labels,
                    datasets: [{
                        label: 'Product Quantity',
                        data: barChartData.quantities,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }],
                },
            });
        };

        const createPieChart = () => {
            const ctx = pieChartRef.current.getContext('2d');
            new window.Chart(ctx, {
                type: 'pie',
                data: {
                    labels: pieChartData.labels,
                    datasets: [{
                        data: pieChartData.quantities,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                    }],
                },
            });
        };

        const createLineChart = () => {
            const ctx = lineChartRef.current.getContext('2d');
            new window.Chart(ctx, {
                type: 'line',
                data: {
                    labels: lineChartData.labels,
                    datasets: [{
                        label: 'Line Chart',
                        data: lineChartData.values,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false,
                    }],
                },
            });
        };

        createBarChart();
        createPieChart();
        createLineChart();
    }, []);

    return (
        <>
            <div className='mt-4'>
                <h1>Chart.js Example</h1>
                <div className='flex  items-center'>

                    {/* Pie Chart */}
                    <div className='w-[300px] m-10'>
                        <canvas ref={pieChartRef} width="300" height="200"></canvas>
                    </div>

                    {/* Line Chart */}
                    <div className='w-[auto] m-10'>
                        <canvas ref={lineChartRef} width="400" height="250"></canvas>
                    </div>
                </div>  

                {/* Bar Chart */}
                <div className='w-[400px] m-10'>
                    <canvas ref={barChartRef} width="400" height="200"></canvas>
                </div>
            </div>
        </>
    )
}

export default Chart