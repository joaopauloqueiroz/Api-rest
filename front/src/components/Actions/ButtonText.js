import React from 'react'
//import CustomButton from "components/CustomButtons/Button.jsx";
//import Card from ".././components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import styled from 'styled-components';
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import axios from  'axios'
axios.defaults.withCredentials = true;

const Line = styled.hr`
  position: relative;
  width: 98%;
  height: 1px;
  margin-top: 1%;
  left: 0%;
  background-color: #EEEEEE;
  text-align: center;
`
const TextDivTitle = styled.div`
  color: #081b31;
  font-weight: 1000;
  text-transform: uppercase;
  font-size: 12px;
  width: 77%;
`

const TextDiv = styled.div`
  color: #081b31;
  font-size: 10px;
  font-family: Roboto;
`

class ButtonText extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: this.props.type,
      value: this.props.value,
      class: this.props.class,
      data: this.props.data,
      display: this.props.display,
      detalhes: this.props.detalhes
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps !== this.props){
      this.setState({
        type: this.props.type,
        value: this.props.value,
        class: this.props.class,
        data: this.props.data,
        display: this.props.display,
        detalhes: this.props.detalhes,
      });
    }
  }

  render(){
    //let data = this.state.data!=null ? this.state.data : this.state.value;
    //let display = this.state.display==null ? 'block' : 'inline-block';

    return(
      <div id='click' 
        style={{cursor: 'pointer', marginLeft: '-1%', paddingBottom: '3%'}}>
        <CardBody id='click' bgcolor='#ffffff'>
          <TextDivTitle id='click'>{this.state.value}</TextDivTitle>
          {this.props.icons ? 
            <div>
            <div id='click' style={{position: 'absolute', top: '12%', width: '7%', right: '20%'}}>
              <Edit style={{width: '100%'}} onClick={() => this.props.edit(this.props.index)}/>
            </div>
            <div onClick={() => this.props.delete(this.props.idDelete, this.props.index)}>
              <Close style={{position: 'absolute', top: '12%', width: '15%', right: '3%'}} />
            </div>
            </div>
            :
            ''
          }
          <Line id='click' />
          <TextDiv id='click'>{this.state.detalhes}</TextDiv>
        </CardBody>
      </div>
    );
  }
}

export default ButtonText