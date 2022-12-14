import React, {useState, useEffect} from 'react'
import { useGetExchangesQuery, useGetExchangesAssetsQuery } from '../services/cryptoExchangeApi'
import { Collapse, Input, Spin } from 'antd'
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const demoImageUrl = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const Exchanges = () => {
    const { data: exchangesList, isFetching } = useGetExchangesQuery();
    const { data: exchangesAssets } = useGetExchangesAssetsQuery();
    const [exchanges, setExchanges] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = exchangesList?.filter ((exchange) => exchange.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
        setExchanges(filteredData);

    }, [exchangesList, searchTerm])

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
            <div className='search-crypto'>
                <Input placeholder='Search exchange' onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>

            {exchanges?.length < 1 ? <p>No matches. Try another</p> : ''}

            {exchanges?.map((exchange, index) => (
                <Collapse accordion key={index}>
                    <Panel className='collapse-exchange' header={exchange.name}>
                        <img className='exchange-logo' src={exchangesAssets?.find(exchangeAsset => exchangeAsset?.exchange_id == exchange.exchange_id)?.url || demoImageUrl}/>
                        <h1>{exchange.name}</h1>
                        <p>{exchange.volume_1day_usd}</p>
                        <p>{exchange.volume_1hrs_usd}</p>
                        <p>{exchange.volume_1mth_usd}</p>
                        <a href={exchange.website} target='_blank'>{exchange.website}</a>
                    </Panel>
                </Collapse>
            ))}
        </div>
    )
}

export default Exchanges