import React, { Component } from 'react'
import IconeSwitch from "components/Card/IconeSwitch";
import "assets/css/news.css";

export default class index extends Component {
  constructor(props){
      super(props);
      this.state = {
        icone: this.props.icone,
        text: this.props.text,
      }
  }
  render() {
    return (
        <div style={{ minHeight: "50vh", width: '98%', marginLeft: '1%'}} className="noticia-placeholder">
        <div className="icone-noticia-placeholder">
            <IconeSwitch color={"#ccd2da"} size="70px" icon={this.state.icone} className=""/>
        </div>
        <div className="text-notice-placeholder">{this.state.text}</div>
      </div>
    )
  }
}
