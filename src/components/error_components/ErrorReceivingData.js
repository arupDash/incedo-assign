import React from 'react';

const ErrorReceivingData = (props)=> {
    console.log(props.error);
    return (
        <div className="alert alert-danger error-div" role="alert">
            <button className="error-btn">!</button>
            <br/>
            {props.error}
        </div>
    )
}

export default ErrorReceivingData;