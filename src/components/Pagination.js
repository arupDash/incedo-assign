import  React, {Component} from 'react';
import  PrevBtn from './pagination_compositions/PrevBtn';
import  PageBtns from './pagination_compositions/PageBtns';
import  NxtBtn from './pagination_compositions/NxtBtn';

class Pagination extends Component {

    render() {
        return (
            <div style={{width : "100%"}}>
                <div className="row" >
                    <div className="col-sm-6 col-6 col-md-6 col-lg-6"></div>
                    <div className="col-sm-2 col-2 col-md-2 col-lg-2"></div>
                    <div className="col-sm-4 col-4 col-md-4 col-lg-4">
                    <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <PrevBtn decrByOne={this.props.decrByOne}/>
                        <PageBtns ref="pagebtns" getPageData={this.props.getPageData} currPages={this.props.currPages}/>
                        <NxtBtn incrByOne={this.props.incrByOne}/>
                    </ul>
                 </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pagination;