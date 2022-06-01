import React, {useState} from 'react';
import axios from 'axios';

export default function AppFunctional(props) {
  const initialState = {
    totalMoves: 0,
    Y: 2,
    X: 2,
    board: ['', '', '','', 'B', '','', '', ''],
    value: '',
    message: ''
  };
  const [state, setState] = useState(initialState);
  
  const handleBoard = (X, Y) => {
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

  const handleLeft = () => {
    if(state.X === 1) {
      setState({...state, 
        X: 1,  
        message: "You can't go left",
        board: handleBoard(state.X, state.Y)});
    }else{
      setState({...state, 
        X: state.X - 1, 
        totalMoves: state.totalMoves +1,
        message: '',
        board: handleBoard(state.X -1, state.Y)
      })
    }
  }
  const handleRight = () => {
    if(state.X === 3) {
      setState({...state, 
        X: 3,  
        message: "You can't go right",
        board: handleBoard(state.X, state.Y)
      });
    }else{
      setState({...state, 
        X: state.X + 1,  
        totalMoves: state.totalMoves +1, 
        message: '',
        board: handleBoard(state.X +1, state.Y)
      })
    }
  }
  const handleUp = () => {
    if (state.Y === 1) {
      setState({...state, 
        Y: 1, 
        message: "You can't go up",
        board: handleBoard(state.X, state.Y)
      });
    } else{
    // when you press up, update the Y coordinate to subtract by 1
    setState({...state, 
      Y: state.Y - 1,  
      totalMoves: state.totalMoves +1, 
      message: '',
      board: handleBoard(state.X, state.Y -1)
      });
    }
    
  }
  const handleDown = () => {
    //this checks if the max number has already been reached
    if (state.Y === 3) {
      setState({...state, 
        Y: 3,  
        message: "You can't go down",
        board: handleBoard(state.X, state.Y)
      });
    } else{
    // when you press down, update the Y coordinate to increase by 1
    setState({...state, 
      Y: state.Y + 1,  
      totalMoves: state.totalMoves +1, 
      message: '',
      board: handleBoard(state.X, state.Y +1)
    });
  }
}
  const handleReset = () => {
    setState({
      X: 2,
      Y: 2,
      message: '',
      totalMoves: 0,
      board: ['', '', '', '', 'B', '', '', '', ''],
      value: ''
    })
  }

  const handleChanges = (evt) => {
    setState({...state, value: evt.target.value });
  }


  const onSubmit = evt => {
    evt.preventDefault();
    const email = state.value;
    axios.post(`http://localhost:9000/api/result`, {x: state.X, y: state.Y, steps: state.totalMoves, email: email})
    .then(res => {
      console.log(res)
      setState({...state, message: res.data.message, value: ''})
    })
    .catch(err => {
      console.log(err)
      setState({...state, message: err.response.data.message})
     })
  }
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({state.X}, {state.Y})</h3>
        <h3 id="steps">You moved {state.totalMoves} time{state.totalMoves === 1 ? '' : "s"}</h3>
      </div>
      <div id="grid">
      {state.board.map((item, idx) => {
            if (item === 'B') {
              return (<div key = {idx} className = 'square active'>{item}</div>)
            } else {
            return (
              <div key = {idx} className="square">{item}</div>
            )}
          })}
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={handleLeft}>LEFT</button>
        <button id="up" onClick={handleUp}>UP</button>
        <button id="right" onClick={handleRight}>RIGHT</button>
        <button id="down" onClick={handleDown}>DOWN</button>
        <button id="reset" onClick={handleReset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" 
        type="email" 
        placeholder="type email" 
        onChange={handleChanges}
        value={state.value}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}