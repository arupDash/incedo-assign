import React, { Component } from 'react';
import axios from 'axios';
import './css/app.css';

// importing custom-components for Application.

import Header from './components/Header';
import Content from './components/Content';
import utils from './utils/Utils';
import Pagination from './components/Pagination';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPagecount: 1,
      tableData : [],
      actvPgNo : 1,
      activePageElem : null,
      currPages : [1],
      rowsPerPage : 5,
      error: null,
      searchValue : null
    }
    this.getPageData = this.getPageData.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.incrByOne = this.incrByOne.bind(this);
    this.decrByOne = this.decrByOne.bind(this);

  }
  componentDidMount() {
    /*AJAX request to get count of table row */
    axios.get('http://localhost:8080/getCount')
    .then( (response) => {
      const count =  Math.ceil(response.data.count / this.state.rowsPerPage);
      let currPages = utils.getPageBtns(count);
       this.setState({totalPagecount :count, currPages : currPages, error :null, actvPgNo : 1});
    }).catch((error) => { this.setState({error : `ERROR : ${error.message} <> response : ${error.response}`})   });
    
    /*AJAX request to get initial data for Page-1*/
    let ajaxLink = utils.pagenoToLink(this.state.actvPgNo, this.state.rowsPerPage);
    axios.get(ajaxLink)
    .then( (response) => {
      this.setState({tableData :response.data, error :null});
    }).catch((error) => { this.setState({error : `ERROR : ${error.message} <>  response : ${error.response}`})   });

  }
  incrByOne() {
     /* Function increments the page buttons */
    let stateAfterIncrement = utils.incrByOne(this.state.totalPagecount, this.state.currPages,this.state.actvPgNo);
    this.setState(stateAfterIncrement);
  }
  decrByOne() {
     /* Function decrements the page buttons */
      let stateAfterDecrement = utils.decrByOne(this.state.currPages);
      this.setState(stateAfterDecrement);
  }
  getPageData(event) { 
    /* This event trigers every time there is a click on the pagination btns*/

    this.setState({tableData : []}); // Empting the table data (initiates loading gif).
    let pageNo = event.target.innerText;
    let ajaxLink = utils.pagenoToLink(pageNo, this.state.rowsPerPage);
    console.log(ajaxLink);
    if(this.state.searchValue) {
      let newajaxLink = ajaxLink+'?movie='+this.state.searchValue;
      console.log(newajaxLink);
      axios.get(newajaxLink)
      .then( (response) => {  
      this.setState({tableData :response.data, actvPgNo : pageNo,error :null});
     
      }).catch((error) => { this.setState({error : `ERROR : ${error.message} <> response : ${error.response}`})   });
    }else {
      axios.get(ajaxLink)
        .then( (response) => {  
        this.setState({tableData :response.data, actvPgNo : pageNo, error :null});
        }).catch((error) => { this.setState({error : `ERROR : ${error.message} <> response : ${error.response}`})   });
    }
  }
  onSearch(event) {
    this.setState({searchValue : event.target.value});
    if(event.target.value) {
      
          let ajaxLink = `http://localhost:8080/data/?movie=${event.target.value}`;
          axios.get(ajaxLink)
          .then( (response) => {
            const count =  Math.ceil(response.data.length / this.state.rowsPerPage);
            let currPages = utils.getPageBtns(count);
            let tableData =  response.data.slice(0, this.state.rowsPerPage); ;
            this.setState({totalPagecount :count, currPages : currPages, tableData : tableData ,actvPgNo : 1, error :null});
          }).catch((error) => { this.setState({error : `ERROR : ${error.message} <> response : ${error.response}`})   });
    }else {
          axios.get('http://localhost:8080/getCount')
          .then( (response) => {
            const count =  Math.ceil(response.data.count / this.state.rowsPerPage);
            let currPages = utils.getPageBtns(count);
            this.setState({totalPagecount :count, currPages : currPages, error :null});
          }).catch((error) => { this.setState({error : `ERROR : ${error.message} <> response : ${error.response}`})   });
          
          this.setState({tableData : []});
          let ajaxLink = utils.pagenoToLink(1, this.state.rowsPerPage);
          axios.get(ajaxLink)
            .then( (response) => {
              
            this.setState({tableData : response.data , actvPgNo : 1, error :null});
            }).catch((error) => { this.setState({error : `ERROR : ${error.message} <> response : ${error.response}`})})
    }
  }
  render() {
    return (
      <div className="container main-div">
          <div className="row">
                <Header headerName="Booking details" onSearch={this.onSearch}/>
          </div>
          <div className="row table-row">
                <Content data={this.state.tableData} error={this.state.error}/> 
          </div>
          <div className="row">
              <Pagination getPageData={this.getPageData} 
                          currPages={this.state.currPages} 
                          incrByOne={this.incrByOne}
                          decrByOne={this.decrByOne}/>
          </div>
      </div>
    );
  }
}

export default App;
