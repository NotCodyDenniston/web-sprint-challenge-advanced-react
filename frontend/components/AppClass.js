import React from 'react'

import axios from 'axios'

export default class AppClass extends React.Component {
  state = {
    totalMoves: 0,
    Y: 2,
    X: 2,
    board: ['', '', '','', 'B', '','', '', ''],
    value: '',
    message: ''
  }
 

  handleBoard = (X, Y) => {
    if (X === 1 && Y === 1) {
      return ['B', '', '', '', '', '', '', '', '']
    }
    if (X === 2 && Y === 1) {
      return ['', 'B', '', '', '', '', '', '', '']
    }
     if (X === 3 && Y === 1) {
      return ['', '', 'B', '', '', '', '', '', '']
    }
    if (X === 1 && Y === 2) {
      return ['', '', '', 'B', '', '', '', '', '']
    }
    if (X === 2 && Y === 2) {
      return ['', '', '', '', 'B', '', '', '', '']
    }
    if (X === 3 && Y === 2) {
      return ['', '', '', '', '', 'B', '', '', '']
    }
    if (X === 1 && Y === 3) {
      return ['', '', '', '', '', '', 'B', '', '']
    }
    if (X === 2 && Y === 3) {
      return ['', '', '', '', '', '', '', 'B', '']
    }
    if (X === 3 && Y === 3) {
      return ['', '', '', '', '', '', '', '', 'B']
    }
  }
  
  handleUp = () => {
    if (this.state.Y === 1) {
      this.setState({...this.state, 
        Y: 1, 
        message: "You can't go up",
        board: this.handleBoard(this.state.X, this.state.Y)
      });
    } else{

    this.setState({...this.state, 
      Y: this.state.Y - 1,  
      totalMoves: this.state.totalMoves +1, 
      message: '',
      board: this.handleBoard(this.state.X, this.state.Y -1)
      });
    }
    
  }
  
  handleDown= () => {

    if (this.state.Y === 3) {
      this.setState({...this.state, 
        Y: 3,  
        message: "You can't go down",
        board: this.handleBoard(this.state.X, this.state.Y)
      });
    } else{

    this.setState({...this.state, 
      Y: this.state.Y + 1,  
      totalMoves: this.state.totalMoves +1, 
      message: '',
      board: this.handleBoard(this.state.X, this.state.Y +1)
    });
  }
}

  handleRight = () => {
    if(this.state.X === 3) {
      this.setState({...this.state, 
        X: 3,  
        message: "You can't go right",
        board: this.handleBoard(this.state.X, this.state.Y)
      });
    }else{
      this.setState({...this.setState, 
        X: this.state.X + 1,  
        totalMoves: this.state.totalMoves +1, 
        message: '',
        board: this.handleBoard(this.state.X +1, this.state.Y)
      })
    }
  }

  handleLeft = () => {
    if(this.state.X === 1) {
      this.setState({...this.state, 
        X: 1,  
        message: "You can't go left",
        board: this.handleBoard(this.state.X, this.state.Y)});
    }else{
      this.setState({...this.setState, 
        X: this.state.X - 1, 
        totalMoves: this.state.totalMoves +1,
        message: '',
        board: this.handleBoard(this.state.X -1, this.state.Y)
      })
    }
  }

  handleReset = () => {
    this.setState({
      X: 2,
      Y: 2,
      message: '',
      totalMoves: 0,
      board: ['', '', '', '', 'B', '', '', '', ''],
      value: ''
    })
  }

  handleChanges = (evt) => {
    this.setState({...this.state, value: evt.target.value });
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const email =this.state.value;
    axios.post(`http://localhost:9000/api/result`, {x: this.state.X, y: this.state.Y, steps: this.state.totalMoves, email: email})
    .then(res => {
      this.setState({...this.state, message: res.data.message, value: ''});
    })
    .catch(err => {
     console.log(err.message)
     this.setState({...this.state, message: err.response.data.message})
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.X}, {this.state.Y})</h3>
          <h3 id="steps">You moved {this.state.totalMoves} time{this.state.totalMoves === 1 ? '' : "s"}</h3>
        </div>
        <div id="grid">
          {this.state.board.map((item, idx) => {
            if (item === 'B') {
              return (<div key = {idx} className = 'square active'>{item}</div>)
            } else {
            return (
              <div key = {idx} className="square">{item}</div>
            )}
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.handleLeft}>LEFT</button>
          <button id="up" onClick={this.handleUp}>UP</button>
          <button id="right" onClick={this.handleRight}>RIGHT</button>
          <button id="down" onClick={this.handleDown}>DOWN</button>
          <button id="reset" onClick={this.handleReset}>reset</button>
        </div>
        <form onSubmit = {this.onSubmit}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email" 
            onChange={this.handleChanges}
            value={this.state.value}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}