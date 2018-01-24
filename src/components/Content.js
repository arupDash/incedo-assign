import React from 'react';
import Table from './Table';
import ErorRcvData from './error_components/ErrorReceivingData';

const Content = (props) => {

    if(props.error) {
        return (
            <ErorRcvData error={props.error}/>
        )
    } else {
        return (
        <Table data={props.data}/>
        )
    }
}

export default Content;