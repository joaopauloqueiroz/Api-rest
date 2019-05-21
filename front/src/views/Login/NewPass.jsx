import React from "react";
//import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import InputAdornment from "@material-ui/core/InputAdornment";
//import Icon from "@material-ui/core/Icon";

// @material-ui/icons
//import Face from "@material-ui/icons/Face";
//import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
//import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import styled from "styled-components";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
//import bgImage from "assets/img/register.jpg";
import axios from "axios";
import logoSonne from 'assets/img/sonne/logo_inicial.png';
//import {API_URL} from "@env";
import {
  login,
} from "variables/language.jsx";

axios.defaults.withCredentials = true;

const Btnsuccess = styled.button `
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

/*const Btncancel = styled.button`
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
`;*/

class NewPass extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      password: "",
      email: "",
      errors: [],
      error: false,
      errorPassword: false,
      alert1: true,
      alert2: false,
      Cpassword: '',
      msg: '',
      alert3: false
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

/*   verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    if (String(type)==="email"){
      this.setState({
          email: event.target.value
        });
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
    }
  }
 */
  login(e){
    if (parseInt(e.which, 10) === 13){
        this.logar();
    }
  }

  logar() {

    let password = this.state.password
    var count = 0;
    count += /[a-z]/.test(password) ? 1 : 0;
    count += /[A-Z]/.test(password) ? 1 : 0;
    count += /\d/.test(password) ? 1 : 0;

    if(this.state.password !== this.state.Cpassword){
      this.setState({
        alert3: true,
        msg: login.errorIguais
      });
    }else{
      if(this.state.password.length < 6){
        this.setState({
          alert3: true,
          msg: login.errorDigitos
        });
      }else{
        if(count < 3){
          this.setState({
            alert3: true,
            msg: login.errorRequisitos
          });
        }else{
          this.enviar();
        }
      }
    } 
  }

  enviar(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var token = url.searchParams.get("token");

    let parent = this;
    let form = {
      password: this.state.password,
      token: token
    };

    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    axios.post(process.env.REACT_APP_API_URL+"/users/alterar-senha", form, config)
        .then(function(response) {
        response.json.then(function(data){
          });
        }).catch(function(err){
        let erro = [];
          let values = err.response;
          if(values){
            for(let i=0;i<values.data.length; i++){
              erro[i] = values.data[i].msg;
            }
            parent.setState({
              errors: erro,
            });
          }else{
            parent.setState({
              alert2: true,
            });
          }
        })
        .then(function(val){
     }); 
  }

  inputConfirmAlert1(){
    this.setState({
      alert1: false,
    });
  }
  
  inputConfirmAlert2(){
    window.location.href = "/login";
  }
  
  inputConfirmAlert3(){
    this.setState({
      alert3: false,
    });
  }

  hideAlert(){
    this.setState({
      alert1: false,
    });
  }

  hideAlert2(){
    this.setState({
      alert1: false,
    });
  }

  atualizaValor(valor, evt) {
    if (String(valor) === "password") {
      this.setState({
        password: evt.target.value
      });
    }

    if (String(valor) === "Cpassword") {
      this.setState({
        Cpassword: evt.target.value
      });
    }
  }

  render() {
    const { classes } = this.props;
    let erros = "";
    if (String(this.state.errors) !== "") {
      erros = (
        <SnackbarContent
          message={this.state.errors}
          color="danger"
          key={"chave"}
        />
      );
    }

    return (
      <div className={classes.container}>

      {this.state.alert1 ? (
            <GridContainer justify="center">
              <SweetAlert
                style={{ display: "table", marginTop: "-300px", width: "30%", color: '#6b6a6a' }}
              //  title={login.titleInfo}
                showConfirm={false}
                showCancel={false}
                onCancel={() => this.hideAlert()}
                confirmBtnCssClass={
                  this.props.classes.button + " " + this.props.classes.success
                }
                cancelBtnCssClass={
                  this.props.classes.button + " " + this.props.classes.danger
                }>
              

                <GridItem>
                <img src={logoSonne} alt="..." width="50%" style={{marginBottom: '10%'}}/>
                <p style={{color: "#6b6a6a"}}>{login.textInfo}</p>
                </GridItem>
                <br />
                <Btnsuccess onClick={e => this.inputConfirmAlert1(e)}>{login.btConf}</Btnsuccess>

              </SweetAlert>
            </GridContainer>
          ) : null}


        {this.state.alert2 ? (
          <GridContainer justify="center">
            <SweetAlert
              style={{ display: "table", marginTop: "-300px", width: "30%", color: '#6b6a6a' }}
            //  title={login.titleInfo}
              showConfirm={false}
              showCancel={false}
              onCancel={() => this.hideAlert2()}
              confirmBtnCssClass={
                this.props.classes.button + " " + this.props.classes.success
              }
              cancelBtnCssClass={
                this.props.classes.button + " " + this.props.classes.danger
              }>
              <GridItem>
              <img src={logoSonne} alt="..." width="50%" style={{marginBottom: '10%'}}/>
               <p style={{color: "#6b6a6a"}}>{login.msgAlterada}</p>
              </GridItem>
              <br />
              <Btnsuccess onClick={e => this.inputConfirmAlert2(e)}>{login.btConf}</Btnsuccess>

            </SweetAlert>
          </GridContainer>
        ) : null}


        {this.state.alert3 ? (
          <GridContainer justify="center">
            <SweetAlert
              style={{ display: "table", marginTop: "-300px", width: "30%", color: '#6b6a6a' }}
            //  title={login.titleInfo}
              showConfirm={false}
              showCancel={false}
              onCancel={() => this.hideAlert2()}
              confirmBtnCssClass={
                this.props.classes.button + " " + this.props.classes.success
              }
              cancelBtnCssClass={
                this.props.classes.button + " " + this.props.classes.danger
              }>
             

              <GridItem>
              <img src={logoSonne} alt="..." width="50%" style={{marginBottom: '10%'}}/>
               <p style={{color: "#6b6a6a"}}>{this.state.msg}</p>
              </GridItem>
              <br />
              <Btnsuccess onClick={e => this.inputConfirmAlert3(e)}>{login.btConfOK}</Btnsuccess>

            </SweetAlert>
          </GridContainer>
        ) : null}


        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4} ld={12}>
            <form>
            <CardHeader
            
                  style={{paddingTop: "25px", paddingLeft: "0px", backgroundColor: "transparent"}}
                  >
                  <div>
                    <img src={logoSonne} alt="..." width="85%" style={{marginLeft: '8%'}}/>
                  </div>
                </CardHeader>
              <Card login className={classes[this.state.cardAnimaton]}>
{/*               {login.criarSenha} */}
                <CardBody>
                  {this.state.errors ? erros : null}
                  <CustomInput
                    error={this.state.error === "error"}
                    labelText={login.senha}
                    id="password"
                    name="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      // endAdornment: (
                      //   <InputAdornment position="end">
                      //     <Email className={classes.inputAdornmentIcon} />
                      //   </InputAdornment>
                      // ),
                      onChange: evt => this.atualizaValor("password", evt),
                      onKeyUp:evt => this.login(evt)
                    }}
                  />
                  <CustomInput
                    error={this.state.errorPassword === "error"}
                    labelText={login.confSenha}
                    id="passwordC"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // endAdornment: (
                      //   <InputAdornment position="end">
                      //     <Icon className={classes.inputAdornmentIcon}>
                      //       lock_outline
                      //     </Icon>
                      //   </InputAdornment>
                      // ),
                      type: "password",
                      onChange: evt => this.atualizaValor("Cpassword", evt),
                      onKeyUp:evt => this.login(evt)
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <div className={classes.center}>
                    <Button round color="sonne" onClick={() => this.logar()}>
                      {login.btAlterarSenha}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}


export default withStyles(loginPageStyle)(NewPass);
