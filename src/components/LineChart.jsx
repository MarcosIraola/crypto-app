import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd';
import {Chart as ChartJS} from 'chart.js/auto'
import moment from 'moment';

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for(let i= 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory?.data?.history[i].price)
        coinTimestamp.push(moment(new Date (coinHistory?.data?.history[i]?.timestamp)*1000).format('ll'));
    }

    coinPrice.reverse()
    coinTimestamp.reverse()

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    const options = {
    scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false,
                    },
                },
            ],
        },
    };

    return (
        <div>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>
                    {coinName} Price Chart
                </Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>
                        {coinHistory?.data?.change > 0 
                            ?<span style={{color: "green"}}>+{coinHistory?.data?.change}%</span>
                            :<span style={{color: "red"}}>{coinHistory?.data?.change}%</span>
                        }
                    </Title>
                    <Title level={5} className='current-price'>Current {coinName} Price: ${currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options}/>
        </div>
    )
}

export default LineChart