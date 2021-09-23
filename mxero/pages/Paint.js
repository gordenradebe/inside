//import './App.css';
import functionPlot from "function-plot";
import React, { Component, setState } from 'react';

class Paint extends Component {

  constructor(props) {
    super(props);
    this.state = {
      a: '',
      b: ''
    };

    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeA(event) {
    this.setState({
      a: event.target.value
    });
  }

  handleChangeB(event) {
    this.setState({
      b: event.target.value
    });
  }

  handleSubmit(event) {
    alert('A ' + this.state.a + ' B ' + this.state.b);
    event.preventDefault();
    functionPlot( {
      target: '#test',
      width: 580,
      height: 400,
      yAxis: {
        label: 'Y axis',
        domain: [-40, 40]
      },
      xAxis: {
          label: 'X axis',
          domain: [-30, 30]
      },
      data: [{
        fn: `${this.state.a}x^2 + ${this.state.b}`
      }],
      disableZoom: true,
      grid: true
    })

/*
    functionPlot({
      target: '#function-continuity',
      data: [{
        fn:  `${this.state.a}` / `${this.state.b}'x'`,
        derivative: {
          fn: '-1 / x / x',
          updateOnMouseMove: true
        }
      }]
    }) */
    
  }

 
  render() {
    return (
 
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            <div style ={{margin: '10px 10px 10px 10px'}}>
              <h1>
                   Given: Ax^2 + B
                </h1>  
            </div>
            <div style ={{margin: '10px 10px 10px 10px', display:"flex", padding :'10px'}}> 

            Value of  A:
            <input type="text" value={this.state.value} onChange={this.handleChangeA} /> 
            <label>
            Value of B:
            <input type="text" value={this.state.b} onChange={this.handleChangeB} />
          </label>
          <input type="submit" value="Submit" />
            </div>
        
          </label>
      
        </form>
      <div id="test"></div>
     </div>
    );
  }
}

export default Paint;
