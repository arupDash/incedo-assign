import React from 'react';

const PrevBtn = (props)=> {
    return (
        <li className="page-item">
        <button onClick={props.decrByOne} className="page-link link-color page-btn">Prev</button>
        </li>
    )
}

export default PrevBtn;