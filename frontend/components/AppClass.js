import React from 'react'

export default class AppClass extends React.Component {
  state = {
    id: '',
    totalMoves: 0,
    index:4,
    Y: 2,
    X: 2,
    board: ['', '', '','', '', '','', '', ''],
    value: 'B'
  }
  // componentDidMount() {
  //   this.setState({
  //     ...this.state,
  //     Y: 
  //     X: 
  //   })
  // }

  
  handleClick = (e) => {

    
    if (this.state.index > this.state.board.length || this.state.index <0){
      console.log('FIX THIS')
      this.setState
    } else {
      
     
      
      this.setState({
        ...this.state,
        id: e.target.id,
        index: this.state.id==="left" ? this.state.index-1: this.state.id==="right" ? this.state.index+1: this.state.id==='up' ? this.state.index-3: this.state.id==='down' ? this.state.index+3: this.state.index,
        Y: Math.floor(this.state.index/3) + 1,
        X: Math.floor(this.state.index% (3*(this.state.Y-1)))+1,
        totalMoves: this.state.totalMoves + 1,
       // board: ['', '', '','', '', '','', '', '']
      })
    }
    
    console.log(this.state.index, e.target.id)
  }
  
 

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.X}, {this.state.Y})</h3>
          <h3 id="steps">{this.state.totalMoves}</h3>
        </div>
        <div id="grid">
        {this.state.board.map((val, idx) =>{
          if(idx === this.state.index){
            return <div key={idx} className="square active">{this.state.value}</div>
          } else {
            return <div key={idx} className="square"></div>

          }
        })}
          
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={(id)=> this.handleClick(id)  }  >LEFT</button>
          <button id="up" onClick={(id)=> this.handleClick(id)}>UP</button>
          <button id="right" onClick={(id)=> this.handleClick(id)}>RIGHT</button>
          <button id="down" onClick={(id)=> this.handleClick(id)}>DOWN</button>
          <button id="reset" onClick={()=> console.log('RESET', this.state.index)}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

