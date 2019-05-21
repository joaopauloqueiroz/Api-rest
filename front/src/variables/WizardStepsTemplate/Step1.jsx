import React from "react";

// @material-ui/icons
import Business from "@material-ui/icons/Business";
/* import Business from "@material-ui/icon/Business "; */


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import {
  step1Template,
} from "variables/language.jsx";


import axios from "axios";

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


class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      firstnameState: "",
      lastname: "",
      lastnameState: "",
      simpleSelect: "",
      segment:"",
      segmentSate: "",
      imgUrl:"",
      criarUmavez: true,
    };
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {

      if ( event.target.value === null ||  event.target.value === "") {
        this.setState({ segmentSate: "error" });
      } else {
        this.setState({ segmentSate: "success" });
      }
      this.setState({ [event.target.name]: event.target.value });
  };
  
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  criar() {
      let parent = this;
      let imgUrl = 'https://blobmatrix.blob.core.windows.net/thumbnails/' + this.state.imgUrl;

      let form = {
        name: this.state.firstname,
        company: this.state.lastname,
        segment: this.state.simpleSelect,
        image_url: imgUrl,
        template: true,
      };
    
      let config = {
        headers: {
          Accept: "application/json"
        }, 
      };     
      if(this.state.criarUmavez){

        axios.post(process.env.REACT_APP_API_URL+"/plan/createTamplate/", form, config)
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
            window.location.href = "/Swot1";
          }
        })
        .then(function(val){
        });
      } else{
        this.atualizar();
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
     
       this.setState({
        criarUmavez: false, 
      });
  }

  imgUrl(img){
    this.setState({ imgUrl: img });
  }

  atualizar() {
    let parent = this;
    let config = {
      headers: {
        Accept: "application/json",
      },
    };
    //let id;
    axios.get(process.env.REACT_APP_API_URL+'/plan/getSession/',config)
    .then(function(response){
      let data = response.data;
        let id = data.id;
        let form = {
          id: id,
          name: parent.state.firstname,
          company: parent.state.lastname,
          segment: parent.state.simpleSelect,
        };
      
        let config = {
          headers: {
            Accept: "application/json"
          }, 
        };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

        axios.post(process.env.REACT_APP_API_URL+"/plan/update/", form, config)
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
             // window.location.href = "/home-plan";
            }
          })
          .then(function(val){
          });
    });
  }

  isValidated() {
    if (this.state.firstnameState === "success" && this.state.lastnameState === "success" && this.state.segmentSate === "success") {
      this.criar();
      return true; 
    } else {
      if (this.state.firstnameState !== "success") {
        this.setState({ firstnameState: "error" });
      }
      if (this.state.lastnameState !== "success") {
        this.setState({ lastnameState: "error" });
      }
      if (this.state.segmentSate !== "success") {
        this.setState({ segmentSate: "error" });
      }
    }
    return false;
  }


  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText} style={{fontFamily: 'Roboto', fontSize: '12pt'}}>
            {step1Template.info}
          </h4>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <ImageUpload  imgUrl = {this.imgUrl.bind(this)} />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <CustomInput
            success={this.state.firstnameState === "success"}
            error={this.state.firstnameState === "error"}
            labelText={
              <span>
                {step1Template.nomePlano} <small>{step1Template.obrigatorio}</small>
              </span>
            }
            id="firstname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "firstname", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                 <Business className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            success={this.state.lastnameState === "success"}
            error={this.state.lastnameState === "error"}
            labelText={
              <span>
                {step1Template.empresa} <small>{step1Template.obrigatorio}</small>
              </span>
            }
            id="lastname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "lastname", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Business className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
            {step1Template.selecioneSegmento} <small>{step1Template.obrigatorio}</small>
            </InputLabel>
            <Select
             success={this.state.segmentSate === "success"}
              error={this.state.segmentSate === "error"}
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.simpleSelect}             
              onChange={this.handleSimple}
              inputProps={{
                name: "simpleSelect",
                id: "simple-select"
              }}>
              <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                {step1Template.selecioneSegmento}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Acessórios Pessoais">
                {step1Template.acessoriosPessoais}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Advocacia">
                {step1Template.advocacia}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Agronegocio">
                {step1Template.agronegocio}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Alimentício">
                {step1Template.alimenticio}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Animais Domésticos">
                {step1Template.animaisDomesticos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Aparelhos de Consumo">
                {step1Template.aparelhoConsumo}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Arquitetura">
                {step1Template.arquitetura}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Automotivo">
                {step1Template.automotivo}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Aviação">
                {step1Template.aviacao}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Bebidas Alcoólicas">
                {step1Template.bebidasAlcoolicas}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Bebidas Quentes">
                 {step1Template.bebidasQuentes}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Beleza">
                {step1Template.beleza}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Brinquedos e Jogos">
                {step1Template.brinquedosJogos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Bens de Luxo">
                {step1Template.bensLuxo}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Canais Institucionais">
                {step1Template.canaisInstitucionais}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Casa e Jardim">
                {step1Template.casaJardim}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value=" Comércio">
                {step1Template.comercio}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Consultoria">
                {step1Template.consultoria}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Comida Embalada">
                {step1Template.comidaEmbalada}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Comida Fresca">
                {step1Template.comidaFresca}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Construção Civil">
                {step1Template.construçãoCivil}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Consumo Eletrônico">
                {step1Template.consumoEletronico}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Consumo Saúde">
                {step1Template.consumo}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Cosméticos">
                {step1Template.cosmeticos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Cuidado Domiciliário">
                {step1Template.cuidadoDomiciliario}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Cultural">
                {step1Template.cultural}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Educacional">
                {step1Template.educacional}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Embalagem">
                {step1Template.embalagem}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Farmacêutica">
                {step1Template.farmaceutica}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Finanças do Consumidor">
                {step1Template.finançasConsumidor}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Fornecimento">
                {step1Template.fornecimento} 
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Franquias">
                {step1Template.franquias}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Hoteleiro">
                {step1Template.hoteleiro}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Instrumentos">
                {step1Template.instrumentos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Incentivos">
                {step1Template.incentivos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Ingredientes">
                {step1Template.ingredientes}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Jurídico">
                {step1Template.juridico}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Óculos">
                {step1Template.oculos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Odontologia">
                {step1Template.odontologia}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Petroquímica">
                {step1Template.petroquimica}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Órgão Público">
                {step1Template.orgaoPublico}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Refrigerantes">
                {step1Template.refrigerantes}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Saúde">
                {step1Template.saude}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Seguros">
                {step1Template.seguro}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Serviços">
                {step1Template.servicos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Tabaco">
                {step1Template.tabaco}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Tecido e Higiene">
                {step1Template.tecidoHigiene}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Tecnologia">
                {step1Template.tecnologia}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Varejo">
                {step1Template.varejo}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Vestuário e Calçado">
                {step1Template.vestuarioCalcado}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Viagem">
                {step1Template.viagem}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Outro">
                 {step1Template.outro}
              </MenuItem>
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Step1);
