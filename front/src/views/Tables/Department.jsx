import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import axios from "axios";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import PictureUpload from "components/CustomUpload/PictureUpload.jsx";
//import PictureUploadEdit from "components/CustomUpload/PictureUpload.jsx";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/PersonAdd";
import styled from "styled-components";
import vis from 'vis';
import 'vis/dist/vis.css';
import Save from "@material-ui/icons/Save";
import Input from './../../matrix/Input';
import AddCircle from "@material-ui/icons/AddCircle";

import {
  departamentoT,
} from "variables/language.jsx";

axios.defaults.withCredentials = true;

const Butttons = styled.div`
  display: inline-block;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  color: #002960;
  font-weight: bold;
  margin-left: 3.2%;

`;

const Icons = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.2vw;
  height: 1.2vw;
  border-radius: 1.2vw;
  font-size: 1.2vw;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  color: white;
  background-color: #002960;
  margin-top: 5%;
  margin-left: 1.5% !important;
  margin-right: 1.5%;
  margin-bottom: 1%;
`;

const Divs = styled.div`
  width: 100%;
  display: inline-block;
`;

const Buttton = styled.div`
  display: inline-block;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  margin-top: 1vh;
  color: #99a5b5;
  font-weight: bold;
  font-size: 14px;
  font-family: Roboto;
`;

const Icon = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.2vw;
  height: 1.2vw;
  border-radius: 1.2vw;
  font-size: 1.2vw;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  color: white;
  background-color: #d0ac54;
  margin-top: 5%;
  margin-left: 0.5%;
  margin-right: 1.5%;
  margin-bottom: 1%;
`;

const Div = styled.div`
  width: 100%;
  display: inline-block;
  text-align: right;
  margin-right: 2%;
`;


const Btnsuccess = styled.button `
  padding: 2%;
  background-color: #6fd61c;
  border-radius: 18px;
  border: none;
  padding-left: 4%;
  padding-right: 4%;
  margin-right: 5%;
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

/*const Area = styled.div`
  position: absolute;
  width: 95%;
  height: auto;
  top: 12%;
  left: 2.5%;
  background-color: white;
`;*/

const SelectOverview = styled.div`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 47.6%;
  height: 5%;
  top: 10%;
  left: 2.5%;
  font-size: 14pt;
  font-family: din-condensend, sans-serif;
  font-weight: 800;
  background-color: #081b31;
  color: white;
  cursor: pointer;
  z-index: 1;
`

const SelectChart = styled.div`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 47.6%;
  height: 5%;
  top: 10%;
  left: 50%
  font-size: 14pt;
  font-family: din-condensend, sans-serif;
  font-weight: 800;
  background-color: #081b31;
  color: white;
  cursor: pointer;
  z-index: 1;
`

const Org = styled.div`
  position: absolute;
  width: 95%;
  height: 85%;
  left: 2.5%;
  background-color: white;
  box-shadow: 0 1px 1px 1px rgba(8, 27, 49, 0.10), 0 1px 1px -2px rgba(8, 27, 49, 0.4);
