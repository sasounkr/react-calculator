import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
 

const DIVISION_SIGN = "÷";
const MULTIPLICATION_SIGN = "×";

class Button extends React.Component {
  render() {
    return (
      <button id={this.props.id} className={this.props.className} value={this.props.value} onClick={this.props.onClick}>{this.props.value}</button>
    )
  }
}

class ButtonPad extends React.Component {
  render() {
    // console.log(typeof this.props.handleClick)
    // this.props.handleClick({target:{value:'1'}});
    return (
      <div className='button-pad'>
        <Button value="AC" onClick={this.props.onClick} />
        <Button value="+/-" onClick={this.props.onClick} />
        <Button value="%" onClick={this.props.onClick} />
        <Button value={DIVISION_SIGN} onClick={this.props.onClick} className="operator" />

        <Button value="7" onClick={this.props.onClick} />
        <Button value="8" onClick={this.props.onClick} />
        <Button value="9" onClick={this.props.onClick} />
        <Button value={MULTIPLICATION_SIGN} onClick={this.props.onClick} className='operator' />

        <Button value="4" onClick={this.props.onClick} />
        <Button value="5" onClick={this.props.onClick} />
        <Button value="6" onClick={this.props.onClick} />
        <Button value="-" onClick={this.props.onClick} className='operator' />

        <Button value="1" onClick={this.props.onClick} />
        <Button value="2" onClick={this.props.onClick} />
        <Button value="3" onClick={this.props.onClick} />
        <Button value="+" onClick={this.props.onClick} className='operator' />

        <Button id="button0" value="0" onClick={this.props.onClick} />
        <Button value="." onClick={this.props.onClick} />
        <Button value="=" onClick={this.props.onClick} className='operator' />


      </div>

    );
  }
}

class Output extends React.Component {

  render() {
    return (
      <div id='output' style={{color:"white"}}>{this.props.value}</div>
    );
  }
}



class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      output: "0",
      prevNum: null,
      prevOp: null,
      resetNum: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  executeOp(lhs, op, rhs) {
    switch (op) {
      case "+":
        return lhs + rhs;
      case "-":
        return lhs - rhs;
      case MULTIPLICATION_SIGN:
        return lhs * rhs;
      case DIVISION_SIGN:
        if (rhs === 0) {
          // who needs exceptions amirite? 
          return NaN
        }
        return lhs / rhs;
      default:
          return "uh-oh";
    }
  }

  isOp(token) {
    // yeah... i know...
    return (
      /[+-]/.test(token) || 
      MULTIPLICATION_SIGN === token ||
      DIVISION_SIGN === token
    );
  }



  handleClick(event) {
    let prevNum = this.state.prevNum;
    let prevOp = this.state.prevOp;
    let output = this.state.output;
    let resetNum = this.state.resetNum;
    const value = event.target.value;

    if (/[0-9]/.test(value)) {
      if (prevNum !== null && resetNum) {
        output = event.target.value;
        resetNum = false;
      } else { 
        // output = this.state.output + value; 
        output = (output === "0") ? value : this.state.output + value; 
      } 
    } else if ("+/-" === value) {
      output = -parseFloat(output);
    } else if ("AC" === value) {
      prevNum = null;
      prevOp = null;
      output = "0";
    } else if (this.isOp(value)) {
      resetNum = true;
      prevNum = this.state.output;
      prevOp = value
    } else if ("=" === value && this.isOp(prevOp)) {
      output = this.executeOp(parseFloat(prevNum), prevOp, parseFloat(output))
    } else if ("." === value) {
      prevOp = ".";
      output = parseFloat(output) / 100;
    } 

    this.setState({output, prevNum, prevOp, resetNum});
  }

  render() {
    return (
      <div className='calculator'>
        <Output value={this.state.output} />
        <ButtonPad onClick={this.handleClick}/>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Calculator className='calculator' />
  </React.StrictMode>,
  document.getElementById('root')
);
