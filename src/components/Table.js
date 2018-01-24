import React, {Component} from 'react';

class Table extends Component {

    render() {
      if(this.props.data.length <= 0 && this.props.data[0] !== 'No data received') {
          return (
            <div className="loading-background">
                  
            </div>
          )
      } else if(this.props.data[0] === 'No data received') {
        return (
        <div className="alert alert-warning error-div" role="alert">
           {this.props.data[0]}
        </div>
        )
      } else {
        return (
          <table className="table table-bordered">
          <thead>
            <tr className="bg-dark" style = {{color: "white"}}>
              <th scope="col">ID</th>
              <th scope="col">Movie Title</th>
              <th scope="col">User</th>
              <th scope="col">Booking Time</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.data.map(el => {
              return (  
                  <tr key={el.id}>
                      <th scope="row">{el.id}</th>
                      <td>{el.movie}</td>
                      <td>{el.name}</td>
                      <td>{el.Booking}</td>
                  </tr>
                )
            })
            }
          </tbody>
        </table>
        )
      }
    }
}

export default Table;