`

class Department extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      usuarios: {
        nodes: [],
        edges: []
      },
      depList: [],
      dataTable: [],
      alert: null,
      department: "",
      error: "",
      arrayRetorno: [],
      alertShowCreateDep: null,
      alertShowCreateDepCancel: null,
      usuariosSemDepartamento: [],
      overview: true,
      msgErroEmail: "",
    };
  }

  getSession(){
    axios.get(process.env.REACT_APP_API_URL+"/company/departaments/all").then(res => {});
  }

  componentWillMount(){
    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      },
    };

    axios.get(process.env.REACT_APP_API_URL+'/company/chart', config)
    .then(function(response){
      let data = response.data.data;
      let array = [];
      let depList = [];
      let usuariosSemDepartamento = response.data.usuariosSemDepartamento;
      
      for (let x = 0;x<data.nodes.length;x++){
        if (Number.isInteger(data.nodes[x].idDep)){
          array.push(data.nodes[x]);
        }
      }

      let unique = array.filter((array, index, self) =>
        index === self.findIndex((t) => (
          t.idDep === array.idDep
        ))
      )

      for (let x = 0;x<data.nodes.length;x++){
        for (let y = 0;y<unique.length;y++){
          if (parseInt(data.nodes[x].id, 10) === parseInt(unique[y].idDep, 10)){
            depList.push({
              name: data.nodes[x].label,
              id: data.nodes[x].id,
            });
          }
        }
      }
      parent.carregar(data, depList, usuariosSemDepartamento);
    });
  }

  carregar(usuarios, depList, usuariosSemDepartamento){
    let parent = this;
    axios.get(process.env.REACT_APP_API_URL+"/company/departaments/all").then(res => {
      let values = res.data;
      let departamentos = [];
      for (let x = 0; x < values.length; x++) {
        departamentos.push(values[x].nameDep);
      }

      let departamentosSemDuplicata = [];
      let unique = {};
      departamentos.forEach(function(i) {
        if (!unique[i]) {
          unique[i] = true;
        }
      });
      departamentosSemDuplicata.push(Object.keys(unique));

      for (let x = 0; x < departamentosSemDuplicata[0].length; x++) {
        parent.state.arrayRetorno[departamentosSemDuplicata[0][x]] = [];
      }

      for (let x = 0; x < values.length; x++) {
        for (let y = 0; y < departamentosSemDuplicata[0].length; y++) {
          if (String(values[x].nameDep) === String(departamentosSemDuplicata[0][y])) {
            parent.state.arrayRetorno[departamentosSemDuplicata[0][y]].push(values[x]);
          }
        }
      }
      parent.setState({
        usuarios: usuarios,
        depList: depList,
        dataTable: parent.state.arrayRetorno,
        usuariosSemDepartamento: usuariosSemDepartamento,
      });
    });
  }

  updateTable(user, nameDep) {
    let dataTable = this.state.dataTable;
    dataTable[nameDep].push(user);
    this.setState({
      dataTable: dataTable,
    });
  }

  removeUser(idUser, nameDep) {
    let users = this.state.usuariosSemDepartamento;
    if (String(nameDep) !== 'Sem departamento'){
      let dataTable = this.state.dataTable;
      let array = dataTable[nameDep];
      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i].idUser === idUser) {
          array.splice(i, 1);
        }
      }
    }
    else{
      for (let x=0;x<users.length;x++){
        if (parseInt(users[x].id, 10) === parseInt(idUser, 10)) {
          users.splice(x, 1);
          break;
        }
      }
      this.setState({
        usuariosSemDepartamento: users,
      });
    }
  }

  removeDep(e, dep){
    let array = this.state.dataTable;
    delete array[e];
    this.setState({
      dataTable: array,
    });
  }

  hideAlertInputClose(){
    this.setState({
      alertShowCreateDep: null,
    });
  }

  inputConfirmAlert(e){
    this.createDep();
  }

  hideAlertInputCloseCancel(){
    this.setState({
      alertShowCreateDepCancel: null,
    });
  }

  hideAlert(){
    this.setState({
      alert: null,
    });
  }

  atulizaValor(e, type){
    this.setState({
      department: e.target.value,
    });
  }

  createUserEdge(idTo, idBoss, name, role){
    let usuarios = this.state.usuarios;
    let exist = false;
    let level;
    for (let x=0;x<usuarios.nodes.length;x++){
      if (parseInt(usuarios.nodes[x].id, 10) === parseInt(idTo, 10)){
        exist = true;
        break;
      }
    }

    if (exist){
      usuarios.edges.push({from: idBoss, to:idTo});
    }
    else{
      for (let x=0;x<usuarios.nodes.length;x++){
        if (parseInt(usuarios.nodes[x].id, 10) === parseInt(idBoss, 10)){
          level = usuarios.nodes[x].level+1;
          break;
        }
      }
      usuarios.nodes.push({
        id: idTo,
        shape: 'circularImage',
        image: '../../images/avatar.jpg',
        label: role+'\n'+name,
        level: level,
        noRelation: false,
      });
     usuarios.edges.push({from: idBoss, to:idTo}); 
    }

    this.setState({
      usuarios: usuarios,
    });
  }

  createDep(){
    let parent = this;
    let form = {
      name: this.state.department
    };
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    axios.post(process.env.REACT_APP_API_URL+"/company/create/department", form, config)
      .then(function(response){
        if (parseInt(response.data.status, 10) === 400){
          parent.setState({
            error: "error"
          });
        }
        else{
          if (parseInt(response.data.status, 10) === 201){
            let array = parent.state.arrayRetorno;
            array[response.data.data[0].nameDep] = [];
            array[response.data.data[0].nameDep].push(response.data.data[0]);

            parent.setState({
              arrayRetorno: array,
              alert: false
            });
          }
        }
    });
  }

  inputAlert() {
    this.setState({
      alert: true,
      error: ""
    });
  }

  inputAlertDep() {
    this.setState({
      alert: true,
      error: ""
    });
  }

  updateChartNode(id, name, role, idDep, email, image, password){
    let usuarios = this.state.usuarios;

    let first = true;
    let level = [];
    if (usuarios.nodes.length>0){
      level = usuarios.nodes.reduce(function(a, b) {
        if (first){
          first = false;
          return Math.max(parseInt(a.level, 10), parseInt(b.level, 10));
        }
        else{
          return Math.max(parseInt(a, 10), parseInt(b.level, 10)); 
        }
      });
    }

    usuarios.nodes.push({
      id: id,
      idDep: idDep,
      shape: 'circularImage',
      image: image,
      email: email,
      label: role+'\n'+name,
      level: level!=null && !isNaN(level)? level : 2,
      noRelation: true,
    });

    this.setState({
      usuarios: usuarios,
    });
  }

  deleteChartUser(id, idDep){
    if (idDep!=null){
      let usuarios = this.state.usuarios;

      for (let x=0;x<usuarios.nodes.length;x++){
        if (parseInt(usuarios.nodes[x].id, 10) === parseInt(id, 10)){
          usuarios.nodes.splice(x, 1);
        }
      }

      for (let x=0;x<usuarios.edges.length;x++){
        if (parseInt(usuarios.edges[x].from, 10) || parseInt(usuarios.edges[x].to, 10) === parseInt(id, 10)){
          usuarios.edges.splice(x, 1);
        }
      }
    }
  }

  render(){
    const {classes} = this.props;
    let campos = [];
    let arrayRetorno = this.state.arrayRetorno;
    let usuariosSemDepartamento = this.state.usuariosSemDepartamento;
    let i = 0;
    for (var departamento in arrayRetorno){
      if (typeof arrayRetorno[departamento] !== "function") {
        campos[i] = (
          <Box name={departamento} data={arrayRetorno[departamento]}
            key={departamento} idDep={arrayRetorno[departamento][0].idDep}
            classes={classes} updateTable={this.updateTable.bind(this)}
            removeUser={this.removeUser.bind(this)} removeDep={this.removeDep.bind(this)}
            updateChartNode={this.updateChartNode.bind(this)} 
            createUserEdge={this.createUserEdge.bind(this)}
            deleteChartUser={this.deleteChartUser.bind(this)}
          />
        );
        i++;
      }
    }

    campos.push(<BoxNoDep
      name={departamentoT.semDepartamento} data={usuariosSemDepartamento} key={'sem_departamento'}
      idDep={0} classes={classes} updateTable={this.updateTable.bind(this)}
      removeUser={this.removeUser.bind(this)} 
      updateChartNode={this.updateChartNode.bind(this)}
      createUserEdge={this.createUserEdge.bind(this)}
      deleteChartUser={this.deleteChartUser.bind(this)}
    />);


    return (
      <GridContainer style={{backgroundColor: '#fff', boxShadow: '0 1px 1px 1px rgba(235, 237, 240, 0.5), 0 1px 1px -2px rgba(8, 27, 49, 0.4)'}}>
      <SelectOverview style={this.state.overview ? {borderRadius: '4px'} : {backgroundColor: '#ccd2da', height: '4%', top: '10.7%', borderRadius: '0'}}
        onClick={() => this.setState({overview: true})}>
        OVERVIEW
      </SelectOverview>
      <SelectChart style={!this.state.overview ? {borderRadius: '4px'} : {backgroundColor: '#ccd2da', height: '4%', top: '10.5%', borderRadius: '0'}}
        onClick={() => this.setState({overview: false})}>
        ORGANIZATION CHART
      </SelectChart>
      {this.state.overview ? 
        <GridContainer justify="space-between">
        <GridItem xs={12} sm={6} md={12} lg={12}>
          {this.state.alertShowCreateDep}
          {this.state.alertShowCreateDepCancel}
          {this.state.alert ? (
            <SweetAlert
              // showCancel
              style={{
                position: "fixed",
                display: "block", 
                transform: "translate(-50%, -50%)", 
                marginTop: "0", 
                marginLeft: "0",
              }}
              title={departamentoT.crieDepartamento}
              cancelBtnText={departamentoT.btCancelar}
              confirmBtnText={departamentoT.btSalvar}
              showConfirm={false}
              // onConfirm={e => this.inputConfirmAlert(e)}
              onCancel={() => this.hideAlert()}
              
              confirmBtnCssClass={
                this.props.classes.button + " " + this.props.classes.success
              }
              cancelBtnCssClass={
                this.props.classes.button + " " + this.props.classes.danger
              }>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <CustomInput
                  labelText={
                    <span>
                      {departamentoT.nome} <small>(required)</small>
                    </span>
                  }
                  error={this.state.error === "error"}
                  id="lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: this.state.departament,
                    onChange: event => this.atulizaValor(event, "name")
                  }}
                  style={{ paddingTop: "0px !important" }}
                />
              </GridItem>
              <Btncancel onClick={() => this.hideAlert()}>{departamentoT.cancelar}</Btncancel>
              <Btnsuccess onClick={e => this.inputConfirmAlert(e)}>{departamentoT.salvar}</Btnsuccess>
            </SweetAlert>
          ) : null}

          <Divs >
            <div  style={{maxWidth: "75%"}}>
                <Butttons onClick={() => this.inputAlert()}>{departamentoT.adicionarDepartamento}</Butttons>
                <Icons style={{backgroundColor: '#fff'}} onClick={() => this.inputAlert()}><AddCircle style={{color: '#002960', position: 'absolute', marginTop: '6px', marginLeft: '-10px'}}/></Icons>
                </div>
              </Divs>
          <CardBody xs={12} sm={12} md={12} lg={12}>
            {campos}
          </CardBody>
        </GridItem>
        </GridContainer>
        :
        <Org>
          <Orgchart usuarios={this.state.usuarios} depList={this.state.depList} />
        </Org>
      }
      </GridContainer>
    );
  }
}

class Box extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      data: this.props.data,
      esconde: true,
      status: true,
      id: this.props.idDep,
      alert: false,
      show: false,
      classes: this.props.classes,
      nome: "",
      emaill: "",
      cargo: "",
      image: "",
      idDep: "",
      nameDep: "",
      registerNameState: "",
      registerEmailState: "",
      registerRoleState: "",
      user: [],
      alertShow: null,
      alertUpdate: null,
      erros: false,
      nameUser: "",
      emailUser: "",
      roleUser: "",
      idUser: "",
      formUp: {},
      alertDelete: null,
      alertShowDelete: null,
      alerAddMember: null,
      alertAdd: null,
      dataUsers: [],
      userId: "",
      color: "",
      imgUrl:"",
      alertCancel: null,
      editDep: false,
      isValid: false,
    };

    this.successDelete = this.successDelete.bind(this);
    this.cancelDetele = this.cancelDetele.bind(this);
    this.hideAlertInput = this.hideAlertInput.bind(this);
    this.hideAlertInputAdd = this.hideAlertInputAdd.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props){
      this.setState({
        name: this.props.name,
        data: this.props.data,
        status: this.props.status,
        user: this.props.user
      });
    }
  }

  mostra(){
    this.setState({
      esconde: !this.state.esconde
    });
  }

  hideAlertInputCaneladd(){
    this.setState({
      alertCancel: null
    });
  }

  hideAlert(){
    this.setState({
      alert: null
    });
  }

  hideAlertInputCreateUser(){
    this.setState({
      alertShowSuceesCreate: null
    });
  }

  inputConfirmAlert1(e){
    this.register();

    // this.setState({
    //   nome: '',
    //   email: '',
    //   cargo: '',
    //   idDep: '',
    // });
  }

  atulizaValor(evt, valor){
    if (String(valor) === "name"){
      this.setState({
        nome: evt.target.value
      });
    }

    if (String(valor) === "email"){
      this.setState({
        email: evt.target.value
      });
      this.change(evt, "registerEmail", "email");
    }

    if (String(valor) === "cargo"){
      this.setState({
        cargo: evt.target.value
      });
    }
  }

  register(){
    if(!this.state.isValid){
      this.setState({
        notValid: departamentoT.emailNotValid,
      })
      return false;
    }
       let parent = this;
    let imgUrl = 'https://blobmatrix.blob.core.windows.net/thumbnails/' + this.state.imgUrl;

    let form = {
      name: this.state.nome,
      email: this.state.email,
      role: this.state.cargo,
      idDep: this.state.idDep,
      gender: "",
      graduation: "",
      profile: "",
      password: "",
      color: "",
      date: "",
      file: "",
      image_url: imgUrl,
    };


    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    /**
     * atualizar a classe de erro para não ficar sempre com erro
     */
    this.setState({
      EmailState: "success",
      registerNameState: "success",
      registerRoleState: "success"
    });
    
    let userUpdate = "";
    axios.post(process.env.REACT_APP_API_URL+"/users/create/interno", form, config)
      .then(function(response) {
        if (parseInt(response.data.status, 10) === 400){
          parent.setState({
            erros: true
          });
          let nameErro = "";
          let cargoErro = "";
          let emailErro = "";
          let erro = "";
          for (let i = 0; i < response.data.errors.length; i++) {
            if (String(response.data.errors[i].param) === "name"){
              nameErro= "error";
            }
            if (String(response.data.errors[i].param) === "email"){
             
              if(String(response.data.errors[i].msg) === "O email já existe"){
                erro = departamentoT.errorEmail;
              }
              emailErro = "error";
            }
            if (String(response.data.errors[i].param) === "role"){
              cargoErro = "error";
            }
          }

          parent.setState({
            registerNameState: nameErro,
            registerRoleState: cargoErro,
            registerEmailState: emailErro,
            msgErroEmail: erro,
          })

        } 
        else{
          if (parseInt(response.data.status, 10) === 201){
            userUpdate = {
              email: response.data.data.user.properties.email,
              role: response.data.data.user.properties.role,
              nameUser: response.data.data.user.properties.name,
              idDep: response.data.data.user.properties.idDep,
              idUser: response.data.data.idUser.low
            };
            parent.props.updateChartNode(response.data.data.idUser.low, form.name, form.role, form.idDep, form.email, form.image_url, form.password);
            parent.props.updateTable(userUpdate, parent.state.nameDep);
            parent.setState({ alert: null });
          }
        }
    });
  }

  inputAlert(evt, id){
    this.setState({
      error: "",
      registerRoleState: "",
      registerNameState: "",
      registerEmailState: "",
      msgErroEmail: "",
      idDep: this.state.id,
      nameDep: this.state.name,
      alert: true
    });
  }

  updateImage(file, reader){
    this.setState({
      file: file,
      imagePreviewUrl: reader.result
    });
  }

  showAlert(name, id, idDep, imgUrl){
    this.setState({
      alertShow: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Deletar Usuário?"
          onCancel={() => this.cancelDetele()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          showCancel={false}
          showConfirm={false}>
          {departamentoT.certezaDeletar}
          <br />
          <br />
          <br />
          <Btncancel onClick={() => this.cancelDetele()}>{departamentoT.naoCancelar}</Btncancel>
          <Btnsuccess onClick={() => this.successDelete(id, name, idDep, imgUrl)}>{departamentoT.simDeletar}</Btnsuccess>
        </SweetAlert>
      )
    });
  }

  cancelDetele(){
    this.setState({
      alertShow: null,
    });
  }

  hideAlertInput() {
    this.setState({
      alertShow: null,
    });
  }

  successDelete(id, name, idDep, imgUrl){
    this.props.deleteChartUser(id, idDep);
    this.setState({
      alertShow: null,
    });
    /**
     * Axios para deletar user
     */
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    let parent = this;
    axios.post(
        process.env.REACT_APP_API_URL+"/users/delete/user",
        { id: id, idDep: idDep },
        config
      ).then(function(response) {});

    this.props.removeUser(id, name);
    let dados = {
      blobName: imgUrl,
    }

    axios.post(process.env.REACT_APP_API_URL+"/upload/delete/", dados, config)
      .then(function(response){
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
        }
        else{
          // parent.removerCard();
          // setTimeout(function(){ window.location.reload() }, 450);
        }
      })
      .then(function(val){
    });
  }

  successDeleteDep(){
    this.setState({
      alertDelete: null
    });
    /**
     * Axios para deletar um departamento
     */
    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };
    let form = {
      id: this.state.id
    };
    axios.post(process.env.REACT_APP_API_URL+"/company/departament/delete", form, config)
    .then(function(response) {
      parent.props.removeDep(parent.state.name);
    });
  }

  cancelDeteleDep() {
    this.setState({
      alertDelete: null
    });
  }

  showAlertDep(){
    this.setState({
      alertDelete: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Deletar Departamento?"
          showConfirm={false}
          showCancel={false}
          // onConfirm={() => this.successDeleteDep()}
          // onCancel={() => this.cancelDeteleDep()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Sim, Deletar!"
          cancelBtnText="Não, Cancelar!">
          {departamentoT.certezaDeletarDp}
          <br/>
          <br/>
          <br/>
          <Btncancel onClick={() => this.cancelDeteleDep()}>{departamentoT.naoCancelar}</Btncancel>
          <Btnsuccess onClick={() => this.successDeleteDep()}>{departamentoT.simDeletar}</Btnsuccess>
        </SweetAlert>
      )
    });
  }

  hideAlertInputAdd(){
    this.setState({
   
    });
  }

  hideAlertInputAddsuccess(){
    this.setState({
      alertAdd: null
    });
  }

  hideAlertUseradd(){
    this.vincularUser(this.state.id);

    this.setState({
      alerAddMember: null,
      alertAdd: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-250px" }}
          title={departamentoT.adicionado}
          onConfirm={() => this.hideAlertInputAddsuccess()}
          onCancel={() => this.hideAlertInputAddsuccess()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }>
          {departamentoT.adicionadoSucesso}
        </SweetAlert>
      )
    });
  }

  hideAlertUseraddCancel(){
    this.setState({
      alerAddMember: null,
    });
  }

  hideAlertCanceladd(){
    this.setState({
      alerAddMember: null,
    });
  }

  getAllUsers(){
    axios.get(process.env.REACT_APP_API_URL+"/company/get-all-users").then(res => {
      this.setState({
        dataUsers: res.data.data,
      });
    });
  }

  updateId(id, i){
    this.setState({
      userId: id,
      color: i,
    });
  }

  vincularUser(){
    //let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    axios.post(
      process.env.REACT_APP_API_URL+"/users/vincular",
      { idDep: this.state.id, idUser: this.state.userId },
        config
      )
      .then(function(response) {
        if (parseInt(response.data.status, 10) === 400) {
        } else {
          if (parseInt(response.data.status, 10) === 200) {

          }
        }
    });
  }

  addMember(){
    this.getAllUsers();
    this.setState({
      alerAddMember: true,
    });
  }

  verifyEmail(value){
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)){
      this.setState({
        isValid: true,
      })
      return true;
    }
    this.setState({
      isValid: false,
    })
    return false;
  }

  change(event, stateName, type, stateNameEqualTo, maxValue){
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

  imgUrl(img){
    this.setState({
      imgUrl: img,
    });
  }

  alerEditDep(){
    this.setState({
      editDep: true,
      departament: this.state.name
    })
  }

  closeEdit(){
    this.setState({
      editDep: false,
    })
  }

  editDeparment(){
    let parent = this;
    let id = this.state.id;
    let name = this.state.departament;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    
    axios.post(process.env.REACT_APP_API_URL+"/company/create/department", {id: id, name: name},config)
      .then(function(response){
        if (parseInt(response.data.status, 10) === 400){
          parent.setState({
            error: "error"
          });
        }
        else{
          if (parseInt(response.data.status, 10) === 201){
          }
        }
    });

    this.setState({
      name: name,
      editDep: false,
    })
    
  }

  atulizaValorDep(e, valor){
    if(String(valor) === "name"){
      this.setState({
        departament: e.target.value,
      })
    }
  }

  render(){
    //let tudo = [];
    let status = true;
    let data = this.state.data;

    let tudo = data.map((item, i) => <Table2
      imageUrl={item.image_url}
      name={item.nameUser}
      email={item.email}
      role={item.role}
      key={i + item}
      status={status}
      idDep={item.idDep}
      idUser={item.idUser}
      classes={this.state.classes}
      showAlert={this.showAlert.bind(this, this.state.name)}
      createUserEdge={this.props.createUserEdge}
    />);

    let data2 = [];
    let values = this.state.dataUsers;

    if (String(values) !== ""){
      data2 = values.map((item, i) => 
        <TableRow key={item.name} style={{ cursor: "pointer" }}>
          <TableCell xs={12} sm={12} md={12} lg={12} key={item + i + "1"}
            onClick={e => this.updateId(item.id.low, i)}
            style={{
              backgroundColor: this.state.color === i ? "#ccd2da" : "white"
            }}>
            {item.name}
        </TableCell>
          <TableCell xs={12} sm={12} md={12} lg={12} key={item + i + "0"}
            onClick={e => this.updateId(item.id.low, i)}
            style={{
              backgroundColor: this.state.color === i ? "#ccd2da" : "white"
            }}>
            {item.email}
          </TableCell>
        </TableRow>);
    }

    return (
      <GridContainer>
        {this.state.alertShowSuceesCreate}
        {this.state.alerAddMember}
        {this.state.alertAdd}
        {this.state.alertShow}
        {this.state.alertCancel}
        {this.state.editDep ?(
          <SweetAlert
          // showCancel
          style={{
            position: "fixed",
            display: "block", 
            transform: "translate(-50%, -50%)", 
            marginTop: "0", 
            marginLeft: "0",
          }}
          title={departamentoT.editDepartamento}
          cancelBtnText={departamentoT.btCancelar}
          confirmBtnText={departamentoT.btSalvar}
          showConfirm={false}
          // onConfirm={e => this.inputConfirmAlert(e)}
          onCancel={() => this.closeEdit()}
          
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <CustomInput
              labelText={
                <span>
                  {departamentoT.nome} <small>(required)</small>
                </span>
              }
              error={this.state.error === "error"}
              id="lastname"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.departament,
                onChange: event => this.atulizaValorDep(event, "name")
              }}
              style={{ paddingTop: "0px !important" }}
            />
          </GridItem>
          <Btncancel onClick={() => this.closeEdit()}>{departamentoT.cancelar}</Btncancel>
          <Btnsuccess onClick={e => this.editDeparment()}>{departamentoT.salvar}</Btnsuccess>
        </SweetAlert>
        ) : null}

        {this.state.alerAddMember ? (
          <SweetAlert
            style={{ display: "block", transform: "translateY(-20%)"}}
            title={departamentoT.selectResponsavel}
            onConfirm={() => this.hideAlertUseradd()}
            onCancel={() => this.hideAlertUseraddCancel()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
            cancelBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            confirmBtnText={departamentoT.confirmText}
            cancelBtnText={departamentoT.cancelarM}
            showCancel>
            {this.state.erroVinculo ? (
              <div
                className={this.props.classes.danger}
                style={{ padding: "2%", color: "#ffffff" }}
              >
                {departamentoT.selecioneUsuario}
              </div>
            ) : null}
            <Table>
              <TableHead>
                <TableRow style={{ overflow: "scroll" }}>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ overflow: "scroll" }}>{data2}</TableBody>
            </Table>
            
          </SweetAlert>
        ) : null}

        {this.state.alert ? (
          <GridContainer justify="center">
            <SweetAlert
              style={{ display: "table", marginTop: "-300px", width: "30%" }}
              title={departamentoT.cadastrarUser}
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
                {/* recebe a imagem */}
                <PictureUpload idUser={this.state.idUser} upload={false} updateImage={this.updateImage.bind(this)} imgUrl={this.imgUrl.bind(this)}/>
              </GridItem>

              <GridItem>
                <CustomInput
                  error={this.state.registerNameState === "error"}
                  labelText={
                    <span>
                     {departamentoT.nome} <small>{departamentoT.obrigatorio}</small>
                    </span>
                  }
                  id="lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.atulizaValor(event, "name")
                  }}
                  style={{ paddingTop: "0px !important" }} />
              </GridItem>

              <GridItem xs={12} sm={12} md={12} lg={12}>
                {this.state.msgErroEmail ? 
                    <div style={{color: '#721c24', backgroundColor: '#f8d7da', border: "1px solid #f5c6cb", padding: '10px', marginTop: '-10px', marginBottom: '15px', borderRadius: '5px'}}>{this.state.msgErroEmail}</div> : null
                }
                {this.state.notValid ? 
                    <div style={{color: '#721c24', backgroundColor: '#f8d7da', border: "1px solid #f5c6cb", padding: '10px', marginTop: '-10px', marginBottom: '15px', borderRadius: '5px'}}>{this.state.notValid}</div> : null
                }
                
                
                <CustomInput
                  error={this.state.registerEmailState === "error"}
                  labelText={
                    <span>
                     {departamentoT.email} <small>{departamentoT.obrigatorio}</small>
                    </span>
                  }
                  id="lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.atulizaValor(event, "email"),
                  }} />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <CustomInput
                  error={this.state.registerRoleState === "error"}
                  labelText={
                    <span>
                      {departamentoT.cargo} <small>{departamentoT.obrigatorio}</small>
                    </span>
                  }
                  id="lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.atulizaValor(event, "cargo")
                  }} />
              </GridItem>

              <Btncancel onClick={() => this.hideAlert()} >{departamentoT.cancelar}</Btncancel>
              <Btnsuccess onClick={e => this.inputConfirmAlert1(e)}>{departamentoT.cadastrar}</Btnsuccess>

            </SweetAlert>
          </GridContainer>
        ) : null}

        <GridItem xs={12} sm={12} md={12}>
          {this.state.alertDelete}
          <Card>
            <CardHeader
              color="azul"
              style={{
                cursor: "pointer",
                height: "6vh",
                display: "flex",
                alignItems: "center"
              }}>
              <h4 onClick={this.mostra.bind(this)} style={{fontWeight: "bold"}}>{this.state.name}</h4>
              <div
                style={{
                  position: "absolute",
                  right: "0.5vw",
                  top: "2vh",
                }}>
                <Edit onClick={() => this.alerEditDep()} />
                &nbsp;
                <Delete onClick={() => this.showAlertDep()} />
              </div>
              {"    "}
              {/* <AddMember onClick={() => this.addMember()} /> */}
            </CardHeader>
            <Table>
              {this.state.esconde ? (
                <TableHead>
                  <TableRow>
                    <TableCell>{departamentoT.nome}</TableCell>
                    <TableCell>{departamentoT.email}</TableCell>
                    <TableCell>{departamentoT.role}</TableCell>
                    <TableCell>{departamentoT.acoes}</TableCell>
                  </TableRow>
                </TableHead>
              ) : null}
              {this.state.esconde ? tudo : null}
            </Table>
            <Div >
              <Buttton onClick={this.inputAlert.bind(
                this,
                this.state.id,
                this.state.name
              )}>{departamentoT.adicionarUsuario}</Buttton>
              <Icon style={{backgroundColor: '#fff'}} onClick={this.inputAlert.bind(
                this,
                this.state.id,
                this.state.name
              )}><AddCircle style={{color: 'rgb(224, 172, 84)',position: 'absolute', marginTop: '6px'}}/></Icon>
            </Div>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

class BoxNoDep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      data: this.props.data,
      esconde: true,
      status: true,
      id: this.props.idDep,
      alert: false,
      show: false,
      classes: this.props.classes,
      nome: "",
      emaill: "",
      cargo: "",
      image: "",
      idDep: "",
      nameDep: "",
      registerNameState: "",
      registerEmailState: "",
      registerRoleState: "",
      user: [],
      alertShow: null,
      alertUpdate: null,
      erros: false,
      nameUser: "",
      emailUser: "",
      roleUser: "",
      idUser: "",
      formUp: {},
      alertDelete: null,
      alertShowDelete: null,
      alerAddMember: null,
      alertAdd: null,
      dataUsers: [],
      userId: "",
      color: "",
      imgUrl:"",
      alertCancel: null
    };
    this.successDelete = this.successDelete.bind(this);
    this.cancelDetele = this.cancelDetele.bind(this);
    this.hideAlertInput = this.hideAlertInput.bind(this);
    this.hideAlertInputAdd = this.hideAlertInputAdd.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        name: this.props.name,
        data: this.props.data,
        status: this.props.status,
        user: this.props.user
      });
    }
  }

  mostra() {
    this.setState({
      esconde: !this.state.esconde,
    });
  }

  hideAlertInputCaneladd() {
    this.setState({
      alertCancel: null,
    });
  }

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  hideAlertInputCreateUser() {
    this.setState({
      alertShowSuceesCreate: null,
    });
  }

  inputConfirmAlert1(e) {
    this.register();

    // this.setState({
    //   nome: '',
    //   email: '',
    //   cargo: '',
    //   idDep: '',
    // });
  }

  atulizaValor(evt, valor) {
    if (String(valor) === "name") {
      this.setState({
        nome: evt.target.value
      });
    }

    if (String(valor) === "email") {
      this.setState({
        email: evt.target.value
      });
      this.change(evt, "registerEmail", "email");
    }

    if (String(valor) === "cargo") {
      this.setState({
        cargo: evt.target.value
      });
    }
  }

  register() {
    let parent = this;
    let imgUrl = 'https://blobmatrix.blob.core.windows.net/thumbnails/' + this.state.imgUrl;

    let form = {
      name: this.state.nome,
      email: this.state.email,
      role: this.state.cargo,
      idDep: this.state.idDep,
      gender: "",
      graduation: "",
      profile: "",
      password: "",
      color: "",
      date: "",
      file: "",
      image_url: imgUrl,
    };

    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    /**
     * atualizar a classe de erro para não ficar sempre com erro
     */
    this.setState({
      registerEmailState: "success",
      registerNameState: "success",
      registerRoleState: "success"
    });
    
    let userUpdate = "";
    axios.post(process.env.REACT_APP_API_URL+"/users/create/interno", form, config)
      .then(function(response) {
        if (parseInt(response.data.status, 10) === 400){
          parent.setState({
            erros: true
          });

          for (let i = 0; i < response.data.errors.length; i++) {
            if (String(response.data.errors[i].param) === "name") {
              parent.setState({
                registerNameState: "error"
              });
            }
            if (String(response.data.errors[i].param) === "email") {
              parent.setState({
                registerEmailState: "error"
              });
            }
            if (String(response.data.errors[i].param) === "role") {
              parent.setState({
                registerRoleState: "error"
              });
            }
          }
        } 
        else{
          if (parseInt(response.data.status, 10) === 201) {
            userUpdate = {
              email: response.data.data.user.properties.email,
              role: response.data.data.user.properties.role,
              nameUser: response.data.data.user.properties.name,
              idDep: response.data.data.user.properties.idDep,
              idUser: response.data.data.idUser.low
            };
            parent.props.updateChartNode(response.data.data.idUser.low, form.name, form.role, form.idDep, form.email, form.image_url, form.password);
            parent.props.updateTable(userUpdate, parent.state.nameDep);
            parent.setState({ alert: null });
          }
        }
    });
  }

  inputAlert(evt, id) {
    this.setState({
      idDep: this.state.id,
      nameDep: this.state.name,
      alert: true
    });
  }

  updateImage(file, reader) {
    this.setState({
      file: file,
      imagePreviewUrl: reader.result
    });
  }

  showAlert(name, id, idDep, imgUrl){
    this.setState({
      alertShow: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title={departamentoT.deletarUser}
          onCancel={() => this.cancelDetele()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          showCancel={false}
          showConfirm={false}>
          {departamentoT.certezaDeletar}
          <br />
          <br />
          <br />

          <Btncancel onClick={() => this.cancelDetele()}>{departamentoT.naoCancelar}</Btncancel>
          <Btnsuccess onClick={() => this.successDelete(id, name, idDep, imgUrl)}>{departamentoT.simDeletar}</Btnsuccess>
        </SweetAlert>
      )
    });
  }

  cancelDetele(){
    this.setState({
      alertShow: null,
    });
  }

  hideAlertInput(){
    this.setState({
      alertShow: null,
    });
  }

  successDelete(id, name, idDep, imgUrl){
    this.props.deleteChartUser(id, idDep);
    this.setState({
      alertShow: null
    });
    /**
     * Axios para deletar user
     */
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    let parent = this;

    axios.post(
        process.env.REACT_APP_API_URL+"/users/delete/user",
        { id: id, idDep: idDep },
        config
      )
      .then(function(response) {});

    this.props.removeUser(id, name);

    let dados = {
      blobName: imgUrl,
    }

    axios.post(process.env.REACT_APP_API_URL+"/upload/delete/", dados, config)
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
        }
        else{
          // parent.removerCard();
          // setTimeout(function(){ window.location.reload() }, 450);
        }
      })
      .then(function(val){
    });
  }

  successDeleteDep(){
    this.setState({
      alertDelete: null
    });
    /**
     * Axios para deletar um departamento
     */
    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };
    let form = {
      id: this.state.id
    };
    axios.post(process.env.REACT_APP_API_URL+"/company/departament/delete", form, config)
      .then(function(response) {
        parent.props.removeDep(parent.state.name);
    });
  }

  cancelDeteleDep() {
    this.setState({
      alertDelete: null,     
    });
  }

  showAlertDep() {
    this.setState({
      alertDelete: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title={departamentoT.deletarDepartamento}
          showConfirm={false}
          showCancel={false}
          // onConfirm={() => this.successDeleteDep()}
          // onCancel={() => this.cancelDeteleDep()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText={departamentoT.simDeletar}
          cancelBtnText={departamentoT.naoCancelar}
        >
          {departamentoT.certezaDeletarDp}
          <br/>
          <br/>
          <br/>
          <Btncancel onClick={() => this.cancelDeteleDep()}>NÃO, CANCELAR</Btncancel>
          <Btnsuccess onClick={() => this.successDeleteDep()}>SIM, DELETAR!</Btnsuccess>
          
        </SweetAlert>
      )
    });
  }

  hideAlertInputAdd() {
    this.setState({
   
    });
  }

  hideAlertInputAddsuccess() {
    this.setState({
      alertAdd: null,
    });
  }

  hideAlertUseradd() {
    this.vincularUser(this.state.id);

    this.setState({
      alerAddMember: null,
      alertAdd: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-250px" }}
          title="ADICIONADO!"
          onConfirm={() => this.hideAlertInputAddsuccess()}
          onCancel={() => this.hideAlertInputAddsuccess()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          {departamentoT.adicionadoSucesso}
        </SweetAlert>
      )
    });
  }

  hideAlertUseraddCancel() {
    this.setState({
      alerAddMember: null,
    });
  }

  hideAlertCanceladd() {
    this.setState({
      alerAddMember: null,
    });
  }

  getAllUsers() {
    axios.get(process.env.REACT_APP_API_URL+"/company/get-all-users").then(res => {
      this.setState({
        dataUsers: res.data.data
      });
    });
  }

  updateId(id, i) {
    this.setState({
      userId: id,
      color: i,
    });
  }

  vincularUser() {
    //let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    axios.post(
        process.env.REACT_APP_API_URL+"/users/vincular",
        { idDep: this.state.id, idUser: this.state.userId },
        config
      )
      .then(function(response) {
        if (parseInt(response.data.status, 10) === 400) {
        } else {
          if (parseInt(response.data.status, 10) === 200) {

          }
        }
      });
  }

  addMember() {
    this.getAllUsers();
    this.setState({
      alerAddMember: true
    });
  }

  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo, maxValue){
    if (String(type)==="email"){
      this.setState({
        email: event.target.value,
      });
      if (this.verifyEmail(event.target.value)) {
        this.setState({
          [stateName + "State"]: "success",
        });
      } 
      else {
        this.setState({
          [stateName + "State"]: "error",
        });
      }
    }
  }

  imgUrl(img){
    this.setState({ 
      imgUrl: img,
    });
  }

  render() {
    //let tudo = [];
    let status = true;
    let data = this.state.data;

    let tudo = data.map((item, i) => <Table2
      name={item.name}
      email={item.email}
      image_url={item.image_url}
      role={item.role}
      key={i + item}
      status={status}
      idDep={item.idDep}
      idUser={item.id}
      classes={this.state.classes}
      showAlert={this.showAlert.bind(this, this.state.name)}
      createUserEdge={this.props.createUserEdge}
    />);

    let data2 = [];
    let values = this.state.dataUsers;

    if (String(values) !== "") {
      data2 = values.map((item, i) => 
        <TableRow key={item.name} style={{ cursor: "pointer" }}>
          <TableCell
            xs={12}
            sm={12}
            md={12}
            lg={12}
            key={item + i + "1"}
            onClick={e => this.updateId(item.id.low, i)}
            style={{
              backgroundColor: this.state.color === i ? "#ccd2da" : "white",
            }}
          >
            {item.name}
          </TableCell>
          <TableCell
            xs={12}
            sm={12}
            md={12}
            lg={12}
            key={item + i + "0"}
            onClick={e => this.updateId(item.id.low, i)}
            style={{
              backgroundColor: this.state.color === i ? "#ccd2da" : "white",
            }}>
            {item.email}
          </TableCell>
        </TableRow>);
    }

    return (
      <GridContainer>
        {this.state.alertShowSuceesCreate}
        {this.state.alerAddMember}
        {this.state.alertAdd}
        {this.state.alertShow}
        {this.state.alertCancel}
        {this.state.alerAddMember ? (
          <SweetAlert
            style={{ display: "block", transform: "translateY(-20%)"}}
            title={departamentoT.selectResponsavel}
            onConfirm={() => this.hideAlertUseradd()}
            onCancel={() => this.hideAlertUseraddCancel()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
            cancelBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            confirmBtnText={departamentoT.confirmText}
            cancelBtnText={departamentoT.cancelarM}
            showCancel>
            {this.state.erroVinculo ? (
              <div
                className={this.props.classes.danger}
                style={{padding: "2%", color: "#ffffff"}}>
                {departamentoT.selecioneUsuario}           
              </div>
            ) : null}
            <Table>
              <TableHead>
                <TableRow style={{ overflow: "scroll" }}>
                  <TableCell>{departamentoT.nome}</TableCell>
                  <TableCell>{departamentoT.email}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ overflow: "scroll" }}>{data2}</TableBody>
            </Table>
            fadfdsf
          </SweetAlert>
        ) : null}

        {this.state.alert ? (
          <GridContainer justify="center">
            <SweetAlert
              style={{display: "table", marginTop: "-300px", width: "30%" }}
              title={departamentoT.cadastrarUser}
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
                {/* recebe a imagem */}
                <PictureUpload  idUser={this.state.idUser} upload={false} updateImage={this.updateImage.bind(this)} imgUrl={this.imgUrl.bind(this)}/>
              </GridItem>

              <GridItem>
                <CustomInput
                  error={this.state.registerNameState === "error"}
                  labelText={
                    <span>
                      {departamentoT.nome} <small>{departamentoT.obrigatorio}</small>
                    </span>
                  }
                  id="lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.atulizaValor(event, "name")
                  }}
                  style={{ paddingTop: "0px !important" }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={12} lg={12}>
                <CustomInput
                  error={this.state.registerEmailState === "error"}
                  labelText={
                    <span>
                      {departamentoT.email} <small>{departamentoT.obrigatorio}</small>
                    </span>
                  }
                  id="lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.atulizaValor(event, "email"),
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <CustomInput
                  error={this.state.registerRoleState === "error"}
                  labelText={
                    <span>
                      {departamentoT.cargo}<small>{departamentoT.obrigatorio}</small>
                    </span>
                  }
                  id="lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.atulizaValor(event, "cargo")
                  }}
                />
              </GridItem>

              <Btncancel onClick={() => this.hideAlert()} >{departamentoT.cancelar}</Btncancel>
              <Btnsuccess onClick={e => this.inputConfirmAlert1(e)}>{departamentoT.cadastrar}</Btnsuccess>

            </SweetAlert>
          </GridContainer>
        ) : null}

        <GridItem xs={12} sm={12} md={12}>
          {this.state.alertDelete}
          <Card>
            <CardHeader
              color="azul"
              style={{
                cursor: "pointer",
                height: "6vh",
                display: "flex",
                alignItems: "center"
              }}
            >
              <h4 onClick={this.mostra.bind(this)} 
                style={{fontWeight: "bold"}}>{this.state.name}</h4>
              {"    "}
              {/* <AddMember onClick={() => this.addMember()} /> */}
            </CardHeader>
            <Table>
              {this.state.esconde ? (
                <TableHead>
                  <TableRow>
                    <TableCell>{departamentoT.nome}</TableCell>
                    <TableCell>{departamentoT.email}</TableCell>
                    <TableCell>{departamentoT.role}</TableCell>
                    <TableCell>{departamentoT.acoes}</TableCell>
                  </TableRow>
                </TableHead>
              ) : null}
              {this.state.esconde ? tudo : null}
            </Table>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

class Table2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      email: this.props.email,
      role: this.props.role,
      imageUrl: this.props.imageUrl,
      alert: null,
      idUser: this.props.idUser,
      idDep: this.props.idDep,
      alertUpdate: false,
      nameUp: "",
      emailUp: "",
      roleUp: "",
      idUp: "",
      basicAlert: null,
      allUsers: [],
      allUserId: "",
      nameUserAll: "",
      emailUserAll: "",
      color: "",
      iduserVinc: "",
      erroVinculo: false,
      alertShowupdateUser: null,
      alertShowConfirmUpdate: null,
      alertShowConfirmvinculo: null,
      alertShowCancelvinculo: null,
      imagePreviewUrl: '',
      file: '',
      imgUrl:''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        name: this.props.name,
        email: this.props.email,
        role: this.props.role,
        idUser: this.props.idUser
      });
    }
  }

  updateImage(file, reader) {
    this.setState({
      file: file,
      imagePreviewUrl: reader.result
    });
  }

  imgUrl(img){
    this.setState({
      imgUrl: img,
    });
  }

  showAlert2() {
    this.setState({
      alertUpdate: true,
      emailUp: this.state.email,
      nameUp: this.state.name,
      roleUp: this.state.role,
      idUp: this.state.idUser
    });
  }

  hideAlertInputCancelUpdate() {
    this.setState({
      alertShowupdateUser: null
    });
  }

  hideAlert2() {
    this.setState({
      alertUpdate: null
    
    });
  }

  atulizaValor(e, type) {
    if (String(type) === "name") {
      this.setState({
        nameUp: e.target.value
      });
    }

    if (String(type) === "email") {
      this.setState({
        emailUp: e.target.value
      });
    }
    if (String(type) === "role") {
      this.setState({
        roleUp: e.target.value
      });
    }
  }

  hideAlertInputInputUpdate() {
    this.setState({
      alertShowConfirmUpdate: null
    });
  }

  inputConfirmAlert(e, id) {
    this.updateUser(e, id);
    this.setState({
      alertUpdate: null
      
    });
  }

  updateUser(e, id) {

    let imgUrl = 'https://blobmatrix.blob.core.windows.net/thumbnails/' + this.state.imgUrl;
    let form = {
      name: this.state.nameUp,
      email: this.state.emailUp,
      role: this.state.roleUp,
      image_url: imgUrl,
    };

    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    axios.post(process.env.REACT_APP_API_URL+"/users/edit/user", { form, id: id }, config)
      .then(function(response) {
        let erro = [];
        if (parseInt(response.data.status, 10) === 400) {
          for (let i = 0; i < response.data.errors.length; i++) {
            erro[i] = response.data.errors[i].msg;
          }
          parent.setState({
            errors: erro,
            error: true
          });
          erro = null;
        } else {
          if (parseInt(response.data.status, 10) === 201) {
            parent.setState({
              alertUpdate: null,
              name: response.data.data.user.properties.name,
              email: response.data.data.user.properties.email,
              role: response.data.data.user.properties.role
            });
          }
        }
      });
  }

  getAllUsers() {
    axios.get(process.env.REACT_APP_API_URL+"/company/get-all-users").then(res => {
      this.setState({
        allUsers: res.data.data
      });
    });
  }

  basicAlertUser() {
    this.getAllUsers();
    this.setState({
      basicAlert: true
    });
  }

  hideAlertInputInputVinculo() {
    this.setState({
      alertShowConfirmvinculo: null
    });
  }

  hideAlertUser() {
    this.belongsTo();
    this.setState({
      basicAlert: null
      
    });
  }

  /*updateImage(file, reader){
    this.setState({
      file: file,
      imagePreviewUrl: reader.result
    });
  }*/

  belongsTo() {
    let idTo = this.state.idUser;
    let id = this.state.allUserId;

    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    this.props.createUserEdge(idTo, id, this.state.name, this.state.role);

    axios.post(
        process.env.REACT_APP_API_URL+"/users/belongsto",
        { idUser: id, idTo: idTo },
        config
      )
      .then(function(response) {
        //let erro = [];
        if (parseInt(response.data.status, 10) === 400) {
          parent.setState({
            erroVinculo: true
          });
        } else {
          if (parseInt(response.data.status, 10) === 200) {
            parent.setState({
              basicAlert: null
            });
          }
        }
      });
  }

  updateId(id, i) {
    this.setState({
      allUserId: id,
      color: i
    });
  }
  hideAlertInputCancelVinculo() {
    this.setState({
      alertShowCancelvinculo: null
    });
  }
  hideAlertCancel() {
    this.setState({
      basicAlert: null
     
    });
  }

  hideAlertCanceladd() {
    this.setState({
      alerAddMember: null
    });
  }

  render() {    
    let monta = true;
    if (String(this.state.name) === "") {
      monta = false;
    }

    let data = [];
    let values = this.state.allUsers;

    if (String(values) !== "") {
      data = values.map((item, i) => <TableRow key={item.name} style={{ cursor: "pointer" }}>
            <TableCell xs={12} sm={12} md={12} lg={12} key={item + i + "1"}
              onClick={e => this.updateId(item.id.low, i)}
              style={{
                backgroundColor: this.state.color === i ? "#ccd2da" : "white"
              }}>
              {item.name}
            </TableCell>
            <TableCell xs={12} sm={12} md={12} lg={12} key={item + i + "0"}
              onClick={e => this.updateId(item.id.low, i)}
              style={{
                backgroundColor: this.state.color === i ? "#ccd2da" : "white"
              }}
            >
              {item.email}
            </TableCell>
          </TableRow>);
    }
    return (
      <TableBody>
        {this.state.alertShowConfirmUpdate}
        {this.state.alertShowupdateUser}
        {this.state.alertShowConfirmvinculo}
        {this.state.alertShowCancelvinculo}
        {this.state.basicAlert ? (
          <SweetAlert
            style={{display: "block", transform: "translateY(-20%)", height: "80%"}}
            title={departamentoT.selectResponsavel}
            onCancel={() => this.hideAlertCancel()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
            cancelBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            
            showCancel={false}
            showConfirm={false}>
            <div style={{overflowY: 'auto', height: "50vh"}}>

            {this.state.erroVinculo ? (
              <div
                className={this.props.classes.danger}
                style={{ padding: "2%", color: "#ffffff" }}>
                Selecione um usuário.
              </div>
            ) : null}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{departamentoT.nome}</TableCell>
                  <TableCell>{departamentoT.email}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{data}</TableBody>
            </Table>
           </div>
           <br />
           <div>
            <Btncancel onClick={() => this.hideAlertCancel()}>{departamentoT.cancelar}</Btncancel>
            <Btnsuccess onClick={() => this.hideAlertUser()}>{departamentoT.salvar}</Btnsuccess>
           </div>
          </SweetAlert>
        ) : null}

        {this.state.alertUpdate ? (
          <GridContainer justify="center">
            <SweetAlert
              style={{ display: "table", marginTop: "-300px", width: "30%" }}
              title={departamentoT.atualizarUser}
              showConfirm={false}
              showCancel={false}
              onCancel={() => this.hideAlert2()}
              confirmBtnCssClass={
                this.props.classes.button + " " + this.props.classes.success
              }
              cancelBtnCssClass={
                this.props.classes.button + " " + this.props.classes.danger
              }>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                {/* recebe a imagem */}
                
                <PictureUpload idUser={this.state.idUser} upload={true} imageUrl={this.state.imageUrl} updateImage={this.updateImage.bind(this)} imgUrl={this.imgUrl.bind(this)} text='ALTERAR FOTO' />
              </GridItem>

              <GridItem xs={12} sm={12} md={12} lg={12}>
                <CustomInput
                  error={this.state.registerNameState === "error"}
                  labelText={
                    <span>
                      {departamentoT.nome} <small>{departamentoT.obrigatorio}</small>
                    </span>
                  }
                  id="lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.atulizaValor(event, "name"),
                    value: this.state.nameUp
                  }}
                  style={{ paddingTop: "0px !important" }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={12} lg={12}>
                <CustomInput
                  error={this.state.registerEmailState === "error"}
                  labelText={
                    <span>
                      {departamentoT.email} <small>{departamentoT.obrigatorio}</small>
                    </span>
                  }
                  id="lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.atulizaValor(event, "email"),
                    value: this.state.emailUp
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <CustomInput
                  error={this.state.registerRoleState === "error"}
                  labelText={
                    <span>
                     {departamentoT.cargo}<small>{departamentoT.obrigatorio}</small>
                    </span>
                  }
                  id="lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: this.state.roleUp,
                    onChange: event => this.atulizaValor(event, "role")
                  }}
                />
              </GridItem>

                  <Btncancel onClick={() => this.hideAlert2()}>{departamentoT.cancelar}</Btncancel>
                  <Btnsuccess onClick={e => this.inputConfirmAlert(null, this.state.idUser)}>{departamentoT.salvar}</Btnsuccess>
                  <br />
                  <br />
            </SweetAlert>
          </GridContainer>
        ) : null}
        {monta ? (
          <TableRow>
            <TableCell style={{padding: "4px 12px 4px 24px"}}>{this.state.name}</TableCell>
            <TableCell style={{padding: "4px 12px 4px 24px"}}>{this.state.email}</TableCell>
            <TableCell style={{padding: "4px 12px 4px 24px"}}>{this.state.role}</TableCell>
            <TableCell style={{padding: "4px 12px 4px 24px"}}>
              <Delete
                onClick={this.props.showAlert.bind(
                  this,
                  this.state.idUser,
                  this.state.idDep
                )}
                style={{ cursor: "pointer", color: '#003479'}}
              />{" "}
              <Edit
                onClick={() => this.showAlert2()}
                style={{ cursor: "pointer", color: '#003479'}}
              />{" "}
              <Add
                style={{ cursor: "pointer", color: '#003479'}}
                onClick={() => this.basicAlertUser()}
              />
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    );
  }
}

//ORGCHART
const Rede = styled.div`
  position: absolute;
  width: 98%;
  height: 93%;
  left: 1%;
  top: 6%;
  border: 1px solid lightgray;
  font-family: "Roboto","Helvetica","Arial",sans-serif !important;
