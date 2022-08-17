import React from 'react'
import { useGetExchangesQuery } from '../services/cryptoExchangeApi'
import { Collapse, Spin } from 'antd'
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 30,
            }}
            spin
        />
    );

    const onChange = (key) => {
        console.log(key)
    };

    if(isFetching) return <div className='spin-container'><Spin indicator={antIcon} size='large' /></div>;

    return (
        <div>
            {data?.map((exchange, index) => (
                <Collapse onChange={onChange} accordion>
                    <Panel header={exchange.name} key={index}>
                        <h1>{exchange.name}</h1>
                        <p>{exchange.website}</p>
                    </Panel>
                </Collapse>
            ))}
        </div>
    )
}

export default Exchanges