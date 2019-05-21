import React from "react";

// @material-ui/icons
import Business from "@material-ui/icons/Business";
/* import Business from "@material-ui/icon/Business "; */


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ImageUpload from "components/CustomUpload/ImageUploadEdit.jsx";
import priceImage1 from "assets/img/fundo-sonne.png";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import PictureUpload from "components/CustomUpload/PictureUpload.jsx";

import {
  editPlanStep1,
} from "variables/language.jsx";


import CustomInput from "components/CustomInput/CustomInput.jsx";


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
      name: "",
      nameState: "success",
      company: "",
      companyState: "success",
      simpleSelect: "",
      segment:"",
      imgUrl:"",
    };
  }

  imgUrl(img){
    this.setState({ imgUrl: img });
  }

  saveIMG(img){
    let image_url = "https://blobmatrix.blob.core.windows.net/thumbnails/" + img
    this.setState({ imgUrl: image_url });
  }

  componentWillMount(){
    let parent = this;
    let config = {
      headers: {
        Accept: "application/json",
      },
    };
  
    axios.get(process.env.REACT_APP_API_URL+'/plan/find-id-template/',config)
    .then(function(response){
      let data = response.data;
        let id;
        let name;
        let company;
        let segment;
        let imgURL;

        for (let x = 0; x < data.length; x++) {
          id = data[x].identity.low;
          name = data[x].properties.name;
          company = data[x].properties.company;
          segment = data[x].properties.segment;
          imgURL = data[x].properties.image_url;
        }
        
        parent.setState({
          id: id,
          name: name,
          company: company,
          segment: segment,
          simpleSelect: segment,
          imgUrl: imgURL,
        });
        parent.imgUrl(imgURL);            
    });   
  }

  sendState() {
    return this.state;
  }

  handleSimple = event => {
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

  atualizar() {
    let parent = this;
    let form = {
      id: this.state.id,
      name: this.state.name,
      company: this.state.company,
      segment: this.state.simpleSelect,
      image_url: this.state.imgUrl,
      template: true,
    };
    let config = {
      headers: {
        Accept: "application/json"
      }, 
    };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

    axios.post(process.env.REACT_APP_API_URL+"/plan/update-template/", form, config)
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
          window.location.href = "/home-plan";
        }
      })
      .then(function(val){
      });
    }

  isValidated() {
    if (this.state.nameState === "success" && this.state.companyState === "success") {
      this.atualizar();
      return true; 
    } 
    else {
      if (this.state.nameState !== "success") {
        this.setState({ nameState: "error" });
      }
      if (this.state.companyState !== "success") {
        this.setState({ companyState: "error" });
      }
    }
    return false;
  }

  render() {
 
    const { classes } = this.props;

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
             {editPlanStep1.info}
          </h4>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <ImageUpload saveIMG={this.saveIMG.bind(this)} imgUrlDefault = 
          {String(this.state.imgUrl) === 'priceImage1' || this.state.imgUrl === null || this.state.imgUrl === undefined || this.state.imgUrl === '' || this.state.imgUrl === "https://blobmatrix.blob.core.windows.net/thumbnails/" ? priceImage1 : 
                    this.state.imgUrl}
          />

        </GridItem>
        <GridItem xs={12} sm={6}>
          <CustomInput
           
            success={this.state.nameState === "success"}
            error={this.state.nameState === "error"}
            labelText={
              <span>
                 {editPlanStep1.nomePlano} <small>{editPlanStep1.obrigatorio}</small>
              </span>
            }
            id="name"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.name,
              onChange: event => this.change(event, "name", "length", 3),
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
            success={this.state.companyState === "success"}
            error={this.state.companyState === "error"}
            labelText={
              <span>
                {editPlanStep1.empresa} <small>{editPlanStep1.obrigatorio}</small>
              </span>
            }
            id="company"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.company,
              onChange: event => this.change(event, "company", "length", 3),
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
             {editPlanStep1.selecioneSegmento}
            </InputLabel>
            <Select
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
                {editPlanStep1.selecioneSegmento}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Acessórios Pessoais">
                {editPlanStep1.acessoriosPessoais}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Advocacia">
                {editPlanStep1.advocacia}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Agronegocio">
                {editPlanStep1.agronegocio}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Alimentício">
                {editPlanStep1.alimenticio}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Animais Domésticos">
                {editPlanStep1.animaisDomesticos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Aparelhos de Consumo">
                {editPlanStep1.aparelhoConsumo}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Arquitetura">
                {editPlanStep1.arquitetura}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Automotivo">
                {editPlanStep1.automotivo}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Aviação">
                {editPlanStep1.aviacao}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Bebidas Alcoólicas">
                {editPlanStep1.bebidasAlcoolicas}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Bebidas Quentes">
                 {editPlanStep1.bebidasQuentes}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Beleza">
                {editPlanStep1.beleza}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Brinquedos e Jogos">
                {editPlanStep1.brinquedosJogos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Bens de Luxo">
                {editPlanStep1.bensLuxo}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Canais Institucionais">
                {editPlanStep1.canaisInstitucionais}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Casa e Jardim">
                {editPlanStep1.casaJardim}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value=" Comércio">
                {editPlanStep1.comercio}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Consultoria">
                {editPlanStep1.consultoria}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Comida Embalada">
                {editPlanStep1.comidaEmbalada}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Comida Fresca">
                {editPlanStep1.comidaFresca}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Construção Civil">
                {editPlanStep1.construçãoCivil}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Consumo Eletrônico">
                {editPlanStep1.consumoEletronico}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Consumo Saúde">
                {editPlanStep1.consumo}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Cosméticos">
                {editPlanStep1.cosmeticos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Cuidado Domiciliário">
                {editPlanStep1.cuidadoDomiciliario}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Cultural">
                {editPlanStep1.cultural}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Educacional">
                {editPlanStep1.educacional}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Embalagem">
                {editPlanStep1.embalagem}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Farmacêutica">
                {editPlanStep1.farmaceutica}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Finanças do Consumidor">
                {editPlanStep1.finançasConsumidor}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Fornecimento">
                {editPlanStep1.fornecimento} 
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Franquias">
                {editPlanStep1.franquias}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Hoteleiro">
                {editPlanStep1.hoteleiro}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Instrumentos">
                {editPlanStep1.instrumentos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Incentivos">
                {editPlanStep1.incentivos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Ingredientes">
                {editPlanStep1.ingredientes}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Jurídico">
                {editPlanStep1.juridico}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Óculos">
                {editPlanStep1.oculos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Odontologia">
                {editPlanStep1.odontologia}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Petroquímica">
                {editPlanStep1.petroquimica}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Órgão Público">
                {editPlanStep1.orgaoPublico}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Refrigerantes">
                {editPlanStep1.refrigerantes}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Saúde">
                {editPlanStep1.saude}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Seguros">
                {editPlanStep1.seguro}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Serviços">
                {editPlanStep1.servicos}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Tabaco">
                {editPlanStep1.tabaco}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Tecido e Higiene">
                {editPlanStep1.tecidoHigiene}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Tecnologia">
                {editPlanStep1.tecnologia}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Varejo">
                {editPlanStep1.varejo}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Vestuário e Calçado">
                {editPlanStep1.vestuarioCalcado}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Viagem">
                {editPlanStep1.viagem}
              </MenuItem>
              <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value="Outro">
                 {editPlanStep1.outro}
              </MenuItem>
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Step1);