`

const FecharPopup = styled.button`
  position: absolute;
  top: 2%;
  right: 2%;
  border: 0px;
  font-size: 10px;
  background: transparent;
  cursor: pointer;
`

const XPopUp = styled.div`
  position: absolute;
  top: 0%;
  font-size: 22px;
`

const TitlePopup = styled.div`
  position: absolute;
  top: 2%;
  text-align: left;
  font-weight: 1000;
  color: #001e46;
  text-transform: uppercase;
`

const SalvarCombinacao = styled.div`
  position: absolute;
  width: 1vw;
  height: 2vh;
  left: 91%;
  top: 2%;
  cursor: pointer;
  z-index: 1;
`;

class Orgchart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      usuarios: this.props.usuarios,
      depList: this.props.depList,
      popup: false,
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps !== this.props){
      this.setState({
        usuarios: this.props.usuarios,
        depList: this.props.depList,
      }, () => {
        this.orgChart();
      });
    }
  }

  componentDidMount(){
    this.orgChart();
  }

  deletar(data){
    let parent = this;
    let usuarios = this.state.usuarios;

    let config = {
      headers: {
        Accept: "application/json"
      },
    };

    let form = {
      id: data.nodes,
    }

    for (let x=0;x<usuarios.nodes.length;x++){
      if (parseInt(usuarios.nodes[x].id, 10) === parseInt(data.nodes, 10)){
        usuarios.nodes.splice(x, 1);
        if (!usuarios.nodes[x].noRelation){
          axios.post(process.env.REACT_APP_API_URL+"/users/delete/user/", form, config)
            .then(function(response){
                parent.setState({
                  usuarios: usuarios,
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
                }
              })
           .then(function(val){
          });
        }
      }
      else{
        this.setState({
          usuarios: usuarios,
        });
      }
    }
  }

  editar(data){
    let parent = this;
    let users = this.state.usuarios;
    let remove = {};
    let add = {};
    let config = {
      headers: {
        Accept: "application/json"
      },
    };

    for (let x=0;x<users.edges.length;x++){
      if (parseInt(users.edges[x].to, 10) === parseInt(data.to, 10)){
        remove = {from: users.edges[x].from, to: data.to};
        add = {from: data.from, to: data.to};
        users.edges[x].from = data.from;
      }
    }

    let level = '';
    for (let x=0;x<users.nodes.length;x++){
      if (level === ''){
        if (parseInt(users.nodes[x].id, 10) === parseInt(data.from, 10)){
          level = users.nodes[x].level + 1;
          x = 0;
        }
      }
      else{
        if (parseInt(users.nodes[x].id, 10) === parseInt(data.to, 10)){
          users.nodes[x].level = level;
        }
      }
    }

    for (let x=0;x<users.edges.length;x++){
      if (parseInt(users.edges[x].from, 10) === parseInt(data.to, 10)){
        for (let y=0;y<users.nodes.length;y++){
          if (parseInt(users.edges[x].to, 10) === parseInt(users.nodes[y].id, 10)){
            users.nodes[y].level = level+1;
          }
        }
      }
    }

    let form = {remove: remove, add: add}

    axios.post(process.env.REACT_APP_API_URL+"/company/chart/edit/", form, config)
        .then(function(response){
          parent.setState({
            usuarios: users,
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
          }
        })
     .then(function(val){
    });

    /*parent.setState({
      usuarios: users,
    });*/
  }

  criarNo(data){
    this.setState({
      popup: true,
    });
  }

  criarAresta(data){
    let parent = this;
    let usuarios = this.state.usuarios;
    let save;
    let tempId;
    let config = {
      headers: {
        Accept: "application/json"
      },
    };

    for (let x=0;x<usuarios.nodes.length;x++){
      if (parseInt(usuarios.nodes[x].id, 10)===parseInt(data.from, 10)){
        if (usuarios.nodes[x].noRelation){
          tempId = data.from;
          let temp = data.from;
          data.from = data.to;
          data.to = temp;
          save = usuarios.nodes[x];
          usuarios.nodes[x].noRelation = false;
          break;
        }
      }
      else if (parseInt(usuarios.nodes[x].id, 10) === parseInt(data.to, 10)){
        if (usuarios.nodes[x].noRelation){
          tempId = data.to;
          save = usuarios.nodes[x];
          usuarios.nodes[x].noRelation = false;
          break;
        }
      }
    }

    for (let x = 0;x<usuarios.nodes.length;x++){
      if (parseInt(usuarios.nodes[x].id, 10) === parseInt(data.from, 10)){
        save.idDep = usuarios.nodes[x].idDep;
      }
    }

    usuarios.edges.push(data);

    let arr = save.label.split('\n');
    let form = {
      name: arr[1],
      role: arr[0],
      idDep: save.idDep,
      email: save.email,
      image: save.image,
      password: '',
    };

    let form2 = {
      idUser: data.from,
    }

    this.setState({
      usuarios: usuarios,
    });
    this.orgChart();

    axios.post(process.env.REACT_APP_API_URL+"/users/create/interno/", form, config)
      .then(function(response){
        form2.idTo = response.data.data.idUser.low;
        
        for (let x=0;x<usuarios.nodes.length;x++){
          if (parseInt(usuarios.nodes[x].id, 10) === parseInt(tempId, 10)){
            usuarios.nodes[x].id = form2.idTo;
            break;
          }
        }
        
        axios.post(process.env.REACT_APP_API_URL+"/users/belongsto/", form2, config)
            .then(function(response){
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
              }
            })
           .then(function(val){
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
        }
      })
     .then(function(val){
    });
  }

  createNode(name, email, role, dep){
    let usuarios = this.state.usuarios;

    let first = true;
    let level = usuarios.nodes.reduce(function(a, b) {
      if (first){
        first = false;
        return Math.max(parseInt(a.level, 10), parseInt(b.level, 10));
      }
      else{
        return Math.max(parseInt(a, 10), parseInt(b.level, 10)); 
      }
    });

    usuarios.nodes.push({
      id: 100,
      idDep: dep,
      shape: 'circularImage',
      image: '../../images/avatar.jpg',
      email: email,
      label: role+'\n'+name,
      level: level!=null && !isNaN(level)? level : 2,
      noRelation: true,
    });

    this.setState({
      usuarios: usuarios,
      popup: false,
    });

    this.orgChart();
  }

  closePopup(e){
    if (String(e.target.id) === 'pop1' || String(e.target.id) === 'pop2' || String(e.target.id) === 'pop3'){
      this.setState({
        popup: false,
      });
    }
  }

  orgChart(){
    var container = document.querySelector('#graph');

    var data = this.state.usuarios;

    let parent = this;
    var options = {
      nodes: {
        borderWidth: 3,
        size: 42,
        color: {
          border: '#222',
          background: 'transparent'
        },
        font: {
          color: '#111',
          face: 'Walter Turncoat',
          size: 16,
          strokeWidth: 1,
          strokeColor: '#222'
        }
      },
      "layout": {
        "hierarchical": {
        "enabled": true
        }
      },
      "manipulation": {
        "enabled": true,
        "initiallyActive": true,
        addNode: function(nodeData, callback) {
          parent.criarNo(nodeData); 
        },
        addEdge: function(edgeData, callback) {
          parent.criarAresta(edgeData); 
        },
        editEdge: function(edgeData, callback) {
          if (edgeData.from !== edgeData.to) {
            parent.editar(edgeData); 
          }
        },
        deleteNode: function(nodeData, callback) {
          parent.deletar(nodeData); 
        },
        deleteEdge: false
      },
      locale: departamentoT.orgIdioma,
      "physics": {
        "hierarchicalRepulsion": {
          "centralGravity": 0
        },
        "minVelocity": 0.75,
        "solver": "hierarchicalRepulsion"
      },
      edges: {
        color: {
          color: '#CCC',
          highlight: '#A22'
        },
        width: 3,
        length: 275,
        hoverWidth: .05
      }
    }

    new vis.Network(container, data, options);
  }

  render(){
    return(
      <div>
       <Rede id='graph' />
       {
        this.state.popup ? 
        <Popup closePopup={this.closePopup.bind(this)}
          criarNo={this.createNode.bind(this)} depList={this.state.depList} />
        :
        null
       }
      </div>
    );
  }
}

class Popup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      role: '',
      dep: 'selecionado',
      depList: this.props.depList,
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps !== this.props){
      this.setState({
        depList: this.props.depList,
      });
    }
  }

  updateValue(e, type){
    if (String(type)==='name'){
      this.setState({
        name: e.target.value,
      });  
    }
    else if (String(type)==='email'){
      this.setState({
        email: e.target.value,
      });  
    }
    else if (String(type)==='role'){
      this.setState({
        role: e.target.value,
      });  
    }
  }

  salvarUsuario(){
      this.props.criarNo(this.state.name, this.state.email, this.state.role, this.state.dep);
  }

  func(){

  }

  closePopup(e){
    if (String(e) === 'sair'){

    }
  }

  select(e){
    let item;
    for (let x=0;x<this.state.depList.length;x++){
      if (parseInt(e.target.value, 10)===parseInt(this.state.depList[x].id, 10)){
        item = this.state.depList[x];
        break;
      }
    }

    this.setState({
      dep: item.id,
    });
  }

  render(){
    return(
      <SweetAlert title={''}
        showConfirm={false} closePopup={this.closePopup.bind(this)}
        onConfirm={evt => this.props.salvarAspecto()}
        onCancel={evt => this.props.closePopup('sair')}
        cancelButton={false}
        confirmButton={false}
        style={{
          position: 'absolute',
          height: '85%',
          width: '60%',
          left: '25%',
          right: '25%',
          top: '25%',
          bottom: '25%',
          margin: 'auto',
          backgroundColor: 'white'
        }}
      >
      <TitlePopup>{departamentoT.adicionarUsuarioM}</TitlePopup>
        <Card style={{
          height: '9vh',
          width: '55%',
        }} chart>
          <CardBody bgcolor='#ebedf0'>
            <Input value={this.state.name} atibute={'name'}
              placeholder={departamentoT.nameUser} updatedValue={this.func.bind(this)}
              onChange={this.updateValue.bind(this)}></Input>
          </CardBody>
        </Card>

        <Card style={{
          height: '9vh',
          width: '55%',
        }} chart>
          <CardBody bgcolor='#ebedf0'>
            <Input value={this.state.email} atibute={'email'}
              placeholder={departamentoT.emailUser} updatedValue={this.func.bind(this)}
              onChange={this.updateValue.bind(this)}></Input>
          </CardBody>
        </Card>

        <Card style={{
          height: '9vh',
          width: '55%',
        }} chart>
          <CardBody bgcolor='#ebedf0'>
            <Input value={this.state.role} atibute={'role'}
              placeholder={departamentoT.cargoUser} updatedValue={this.func.bind(this)}
              onChange={this.updateValue.bind(this)}></Input>
          </CardBody>
        </Card>

        <SalvarCombinacao onClick={() => this.salvarUsuario()}>
          <Save style={{color: '#d0ac54'}} />
        </SalvarCombinacao>
        <FecharPopup id="pop2"
          onClick={evt => this.props.closePopup(evt)}>
        <XPopUp id="pop3">X</XPopUp></FecharPopup>
      </SweetAlert>
    );
  }
}

export default withStyles(sweetAlertStyle)(Department);