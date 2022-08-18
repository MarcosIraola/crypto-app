import React from 'react';
import { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';


const { Title } = Typography;

const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 30,
            }}
            spin
        />
    );

    if(isFetching) return <div className='spin-container'><Spin indicator={antIcon} size='large' /></div>;

    return (
        <div>
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                <Col span={12}>
                    <Statistic title='Total Cryptocurrecnies' value={globalStats?.total}/>
                </Col>
                <Col span={12}>
                    <Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)}/>
                </Col>
                <Col span={12}>
                    <Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)}/>
                </Col>
                <Col span={12}>
                    <Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)}/>
                </Col>
                <Col span={12}>
                    <Statistic title='Total Markets' value={millify(globalStats.totalMarkets)}/>
                </Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies</Title>
                <Title level={3} className='show-more'><Link to='/crypto'>Show more</Link></Title>
            </div>
            <Cryptocurrencies simplified/>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latests News</Title>
                <Title level={3} className='show-more'><Link to='/news'>Show more</Link></Title>
            </div>
            <News simplified/>
        </div>
    )
}

export default Homepage