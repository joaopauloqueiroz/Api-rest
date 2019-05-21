import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
//import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
//import bgImage from "assets/img/register.jpg";
import axios from "axios";
import logoSonne from "assets/img/sonne/logo_inicial.png";
//import {API_URL} from "@env";
import { login } from "variables/language.jsx";
import { setLogin } from "../../auth"
import api from "../../api";
axios.defaults.withCredentials = true;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      password: "",
      email: "",
      errors: [],
      error: false,
      errorPassword: false,
      emailState: ""
    };

    this.logout();
  }


  componentDidMount() {
    setLogin(false);
    this.timeOutFunction = setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  logout = async () => {
    try {
      await api.post('/users/logout');
    } catch (error) { }
  }

  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    if (String(type) === "email") {
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

  login(e) {
    if (parseInt(e.which, 10) === 13) {
      this.logar();
    }
  }

  logar = async () => {
    let form = {
      email: this.state.email,
      password: this.state.password
    };

    try {
      const response = await api.post('/users/logar', form);
      let erro = ["Verifique os dados de acesso."];
      if (parseInt(response.data.status, 10) === 400) {
        for (let i = 0; i < response.data.erros.length; i++) {
          if (String(response.data.erros[i].param) === "email") {
            this.setState({
              error: "error"
            });
          } else if (String(response.data.erros[i].param) === "password") {
            this.setState({
              errorPassword: "error",
              errors: erro
            });
          }
        }
      } else {
        if (parseInt(response.data.status, 10) === 200) {
          setLogin(response.data.token)
          window.location.href = '/news'
        } else {
          if (parseInt(response.data.status, 10) === 404) {
            erro = [response.data.erros];
            this.setState({
              errors: erro,
              erro: "erro"
            });
          }
        }
      }
    } catch (error) {
    }
  }

  atualizaValor(valor, evt) {
    if (String(valor) === "email") {
      this.setState({
        email: evt.target.value
      });
      this.change(evt, "email", "email");
    }

    if (String(valor) === "password") {
      this.setState({
        password: evt.target.value
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { email, password } = this.state;
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
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4} ld={12}>
            <form>
              <CardHeader
                style={{
                  paddingTop: "25px",
                  paddingLeft: "0px",
                  backgroundColor: "transparent"
                }}
              >
                <div>
                  <img
                    src={logoSonne}
                    alt="..."
                    width="85%"
                    style={{ marginLeft: "8%" }}
                  />
                </div>
              </CardHeader>
              <Card login className={classes[this.state.cardAnimaton]}>
              {/* <div style={{color: '#002960', textAlign: 'center', fontSize: '22px', marginTop: '6%', fontFamily: 'din-condensed, sans-serif', fontWeight: 'bold'}}>
                  LOGIN
              </div> */}
                <CardBody>
                  {this.state.errors ? erros : null}
                  <CustomInput
                    error={
                      this.state.error === "error" ||
                      this.state.emailState === "error"
                    }
                    labelText={login.email}
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "email",
                      value: email,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email
                            className={classes.inputAdornmentIcon}
                            style={{ color: "#002960" }}
                          />
                        </InputAdornment>
                      ),
                      onChange: evt => this.atualizaValor("email", evt),
                      onKeyUp: evt => this.login(evt),

                    }}
                  />
                  <CustomInput
                    error={this.state.errorPassword === "error"}
                    labelText={login.senha}
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon
                            className={classes.inputAdornmentIcon}
                            style={{ color: "#002960" }}
                          >
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      type: "password",
                      value: password,
                      onChange: evt => this.atualizaValor("password", evt),
                      onKeyUp: evt => this.login(evt)
                    }}
                  />
                  <a href="/email-new-pass">Esqueceu a senha?</a>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <div className={classes.center}>
                    <Button round color="sonne" onClick={(event) => this.logar(event)}>
                      {login.btLogin}
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
