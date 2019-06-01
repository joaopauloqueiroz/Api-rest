import React, { Component } from 'react'

/**
 * Components
 */

 import FormProducts from './formProduct'
export default class index extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return <FormProducts item={this.props.location.state} props={this.props}/>
  }
}
