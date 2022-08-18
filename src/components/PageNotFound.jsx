import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const PageNotFound = () => {

    const navigate = useNavigate();

    return (
        <div className='notFound-container'>
            <h1 className='notFound-title'>404 Page Not Found</h1>
            <p className='notFound-link' onClick={() => navigate(-1)}>Go Back</p>
        </div>
    )
}

export default PageNotFound