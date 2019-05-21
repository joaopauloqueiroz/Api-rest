import React, { Component } from 'react'
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import styled from "styled-components";

/**
 * Confirm = Recebe uma função de onclick com nome confirm
 * Cancel = Recebe uma função d onClick com nome delete
 * Msg = Recebe uma String com a mensagem a ser exibida
 * Title = Rececbe uma String com o texto
 * Alert = Recebe uma string com o tipo de icone da tela {danger-success}
 */
class Confirm extends Component {
    /*constructor(props){
        super(props)
    }*/

onCancel () {
    this.props.onCancel(this.props.values)
}

onConfirm () {
    this.props.onConfirm(this.props.values)
}

  render() {
    return (
      <div className="pai-sweet">
        <SweetAlert
            title={this.props.title}
            warning
            style={{
                display: "block",
                marginTop: "-100px",
                left: "50%",
                top: "37%"
            }}
            showCancel={false}
            showConfirm={false}
            >
            <div style={{ fontSize: "13px", fontFamily: "Roboto" }} >
              {this.props.msg}
            </div>
            <br />
            <Btncancel className="btn-save" onClick={() => this.onCancel()}>
                {"CANCELAR"}
              </Btncancel>
            <Btnsuccess className="btn-save" onClick={() => this.onConfirm()}>
                {"DELETAR"}
            </Btnsuccess>
        </SweetAlert>
      </div>
    )
  }
}

export default withStyles(sweetAlertStyle)(Confirm)

const Btnsuccess = styled.button`
  padding: 2%;
  background-color: #6fd61c;
  border-radius: 18px;
  border: none;
  padding-left: 4%;
  padding-right: 4%;
  cursor: pointer;
  color: #ffffff;
  font-family: Roboto;
  font-weight: bold;
  font-size: 10pt;
`;

const Btncancel = styled.button`
  padding: 2%;
  background-color: #ff0000;
  border-radius: 18px;
  border: none;
  padding-left: 4%;
  padding-right: 4%;
  margin-right: 10%;
  cursor: pointer;
  color: #ffffff;
  font-family: Roboto;
  font-weight: bold;
  font-size: 10pt;
`;