import React from 'react';

const Header  = (props) => {
        return (
            <div className="header bg-danger">
                <header>
                    <span className="header-text">
                    {props.headerName}
                    </span> 
                    <input type="text" className="form-control header-searchBox" 
                           placeholder="search" onKeyUp={props.onSearch}/>  
                </header>
            </div>
        )
}

export default Header;