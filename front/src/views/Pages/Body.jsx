import React from "react";

// @material-ui/icons
//import Face from "@material-ui/icons/Face";
//import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
//import Email from "@material-ui/icons/Email";
//import Money from "@material-ui/icons/AttachMoney";
//import Segment from "@material-ui/icons/Loyalty";
//import Type from "@material-ui/icons/Title";
//import Locale from "@material-ui/icons/LocationOn";
//import Site from "@material-ui/icons/AlternateEmail";
import {
  registerCompany,
} from "variables/language.jsx";


import axios from 'axios';



// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import InputAdornment from "@material-ui/core/InputAdornment";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PictureUpload from "components/CustomUpload/ImageUpload.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";


axios.defaults.withCredentials = true;

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  }
};

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      segment: "",
      image: "",
      profit: "",
      type: "",
      locale: "",
      site: "",
      linkedin: "",
      latitude: "",
      longitude: "",
      errors: [],
      error: false,
    };
  }
  


atulizaValor(evt, valor){
  
    if(String(valor) === 'name'){
      this.setState({
        name: evt.target.value,
      })
    }
    if(String(valor) === 'segment'){
      this.setState({
        segment: evt.target.value,
      })
    }
    if(String(valor) === 'image'){
      
      this.setState({
        image: evt.target.value,
      })
    }

    if(String(valor) === 'profit'){
      this.setState({
        profit: evt.target.value,
      })
    }
    if(String(valor) === 'type'){
      this.setState({
        type: evt.target.value,
      })
    }

    if(String(valor) === 'locale'){
      this.setState({
        locale: evt.target.value,
      })
    }

    if(String(valor) === 'site'){
      this.setState({
        site: evt.target.value,
      })
    }
    if(String(valor) === 'linkedin'){
      this.setState({
        linkedin: evt.target.value,
      })
    }
    if(String(valor) === 'latitude'){
      this.setState({
        latitude: evt.target.value,
      })
    }
    if(String(valor) === 'longitude'){
      this.setState({
        longitude: evt.target.value,
      })
    }
}

register(){
  let parent = this;
  let form = {
    name: this.state.name,
    segment: this.state.segment,
    profit: this.state.profit,
    type: this.state.type,
    locale: this.state.locale,
    site: this.state.site,
    linkedin: this.state.linkedin,
    image: this.state.image,
    latitude: this.state.latitude,
    longitude: this.state.longitude
  }

  let config = {
    headers: {
      Accept: "application/json"
    },
   
  };
  
  
  axios.post(process.env.REACT_APP_API_URL+"/company/create/", form, config)
    .then(function(response) {
      //let erro = [];
        if(parseInt(response.data.status, 10) === 400){
          parent.setState({
            firstnameState: "error"
          })
          // for(let i=0;i<response.data.errors.length; i++){
          //   erro[i] = response.data.errors[i].msg;
          // }
          // parent.setState({
          //   errors: erro,
          //   error: true,
          // });
          // erro = null;
        }
        else{
          if(parseInt(response.data.status, 10) === 201){
            window.location = '/department';
          }
        }
    })
}


  render() {
    const { classes } = this.props;

    let erros = [];
      if(this.state.error){
        erros = this.state.errors.map((item, i) => <SnackbarContent message={item} color="danger" key={item+i} />);
      }

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            {registerCompany.entreDados}
          </h4>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <PictureUpload text={"SELECIONE O LOGO DA SUA EMPRESA"}/>
        </GridItem>


        <GridItem xs={12} sm={6}>
        
          <CustomInput
            success={this.state.firstnameState === "success"}
            error={this.state.firstnameState === "error"}
            labelText={
              <span>
                {registerCompany.nome} <small>{registerCompany.obrigatorio}</small>
              </span>
            }
            id="firstname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.atulizaValor(event, "name"),
              // endAdornment: (
              //   <InputAdornment
              //     position="end"
              //     className={classes.inputAdornment}
              //   >
              //     <Face className={classes.inputAdornmentIcon} />
              //   </InputAdornment>
              // )
            }}
          />
          <CustomInput
            success={this.state.firstnameState === "success"}
            // error={this.state.firstnameState === "error"}
            labelText={
              <span>
               {registerCompany.segment}
              </span>
            }
            id="firstname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.atulizaValor(event, "segment"),
              // endAdornment: (
              //   <InputAdornment
              //     position="end"
              //     className={classes.inputAdornment}
              //   >
              //     <Segment className={classes.inputAdornmentIcon} />
              //   </InputAdornment>
              // )
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
        <CustomInput
            success={this.state.lastnameState === "success"}
            error={this.state.lastnameState === "error"}
            labelText={
              <span>
                {registerCompany.faturamentoEmpresa}
              </span>
            }
            id="lastname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.atulizaValor(event, "profit"),
              // endAdornment: (
              //   <InputAdornment
              //     position="end"
              //     className={classes.inputAdornment}
              //   >
              //     <Money className={classes.inputAdornmentIcon} />
              //   </InputAdornment>
              // )
            }}
          />
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={10}>
        <CustomInput
            success={this.state.lastnameState === "success"}
            error={this.state.lastnameState === "error"}
            labelText={
              <span>
                {registerCompany.segmentoEmpresa}
              </span>
            }
            id="lastname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.atulizaValor(event, "type"),
              // endAdornment: (
              //   <InputAdornment
              //     position="end"
              //     className={classes.inputAdornment}
              //   >
              //     <Type className={classes.inputAdornmentIcon} />
              //   </InputAdornment>
              // )
            }}
          />
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={10}>
        <CustomInput
            success={this.state.lastnameState === "success"}
            error={this.state.lastnameState === "error"}
            labelText={
              <span>
                {registerCompany.endereco}
              </span>
            }
            id="lastname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.atulizaValor(event, "locale"),
              // endAdornment: (
              //   <InputAdornment
              //     position="end"
              //     className={classes.inputAdornment}
              //   >
              //     <Locale className={classes.inputAdornmentIcon} />
              //   </InputAdornment>
              // )
            }}
          />
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={10}>
        <CustomInput
            success={this.state.lastnameState === "success"}
            error={this.state.lastnameState === "error"}
            labelText={
              <span>
                 {registerCompany.linkSite} 
              </span>
            }
            id="lastname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.atulizaValor(event, "site"),
              // endAdornment: (
              //   <InputAdornment
              //     position="end"
              //     className={classes.inputAdornment}
              //   >
              //     <Site className={classes.inputAdornmentIcon} />
              //   </InputAdornment>
              // )
            }}
          />
      </GridItem>
     
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            success={this.state.emailState === "success"}
            error={this.state.emailState === "error"}
            labelText={
              <span>
                {registerCompany.lkEmpresa} 
              </span>
            }
            id="email"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.atulizaValor(event, "linkedin"),
              // endAdornment: (
              //   <InputAdornment
              //     position="end"
              //     className={classes.inputAdornment}
              //   >
              //     <Site className={classes.inputAdornmentIcon} />
              //   </InputAdornment>
              // )
            }}
          />
            
            {this.state.error ? erros : null}
          <div className={classes.center} style={{marginLeft: "39%"}}>
            <Button round color="sonne" style={{float: "right"}} onClick={() => this.register()}>
              {registerCompany.cadastrar} 
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Body);
