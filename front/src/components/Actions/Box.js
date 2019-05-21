import React from "react";
import Card from "../.././components/Card/Card.jsx";
import CardBody from "../.././components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import GridItem from "../.././components/Grid/GridItem.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import styled from "styled-components";
import ButtonText from "./ButtonText";
import Edit from "@material-ui/icons/Edit";
//import Close from "@material-ui/icons/Close";
import Date from "@material-ui/icons/DateRange";
import Delete from "@material-ui/icons/DeleteForever";
import Save from "@material-ui/icons/Save";
//import Copy from "@material-ui/icons/FileCopy";
import Fechar from "@material-ui/icons/Clear";
import withStyles from "@material-ui/core/styles/withStyles";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import AddCircle from "@material-ui/icons/AddCircle";
import CardIcon from "../../components/Card/CardIcon";
import ArrowForward from "@material-ui/icons/ArrowForward";
import axios from "axios";
import SelectActions from "./SelectActions";
import Flag from "@material-ui/icons/OutlinedFlag";
import HowToReg from "@material-ui/icons/HowToReg";

import { actions1Box, actions1 } from "variables/language.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Moment from 'moment'
import DatePicker from "react-datepicker"
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';

axios.defaults.withCredentials = true;

registerLocale('pt-BR', pt);
setDefaultLocale('pt-BR');

const Butttons = styled.div`
  display: inline-block;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  color: #bcbcbc;
  font-weight: bold;
  margin-left: 19.2%;
  font-family: din-condensed, sans-serif;
  font-size: 14px;
`;

const Icons = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 10px;
  border-radius: 18px;
  font-size: 13px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #d0ac54;
  background-color: #fff;
  margin-top: 3%;
  margin-left: 3.5% !important;
  margin-right: 1.5%;
`;

const Divs = styled.div`
  width: 100%;
  display: inline-block;
  padding-bottom: 2%;
  margin-top: -9%;
`;
const Inputt = styled.input`
  border-top: 0;
  border-left: 0;
  border-right: 0;
  margin-left: 3%;
  width: 260px;
  text-align: center;
  font-size: 14px;
  font-family: Roboto;
`;

/*const DivMeta = styled.div`
  color: #002960;
  font-weight: bold;
  font-family: Roboto;
  text-align: left;
  display: flex;
  font-size: 14px;
