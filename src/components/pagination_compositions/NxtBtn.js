import React from 'react';

const NxtBtn = (props)=> {
    return (
        <li className="page-item">
        <button onClick={props.incrByOne} className="page-link link-color page-btn">Next</button>
        </li>
    )
}

export default NxtBtn;