import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({simplified}) => {

    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter (
            (coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) 
            || coin.symbol.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        )
        setCryptos(filteredData);

    }, [cryptosList, searchTerm])

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
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
            )}

            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.length < 1 ? <p>No matches. Try another</p> : ''}
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                        <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                            <Card 
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className='crypto-image' src={currency.iconUrl}/>}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>MarketCap: {millify(currency.marketCap)}</p>
                                <p>Daily Change:
                                    {millify(currency.change) > 0 
                                    ? <span style={{color: "green"}}> +{millify(currency.change)}%</span> 
                                    : <span style={{color: "red"}}> {millify(currency.change)}%</span>}
                                </p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Cryptocurrencies