`;*/

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: this.props.data,
      meta: this.props.meta,
      dateInicio: this.props.dateInicio,
      dateFim: this.props.dateFim,
      detalhesMeta: this.props.detalhes,
      alertAcao: null,
      nameAcao: "",
      responsavel: "",
      inicio: Date,
      fim: Date,
      detalhesAcao: "",
      id: "",
      users: this.props.users,
      alertUpdate: null,
      userResponsavel: "",
      count: this.props.count,
      btnSaveAcao: "#99a5b5",
      template: this.props.template,
      edit: this.props.edit,
      deletePermission: this.props.deletePermission,
      colorDatas: '',
      warnData: "",
    };
this.change = this.change.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
        this.setState({
            inicio: date
        }, () => {
          this.selecioneDatas("")
        });
    }

    change(date) {
        this.setState({
            fim: date
        });
    }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        meta: this.props.meta,
        button: this.props.data,
        count: this.props.count,
        users: this.props.users,
        detalhesMeta: this.props.detalhes,
        dateInicio: this.props.dateInicio,
        dateFim: this.props.dateFim,
        edit: this.props.edit,
        deletePermission: this.props.deletePermission,
      });
      
    }
  }
  alertAcao() {
    this.selecioneDatas(''); 
    this.setState({
      nameAcao: "",
      responsavel: "",
      detalhesAcao: "",
      position: "",
      alertAcao: true
    });
  }
  saveItems(close, param) {
    if(String(this.state.id) === ""){
      this.setState({
        btnSaveAcao: "#99a5b5",
      });

    let id = this.props.idDelete;
    let form = {
      name: String(this.state.nameAcao)!=='' ? this.state.nameAcao : "Ação "+(this.state.button.length+1),
      position: "",
      responsibility: this.state.responsavel,
      start: this.state.inicio,
      end: this.state.fim,
      details: this.state.detalhesAcao
    };

    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    let data = {};
    let responsavel = this.state.responsavel;

    axios
      .post(
        process.env.REACT_APP_API_URL + "/actions/create/acoes",
        { id: id, form: form, idResponsible: responsavel },
        config
      )
      .then(function(response) {
        let acoes = response.data.data[0].acoes;
        if (parseInt(response.data.status, 10) === 200) {
          data = {
            value: acoes[0].name,
            details: acoes[0].details,
            id: acoes[0].id,
            end: acoes[0].end,
            start: acoes[0].start,
            responsibility: acoes[0].responsibility,
            position: acoes[0].position,
            acoes: []
          };
          parent.props.adicionarBox(data, parent.state.count);

          if(close){
            parent.cancel();
          }
          parent.setState({
            nameAcao: "",
            responsavel: "",
            inicio: Date,
            fim: Date,
            detalhesAcao: "",
          }, () => {
            parent.selecioneDatas("");
          });
        }
      });
    
    
  }else {
    if(parseInt(param, 10) === 1){
      this.updateAcao(true, 1);
    }else if(parseInt(param, 10) === 0){
      this.updateAcao(false, 0);
    }
  }
  
  }
  cancel() {
    this.setState({
      btnSaveAcao: "#99a5b5",
      alertAcao: null,
      inicio: Date,
      id: ''
    });
  }
  updateValor(e, valor) {
    this.setState({
      btnSaveAcao: "rgb(208, 172, 84)",
    })
    
    if (valor === "name") {
      this.setState({
        nameAcao: e.target.value
      });
    }

    if (valor === "responsavel") {
      this.setState({
        responsavel: e.target.value
      });
    }
    if (valor === "inicio") {
      this.setState({
        inicio: e.target.value
      }, () =>{
        this.selecioneDatas(this.state.colorDatas)
      });
      
    }
    if (valor === "fim") {
      this.setState({
        fim: e.target.value,
      }, () =>{
        this.selecioneDatas(8);
      });
    }
    if (valor === "detalhes") {
      this.setState({
        detalhesAcao: e.target.value
      });
    }

    
  }
  delete(id, index) {
    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    let idFind = {
      id: id
    };

    axios
      .post(
        process.env.REACT_APP_API_URL + "/actions/delete/acoes",
        idFind,
        config
      )
      .then(function(response) {
        if (parseInt(response.data.status, 10) === 200) {
          parent.props.deleteBox(index, parent.state.count);
        }
      });
  }
  edit(index) {
    this.setState({
      nameAcao: String(this.state.button[index].value)!=='' ? this.state.button[index].value : "Ação "+(this.state.button.length+1),
      responsavel: this.state.button[index].responsibility,
      inicio: this.state.button[index].start,
      fim: this.state.button[index].end,
      detalhesAcao: this.state.button[index].details,
      id: this.state.button[index].id,
      alertAcao: true,
      userResponsavel: this.state.button[index].responsibility,
      index: index
    }, () => {
      this.calculoData();
    });
  }
  calculoData(){
    let inicio = this.state.inicio;
    let fim = this.state.fim;
    let diferenca = Moment(fim).diff(inicio, 'days');
    let opcao = 0;
    if(parseInt(diferenca, 10) === 7){
      opcao = 1;
    }else if(parseInt(diferenca, 10) === 15){
      opcao = 2;
    }else if(parseInt(diferenca, 10) === 30){
      opcao = 3;
    }else if(parseInt(diferenca, 10) === 60){
      opcao = 4;
    }else if(parseInt(diferenca, 10) === 90){
      opcao = 5;
    }else if(parseInt(diferenca, 10) === 180){
      opcao = 6;
    }else if(parseInt(diferenca, 10) === 360){
      opcao = 7;
    }


    this.setState({
      colorDatas: opcao
    })
  }
  
  updateAcao(close, param) {
    this.setState({
      btnSaveAcao: "#99a5b5",
    });

    let id = this.state.id;
    let form = {
      name: String(this.state.nameAcao)!=='' ? this.state.nameAcao : "Ação "+(this.state.button.length+1),
      position: "",
      responsibility: this.state.responsavel,
      start: this.state.inicio,
      end: this.state.fim,
      details: this.state.detalhesAcao
    };

    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };
    let responsavel = this.state.userResponsavel;
    //let index = this.state.index;
    //let array = this.state.button.slice();

    axios
      .post(
        process.env.REACT_APP_API_URL + "/actions/update/acoes",
        { id: id, form: form, idResponsible: responsavel },
        config
      )
      .then(function(response) {
        let acoes = response.data.data;
        let acaoArray = {};
        let idAcao;
        if (parseInt(response.data.status, 10) === 200) {
          acaoArray = {
            value: acoes[0].name,
            details: acoes[0].details,
            id: acoes[0].id,
            responsibility: acoes[0].responsibility,
            start: acoes[0].start,
            end: acoes[0].end,
            position: acoes[0].position
          };
          idAcao = acoes[0].id;
          parent.props.updateBox(acaoArray, parent.state.count, idAcao);
          if(close){
            parent.cancel();
          }
        }
      });
  }
  updateValue(e) {
    this.setState({
      btnSaveAcao: '#d0ac54',
      responsavel: e.target.value
    });
  }
  selecioneDatas(opcao){
    let color = "#99a5b5";
    if (String(opcao) === "") {
      opcao = 1;
    }else{
      color ="rgb(208, 172, 84)";
    }
    // let agora = Moment().format("YYYY-MM-DD")
    let agora = this.state.dateInicio;

    if(this.state.inicio != Date){
      agora = this.state.inicio;
    }

    let proximo = '';
    if(opcao === 1){
     proximo = Moment(agora).add(7, 'days').format("YYYY-MM-DD");
    }else if(opcao === 2){
      proximo = Moment(agora).add(15, 'days').format("YYYY-MM-DD");
    }else if(opcao === 3){
      proximo = Moment(agora).add(30, 'days').format("YYYY-MM-DD");
    }else if(opcao === 4){
      proximo = Moment(agora).add(60, 'days').format("YYYY-MM-DD");
    }else if(opcao === 5){
      proximo = Moment(agora).add(90, 'days').format("YYYY-MM-DD");
    }else if(opcao === 6){
      proximo = Moment(agora).add(180, 'days').format("YYYY-MM-DD");
    }else if(opcao === 7){
      proximo = Moment(agora).add(360, 'days').format("YYYY-MM-DD");
    }else if(opcao === 8){
      proximo = this.state.fim
    }
    let warn = "";
    if(proximo > this.state.dateFim){
      warn = actions1Box.warnData;
    }

    this.setState({
      inicio: agora,
      fim: proximo,
      colorDatas: opcao,
      btnSaveAcao: color,
      warnData: warn,
    })
  }

  render() {
    let button = this.state.button.map((item, i) => (
      <ButtonText
        type={"text"}
        data={item.acoes}
        value={item.value}
        icons={true}
        detalhes={item.details}
        edit={this.edit.bind(this)}
        delete={this.delete.bind(this)}
        idDelete={item.id}
        index={i}
        key={item + "item" + i}
      />
    ));
    return (
      <GridItem xs={12} sm={12} md={3}>
        {this.state.alertAcao ? (
          <SweetAlert
            style={{
              width: '700px',
              overflow: "none",
              left: '46%',
              top: '37%',
            }}
            onCancel={() => this.cancel()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
            cancelBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            showCancel={false}
            showConfirm={false}
          >
          <CardIcon
              color="sonneIcon"
              style={{
                position: 'absolute',
                width: '50px',
                height: '48px',
                marginLeft: '4px',
                color: 'rgb(255, 255, 255)',
                zIndex: '6000',
                top: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowForward
                style={{
                  width: "37px",
                  height: "37px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  fontSize: "15px",
                  fontFamily: "din-condensed,sans-serif",
                  marginTop: "62%",
                  left: "65px",
                  width: "137px",
                  color: "#002960",
                  fontWeight: "bold",
                  top: "0vh"
                }}
              >
                {this.state.id ? actions1Box.updateAcao : actions1Box.adicionarAcao}
              </div>
            </CardIcon>
            
                <div>
                {this.state.template && this.state.edit ? 
                <Save
                  style={{
                    color: this.state.btnSaveAcao,
                    position: "absolute",
                    left: "84.7%",
                    cursor: "pointer",
                    top: "3%",
                    width: "5%"
                  }}
                  onClick={() => this.saveItems(true, 1)}
                />
                :null}
                {this.state.template && this.state.edit ? 
                  <AddCircle
                  style={{
                    color: this.state.btnSaveAcao,
                    position: "absolute",
                    left: "89.2%",
                    cursor: "pointer",
                    top: "3%",
                    width: "5%"
                  }}
                  onClick={() => this.saveItems(false, 0)}
                />
                :null}
                </div>
             
              <Fechar
                style={{
                  color: "rgb(153, 165, 181)",
                  left: "93.5%",
                  position: "absolute",
                  cursor: "pointer",
                  width: "5%",
                  top: '3%',
                }}
                onClick={() => this.cancel()}
              />
            <GridContainer style={{marginTop: '4vh'}}>
            <GridItem md={12} xs={12} sm={12}>
            <Card className="cardDescricaoemtaAcao">
                <CardHeader className="decMetaAcao">
                  {actions1Box.descricaoMetaBox} {this.state.meta}
                </CardHeader>
                <CardBody className="bodyDescrcao" >
                    {this.state.detalhesMeta}
                </CardBody>
            </Card>
            </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem md={6} xs={12} sm={12} className="inputsacaoeselect">
                <Card className="cardNomeAcao">
                <div className="div_icone"><ArrowForward className="icone"/>
                </div>
                <div className="div_name">
                  <Inputt
                  placeholder="nome da ação"
                  className="inputt"
                  style={{
                    paddingLeft: '4%',
                  }}
                  value={this.state.nameAcao}
                  onChange={evt => this.updateValor(evt, "name")}
                />
                </div>
                </Card>
              </GridItem>
              <GridItem md={6} xs={12} sm={12} className="inputsacaoeselect">
                <Card className="cardResponsavel">
                <HowToReg className="howtoreg"/>
                <SelectActions
                styleDiv={{
                  fontSize: '14px',
                }}
                users={this.state.users}
                change={this.updateValue.bind(this)}
                estilo={{
                  fontSize: '14px',
                  textAlign: 'center',
                  marginLeft: '-5px',
                }}
                id={this.state.responsavel}
                selectEstilo={{
                  border: "none",
                  // borderBottom: "1px solid rgb(186, 187, 189)",
                  width: "100%",
                  fontSize: '14px',
                }}
              />  
                </Card>
              </GridItem>
            </GridContainer>

            <GridContainer style={{marginTop: '0vh'}}>
            <GridItem md={12} xs={12} sm={12} style={{marginTop:'-23px'}}>
                <Card style={{boxShadow: 'none', textAlign: 'left', color: '#002960', fontWeight: 'regular', fontFamily: 'Roboto', fontSize: '14px', paddingLeft: '3%'}}>
                  {actions1Box.legendaPopupAcao}
                </Card>
                
            </GridItem>
              <GridItem md={6} xs={12} sm={12} className="datas">
                  <Card className="cardDatas">
                  <div style={{
                      fontFamily: 'din-condensed, sans-serif',
                      fontWeight: 'bold',
                      color: '#002960',
                      fontSize: '13px',
                    }}>
                  <div className="icone-data">
                      <Date
                        
                        style={{
                          fontFamily: "din-condensed, sans-serif",
                          fontWeight: "bold",
                          color: "#002960"
                        }}
                      />
                      <div className="text-data">
                        {actions1.dataInicio}
                      </div>
                      </div>

                      <div>
                        <DatePicker
                         className="date-picker"
                          placeholder={actions1.selecioneAqui}
                          style={{
                            fontSize: "14px",
                            fontFamily: "Roboto",
                            width: "82%",
                            marginLeft: "10%"
                          }}
                          // value={this.state.inicio}
                          locale="pt-BR"
                          dateFormat="dd-MM-YYYY"
                          selected={this.state.inicio}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </Card>
                  
              </GridItem>
              <GridItem md={6} xs={12} sm={12} className="datas">
                <Card className="cardDatas datas2">
                <div style={{
                      fontFamily: 'din-condensed, sans-serif',
                      fontWeight: 'bold',
                      color: '#002960',
                      fontSize: '13px',
                      
                    }}>
                <div className="data-date-2">
                      <Date
                        id="date"
                        style={{
                          fontFamily: "din-condensed, sans-serif",
                          fontWeight: "bold",
                          color: "#002960",
                        }}
                      />
                      <div className="text-data">
                        {actions1.dataFim}
                      </div>
                      </div>
                    <div>
                      <DatePicker
                        className="date-picker"
                          placeholder={actions1.selecioneAqui}
                          style={{
                            fontSize: "14px",
                            fontFamily: "Roboto",
                            width: "82%",
                            marginLeft: "10%"
                          }}
                          locale="pt-BR"
                          dateFormat="dd-MM-YYYY"
                          selected={this.state.fim}
                          onChange={this.change}
                        />
                        </div>
                    </div>
                </Card>
              </GridItem>
              {this.state.warnData ? 
                  <Card style={{fontWeight: '300',marginTop: '-25px', boxShadow: 'none', width: '75%', color: '#721c24', backgroundColor: '#f8d7da', border: "1px solid #f5c6cb", marginLeft: 'auto', marginRight: 'auto'}}>
                  {this.state.warnData + " " + Moment(this.state.dateFim).format('DD-MM-YYYY')}
                </Card>: null
                }
            <GridItem md={12} xs={12}>
              <Card className="selecionedatas">
                <div>
                  <span onClick={() => this.selecioneDatas(1)} style={{color: parseInt(this.state.colorDatas, 10) === 1? '#002960' : '#99a5b5', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '14px'}} >7 dias</span> |
                  <span onClick={() => this.selecioneDatas(2)} style={{color: parseInt(this.state.colorDatas, 10) === 2? '#002960' : '#99a5b5', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '14px'}} >15 dias</span> |
                  <span onClick={() => this.selecioneDatas(3)} style={{color: parseInt(this.state.colorDatas, 10) === 3? '#002960' : '#99a5b5', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '14px'}} >30 dias</span> |
                  <span onClick={() => this.selecioneDatas(4)} style={{color: parseInt(this.state.colorDatas, 10) === 4? '#002960' : '#99a5b5', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '14px'}} >60 dias</span> |
                  <span onClick={() => this.selecioneDatas(5)} style={{color: parseInt(this.state.colorDatas, 10) === 5? '#002960' : '#99a5b5', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '14px'}} >90 dias</span> |
                  <span onClick={() => this.selecioneDatas(6)} style={{color: parseInt(this.state.colorDatas, 10) === 6? '#002960' : '#99a5b5', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '14px'}} >180 dias</span> |
                  <span onClick={() => this.selecioneDatas(7)} style={{color: parseInt(this.state.colorDatas, 10) === 7? '#002960' : '#99a5b5', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '14px'}} >360 dias</span>
                </div>
              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer style={{marginTop: '4vh'}}>
              <GridItem md={12} xs={12} sm={12} style={{marginTop: '-38px'}}>
              <Card style={{backgroundColor:'#ebedf0', borderRadius: '0px', boxShadow: 'none', marginBottom: '0px'}}>
                    <CardHeader style={{
                      marginBottom: '0px',
                      color: "#002960",
                      fontWeight: "bold",
                      fontFamily: "Roboto",
                      fontSize: "13px",
                    }}>
                      {actions1Box.detalhesAcao}
                    </CardHeader>
                    <CardBody style={{marginTop: '-17px', marginBottom: '0px'}}>
                    <textarea
                    style={{
                      minHeight: '10vh',
                      height: 'auto',
                      width: '100%',
                      resize: "none",
                      border: "none",
                      fontSize: "14px",
                      fontFamily: "Roboto"
                    }}
                    placeholder={actions1Box.placeholderDetalhesAcao}
                    onChange={evt => this.updateValor(evt, "detalhes")}
                    value={this.state.detalhesAcao}
                  >
                  </textarea>
                    </CardBody>
                  </Card>
              </GridItem>
            </GridContainer>
          </SweetAlert>
        ) : null}

        <Card style={{ backgroundColor: "rgb(235, 237, 240)" }}>
          <CardHeader
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              color: "#002960",
              textAlign: "center",
              marginTop: "0%"
            }}
          >
            <Flag style={{position: 'absolute', left: '14px'}}/>
            <div style={{
              width: '78%',
              marginLeft: '25px',
              fontSize: '12px',
              fontFamily: 'din-condensed,sans-serif',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              textAlign: 'left',

              }}>{this.state.meta} </div>
            {this.state.template && this.state.edit ? (
              <Edit
                style={{
                  position: "absolute",
                  left: "80%",
                  top: "1vh",
                  cursor: "pointer"
                }}
                onClick={() => this.props.updateMeta(this.state.count)}
              />
            ) : null}
            {this.state.template && this.state.deletePermission ? (
              <Delete
                style={{
                  position: "absolute",
                  left: "89%",
                  top: "1vh",
                  cursor: "pointer"
                }}
                onClick={() =>
                  this.props.delete(this.props.idDelete, this.props.count)
                }
              />
            ) : null}
          </CardHeader>

          <CardBody>{button}</CardBody>

          <CardFooter>
            <Divs>
              <Butttons onClick={() => this.alertAcao()}>
                {actions1Box.adicionarAcao}
              </Butttons>
              <Icons onClick={() => this.alertAcao()}><AddCircle style={{position: 'absolute'}}/></Icons>
            </Divs>
          </CardFooter>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(sweetAlertStyle)(Box);
