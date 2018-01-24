import React,{Component} from 'react';

class PageBtns extends Component  {


    render() {
            return  this.props.currPages.map((el, i)=> {
                return  (
                <li className="page-item" key={i}>
                   <button onClick={this.props.getPageData} className='page-link link-color page-btn' key={el}>{el}</button>
               </li>
                )
            })
        }
}

export default PageBtns;