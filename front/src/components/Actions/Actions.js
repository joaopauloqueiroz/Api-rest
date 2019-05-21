import React from "react";
import voltar from "assets/img/sonne/avancar_voltar.svg";
import Tabs from "../Tabs";
import Select from "../Select";
import SelectActions from "./SelectActions";
import Delete from "@material-ui/icons/DeleteForever";
import PopupAspect from "../Aspects";
import Save from "@material-ui/icons/Save";
import Fechar from "@material-ui/icons/Clear";
import Box from "./Box";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import withStyles from "@material-ui/core/styles/withStyles";
import { tabs } from "variables/language.jsx";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import axios from "axios";
import $ from "jquery";
import MenuItem from "@material-ui/core/MenuItem";
import SelectInput from "@material-ui/core/Select";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import quadrado1 from "assets/img/sonne/quadrado.svg";
import quadrado2 from "assets/img/sonne/quadrado2.svg";
import porcentagem1 from "assets/img/sonne/porcentagem1.svg";
import porcentagem2 from "assets/img/sonne/porcentagem2.svg";
import Money from "@material-ui/icons/AttachMoney";
import Prancheta from "@material-ui/icons/AssignmentLate";
import Moment from "moment";
import Load from "../Load.js";
import DatePicker from "react-datepicker"
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * textos
 */
import { actions1, actions1Box } from "variables/language.jsx";
/**
 * css
 */
import "assets/css/actions.css";

/**
 * icones
 */
import Date from "@material-ui/icons/DateRange";
import AddCircle from "@material-ui/icons/AddCircle";
import HowToReg from "@material-ui/icons/HowToReg";
import People from "@material-ui/icons/People";
import PeopleOutline from "@material-ui/icons/PeopleOutline";
import StarBorder from "@material-ui/icons/StarBorder";
import Beenhere from "@material-ui/icons/Beenhere";
import Flag from "@material-ui/icons/OutlinedFlag";
import ListAlt from "@material-ui/icons/ListAlt";
import styled from "styled-components";

axios.defaults.withCredentials = true;

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

const Icon = styled.div`
  position: absolute;
  display: inline-block;
  width: 7vh;
  height: 7vh;
  margin-top: -1.2%;
  margin-left: 0vh;
  background-color: #081b31;
  color: #081b31;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50% 50%;
  box-shadow: 0 4px 20px 0px rgba(8, 27, 49, 0.14),
    0 7px 10px -5px rgba(8, 27, 49, 0.4);
`;

const Inputt = styled.input`
  border-top: 0;
  border-left: 0;
  border-right: 0;
  margin-left: 3%;
  width: 76%;
  font-family: Roboto;
  font-size: 14px;
  text-align: center;
  border-bottom: 2px solid #e0e0e0;
`;

const AscpectsTag = styled.div`
  display: inline-block;
  width: auto;
  height: auto;
  margin-top: 1vh;
  margin-left: 2%;
  padding: 0.5vh;
  border: 1px solid white;
  border-radius: 18px;
  cursor: pointer;
  font-size: 12px;
  background-color: #001e46;
  color: white;
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


registerLocale('pt-BR', pt);
setDefaultLocale('pt-BR');

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guias: [
        { label: tabs.swot, link: "swot1", status: "inactive" },
        { label: tabs.matrix, link: "swot2", status: "inactive" },
        { label: tabs.actions, link: "actions", status: "active" },
        { label: tabs.painelMetas, link: "goals-panel", status: "inactive" }
      ],
      nameMeta: "",
      responsavel: "",
      inicio: Date,
      fim: Date,
      unidade: "",
      valorInicial: "",
      valorMeta: "",
      descMeta: "",
      responasavel: "",
      combinations: [],
      selected: actions1.selecione,
      objetivoSelecionado: "",
      desdobramentoSelecionado: "",
      prioridadeSelecionado: 0,
      indexSelecionado: "",
      nameSelecionado: "",
      analiseSelecionado: "",
      internSelecionado: [],
      externalSelecionado: [],
      indicator: [],
      alta: false,
      media: false,
      baixa: false,
      curto: false,
      longo: false,
      curtissimo: false,
      colorCom: "",
      colorexec: "",
      colorrisc: "",
      colorRec: "",
      colorIm: "",
      colorPra: "",
      box: [],
      conte: 0,
      alertMeta: null,
      alertAcao: null,
      responsavelGeral: "",
      priority: "",
      complexidade: "",
      risco: "",
      impacto: "",
      recursos: "",
      prazo: "",
      id: "",
      indicators: [],
      idIndicator: "",
      dataBox: [],
      acoes: [],
      users: [],
      idMeta: "",
      decisores: "",
      influenciadores: "",
      impactados: "",
      resultadosEsperados: "",
      nameEmpresa: "",
      namePlan: "",
      idGroup: "",
      idResults: "",
      indexMeta: "",
      idResponsavelMeta: "",
      overview: true,
      respOriginal: "",
      colorBtnSave: "#99a5b5",
      colorPriority: "#99a5b5",
      template: "",
      colorSave: "#99a5b5",
      combinationSelection: "",
      popupAspect: false,
      type: "",
      itensDeciores: [],
      itensInfluenciadores: [],
      itensImpactados: [],
      itensPublicos: [],
      namePillars: "",
      idInfluenciadores: "",
      idPublicos: "",
      idImpactos: "",
      alterouS: false,
      refAlteracao: false,
      valor: "",
      form: "",
      btMore: false,
      nameSelecionadoCompleto: "",
      controleIndexA: "",
      colorDatas: "",
      enableDisable: false,
      indexSelecionadoComb: '',
      alertShow: false,
      limpar: false,
      load: false,
      selectStyle: '-7px',
      colorDelete: '#99a5b5',
      deleteCombinationConfirm: false,
    };

    this.change = this.change.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.funcReload.bind(this);
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

  componentWillMount() {
    let parent = this;
    let template = '';
    let sessao;
    let usuarios = [];
    let controleIndexA = 1;

    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    axios
      .get(process.env.REACT_APP_API_URL + "/plan/getSession/", config)
      .then(function (response) {
        sessao = response.data;
        let obj = sessao.planPermission;
        let ler = false;
        let editar = false;
        let excluir = false;
        let delegar = false;
        let name = sessao.name;

        if ((sessao.nivel === 3 && sessao.permission === "administrator")) {
          template = true;
          ler = true;
          excluir = true;
          delegar = true;
          editar = true;
        }
        else if (sessao.nivel === 1 || sessao.nivel === 2) {
          template = true;
          if (obj.reading) {
            ler = true;
          }
          if (obj.exclusion) {
            excluir = true;
          }
          if (obj.delegation) {
            delegar = true;
          }
          if (obj.recording) {
            editar = true;
          }
        }
        else {
          template = false;
        }

        if (!excluir && !delegar && !editar) {
          template = false;
        }

        if (!ler) {
          if (sessao.templatePublico === false) {
            window.location.href = '/home/user';
          }
        }

        parent.setState({
          load: true,
        });

        axios.get(
          process.env.REACT_APP_API_URL + "/combination/request/all", config)
          .then(function (response) {
            let combinations = response.data;
            let index;
            for (let x = 0; x < combinations.length; x++) {
              index = combinations[x].index;
              if (index.substring(0, 1) === "A") {
                controleIndexA++;
              }
            }

            combinations.sort(function (a, b) {
              let aTemp;
              let bTemp;
              if (a.index.substring(1, 2) === '-') {
                aTemp = a.index.substring(2);
              }
              else {
                aTemp = a.index.substring(1);
              }

              if (b.index.substring(1, 2) === '-') {
                bTemp = b.index.substring(2);
              }
              else {
                bTemp = b.index.substring(1);
              }
              let aNum = parseInt(aTemp, 10);
              let bNum = parseInt(bTemp, 10);
              return aNum - bNum;
            });

            combinations.sort(function (a, b) {
              return a.index.substring(0, 1).localeCompare(b.index.substring(0, 1));
            });

            parent.setState({
              controleIndexA: controleIndexA,
              combinations: combinations,
              load: false,
              read: ler,
              edit: editar,
              delete: excluir,
              delegate: delegar,
            },
              () => {
                parent.nextSelected();
              });
          });

        if (sessao.template === true && sessao.permission === "administrator") {
          template = true;
          axios.get(process.env.REACT_APP_API_URL + "/users/request/fake", config)
            .then(function (res) {
              let data = res.data;

              for (let x = 0; x < data.length; x++) {
                usuarios.push({
                  name: data[x].name,
                  id: data[x].id
                });
              }

              parent.setState({
                users: usuarios,
                template: template
              }, () => {
                parent.nextSelected();
              });
            });
        }
        else if (sessao.template === false) {
          template = true;
          //listar os usuarios do banco
          axios.get(process.env.REACT_APP_API_URL + "/actions/get/allusers", config)
            .then(function (res) {
              let data = res.data.data;
              for (let x = 0; x < data.length; x++) {
                usuarios.push({
                  name: data[x].name,
                  id: data[x].id
                });
              }
              parent.setState({
                users: usuarios,
                template: template
              }, () => {
                parent.nextSelected();
              });
            });
        }
        else {
          template = false;
          //listar os usuarios fakes
          axios.get(process.env.REACT_APP_API_URL + "/users/request/fake", config)
            .then(function (res) {
              let data = res.data;

              for (let x = 0; x < data.length; x++) {
                usuarios.push({
                  name: data[x].name,
                  id: data[x].id
                });
              }
              parent.setState({
                users: usuarios,
                template: template
              }, () => {
                parent.nextSelected();
              });
            });
        }
      });
  }

  funcReload = (event) => {
    if (this.state.colorSave === "rgb(208, 172, 84)") {
      event.returnValue = ""
    } 
    else {
      window.onbeforeunload = null;
    }
  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload", this.funcReload);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.funcReload);
    if (navigator.platform == 'MacIntel') {
      this.setState({
        selectStyle: '-5%'
      });
    }
  }

  backPage() {
    window.location.href = "/swot2";
  }

  nextPage() {
    window.location.href = "/goals-panel";
  }

  select(e) {
    let combinations = this.state.combinations;

    let objetivo = "";
    let desdobramento = "";
    let prioridade = "";
    let index = "";
    let name = "";
    let analise = "";
    let intern = [];
    let external = [];
    let id = "";
    let forca = "";
    let complexidade = "";
    let recursos = "";
    let impacto = "";
    let prazo = "";
    let indicatorId = "";
    let risco = "";
    let nameSelecionadoCompleto = "";
    let idGroup = "";
    let idResults = "";
    let respGeral = "";

    let idInfluenciadores = "";
    let idPublicos = "";
    let idImpactados = "";
    let dataInfluencidaores = [];
    let dataDecisores = [];
    let dataPublicos = [];
    let dataImpactados = [];
    let indexSelecionadoComb = '';
    for (let x = 0; x < combinations.length; x++) {
      if (parseInt(combinations[x].id, 10) === parseInt(e.target.value, 10)) {
        this.metasAll(e.target.value);
        objetivo = combinations[x].objective;
        desdobramento = combinations[x].unfolding;
        prioridade = combinations[x].priority;
        analise = combinations[x].analysis;
        index = combinations[x].index;
        name = combinations[x].name;
        nameSelecionadoCompleto = index + " : " + name;
        indexSelecionadoComb = x;

        intern = combinations[x].intern;
        external = combinations[x].external;
        id = combinations[x].id;

        if (combinations[x].indicators != null) {
          if (combinations[x].indicators.length > 0) {
            forca = combinations[x].indicators[0].execucao;
            complexidade = combinations[x].indicators[0].complexidade;
            risco = combinations[x].indicators[0].risco;
            recursos = combinations[x].indicators[0].recursos;
            impacto = combinations[x].indicators[0].impacto;
            prazo = combinations[x].indicators[0].prazo;
            indicatorId = combinations[x].indicators[0].id;
            respGeral = combinations[x].indicators[0].responsible;
          }
        }
        if (combinations[x].results != null) {
          if (combinations[x].results.length > 0) {
            for (let y = 0; y < combinations[x].results.length; y++) {
              if (String(combinations[x].results[y].name) === "decisores") {
                dataDecisores = JSON.parse(
                  "[" + combinations[x].results[y].results + "]"
                );
                idGroup = combinations[x].results[y].id;
              } else if (
                String(combinations[x].results[y].name) === "influenciadores"
              ) {
                dataInfluencidaores = JSON.parse(
                  "[" + combinations[x].results[y].results + "]"
                );
                idInfluenciadores = combinations[x].results[y].id;
              } else if (
                String(combinations[x].results[y].name) === "publicos"
              ) {
                dataPublicos = JSON.parse(
                  "[" + combinations[x].results[y].results + "]"
                );
                idPublicos = combinations[x].results[y].id;
              } else if (
                String(combinations[x].results[y].name) === "impactados"
              ) {
                dataImpactados = JSON.parse(
                  "[" + combinations[x].results[y].results + "]"
                );
                idImpactados = combinations[x].results[y].id;
              }
            }
          }
        }
      }
    }

    forca = forca == null ? '' : forca;
    forca = prioridade == null || String(prioridade) === '' || parseInt(prioridade, 10) === 0 ? forca : prioridade;

    this.setState({
      idImpactados: idImpactados,
      idInfluenciadores: idInfluenciadores,
      idPublicos: idPublicos,
      idGroup: idGroup,
      indexSelecionadoComb: indexSelecionadoComb,

      itensInfluenciadores: dataInfluencidaores,
      itensDeciores: dataDecisores,
      itensImpactados: dataImpactados,
      itensPublicos: dataPublicos,

      idResults: idResults,
      responsavelGeral: respGeral,
      respOriginal: respGeral,

      selected: e.target.value,
      objetivoSelecionado: objetivo,
      desdobramentoSelecionado: desdobramento,
      prioridadeSelecionado: forca,
      indexSelecionado: index,
      nameSelecionado: name,
      nameSelecionadoCompleto: nameSelecionadoCompleto,
      analiseSelecionado: analise,
      internSelecionado: intern,
      externalSelecionado: external,
      id: id,

      colorexec: forca,
      colorCom: complexidade,
      colorrisc: risco,
      colorIm: impacto,
      colorRec: recursos,
      colorPra: prazo,
      idIndicator: indicatorId,

      priority: forca,
      complexidade: complexidade,
      risco: risco,
      recursos: recursos,
      impacto: impacto,
      prazo: prazo,
      colorDelete: "rgb(208, 172, 84)",
    });
  }

  metasAll(id) {
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
        process.env.REACT_APP_API_URL + "/actions/metas/all",
        idFind,
        config
      )
      .then(function (response) {
        let data = response.data.data;

        let resp = [];
        if (data.length > 0) {
          let metas = data[0][0] == null ? [] : data[0][0].metas;
          let actions = data[1];
          for (let x = 0; x < metas.length; x++) {
            for (let y = 0; y < actions.length; y++) {
              if (
                parseInt(actions[y].idMeta, 10) === parseInt(metas[x].id, 10)
              ) {
                metas[x].acoes.push({
                  value: actions[y].name,
                  id: actions[y].id,
                  details: actions[y].details,
                  end: actions[y].end,
                  position: actions[y].position,
                  responsibility: actions[y].responsibility,
                  start: actions[y].start
                });
              }
            }

            resp.push({
              value: metas[x].name,
              id: metas[x].id,
              initialValue: metas[x].initialValue,
              description: metas[x].description,
              responsible: metas[x].responsible,
              start: metas[x].start,
              end: metas[x].end,
              targetValue: metas[x].targetValue,
              unity: metas[x].unity,
              acoes: metas[x].acoes
            });
          }
        }

        parent.setState({
          box: resp
        });
      });
  }

  addCampo(id) {
    let data = this.state.box;
    data.push({
      id: id,
      value:
        String(this.state.nameMeta) !== ""
          ? this.state.nameMeta
          : "Meta " + (this.state.box.length + 1),
      name:
        String(this.state.nameMeta) !== ""
          ? this.state.nameMeta
          : "Meta " + (this.state.box.length + 1),
      description: this.state.descMeta,
      end: this.state.fim,
      start: this.state.inicio,
      responsible: this.state.responsavel,
      targetValue: this.state.valorMeta,
      unity: this.state.unidade,
      initialValue: this.state.valorInicial
    });

    this.setState({
      box: data
    });
  }

  updateValor(valor, e) {
    this.setState({
      colorSave: "rgb(208, 172, 84)"
    });
    if (String(e) === "name") {
      this.setState({
        nameMeta: valor.target.value
      });
    }

    if (String(e) === "responsavel") {
      this.setState({
        responsavel: valor.target.value
      });
    }

    if (String(e) === "inicio") {
      this.setState(
        {
          inicio: valor.target.value
        },
        () => {
          this.selecioneDatas(this.state.colorDatas);
        }
      );
    }

    if (String(e) === "fim") {
      this.setState(
        {
          fim: valor.target.value
        },
        () => {
          this.selecioneDatas(8);
        }
      );
    }

    if (String(e) === "unidade") {
      this.setState({
        unidade: valor.target.value
      });
    }

    if (String(e) === "valorInicial") {
      let val = 0;
      if (!this.state.enableDisable) {
        val = valor.target.value;
      }

      this.setState({
        valorInicial: val,
      });
    }

    if (String(e) === "valorMeta") {
      let val2 = 0;
      if (!this.state.enableDisable) {
        val2 = valor.target.value;
      }

      this.setState({
        valorMeta: val2
      });
    }

    if (String(e) === "descMeta") {
      this.setState({
        descMeta: valor.target.value
      });
    }
  }

  cancel() {
    this.setState({
      alertMeta: null,
      colorSave: "#99a5b5"
    });
  }

  alertMetas() {
    if (String(this.state.colorSave) === 'rgb(208, 172, 84)' || String(this.state.colorSave) === '#d0ac54') {
      this.saveOptions();
    }
    else if (this.state.id == null || String(this.state.id) === '') {
      this.alertMensagem(actions1.msgErrorMeta)
      return false;
    }

    this.setState({
      nameMeta: "",
      responsavel: "",
      inicio: Date,
      fim: Date,
      unidade: "",
      valorInicial: "",
      valorMeta: "",
      descMeta: "",
      idResponsavelMeta: "",
      idMeta: "",
      alertMeta: true,
      enableDisable: false
    }, () => {
      this.selecioneDatas("");
    });
  }

  addAcao() {
    this.setState({
      alertAcao: true
    });
  }

  saveOptionsAux(i, form, valor, id) {
    let parent = this;
    let data = [];
    if (i === 1) {
      if (String(valor) === "decisores") {
        id = this.state.idGroup;
        data = this.state.itensDeciores;
      }
      else if (String(valor) === "influenciadores") {
        id = this.state.idInfluenciadores;
        data = this.state.itensInfluenciadores;
      }
      else if (String(valor) === "publicos") {
        id = this.state.idPublicos;
        data = this.state.itensPublicos;
      }
      else if (String(valor) === "impactados") {
        id = this.state.idImpactados;
        data = this.state.itensImpactados;
      }

      let results = this.tratarObjeto(data);

      let config = {
        headers: {
          Accept: "application/json"
        }
      };

      let combination = {
        idCombination: this.state.id,
      };

      let idResults = this.state.idResults;

      axios.post(
        process.env.REACT_APP_API_URL + "/actions/save/pillars", {
          form: form,
          results: results,
          combination: combination,
          idResult: idResults,
          idGroup: id,
          name: valor
        },
        config
      ).then(function (response) {
        let combinacoes = parent.state.combinations;

        form = form.replace("'", "");
        form = form.replace("'", "");
        let dataForm = {
          id: response.data.id,
          results: form,
          name: response.data.name,
          idCombination: parent.state.id
        }

        let selecao = parent.state.indexSelecionadoComb ? parent.state.indexSelecionadoComb : 0;

        if (combinacoes[selecao].results.length == 0) {
          combinacoes[selecao].results.push(dataForm);
        }

        if (selecao != null && combinacoes[selecao] != null) {
          for (let y = 0; y < combinacoes[selecao].results.length; y++) {
            if (combinacoes[selecao].results[y].name === response.data.name) {
              combinacoes[selecao].results[y] = dataForm;
              break;
            }
            else {
              combinacoes[selecao].results.push(dataForm);
            }
          }
        }

        if (String(response.data.name) === "influenciadores") {
          parent.setState({
            idInfluenciadores: response.data.id,
            colorPriority: "#99a5b5",
            combinations: combinacoes,
            itensInfluenciadores: JSON.parse("[" + form + "]"),
          });
        }
        else if (String(response.data.name) === "decisores") {
          parent.setState({
            idGroup: response.data.id,
            colorPriority: "#99a5b5",
            combinations: combinacoes,
            itensDeciores: JSON.parse("[" + form + "]"),
          });
        }
        else if (String(response.data.name) === "impactados") {
          parent.setState({
            idImpactados: response.data.id,
            colorPriority: "#99a5b5",
            combinations: combinacoes,
            itensImpactados: JSON.parse("[" + form + "]"),
          });
        }
        else if (String(response.data.name) === "publicos") {
          parent.setState({
            idPublicos: response.data.id,
            colorPriority: "#99a5b5",
            combinations: combinacoes,
            itensPublicos: JSON.parse("[" + form + "]"),
          });
        }
      });
    }
    else if (i === 0) {
      let name = this.state.nameSelecionado;
      if (this.state.nameSelecionado === null || this.state.nameSelecionado === "") {
        name = 'Sem vínculo'
      }
      this.setState({
        colorSave: "#99a5b5"
      });
      let semVinculo = false;
      if (this.state.selected === "SELECIONE" || this.state.indexSelecionado.indexOf('A') === 0) {
        semVinculo = true;
      }

      let form2 = {
        execucao: this.state.priority,
        complexidade: this.state.complexidade,
        risco: this.state.risco,
        recursos: this.state.recursos,
        impacto: this.state.impacto,
        prazo: this.state.prazo,
        responsible: this.state.responsavelGeral,
        name: name,
        index: "A" + this.state.controleIndexA
      };

      let id = this.state.id;
      let idIndicator = this.state.idIndicator;
      let responsavelGeral = this.state.responsavelGeral;
      let original = this.state.respOriginal;

      let config = {
        headers: {
          Accept: "application/json",
        }
      };

      axios.post(process.env.REACT_APP_API_URL + "/actions/create", {
        form: form2,
        id: id,
        idIndicator: idIndicator,
        responsavelGeral: responsavelGeral,
        original: original,
        semVinculo: semVinculo
      }, config)
        .then(function (response) {
          parent.setState({
            controleIndexA: (parent.state.controleIndexA + 1),
          })
          if (parent.state.selected === "SELECIONE") {
            if (response.data.id !== undefined) {
              parent.setState({
                id: response.data.id,
                btMore: false,
              });
            } else {
              parent.setState({
                btMore: false,
              });
            }
          }

          if (parent.state.alterouS === true) {
            parent.saveCombination(response.data.id);
          }
          else {
            if (parent.state.btMore === true) {
              parent.setState({
                id: "",
              });
            }
          }
          if (parseInt(response.data.status, 10) === 400) {
          }
          else {
            if (parseInt(response.data.status, 10) === 200) {
              parent.setState({
                colorSave: "#99a5b5",
              });
            }
          }
          let combinacoes = parent.state.combinations;
          if (parent.state.indexSelecionadoComb != null && String(parent.state.indexSelecionadoComb) !== '' && combinacoes[parent.state.indexSelecionadoComb] != null) {
            if (combinacoes[parent.state.indexSelecionadoComb].indicators.length > 0) {
              combinacoes[parent.state.indexSelecionadoComb].indicators[0].execucao = form2.execucao;
              combinacoes[parent.state.indexSelecionadoComb].indicators[0].complexidade = form2.complexidade;
              combinacoes[parent.state.indexSelecionadoComb].indicators[0].impacto = form2.impacto;
              combinacoes[parent.state.indexSelecionadoComb].indicators[0].prazo = form2.prazo;
              combinacoes[parent.state.indexSelecionadoComb].indicators[0].recursos = form2.recursos;
              combinacoes[parent.state.indexSelecionadoComb].indicators[0].risco = form2.risco;
              combinacoes[parent.state.indexSelecionadoComb].indicators[0].responsible = form2.responsible;
              combinacoes[parent.state.indexSelecionadoComb].priority = form2.execucao;
            }
            else {
              combinacoes[parent.state.indexSelecionadoComb].indicators = [];
              let obj = {
                execucao: form2.execucao,
                complexidade: form2.complexidade,
                impacto: form2.impacto,
                prazo: form2.prazo,
                recursos: form2.recursos,
                risco: form2.risco,
                responsible: form2.responsible,
              }
              combinacoes[parent.state.indexSelecionadoComb].indicators.push(obj);
              combinacoes[parent.state.indexSelecionadoComb].priority = form2.execucao;
            }
            parent.setState({
              combinations: combinacoes,
            });
          }
          else {

            let combinacoes = parent.state.combinations;
            combinacoes.unshift({
              external: [],
              analysis: parent.state.analiseSelecionado,
              objective: parent.state.objetivoSelecionado,
              groups: [],
              id: response.data.id,
              index: form2.index,
              priority: form2.execucao,
              indicators: [{
                execucao: form2.execucao,
                complexidade: form2.complexidade,
                risco: form2.risco,
                recursos: form2.recursos,
                impacto: form2.impacto,
                prazo: form2.prazo,
                responsible: form2.responsible,
                id: response.data.idIndicator,
              }],
              intern: [],
              name: form2.name,
              results: [],
            })
            parent.setState({
              combinations: combinacoes,
              id: response.data.id,
              btMore: false,
              idIndicator: response.data.idIndicator,
              selected: response.data.id,
              idImpactados: '',
              idInfluenciadores: '',
              idPublicos: '',
              idGroup: '',
              indexSelecionadoComb: 0,

              itensInfluenciadores: [],
              itensDeciores: [],
              itensImpactados: [],
              itensPublicos: [],

              idResults: '',
              responsavelGeral: form2.responsible,
              respOriginal: form2.responsible,

              prioridadeSelecionado: form2.execucao,
              indexSelecionado: form2.index,
              nameSelecionadoCompleto: form2.index + " : " + form2.name,
              internSelecionado: [],
              externalSelecionado: [],

              colorexec: form2.execucao,
              colorCom: form2.complexidade,
              colorrisc: form2.risco,
              colorIm: form2.impacto,
              colorRec: form2.recursos,
              colorPra: form2.prazo,

              priority: form2.execucao,
              complexidade: form2.complexidade,
              risco: form2.risco,
              recursos: form2.recursos,
              impacto: form2.impacto,
              prazo: form2.prazo
            }, () => {
              parent.saveOptionsAux(1, form, valor, response.data.id);
            });
          }

          if (form2.execucao != null && String(form2.execucao) !== '' && form2.execucao != 0) {
            parent.updatePriorityCombination(response.data.id, form2.execucao);
          }
        });
    }
  }

  savePriorityAux(form, valor) {
    let parent = this;
    let id = this.state.id;
    if (id == null || String(id) == '') {
      this.saveOptionsAux(0, form, valor, id);
    }
    else {
      this.saveOptionsAux(1, form, valor, id);
    }
  }

  savePriority(form, valor) {
    if (String(this.state.id) !== "") {
      this.savePriorityAux(form, valor);
    } else {
      this.setState({
        refAlteracao: true,
        form: form,
        valor: valor
      });
      this.saveOptions();
    }
  }

  saveMeta(close, bool) {
    this.setState({
      colorSave: "#99a5b5",
    });

    if (String(this.state.idMeta) === "") {
      let form = {
        name: String(this.state.nameMeta) !== ""
          ? this.state.nameMeta
          : "Meta " + (this.state.box.length + 1),
        start: this.state.inicio,
        end: this.state.fim,
        initialValue: this.state.valorInicial,
        targetValue: this.state.valorMeta,
        unity: this.state.unidade,
        description: this.state.descMeta,
        responsible: this.state.responsavel
      };

      let responasavel = this.state.responsavel;
      let id = this.state.id;
      let parent = this;
      let config = {
        headers: {
          Accept: "application/json"
        }
      };

      axios.post(process.env.REACT_APP_API_URL + "/actions/save/metas",
        { form: form, idCombination: id, idResponsible: responasavel },
        config)
        .then(function (response) {
          if (parseInt(response.data.status, 10) === 201) {
            parent.setState({
              nameMeta:
                String(parent.state.nameMeta) !== ""
                  ? parent.state.nameMeta
                  : "Meta " + (parent.state.box.length + 1),
              idMeta: response.data.data[0].id,
              descMeta: parent.state.descMeta,
              fim: parent.state.fim,
              inicio: parent.state.inicio,
              responsavel: parent.state.responsavel,
              valorMeta: parent.state.valorMeta,
              unidade: parent.state.unidade,
              initialValue: parent.state.initialValue,
              start: parent.state.inicio,
              end: parent.state.fim,
            });
            parent.addCampo(response.data.data[0].id);

            if (close) {
              parent.setState({
                alertMeta: false,
              });
            }
            else {
              parent.setState({
                nameMeta: "",
                responsavel: "",
                inicio: Date,
                fim: Date,
                unidade: "",
                valorInicial: "",
                valorMeta: "",
                descMeta: "",
                idResponsavelMeta: "",
                idMeta: "",
                colorDelete: '#99a5b5',
              }, () => {
                parent.selecioneDatas(parent.state.colorDatas);
              }
              );
            }

          }
        });
    } else {
      this.updateMetaNeo(close, bool);
    }
  }

  deleteMeta(id, index) {
    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };
    axios
      .post(
        process.env.REACT_APP_API_URL + "/actions/delete/metas",
        { id: id },
        config
      )
      .then(function (response) {
        if (parseInt(response.data.status, 10) === 200) {
          parent.setState({
            box: parent.state.box.filter((_, i) => i !== index)
          });
        }
      });
  }

  updateValue(e) {
    this.setState({
      colorSave: "rgb(208, 172, 84)",
      responsavel: e.target.value
    });
  }

  updateValueUnidade(e) {
    this.setState({
      colorSave: "#d0ac54",
      unidade: e.target.value
    });
  }

  updateResponsavel(e) {
    this.setState({
      colorSave: "rgb(208, 172, 84)",
      colorPriority: "#d0ac54",
      responsavelGeral: e.target.value
    });
  }

  updateOptions(e, valor) {
    this.setState({
      colorPriority: "rgb(208, 172, 84)"
    });

    $("textarea").bind("input", function (e) {
      while (
        $(this).outerHeight() <
        this.scrollHeight +
        parseFloat($(this).css("borderTopWidth")) +
        parseFloat($(this).css("borderBottomWidth")) &&
        $(this).height() < 500
      ) {
        $(this).height($(this).height() + 1);
      }
    });

    this.setState({
      colorBtnSave: "rgb(208, 172, 84)"
    });

    if (String(valor) === "decisores") {
      this.setState({
        decisores: e.target.value
      });
    }

    if (String(valor) === "influenciadores") {
      this.setState({
        influenciadores: e.target.value
      });
    }

    if (String(valor) === "impactados") {
      this.setState({
        impactados: e.target.value
      });
    }

    if (String(valor) === "resultadosEsperados") {
      this.setState({
        resultadosEsperados: e.target.value
      });
    }
  }

  saveOptions() {
    if (this.state.colorSave == "#99a5b5") {
      return false;
    }

    this.setState({
      colorSave: "#99a5b5",
      colorDelete: "rgb(208, 172, 84)"
    });

    let semVinculo = false;
    if (this.state.selected === "SELECIONE" || this.state.indexSelecionado.indexOf('A') === 0) {
      semVinculo = true;
    }

    let name = this.state.nameSelecionado;
    if (this.state.nameSelecionado === null || this.state.nameSelecionado === "") {
      name = 'Sem vínculo'
    }
    //  if(this.state.colorSave === "rgb(208, 172, 84)"){
    let parent = this;
    let form = {
      execucao: this.state.priority,
      complexidade: this.state.complexidade,
      risco: this.state.risco,
      recursos: this.state.recursos,
      impacto: this.state.impacto,
      prazo: this.state.prazo,
      responsible: this.state.responsavelGeral,
      name: name,
      index: "A" + this.state.controleIndexA,
    };
    let id = this.state.id;
    let idIndicator = this.state.idIndicator;
    let responsavelGeral = this.state.responsavelGeral;
    let original = this.state.respOriginal;

    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    axios
      .post(
        process.env.REACT_APP_API_URL + "/actions/create",
        {
          form: form,
          id: id,
          idIndicator: idIndicator,
          responsavelGeral: responsavelGeral,
          original: original,
          semVinculo: semVinculo
        },
        config
      )
      .then(function (response) {
        if (parent.state.alterouS === true) {
          parent.saveCombination(response.data.id);
        } else {
          if (parent.state.btMore === true) {
            parent.setState({
              id: ""
            });
          }
        }
        if (parseInt(response.data.status, 10) === 400) {
        } else {
          if (parseInt(response.data.status, 10) === 201) {
          }
        }

        let combinacoes = parent.state.combinations;
        if (parent.state.indexSelecionadoComb != null && String(parent.state.indexSelecionadoComb) !== '' && combinacoes[parent.state.indexSelecionadoComb] != null) {
          if (combinacoes[parent.state.indexSelecionadoComb].indicators.length > 0) {
            combinacoes[parent.state.indexSelecionadoComb].indicators[0].execucao = form.execucao;
            combinacoes[parent.state.indexSelecionadoComb].indicators[0].complexidade = form.complexidade;
            combinacoes[parent.state.indexSelecionadoComb].indicators[0].impacto = form.impacto;
            combinacoes[parent.state.indexSelecionadoComb].indicators[0].prazo = form.prazo;
            combinacoes[parent.state.indexSelecionadoComb].indicators[0].recursos = form.recursos;
            combinacoes[parent.state.indexSelecionadoComb].indicators[0].risco = form.risco;
            combinacoes[parent.state.indexSelecionadoComb].indicators[0].responsible = form.responsible;
            combinacoes[parent.state.indexSelecionadoComb].priority = form.execucao;
          }
          else {

            combinacoes[parent.state.indexSelecionadoComb].indicators = [];
            let obj = {
              execucao: form.execucao,
              complexidade: form.complexidade,
              impacto: form.impacto,
              prazo: form.prazo,
              recursos: form.recursos,
              risco: form.risco,
              responsible: form.responsible,
            }
            combinacoes[parent.state.indexSelecionadoComb].indicators.push(obj);
            combinacoes[parent.state.indexSelecionadoComb].priority = form.execucao;
          }
          if (form.execucao != null && String(form.execucao) !== '' && form.execucao != 0) {
            parent.updatePriorityCombination(id, form.execucao);
          }
        }
        else {
          //if (parent.state.selected === "SELECIONE") {
          //if (response.data.id !== undefined) {
          let combinacoes = parent.state.combinations;
          combinacoes.unshift({
            external: [],
            analysis: parent.state.analiseSelecionado,
            objective: parent.state.objetivoSelecionado,
            groups: [],
            id: response.data.id,
            index: form.index,
            priority: form.execucao,
            indicators: [{
              execucao: form.execucao,
              complexidade: form.complexidade,
              risco: form.risco,
              recursos: form.recursos,
              impacto: form.impacto,
              prazo: form.prazo,
              responsible: form.responsible,
              id: response.data.idIndicator,
            }],
            intern: [],
            name: form.name,
            results: [],
          });
          parent.setState({
            combinations: combinacoes,
            id: response.data.id,
            btMore: false,
            idIndicator: response.data.idIndicator,
            selected: response.data.id,
            idImpactados: '',
            idInfluenciadores: '',
            idPublicos: '',
            idGroup: '',
            indexSelecionadoComb: 0,

            itensInfluenciadores: [],
            itensDeciores: [],
            itensImpactados: [],
            itensPublicos: [],

            idResults: '',
            responsavelGeral: form.responsible,
            respOriginal: form.responsible,

            prioridadeSelecionado: form.execucao,
            indexSelecionado: form.index,
            nameSelecionadoCompleto: form.index + " : " + form.name,
            internSelecionado: [],
            externalSelecionado: [],

            colorexec: form.execucao,
            colorCom: form.complexidade,
            colorrisc: form.risco,
            colorIm: form.impacto,
            colorRec: form.recursos,
            colorPra: form.prazo,

            priority: form.execucao,
            complexidade: form.complexidade,
            risco: form.risco,
            recursos: form.recursos,
            impacto: form.impacto,
            prazo: form.prazo
          });
          /*
            name: parent.state.nameSelecionado,
          */
          if (form.execucao != null && String(form.execucao) !== '' && form.execucao != 0) {
            parent.updatePriorityCombination(response.data.id, form.execucao);
          }
        }

        if (parent.state.limpar) {
          parent.setState({
            limpar: false,
          }, () => {
            parent.clearAll();
          });
        }
        return response.data.id;
      });
  }

  saveCombination(id) {
    let saveId = id == null || String(id) === '' ? this.state.id : id;
    let parent = this;

    let name = this.state.nameSelecionado;
    if (this.state.nameSelecionado === null || this.state.nameSelecionado === "") {
      name = 'Sem vínculo'
    }

    let form = {
      id: saveId,
      analysis: this.state.analiseSelecionado,
      objective: this.state.objetivoSelecionado,
      name: name,
    };

    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    axios
      .post(
        process.env.REACT_APP_API_URL + "/combination/update-objetivo-analise/",
        form,
        config
      )
      .then(function (response) {
        response.json.then(function (data) { });
      })
      .catch(function (err) {
        let erro = [];
        let values = err.response;
        if (values) {
          for (let i = 0; i < values.data.length; i++) {
            erro[i] = values.data[i].msg;
          }
          parent.setState({
            errors: erro
          });
        } else {
          let com = parent.state.combinations;
          for (let x = 0; x < com.length; x++) {
            if (parseInt(com[x].id, 10) === parseInt(form.id, 10)) {
              com[x].analysis = form.analysis;
              com[x].objective = form.objective;
              break;
            }
          }

          if (parent.state.refAlteracao === true) {
            parent.setState({
              refAlteracao: false
            }, () => {
              parent.savePriorityAux(parent.state.form, parent.state.valor);
            });
          }

          if (parent.state.btMore === true) {
            parent.setState({
              id: "",
              combinations: com,
              colorSave: "#99a5b5"
            });
          }
          else {
            parent.setState({
              combinations: com,
              colorSave: "#99a5b5"
            });
          }
        }
      })
      .then(function (val) { });
  }

  adicionarBox(acao, i) {
    let box = this.state.box;
    if (box[i].acoes == null) {
      box[i].acoes = [];
    }

    box[i].acoes.push(acao);
    this.setState({
      box: box
    });
  }

  deletarBox(index, count) {
    let box = this.state.box;
    box[count].acoes.splice(index, 1);

    this.setState({
      box: box
    });
  }

  updateBox(acao, i, id) {
    let box = this.state.box;
    for (let x = 0; x < box[i].acoes.length; x++) {
      if (parseInt(box[i].acoes[x].id, 10) === parseInt(id, 10)) {
        box[i].acoes[x] = acao;
        break;
      }
    }

    this.setState({
      box: box
    });
  }

  atualizarMeta(index) {
    let data = this.state.box[index];
    this.setState(
      {
        nameMeta:
          String(data.value) !== ""
            ? data.value
            : "Meta " + (this.state.box.length + 1),
        responsavel: data.responsible,
        inicio: data.start,
        fim: data.end,
        unidade: data.unity,
        valorInicial: data.initialValue,
        valorMeta: data.targetValue,
        descMeta: data.description,
        idMeta: data.id,
        indexMeta: index,
        idResponsavelMeta: data.responsible,
        alertMeta: true,
        enableDisable: false
      },
      () => {
        this.calculoData();
      }
    );
  }

  updateMetaNeo(close, bool) {
    let form = {
      name:
        String(this.state.nameMeta) !== ""
          ? this.state.nameMeta
          : "Meta " + (this.state.box.length + 1),
      start: this.state.inicio,
      end: this.state.fim,
      inicio: this.state.inicio,
      fim: this.state.fim,
      initialValue: this.state.valorInicial,
      targetValue: this.state.valorMeta,
      unity: this.state.unidade,
      description: this.state.descMeta,
      responsible: this.state.responsavel
    };

    let responasavel = this.state.idResponsavelMeta;
    let idDaMeta = this.state.idMeta;

    let id = this.state.id;
    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    axios
      .post(
        process.env.REACT_APP_API_URL + "/actions/update/metas",
        {
          form: form,
          idCombination: id,
          idResponsible: responasavel,
          idMeta: idDaMeta
        },
        config
      )
      .then(function (response) {
        if (parseInt(response.data.status, 10) === 200) {
          let meta = parent.state.box;
          for (let x = 0; x < meta.length; x++) {
            if (parseInt(meta[x].id, 10) === parseInt(idDaMeta, 10)) {
              meta[x].id = idDaMeta;
              meta[x].nameMeta = form.name;
              meta[x].inicio = String(form.start);
              meta[x].fim = String(form.end);
              meta[x].end = String(form.end);
              meta[x].start = String(form.start)
              meta[x].valorInicial = form.initialValue;
              meta[x].valorMeta = form.targetValue;
              meta[x].unidade = form.unity;
              meta[x].unity = form.unity;
              meta[x].descMeta = form.description;
              meta[x].description = form.description;
              meta[x].responsavel = form.responsible;
              meta[x].value = form.name;
              break;
            }
          }
          parent.setState({
            box: meta,
          });

          if (close && bool == 1) {
            parent.setState({
              alertMeta: false
            });
          }
        }
      });
  }

  limparDesicores(valor) {

    this.setState({
      colorBtnSave: "#d0ac54"
    });

    if (String(valor) === "impactados") {
      this.setState({
        impactados: ""
      });
    }

    if (String(valor) === "decisores") {
      this.setState({
        decisores: ""
      });
    }

    if (String(valor) === "resultadosEsperados") {
      this.setState({
        resultadosEsperados: ""
      });
    }

    if (String(valor) === "influenciadores") {
      this.setState({
        influenciadores: ""
      });
    }
  }

  deleteDescMeta() {
    this.setState({
      descMeta: ""
    });
  }

  emitChange() { }

  quebraTexto(a) {
    let b = "";
    let c = "";
    let ultimoEspaco = 0;
    if (a.length > 65) {
      for (let x = 0; x < a.length; x++) {
        if (String(a[x]) === " ") {
          ultimoEspaco = x;
        }
        if (parseInt(x, 10) === 65) {
          b = a.substring(ultimoEspaco, a.length);
          c = a.replace(b, "...");
        }
      }
    } else {
      c = a;
    }
    return c;
  }

  nextSelected() {
    var url = new URL(window.location.href);
    var type = url.searchParams.get("type");
    let data = this.state.combinations;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (parseInt(data[i].id, 10) === parseInt(type, 10)) {
          this.select({ target: { value: data[i].id } });
          //this.mostrarSelecionado(data[i].id);
          // this.setState({
          //   colorexec: data[i].priority
          // });
        }
      }
    }
  }

  closePopupAspect(e) {
    this.setState({
      popupAspect: false,
    });
  }

  removeAspect(id, type) {
    let combinations = this.state.combinations;
    if (type === "Strength" || type === "Weakness") {
      for (let x = 0; x < combinations.length; x++) {
        for (let y = combinations[x].intern.length - 1; y >= 0; y--) {
          if (combinations[x].intern[y] != null) {
            if (
              parseInt(combinations[x].intern[y].id, 10) === parseInt(id, 10)
            ) {
              combinations[x].intern.splice(y, 1);
            }
          }
        }
      }
    } else {
      for (let x = 0; x < combinations.length; x++) {
        for (let y = combinations[x].external.length - 1; y >= 0; y--) {
          if (combinations[x].external[y] != null) {
            if (
              parseInt(combinations[x].external[y].id, 10) === parseInt(id, 10)
            ) {
              combinations[x].external.splice(y, 1);
            }
          }
        }
      }
    }

    this.setState({
      combinations: this.state.combinations
    });
  }

  alterAspect(id, name, details, source_name, source, tags, type) {
    let combinations = this.state.combinations;
    if (type === "Strength" || type === "Weakness") {
      for (let x = 0; x < combinations.length; x++) {
        for (let y = combinations[x].intern.length - 1; y >= 0; y--) {
          if (parseInt(combinations[x].intern[y].id, 10) === parseInt(id, 10)) {
            combinations[x].intern[y].name = name;
            combinations[x].intern[y].details = details;
            combinations[x].intern[y].source_name = source_name;
            combinations[x].intern[y].source = source;
            combinations[x].intern[y].tags = tags;
          }
        }
      }
    } else {
      for (let x = 0; x < combinations.length; x++) {
        for (let y = combinations[x].external.length - 1; y >= 0; y--) {
          if (
            parseInt(combinations[x].external[y].id, 10) === parseInt(id, 10)
          ) {
            combinations[x].external[y].name = name;
            combinations[x].external[y].details = details;
            combinations[x].external[y].source_name = source_name;
            combinations[x].external[y].source = source;
            combinations[x].external[y].tags = tags;
          }
        }
      }
    }
    this.setState({
      combinations: this.state.combinations
    });
  }

  addAspect() { }

  apagarAspecto(id, type) {
    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    let form = {
      id: id,
      type: type
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/swot/delete/", form, config)
      .then(function (response) {
        response.json.then(function (data) { });
      })
      .catch(function (err) {
        let erro = [];
        let values = err.response;
        if (values) {
          for (let i = 0; i < values.data.length; i++) {
            erro[i] = values.data[i].msg;
          }
          parent.setState({
            errors: erro
          });
        } else {
          parent.removeAspect(id, type);
        }
      })
      .then(function (val) { });
  }

  setName(n) {
    if (n != null && String(n) !== "") {
      if (String(n) === "Strength") {
        return "FORÇA";
      } else if (String(n) === "Weakness") {
        return "FRAQUEZA";
      } else if (String(n) === "Opportunity") {
        return "OPORTUNIDADE";
      } else {
        return "AMEAÇA";
      }
    }
  }

  selectAspect(selected) {
    this.setState({
      selectedAspect: selected,
      popupAspect: true,
      type: selected.type
    });
  }

  updatePriorityCombination(id, prioridade) {
    let saveId = id == null || String(id) === '' ? this.state.id : id;
    let parent = this;
    let config = {
      headers: {
        Accept: "application/json"
      }
    };

    axios
      .post(
        process.env.REACT_APP_API_URL + "/combination/udpate/combination",
        { id: saveId, priority: prioridade },
        config
      )
      .then(function (response) {
        response.json.then(function (data) { });
      })
      .catch(function (err) { })
      .then(function (val) { });
  }

  selectIntern(e, indicator, id) {
    this.setState({
      colorSave: "#d0ac54"
    });

    if (indicator == "prioridade") {
      let combinacoes = this.state.combinations;
      if (this.state.indexSelecionadoComb != null && combinacoes[this.state.indexSelecionadoComb] != null) {
        combinacoes[this.state.indexSelecionadoComb].priority = id;
      }

      this.setState({
        priority: id,
        prioridadeSelecionado: id,
        combinations: combinacoes,
      });
    } else if (indicator == "complexidade") {
      this.setState({
        complexidade: id
      });
    } else if (indicator == "risco") {
      this.setState({
        risco: id
      });
    } else if (indicator == "impacto") {
      this.setState({
        impacto: id
      });
    } else if (indicator == "prazo") {
      this.setState({
        prazo: id
      });
    } else if (indicator == "recursos") {
      this.setState({
        recursos: id
      });
    }
  }

  tratarObjeto(data) {
    let a = JSON.stringify(data);
    let d = a.replace("[", "");
    d = d.replace("]", "");
    d = "'" + d + "'";
    return d;
  }

  saveComponent(e, valor) {
    let data = [];
    let form = {
      id: data.length,
      content: e.target.value
    };

    if (valor == "decisores") {
      data = this.state.itensDeciores.slice();
      this.setState(prevState => ({
        itensDeciores: [...prevState.itensDeciores, form],
        namePillars: valor
      }));
    }
    else if (valor == "influenciadores") {
      data = this.state.itensInfluenciadores.slice();
      this.setState(prevState => ({
        itensInfluenciadores: [...prevState.itensInfluenciadores, form],
        namePillars: valor
      }));
    }
    else if (valor == "impactados") {
      data = this.state.itensImpactados.slice();
      this.setState(prevState => ({
        itensImpactados: [...prevState.itensImpactados, form],
        namePillars: valor
      }));
    }
    else if (valor == "publicos") {
      data = this.state.itensPublicos.slice();
      this.setState(prevState => ({
        itensPublicos: [...prevState.itensPublicos, form],
        namePillars: valor
      }));
    }
    data.push(form);

    let content = [];
    if (this.state.id != '') {
      this.savePriority(this.tratarObjeto(data), valor);
    }
    else {
      this.savePriorityAux(this.tratarObjeto(data), valor);
    }
  }

  componentText(e, valor) {
    if (this.state.colorSave == "#99a5b5") {
      if (this.state.id !== '') {
        this.saveComponent(e, valor);
      } else {
        this.alertMensagem(actions1.erroPillars);
      }
    } else {
      this.saveComponent(e, valor);
    }
  }

  deleteItemDnd(index, valor) {
    let data = [];
    if (valor == "decisores") {
      data = this.state.itensDeciores;
      data.splice(index, 1);
      this.setState({
        itensDeciores: data
      });
    } else if (valor == "influenciadores") {
      data = this.state.itensInfluenciadores;
      data.splice(index, 1);
      this.setState({
        itensInfluenciadores: data
      });
    } else if (valor == "impactados") {
      data = this.state.itensImpactados;
      data.splice(index, 1);
      this.setState({
        itensImpactados: data
      });
    } else if (valor == "publicos") {
      data = this.state.itensPublicos;
      data.splice(index, 1);
      this.setState({
        itensPublicos: data
      });
    }

    let content = [];
    let nodes = [];
    let id = [];

    for (let x = 0; x < data.length; x++) {
      id.push(data[x].id);
      content.push(data[x].content);
    }
    for (let x = 0; x < data.length; x++) {
      nodes.push({ id: id[x], content: content[x] });
    }
    let a = JSON.stringify(nodes);
    let d = a.replace("[", "");
    d = d.replace("]", "");
    d = "'" + d + "'";

    this.savePriority(d, valor);
  }

  updateData(values, valor) {
    let data = values;
    let content = [];
    let nodes = [];
    let id = [];

    for (let x = 0; x < data.length; x++) {
      id.push(data[x].id);
      content.push(data[x].content);
    }
    for (let x = 0; x < data.length; x++) {
      nodes.push({ id: id[x], content: content[x] });
    }
    let a = JSON.stringify(nodes);
    let d = a.replace("[", "");
    d = d.replace("]", "");
    d = "'" + d + "'";

    this.savePriority(d, valor);
  }

  updateValorTextAreaAnalise(evt) {
    this.setState({
      analiseSelecionado: evt.target.value,
      colorSave: "rgb(208, 172, 84)",
      alterouS: true
    });
  }

  updateValorTextAreaTitle(evt) {
    this.setState({
      nameSelecionado: evt.target.value,
      colorSave: "rgb(208, 172, 84)",
      alterouS: true
    });
  }

  updateValorTextAreaEstrategico(evt) {
    this.setState({
      objetivoSelecionado: evt.target.value,
      colorSave: "rgb(208, 172, 84)",
      alterouS: true
    });
  }
  closeAlert() {
    this.setState({
      alertShow: null,
    })
  }
  cancelDetele
  alertMensagem(msg) {
    this.setState({
      alertShow: (
        <div className="pai-sweet">
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "-100px", left: '50%', top: '37%' }}
            title={actions1.atencao}
            onCancel={() => this.closeAlert()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
            cancelBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            showCancel={false}
            showConfirm={false}>
            <div style={{ width: '80%', display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
              {msg}
            </div>
            <br />
            <Btnsuccess onClick={() => this.closeAlert()}>{actions1.fechar}</Btnsuccess>
          </SweetAlert>
        </div>
      )
    })
  }

  salvarLimpar() {
    if (this.state.colorSave == "rgb(208, 172, 84)" || this.state.colorSave == "#d0ac54") {
      this.saveOptions();
      this.setState({
        limpar: true,
        controleIndexA: (this.state.controleIndexA + 1),
      });
    } else if (this.state.id == '' || this.state.id == null) {
      this.alertMensagem(actions1.msgErrorSave)
      return false;
    } else {
      this.clearAll();
    }

    // if(this.state.colorSave == "#99a5b5"){
    //   this.clearAll();
    // }
    // else{
    //   this.setState({
    //     limpar: true,
    //     controleIndexA: (this.state.controleIndexA + 1),
    //   }, () => {
    //     this.saveOptions();
    //   });
    // }
  }

  /*
    salvarLimpar() {
      if(this.state.selected !== "SELECIONE" && this.state.nameSelecionado !== ""){
        this.clearAll();
      }
  
      if(this.state.nameSelecionado == ""){
        this.alertMensagem(actions1.msgErrorSave)
      }else{
        this.setState({
          limpar: true,
        }, () => {
          this.saveOptions();
        })
      }
    }
  */

  deleteCombinationConfirm() {
    this.setState({
      deleteCombinationConfirm: true,
    });
  }

  deleteCombinationCancel() {
    this.setState({
      deleteCombinationConfirm: false,
    });
  }



  deleteCombination() {
    if (String(this.state.selected) !== "selecionado") {
      let parent = this;
      let config = {
        headers: {
          Accept: "application/json"
        }
      };

      let form = {
        id: this.state.selected,
        type: ''
      };

      axios.post(process.env.REACT_APP_API_URL + "/combination/delete/", form, config)
        .then(function (response) {
          response.json.then(function (data) {

          });
        }).catch(function (err) {
          let erro = [];
          let values = err.response;
          if (values) {
            for (let i = 0; i < values.data.length; i++) {
              erro[i] = values.data[i].msg;
            }
            parent.setState({
              errors: erro,
            });
          }
          else {
            let combinacoes = [];
            combinacoes = parent.state.combinations.slice();
            for (let i = 0; i < parent.state.combinations.length; i++) {
              if (parent.state.combinations[i].id === parent.state.selected) {
                combinacoes.splice(i, 1);
              }
            }

            parent.setState({
              colorDelete: '#99a5b5',
              combinations: combinacoes,
              nameMeta: "",
              responsavel: "",
              inicio: "",
              fim: "",
              unidade: "",
              valorInicial: "",
              valorMeta: "",
              descMeta: "",
              responasavel: "",
              selected: actions1.selecione,
              objetivoSelecionado: "",
              desdobramentoSelecionado: "",
              prioridadeSelecionado: 0,
              indexSelecionado: "",
              nameSelecionado: "",
              analiseSelecionado: "",
              internSelecionado: [],
              externalSelecionado: [],
              indicator: [],
              alta: false,
              media: false,
              baixa: false,
              curto: false,
              longo: false,
              curtissimo: false,
              colorCom: "",
              colorexec: "",
              colorrisc: "",
              colorRec: "",
              colorIm: "",
              colorPra: "",
              box: [],
              conte: 0,
              alertMeta: null,
              alertAcao: null,
              responsavelGeral: "",
              priority: "",
              complexidade: "",
              risco: "",
              impacto: "",
              recursos: "",
              prazo: "",
              id: "",
              indicators: [],
              idIndicator: "",
              dataBox: [],
              acoes: [],
              idMeta: "",
              decisores: "",
              influenciadores: "",
              impactados: "",
              resultadosEsperados: "",
              nameEmpresa: "",
              namePlan: "",
              idGroup: "",
              idResults: "",
              indexMeta: "",
              idResponsavelMeta: "",
              overview: true,
              respOriginal: "",
              colorBtnSave: "#99a5b5",
              colorPriority: "#99a5b5",
              colorSave: "#99a5b5",
              combinationSelection: "",
              popupAspect: false,
              type: "",
              itensDeciores: [],
              itensInfluenciadores: [],
              itensImpactados: [],
              itensPublicos: [],
              alterouS: false,
              refAlteracao: false,
              valor: "",
              form: "",
              idImpactos: "",
              btMore: true,
              nameSelecionadoCompleto: "",
              indexSelecionadoComb: "",
              deleteCombinationConfirm: false,
            });

          }
        })
        .then(function (val) {
        });

    }
  }



  clearAll() {
    this.setState({
      nameMeta: "",
      responsavel: "",
      inicio: "",
      fim: "",
      unidade: "",
      valorInicial: "",
      valorMeta: "",
      descMeta: "",
      responasavel: "",
      selected: actions1.selecione,
      objetivoSelecionado: "",
      desdobramentoSelecionado: "",
      prioridadeSelecionado: 0,
      indexSelecionado: "",
      nameSelecionado: "",
      analiseSelecionado: "",
      internSelecionado: [],
      externalSelecionado: [],
      indicator: [],
      alta: false,
      media: false,
      baixa: false,
      curto: false,
      longo: false,
      curtissimo: false,
      colorCom: "",
      colorexec: "",
      colorrisc: "",
      colorRec: "",
      colorIm: "",
      colorPra: "",
      box: [],
      conte: 0,
      alertMeta: null,
      alertAcao: null,
      responsavelGeral: "",
      priority: "",
      complexidade: "",
      risco: "",
      impacto: "",
      recursos: "",
      prazo: "",
      id: "",
      indicators: [],
      idIndicator: "",
      dataBox: [],
      acoes: [],
      idMeta: "",
      decisores: "",
      influenciadores: "",
      impactados: "",
      resultadosEsperados: "",
      nameEmpresa: "",
      namePlan: "",
      idGroup: "",
      idResults: "",
      indexMeta: "",
      idResponsavelMeta: "",
      overview: true,
      respOriginal: "",
      colorBtnSave: "#99a5b5",
      colorPriority: "#99a5b5",
      colorSave: "#99a5b5",
      combinationSelection: "",
      popupAspect: false,
      type: "",
      itensDeciores: [],
      itensInfluenciadores: [],
      itensImpactados: [],
      itensPublicos: [],
      alterouS: false,
      refAlteracao: false,
      valor: "",
      form: "",
      idImpactos: "",
      btMore: true,
      nameSelecionadoCompleto: "",
      indexSelecionadoComb: "",
      colorDelete: '#99a5b5',
    });
  }

  updateUnidade(valor) {
    let tarefa = false;
    let val1 = "";
    let val2 = "";
    if (valor == "tarefa") {
      tarefa = true;
      val1 = 0;
      val2 = 100;
    } else if (valor == "porcentagem") {
      val1 = 0;
      val2 = 100;
    }

    this.setState({
      unidade: valor,
      colorSave: "rgb(208, 172, 84)",
      enableDisable: tarefa,
      valorInicial: val1,
      valorMeta: val2,
    });
  }

  mudarCorSelection() {
    this.setState({
      colorSave: "rgb(208, 172, 84)"
    });
  }

  calculoData() {
    let enable = false;
    if (this.state.unidade == "tarefa") {
      enable = true;
    }
    let inicio = this.state.inicio;
    let fim = this.state.fim;
    let diferenca = Moment(fim).diff(inicio, "days");
    let opcao = 0;

    if (diferenca == 7) {
      opcao = 1;
    } else if (diferenca == 15) {
      opcao = 2;
    } else if (diferenca == 30) {
      opcao = 3;
    } else if (diferenca == 60) {
      opcao = 4;
    } else if (diferenca == 90) {
      opcao = 5;
    } else if (diferenca == 180) {
      opcao = 6;
    } else if (diferenca == 365) {
      opcao = 7;
    }

    this.setState({
      colorDatas: opcao,
      enableDisable: enable,
    });
  }

  fake() { }

  selecioneDatas(opcao) {
    let color = "#99a5b5";
    if (opcao == "") {
      opcao = 1;
    } else {
      color = "rgb(208, 172, 84)";
    }

    let agora = Moment().format("YYYY-MM-DD");

    if (this.state.inicio != Date) {
      agora = this.state.inicio;
    }

    let proximo = "";
    if (opcao === 1) {
      proximo = Moment(agora)
        .add(7, "days")
        .format("YYYY-MM-DD");
    } else if (opcao === 2) {
      proximo = Moment(agora)
        .add(15, "days")
        .format("YYYY-MM-DD");
    } else if (opcao === 3) {
      proximo = Moment(agora)
        .add(30, "days")
        .format("YYYY-MM-DD");
    } else if (opcao === 4) {
      proximo = Moment(agora)
        .add(60, "days")
        .format("YYYY-MM-DD");
    } else if (opcao === 5) {
      proximo = Moment(agora)
        .add(90, "days")
        .format("YYYY-MM-DD");
    } else if (opcao === 6) {
      proximo = Moment(agora)
        .add(180, "days")
        .format("YYYY-MM-DD");
    } else if (opcao === 7) {
      proximo = Moment(agora)
        .add(365, "days")
        .format("YYYY-MM-DD");
    } else if (opcao === 8) {
      proximo = this.state.fim;
    }


    this.setState({
      inicio: agora,
      fim: proximo,
      colorDatas: opcao,
      colorSave: color,
    });
  }

  render() {
    let popupValue = this.state.selectedAspect;
    let internSelecionado = [];
    let externalSelecionado = [];
    let button = this.state.box.map((item, i) => (
      <Box
        meta={item.value}
        detalhes={item.description}
        dateInicio={item.start}
        dateFim={item.end}
        key={item + i}
        idDelete={item.id}
        delete={this.deleteMeta.bind(this)}
        count={i}
        data={item.acoes == null ? [] : item.acoes}
        adicionarBox={this.adicionarBox.bind(this)}
        deleteBox={this.deletarBox.bind(this)}
        updateBox={this.updateBox.bind(this)}
        updateMeta={this.atualizarMeta.bind(this)}
        template={this.state.template}
        edit={this.state.edit}
        deletePermission={this.state.delete}
        users={this.state.users}
        template={this.state.template}
        edit={this.state.edit}
      />
    ));

    internSelecionado = this.state.internSelecionado.map((item, i) => (
      <AscpectsTag
        style={{ cursor: "pointer" }}
        onClick={() => this.selectAspect(item)}
        key={i}
      >
        {this.setName(item.type) + ": " + item.name}
      </AscpectsTag>
    ));

    externalSelecionado = this.state.externalSelecionado.map((item, i) => (
      <AscpectsTag
        style={{ cursor: "pointer" }}
        onClick={() => this.selectAspect(item)}
        key={item}
      >
        {this.setName(item.type) + ": " + item.name}
      </AscpectsTag>
    ));

    let options1 = [actions1.alta, actions1.media, actions1.baixa];
    let options2 = [actions1.curto, actions1.riscoMasc2, actions1.longo];
    let optionsRisco = [actions1.riscoMasc1, actions1.riscoMasc2, actions1.riscoMasc3];

    return (
      <div>
        {!this.state.popupAspect ?
          <div>
            {this.state.load ? <Load /> : null}
            {this.state.alertShow}
            {/* alert de criação de metas */}
            {this.state.deleteCombinationConfirm ? (
              <GridContainer justify="center">
                <div className="pai-sweet">
                  <SweetAlert
                    style={{ display: "table", marginTop: "-300px", width: "30%", color: '#6b6a6a' }}
                    title={actions1.perguntaExcluir}
                    showConfirm={false}
                    showCancel={false}
                    onConfirm={() => this.fake()}
                    onCancel={() => this.fake()}
                    confirmBtnCssClass={
                      this.props.classes.button + " " + this.props.classes.success
                    }
                    cancelBtnCssClass={
                      this.props.classes.button + " " + this.props.classes.danger
                    }>


                    <GridItem md={12} xs={12} sm={12} style={{ marginBottom: '2vh' }}>
                      <p className="legenda-compartilhar" style={{ color: "#6b6a6a" }}></p>
                      <div className="select-permission">

                      </div>


                    </GridItem>
                    <br />
                    <Btncancel className="btn-save" onClick={() => this.deleteCombinationCancel()}>{actions1.cancelExcluir}</Btncancel>
                    <Btnsuccess className="btn-save" onClick={e => this.deleteCombination(e)}>{actions1.confirmExcluir}</Btnsuccess>

                  </SweetAlert>
                </div>
              </GridContainer>
            ) : null}
            {this.state.alertMeta ? (
              <SweetAlert
                style={{
                  width: "700px",
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
                    position: "absolute",
                    width: "50px",
                    height: "48px",
                    marginLeft: "4px",
                    color: "rgb(255, 255, 255)",
                    zIndex: "6000",
                    top: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Flag
                    style={{
                      width: "37px",
                      height: "37px"
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      fontSize: "15px",
                      fontFamily: "din-condensed,sans-serif",
                      marginTop: "62%",
                      left: "60px",
                      width: "137px",
                      color: "#002960",
                      fontWeight: "bold",
                      top: "0vh"
                    }}
                  >
                    {this.state.idMeta
                      ? actions1.atualizarMeta
                      : actions1.adicionarMeta}
                  </div>
                </CardIcon>
                <div>

                  <div>
                    {this.state.template && this.state.edit ?
                      <Save
                        style={{
                          color: this.state.colorSave,
                          position: "absolute",
                          left: "84.7%",
                          cursor: "pointer",
                          top: "3%",
                          width: "5%"
                        }}
                        onClick={() => this.saveMeta(true, 1)}
                      /> : null}
                    {this.state.template && this.state.edit ?
                      <AddCircle
                        style={{
                          color: this.state.colorSave,
                          position: "absolute",
                          left: "89.2%",
                          cursor: "pointer",
                          top: "3%",
                          width: "5%"
                        }}
                        onClick={() => this.saveMeta(false, 0)}
                      /> : null}

                  </div>

                  <Fechar
                    style={{
                      color: "rgb(153, 165, 181)",
                      left: "93.5%",
                      position: "absolute",
                      cursor: "pointer",
                      width: "5%",
                      top: "3%"
                    }}
                    onClick={() => this.cancel()}
                  />
                </div>
                <GridContainer style={{ marginTop: "6vh", backgroundColor: "" }}>
                  <GridItem md={6} xs={12} sm={12} style={{ marginTop: "-15px" }}>
                    <Card style={{ boxShadow: "none" }}>
                      <CardBody style={{ marginTop: "-20px" }}>
                        <div
                          style={{
                            position: "absolute",
                            marginLeft: "-18px",
                            color: "#002960"
                          }}
                        >
                          <Flag
                            className="icone"
                            style={{ marginTop: "-13px", marginLeft: "0px" }}
                          />
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            marginLeft: "4%",
                            width: "82%",
                            marginTop: "-1px"
                          }}
                        >
                          <Inputt
                            placeholder={actions1Box.placeholderNomeMeta}
                            style={{
                              textAlign: "center",
                              width: "100%",
                              fontSize: "14px",
                              fontFamily: "Roboto"
                            }}
                            value={this.state.nameMeta}
                            onChange={evt => this.updateValor(evt, "name")}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem md={6} xs={12} sm={12} style={{ marginTop: "-15px" }}>
                    <Card style={{ boxShadow: "none" }}>
                      <div
                        style={{
                          position: "absolute",
                          color: "#002960",
                          left: "0.5%"
                        }}
                      >
                        <HowToReg
                          className="howtoreg"
                          style={{ marginTop: "-13px" }}
                        />
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          marginLeft: "8%",
                          width: "83%",
                          marginTop: "-16px"
                        }}
                      >
                        <SelectActions
                          className="minha_classe"
                          styleDiv={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: "14px",
                            fontFamily: "Roboto"

                          }}
                          users={this.state.users}
                          change={this.updateValue.bind(this)}
                          estilo={{}}
                          selectEstilo={{
                            fontSize: "12px",
                            border: "none",
                            width: "98%",
                            left: "1.5%"
                          }}
                          id={this.state.responsavel}
                        />
                      </div>
                    </Card>
                  </GridItem>
                  <GridContainer style={{ marginTop: "0vh" }}>
                    <GridItem md={6} xs={12} sm={12} style={{ marginTop: "-25px" }}>
                      <Card style={{ boxShadow: "none" }}>
                        <div
                          style={{
                            fontFamily: "din-condensed, sans-serif",
                            fontWeight: "bold",
                            color: "#002960",
                            fontSize: "13px"
                          }}
                        >
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

                    <GridItem md={6} xs={12} sm={12} style={{ marginTop: "-25px" }}>
                      <Card style={{ boxShadow: "none" }}>
                        <div
                          style={{
                            fontFamily: "din-condensed, sans-serif",
                            fontWeight: "bold",
                            color: "#002960",
                            fontSize: "13px",
                          }}
                        >
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
                    <GridItem md={12} xs={12} sm={12} style={{ marginTop: "10px" }}>
                      <Card className="selecionedatas">
                        <div>
                          <span
                            onClick={() => this.selecioneDatas(1)}
                            style={{
                              color:
                                this.state.colorDatas == 1 ? "#002960" : "#99a5b5",
                              fontFamily: "Roboto",
                              fontWeight: "bold",
                              fontSize: "14px"
                            }}
                          >
                            7 dias
                      </span>{" "}
                          |
                      <span
                            onClick={() => this.selecioneDatas(2)}
                            style={{
                              color:
                                this.state.colorDatas == 2 ? "#002960" : "#99a5b5",
                              fontFamily: "Roboto",
                              fontWeight: "bold",
                              fontSize: "14px"
                            }}
                          >
                            15 dias
                      </span>{" "}
                          |
                      <span
                            onClick={() => this.selecioneDatas(3)}
                            style={{
                              color:
                                this.state.colorDatas == 3 ? "#002960" : "#99a5b5",
                              fontFamily: "Roboto",
                              fontWeight: "bold",
                              fontSize: "14px"
                            }}
                          >
                            30 dias
                      </span>{" "}
                          |
                      <span
                            onClick={() => this.selecioneDatas(4)}
                            style={{
                              color:
                                this.state.colorDatas == 4 ? "#002960" : "#99a5b5",
                              fontFamily: "Roboto",
                              fontWeight: "bold",
                              fontSize: "14px"
                            }}
                          >
                            60 dias
                      </span>{" "}
                          |
                      <span
                            onClick={() => this.selecioneDatas(5)}
                            style={{
                              color:
                                this.state.colorDatas == 5 ? "#002960" : "#99a5b5",
                              fontFamily: "Roboto",
                              fontWeight: "bold",
                              fontSize: "14px"
                            }}
                          >
                            90 dias
                      </span>{" "}
                          |
                      <span
                            onClick={() => this.selecioneDatas(6)}
                            style={{
                              color:
                                this.state.colorDatas == 6 ? "#002960" : "#99a5b5",
                              fontFamily: "Roboto",
                              fontWeight: "bold",
                              fontSize: "14px"
                            }}
                          >
                            180 dias
                      </span>{" "}
                          |
                      <span
                            onClick={() => this.selecioneDatas(7)}
                            style={{
                              color:
                                this.state.colorDatas == 7 ? "#002960" : "#99a5b5",
                              fontFamily: "Roboto",
                              fontWeight: "bold",
                              fontSize: "14px"
                            }}
                          >
                            365 dias
                      </span>
                        </div>
                      </Card>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={2} sm={12} xs={12} style={{ marginTop: "-25px" }}>
                      <Card style={{ boxShadow: "none" }}>
                        <div
                          style={{
                            fontFamily: "din-condensed, sans-serif",
                            fontWeight: "bold",
                            color: "#002960",
                            fontSize: "13px"
                          }}
                        >
                          {actions1.unidade}:
                    </div>
                      </Card>
                    </GridItem>
                    <GridItem md={2} sm={12} xs={12} style={{ marginTop: "-25px" }}>
                      <Card style={{ marginLeft: "-32%", boxShadow: "none" }}>
                        <div
                          style={{
                            fontFamily: "din-condensed, sans-serif",
                            fontSize: "15px",
                            fontWeight: "bold",
                            color:
                              String(this.state.unidade) === "numerico"
                                ? "#002960"
                                : "#ccd2da",
                            cursor: "pointer"
                          }}
                          onClick={() => this.updateUnidade("numerico")}
                        >
                          {actions1.numerico}
                          <img
                            src={
                              String(this.state.unidade) === "numerico"
                                ? quadrado1
                                : quadrado2
                            }
                            style={{
                              width: "17px",
                              position: "absolute",
                              marginLeft: "10%",
                              marginTop: "1px"
                            }}
                          />
                        </div>
                      </Card>
                    </GridItem>
                    <GridItem md={2} sm={12} xs={12} style={{ marginTop: "-25px" }}>
                      <Card style={{ boxShadow: "none" }}>
                        <div
                          style={{
                            fontFamily: "din-condensed, sans-serif",
                            fontSize: "15px",
                            color:
                              this.state.unidade == "monetario"
                                ? "#002960"
                                : "#ccd2da",
                            cursor: "pointer",
                            fontWeight: "bold",
                            width: "18vh",
                            marginLeft: '-11px'
                          }}
                          onClick={() => this.updateUnidade("monetario")}
                        >
                          {actions1.monetario}
                          <Money
                            style={{
                              position: "absolute",
                              marginTop: "-2px",
                              fontSize: "20px"
                            }}
                          />
                        </div>
                      </Card>
                    </GridItem>
                    <GridItem md={2} sm={12} xs={12} style={{ marginTop: "-25px" }}>
                      <Card style={{ boxShadow: "none" }}>
                        <div
                          style={{
                            fontFamily: "din-condensed, sans-serif",
                            fontSize: "15px",
                            fontWeight: "bold",
                            color:
                              String(this.state.unidade) === "porcentagem"
                                ? "#002960"
                                : "#ccd2da",
                            cursor: "pointer",
                            width: "137%",
                            marginLeft: "20%",
                            zIndex: "2"
                          }}
                          onClick={() => this.updateUnidade("porcentagem")}
                        >
                          <img
                            alt={"Porcentagem"}
                            src={
                              String(this.state.unidade) === "porcentagem"
                                ? porcentagem1
                                : porcentagem2
                            }
                            style={{
                              width: "17px",
                              position: "absolute",
                              marginLeft: "135%",
                              marginTop: "1px",
                              zIndex: "10"
                            }}
                          />
                          {actions1.porcentagem}
                        </div>
                      </Card>
                    </GridItem>
                    <GridItem md={2} sm={12} xs={12} style={{ marginTop: "-25px" }}>
                      <Card style={{ boxShadow: "none" }}>
                        <div
                          style={{
                            fontFamily: "din-condensed, sans-serif",
                            fontSize: "15px",
                            fontWeight: "bold",
                            color:
                              String(this.state.unidade) === "tarefa"
                                ? "#002960"
                                : "#ccd2da",
                            cursor: "pointer",
                            width: "192%",
                            marginLeft: "20%"
                          }}
                          onClick={() => this.updateUnidade("tarefa")}
                        >
                          {actions1.tarefa}
                          <Prancheta
                            style={{
                              marginTop: "-2px",
                              marginLeft: "10%",
                              position: "absolute",
                              fontSize: "20px"
                            }}
                          />
                        </div>
                      </Card>
                    </GridItem>
                  </GridContainer>
                  <GridContainer style={{ marginTop: "-2vh" }}>
                    <GridItem md={6} xs={12} sm={12} style={{ marginTop: "-25px" }}>
                      <Card style={{ boxShadow: "none" }}>
                        <div
                          style={{
                            fontFamily: "din-condensed, sans-serif",
                            fontWeight: "bold",
                            color: "#002960",
                            fontSize: "13px",
                            position: "absolute",
                            marginLeft: "4%"
                          }}
                        >
                          {actions1Box.valorInicial}
                        </div>
                        <div style={{}}>
                          <Inputt
                            type="number"
                            placeholder="Unidade inicial"
                            disabled={this.state.enableDisable}
                            style={{
                              width: "58%",
                              marginLeft: "34%",
                              marginTop: "-4px"
                            }}
                            value={this.state.valorInicial}
                            onChange={evt => this.updateValor(evt, "valorInicial")}
                          />
                        </div>
                      </Card>
                    </GridItem>
                    <GridItem md={6} xs={12} sm={12} style={{ marginTop: "-25px" }}>
                      <Card style={{ boxShadow: "none" }}>
                        <div
                          style={{
                            fontFamily: "din-condensed, sans-serif",
                            fontWeight: "bold",
                            color: "#002960",
                            fontSize: "13px",
                            position: "absolute",
                            marginLeft: "2%"
                          }}
                        >
                          {actions1Box.valorMeta}
                        </div>
                        <div style={{}}>
                          <Inputt
                            type="number"
                            placeholder="Unidade final"
                            disabled={this.state.enableDisable}
                            style={{
                              width: "54%",
                              marginLeft: "35%",
                              marginTop: "-4px"
                            }}
                            value={this.state.valorMeta}
                            onChange={evt => this.updateValor(evt, "valorMeta")}
                          />
                        </div>
                      </Card>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ marginTop: "-25px" }}
                    >
                      <Card
                        style={{
                          backgroundColor: "#ebedf0",
                          width: "95%",
                          marginLeft: "2.5%",
                          borderRadius: "0px",
                          boxShadow: "none",
                          marginBottom: "0px"
                        }}
                      >
                        <CardHeader
                          style={{
                            marginBottom: "0px",
                            color: "#002960",
                            fontWeight: "bold",
                            fontFamily: "Roboto",
                            fontSize: "13px"
                          }}
                        >
                          {actions1.detalhesMeta}
                        </CardHeader>
                        <CardBody
                          style={{ marginTop: "-17px", marginBottom: "0px" }}
                        >
                          <textarea
                            className="textArea-class"
                            style={{
                              minHeight: "10vh",
                              height: "auto",
                              width: "100%",
                              resize: "none",
                              border: "none",
                              fontSize: "14px",
                              fontFamily: "Roboto"
                            }}
                            onChange={evt => this.updateValor(evt, "descMeta")}
                            placeholder={actions1.placeholderDetalheMeta}
                            value={this.state.descMeta}
                          />
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>
                </GridContainer>
              </SweetAlert>
            ) : null}

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} lg={12}>
                <Tabs guias={this.state.guias} />
                <div style={{ width: "100%" }}>
                  <img
                    alt={"Voltar"}
                    src={voltar}
                    style={{
                      width: "4vh",
                      height: "4vh",
                      position: "absolute",
                      left: "2.5%",
                      marginTop: "1%",
                      cursor: "pointer"
                    }}
                    onClick={() => this.backPage()}
                  />
                  <img
                    alt={"Avançar"}
                    src={voltar}
                    style={{
                      width: "4vh",
                      height: "4vh",
                      transform: "rotate(180deg)",
                      position: "absolute",
                      left: "95%",
                      marginTop: "1%",
                      cursor: "pointer"
                    }}
                    onClick={() => this.nextPage()}
                  />
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer
              style={{ backgroundColor: "#fff", marginTop: "12vh" }}
              className="container1"
            >
              <GridItem md={6}>
                <Icon>
                  <Beenhere className="icons" />
                  <div
                    style={{
                      marginLeft: "9vh",
                      marginTop: "-0.5vh",
                      fontWeight: "bold",
                      fontFamily: "din-condensed,sans-serif",
                      fontSize: "16px"
                    }}
                  >
                    ACTIONS
              </div>
                </Icon>
                <Card />
                <Card
                  style={{
                    background: "transparent",
                    marginTop: "10%",
                    marginLeft: "0.2%",
                    marginBottom: "0px",
                    boxShadow: "none",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "#001e46"
                  }}
                >
                  {actions1.explicacao}
                </Card>
              </GridItem>
              <GridItem md={6} xs={12}>
                {/* Botões de salvar e deletar */}
                {this.state.template && this.state.edit ? (
                  <GridContainer style={{
                    marginBottom: "-34px",
                    marginTop: "0%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}>

                    <GridItem style={{ boxShadow: "none", marginTop: "2%", marginLeft: "0.6%", background: "transparent" }}>

                      <Save
                        style={{
                          cursor: "pointer",
                          color: this.state.colorSave,
                          height: "34px",
                          width: "34px",
                          marginLeft: "-6%",
                        }}
                        onClick={() => this.saveOptions(true, 1)}
                      />

                      <AddCircle
                        style={{
                          color: "rgb(208, 172, 84)",
                          cursor: "pointer",
                          height: "34px",
                          width: "34px",
                          marginLeft: "5%",
                        }}
                        onClick={() => this.salvarLimpar()}
                      />

                      <Delete
                        style={{
                          cursor: "pointer",
                          color: this.state.colorDelete,
                          height: "34px",
                          width: "34px",
                          marginLeft: "1%",
                        }}
                        onClick={() => this.deleteCombinationConfirm()}
                      />

                    </GridItem>
                  </GridContainer>
                ) : null}
              </GridItem>
              <GridItem md={4} sm={12} xs={12} style={{ marginTop: "4.5vh" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontFamily: "din-condensed,sans-serif",
                    fontSize: "15px"
                  }}
                >
                  <Select
                    value={this.state.selected}
                    options={this.state.combinations}
                    onChange={this.select.bind(this)}
                    label={actions1.selecioneCombinacao}
                  />
                </div>
                <GridContainer justify="space-between" style={{ marginTop: "2vh" }}>
                  <GridItem
                    md={12}
                    xs={12}
                    sm={12}
                    style={{
                      backgroundColor: "#ebedf0",
                      marginLeft: "4%",
                      marginRight: "2%",
                      maxWidth: "95%"
                    }}
                  >
                    <Card
                      style={{
                        boxShadow: "none",
                        borderRadius: "0px",
                        marginTop: "14px"
                      }}
                    >
                      <CardHeader
                        style={{
                          backgroundColor:
                            parseInt(this.state.prioridadeSelecionado, 10) === 1
                              ? "#E40139"
                              : parseInt(this.state.prioridadeSelecionado, 10) === 2
                                ? "#FF7C32"
                                : parseInt(this.state.prioridadeSelecionado, 10) === 3
                                  ? "#FABA00"
                                  : "#99a5b5",
                          fontFamily: "din-condensed,sans-serif",
                          fontSize: "14px",
                          color: "#fff",
                          fontWeight: "bold",
                          height: '8vh'
                        }}
                      >
                        {/*{this.state.index !== undefined ? this.state.indexSelecionado + ": " : null} */}
                        <textarea
                          style={{
                            width: "100%",
                            height: "-2%",
                            resize: "none",
                            border: "none",
                            fontSize: "20px",
                            fontFamily: "Roboto",
                            background: "transparent",
                            color: "white",
                            height: '5vh'
                          }}
                          id="placeholderW"
                          value={String(this.state.nameSelecionado)}
                          onChange={evt => this.updateValorTextAreaTitle(evt)}
                          placeholder={actions1.analiseTitle}
                        >
                          {this.state.descMeta}
                        </textarea>
                      </CardHeader>
                      <CardBody>
                        {this.state.selected !== "SELECIONE" && (internSelecionado.length > 0 || externalSelecionado.length > 0)
                          ?
                          <CardHeader
                            style={{
                              marginLeft: "-7%",
                              fontSize: "14px",
                              fontWeight: "bold",
                              fontFamily: "Roboto",
                              marginTop: "-4%"
                            }}
                          >
                            {actions1.aspectos}
                          </CardHeader>
                          : null}
                        <div>{internSelecionado}</div>
                        <div>{externalSelecionado}</div>
                      </CardBody>
                      <CardBody>
                        <CardHeader
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: 'Roboto',
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          {actions1.analise}
                        </CardHeader>

                        <textarea
                          style={{
                            width: "100%",
                            height: "auto",
                            minHeight: "10vh",
                            resize: "none",
                            border: "none",
                            fontSize: "14px",
                            fontFamily: "Roboto"
                          }}
                          value={this.state.analiseSelecionado}
                          onChange={evt => this.updateValorTextAreaAnalise(evt)}
                          placeholder={actions1.analisePlace}
                        />
                      </CardBody>
                      <CardBody>
                        <CardHeader
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: 'Roboto',
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          {actions1.objetivoEstrategico}
                        </CardHeader>

                        <textarea
                          style={{
                            width: "100%",
                            height: "auto",
                            minHeight: "10vh",
                            resize: "none",
                            border: "none",
                            fontSize: "14px",
                            fontFamily: "Roboto"
                          }}
                          value={this.state.objetivoSelecionado}
                          onChange={evt => this.updateValorTextAreaEstrategico(evt)}
                          placeholder={actions1.objetivoPlac}
                        >
                          {this.state.descMeta}{this.state.descMeta}
                        </textarea>
                      </CardBody>
                    </Card>
                    <GridItem
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ marginBottom: "-12px" }}
                    >
                      <GridContainer
                        style={{ marginTop: "-47px", marginLeft: "-5%" }}
                      >
                        <GridItem id="griditem1" md={4} xs={4} sm={4}>
                          <Card
                            style={{
                              // marginTop: this.state.selectStyle,
                            }}
                            className="cardOption"
                          >
                            <div className="labelCombinacoes"
                              style={{
                                textAlign: "center",
                                boxShadow: "none",
                                borderRadius: "0px",
                                backgroundColor: "#ebedf0",
                                fontFamily: "Roboto",
                                color: "#003479",
                                fontWeight: "bold",
                                marginBottom: '3vh',
                              }}>
                              {actions1.prioridadeExc}
                            </div>
                            <SelectIntern
                              label={actions1.selecione}
                              options={options1}
                              changeSelect={this.selectIntern.bind(this)}
                              indicator={"prioridade"}
                              value={
                                this.state.priority
                                  ? this.state.priority
                                  : this.state.prioridadeSelecionado
                              }
                            />
                          </Card>
                        </GridItem>
                        <GridItem md={4} xs={4} sm={4} id="griditem2">
                          <Card
                            style={{
                              // marginTop: this.state.selectStyle,
                            }}
                            className="cardOption"
                          >
                            <div className="labelCombinacoes"
                              style={{
                                textAlign: "center",
                                boxShadow: "none",
                                borderRadius: "0px",
                                backgroundColor: "#ebedf0",
                                fontFamily: "Roboto",
                                color: "#003479",
                                fontWeight: "bold",
                                marginBottom: '3vh',
                              }}>
                              {actions1.complexidadeExc}
                            </div>
                            <SelectIntern
                              label={actions1.selecione}
                              options={options1}
                              changeSelect={this.selectIntern.bind(this)}
                              indicator={"complexidade"}
                              value={this.state.complexidade}
                            />
                          </Card>
                        </GridItem>
                        <GridItem md={4} xs={4} sm={4} id="griditem3">
                          <Card
                            style={{
                              // marginTop: this.state.selectStyle,
                            }}
                            className="cardOption"
                          >
                            <div className="labelCombinacoes"
                              style={{
                                textAlign: "center",
                                boxShadow: "none",
                                borderRadius: "0px",
                                backgroundColor: "#ebedf0",
                                fontFamily: "Roboto",
                                color: "#003479",
                                fontWeight: "bold",
                                marginBottom: '3vh',
                              }}>
                              {actions1.riscoImplementacao}
                            </div>
                            <SelectIntern
                              label={actions1.selecione}
                              options={optionsRisco}
                              changeSelect={this.selectIntern.bind(this)}
                              indicator={"risco"}
                              value={this.state.risco}
                            />
                          </Card>
                        </GridItem>
                        <GridItem
                          className="cardBottom"
                          md={4}
                          xs={4}
                          sm={4}
                          id="griditem4"
                        >
                          <Card
                            style={{
                              // marginTop: this.state.selectStyle,
                            }}
                            className="cardOption"
                          >
                            <div className="labelCombinacoes"
                              style={{
                                textAlign: "center",
                                boxShadow: "none",
                                borderRadius: "0px",
                                backgroundColor: "#ebedf0",
                                fontFamily: "Roboto",
                                color: "#003479",
                                fontWeight: "bold",
                                marginBottom: '3vh',
                              }}>
                              {actions1.recursosFinanceiros}
                            </div>
                            <SelectIntern
                              label={actions1.selecione}
                              options={optionsRisco}
                              changeSelect={this.selectIntern.bind(this)}
                              indicator={"recursos"}
                              value={this.state.recursos}
                            />
                          </Card>
                        </GridItem>
                        <GridItem
                          className="cardBottom"
                          md={4}
                          xs={4}
                          sm={4}
                          id="griditem5"
                        >

                          <Card
                            style={{
                              // marginTop: this.state.selectStyle,
                            }}
                            className="cardOption"
                          >
                            <div className="labelCombinacoes"
                              style={{
                                textAlign: "center",
                                boxShadow: "none",
                                borderRadius: "0px",
                                backgroundColor: "#ebedf0",
                                fontFamily: "Roboto",
                                color: "#003479",
                                fontWeight: "bold",
                                marginBottom: '3vh',
                              }}>
                              {actions1.impactoResultados}
                            </div>
                            <SelectIntern
                              label={actions1.selecione}
                              options={optionsRisco}
                              changeSelect={this.selectIntern.bind(this)}
                              indicator={"impacto"}
                              value={this.state.impacto}
                            />
                          </Card>
                        </GridItem>
                        <GridItem
                          className="cardBottom"
                          md={4}
                          xs={4}
                          sm={4}
                          id="griditem6"
                        >

                          <Card
                            style={{
                              // marginTop: this.state.selectStyle,
                            }}
                            className="cardOption"
                          >
                            <div className="labelCombinacoes"
                              style={{
                                textAlign: "center",
                                boxShadow: "none",
                                borderRadius: "0px",
                                backgroundColor: "#ebedf0",
                                fontFamily: "Roboto",
                                color: "#003479",
                                fontWeight: "bold",
                                marginBottom: '3vh',
                              }}>
                              {actions1.prazoImplantacao}
                            </div>
                            <SelectIntern
                              label={actions1.selecione}
                              options={options2}
                              changeSelect={this.selectIntern.bind(this)}
                              indicator={"prazo"}
                              value={this.state.prazo}
                            />
                          </Card>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridItem>
                </GridContainer>
              </GridItem>

              <GridItem md={8} sm={12} xs={12} style={{ marginTop: "4.3vh" }}>
                <GridItem md={6} xs={12} sm={12}>
                  <SelectActions
                    users={this.state.users}
                    change={this.updateResponsavel.bind(this)}
                    id={this.state.responsavelGeral}
                    styleDiv={{
                      marginLeft: "-21px"
                    }}
                    estilo={{
                      right: "2%",
                      top: "3%",
                      width: "22vw",
                      fontSize: "14px",
                      fontFamily: "Roboto",
                      color: "#001e46",
                      fontWeight: "bold"
                    }}
                    selectEstilo={{
                      width: "103%",
                      border: "none",
                      backgroundColor: "#fff",
                      fontSize: "14px",
                      fontFamily: "Roboto",
                      color: "#001e46",
                      fontWeight: "bold"
                    }}
                  />
                </GridItem>
                <GridContainer
                  style={{ backgroundColor: "#fff", paddingLeft: "0px" }}
                >
                  <GridItem md={3} xs={12} sm={6} id="grid1">
                    <Card
                      style={{
                        boxShadow: "none",
                        borderRadius: "0px",
                        backgroundColor: "#ebedf0",
                        marginTop: "2vh"
                      }}
                    >
                      <HowToReg
                        style={{
                          position: "absolute",
                          color: "#001e46",
                          left: "8%",
                          top: "1vh"
                        }}
                      />
                      <CardHeader
                        className="header-items"
                        style={{
                          textAlign: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          fontFamily: "Roboto",
                          color: "#001e46",
                        }}
                      >
                        {actions1.decisores}
                      </CardHeader>
                      <CardBody className="bodyItems">
                        <div style={{ backgroundColor: "#ebedf0", width: "100%" }}>
                          <App
                            data={this.state.itensDeciores}
                            updateData={this.updateData.bind(this)}
                            pillar={"decisores"}
                            delete={this.deleteItemDnd.bind(this)}
                            template={this.state.template}
                            edit={this.state.edit}
                          />
                        </div>
                      </CardBody>
                      <CardFooter style={{ marginTop: "-2%" }}>
                        <Input
                          updateText={this.componentText.bind(this)}
                          pillar={"decisores"}
                        />
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem md={3} xs={12} sm={6} id="grid2">
                    <Card
                      style={{
                        boxShadow: "none",
                        borderRadius: "0px",
                        backgroundColor: "#ebedf0",
                        marginTop: "2vh"
                      }}
                    >
                      <People
                        style={{
                          position: "absolute",
                          color: "#001e46",
                          left: "8%",
                          top: "1vh"
                        }}
                      />
                      <CardHeader
                        className="header-items"
                        style={{
                          textAlign: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          fontFamily: "Roboto",
                          color: "#001e46",
                        }}
                      >
                        <div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {actions1.influenciadores}
                        </div>
                      </CardHeader>
                      <CardBody
                        style={{ backgroundColor: "#ebedf0" }}
                        className="bodyItems"
                      >
                        <div style={{ backgroundColor: "#ebedf0", width: "100%" }}>
                          <App
                            data={this.state.itensInfluenciadores}
                            updateData={this.updateData.bind(this)}
                            pillar={"influenciadores"}
                            delete={this.deleteItemDnd.bind(this)}
                            template={this.state.template}
                            edit={this.state.edit}
                          />
                        </div>
                      </CardBody>
                      <CardFooter style={{ marginTop: "-2%" }}>
                        <Input
                          updateText={this.componentText.bind(this)}
                          pillar={"influenciadores"}
                        />
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem md={3} xs={12} sm={6} id="grid3">
                    <Card
                      style={{
                        boxShadow: "none",
                        borderRadius: "0px",
                        backgroundColor: "#ebedf0",
                        marginTop: "2vh"
                      }}
                    >
                      <PeopleOutline
                        style={{
                          position: "absolute",
                          color: "#001e46",
                          left: "8%",
                          top: "1vh"
                        }}
                      />
                      <CardHeader
                        className="header-items"
                        style={{
                          textAlign: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          fontFamily: "Roboto",
                          color: "#001e46",
                        }}
                      >
                        {actions1.publicoImpactados}
                      </CardHeader>
                      <CardBody
                        style={{ backgroundColor: "#ebedf0" }}
                        className="bodyItems"
                      >
                        <div style={{ backgroundColor: "#ebedf0", width: "100%" }}>
                          <App
                            data={this.state.itensPublicos}
                            updateData={this.updateData.bind(this)}
                            pillar={"publicos"}
                            delete={this.deleteItemDnd.bind(this)}
                            template={this.state.template}
                            edit={this.state.edit}
                          />
                        </div>
                      </CardBody>
                      <CardFooter style={{ marginTop: "-2%" }}>
                        <Input
                          updateText={this.componentText.bind(this)}
                          pillar={"publicos"}
                        />
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem md={3} xs={12} sm={6} id="grid4">
                    <Card

                      style={{
                        boxShadow: "none",
                        borderRadius: "0px",
                        backgroundColor: "#ebedf0",
                        marginTop: "2vh"
                      }}
                    >
                      <StarBorder
                        style={{
                          position: "absolute",
                          color: "#001e46",
                          left: "8%",
                          top: "1vh"
                        }}
                      />
                      <CardHeader
                        className="header-items"
                        style={{
                          textAlign: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          fontFamily: "Roboto",
                          color: "#001e46",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {actions1.resultadosEsperados}
                      </CardHeader>
                      <CardBody
                        style={{ backgroundColor: "#ebedf0" }}
                        className="bodyItems"
                      >
                        <div style={{ backgroundColor: "#ebedf0", width: "100%" }}>
                          <App
                            data={this.state.itensImpactados}
                            updateData={this.updateData.bind(this)}
                            pillar={"impactados"}
                            delete={this.deleteItemDnd.bind(this)}
                            template={this.state.template}
                            edit={this.state.edit}
                          />
                        </div>
                      </CardBody>
                      <CardFooter style={{ marginTop: "-2%" }}>
                        <Input
                          updateText={this.componentText.bind(this)}
                          pillar={"impactados"}
                        />
                      </CardFooter>
                    </Card>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>

            <GridContainer style={{ marginTop: "4vh", backgroundColor: "#fff" }}>
              <Icon style={{ marginLeft: "2vh" }}>
                <ListAlt className="icons" />
                <div
                  style={{
                    marginLeft: "10vh",
                    marginTop: "-0.5vh",
                    fontWeight: "bold",
                    fontFamily: "din-condensed,sans-serif",
                    fontSize: "16px",
                    width: "30vh"
                  }}
                >
                  {actions1.metasAcoes}
                </div>
              </Icon>

              <GridItem md={12} xs={12} sm={6} style={{ marginTop: "7vh" }}>
                <div
                  style={{
                    marginLeft: "0.2%",
                    marginTop: "5px",
                    boxShadow: "none",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "#001e46"
                  }}
                >
                  {actions1.explicacaoMeta}
                </div>
              </GridItem>

              <GridContainer style={{ marginTop: "0vh" }}>
                <GridContainer style={{ marginLeft: "1.5%", width: "97%", marginTop: '-1%' }}>
                  {button}
                  <GridItem md={3} xs={12} sm={6}>
                    <Card
                      style={{
                        borderRadius: "0px",
                        backgroundColor: "#ebedf0",
                        width: "100%"
                      }}
                      className="cardAdd"
                      onClick={() => this.alertMetas()}
                    >
                      <div className="div-add-meta">
                        <div className="div-flag">
                          <Flag className="flag" />{" "}
                        </div>
                        <div className="div-text-add">
                          <div className="textAction">{actions1.adicionarMeta}</div>{" "}
                        </div>
                        <div className="div-add-circle">
                          <AddCircle className="addCircle" />
                        </div>
                      </div>
                    </Card>
                  </GridItem>
                </GridContainer>
              </GridContainer>
            </GridContainer>
          </div>
          :
          (
            <PopupAspect
              type={this.state.type}
              addAspect={this.addAspect.bind(this)}
              alterAspect={this.alterAspect.bind(this)}
              closePopup={this.closePopupAspect.bind(this)}
              removeAspect={this.removeAspect.bind(this)}
              apagarAspecto={this.apagarAspecto.bind(this)}
              value={popupValue}
              template={this.state.template}
              edit={this.state.edit} delete={this.state.delete}
            />
          )}
      </div>
    );
  }
}

class SelectIntern extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
      selected: this.props.value,
      indicator: this.props.indicator,
      label: this.props.label,
      color: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        options: this.props.options,
        indicator: this.props.indicator,
        selected: this.props.value,
      });
    }
  }



  change(e) {
    let indicator = this.state.indicator;
    this.setState({
      selected: e.target.value
    });

    let id = "";
    if (e.target.value === 2) {
      id = 2;
    } else if (e.target.value === 1) {
      id = 1;
    } else if (e.target.value === 3) {
      id = 3;
    }

    this.props.changeSelect(e, indicator, id);
  }

  render() {
    let myCss = false;
    let option = [];
    let color = "#99a5b5";
    if (parseInt(this.state.selected, 10) === 2) {
      color = "#ff7c33";
    } else if (parseInt(this.state.selected, 10) === 1) {
      color = "#e4003a";
    } else if (parseInt(this.state.selected, 10) === 3) {
      color = "#fbba00";
    }

    option = this.state.options.map((item, i) => (
      <MenuItem
        value={i + 1}
        key={item + i}
        className={"select_options"}
      >
        {item}
      </MenuItem>
    ));

    let select =
      this.state.selected != "" && parseInt(this.state.selected, 10) !== 0
        ? parseInt(this.state.selected)
        : this.state.label;

    let selec = document.getElementsByClassName('selects');

    for (let x = 0; x < selec.length; x++) {
      if (selec[x].children[0] != null && selec[x].children[0].children[0] != null) {
        if (selec[x].children[0].children[0].getAttribute('aria-pressed')) {
          myCss = true;
          break;
        }
      }
    }

    setTimeout(() => {
      if (myCss) {
        if (document.getElementById('menu-') != null) {
          document.getElementById('menu-').children[1].style.marginLeft = '5%';
        }
      }
      else {
        if (document.getElementById('menu-') != null) {
          document.getElementById('menu-').children[1].style.marginLeft = '0%';
        }
      }
    }, 100);

    return (
      <div className="form-group selectIntern" id="test">
        <SelectInput
          className={"selects"}
          value={select}
          onChange={evt => this.change(evt)}
          onClick={() => this.forceUpdate()}
          style={{ backgroundColor: color }}>
          >
          <MenuItem disabled value={select} className="selects">
            {this.state.label}
          </MenuItem>
          {option}
        </SelectInput>
      </div>
    );

  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      pillar: this.props.pillar
    };
  }
  entrada(e) {
    if (String(this.state.text) !== "") {
      if (parseInt(e.which, 10) === 13) {
        this.props.updateText(e, this.state.pillar);
        this.setState({
          text: ""
        });
      }
    }
  }

  updateText(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <div className="inputEntrada">
        <CustomInput
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            placeholder: actions1.escreva,
            onKeyUp: evt => this.entrada(evt),
            onChange: evt => this.updateText(evt),
            value: this.state.text
          }}
          style={{
            fontSize: "12px",
            fontFamily: "Roboto",
            backgroundColor: "#fff !important"
          }}
        />
      </div>
    );
  }
}

/**
 * Component de DRAG
 */

/*const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));*/

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging
  background: isDragging ? "#99a5b5" : "#fff",

  // styles we need to apply on draggables
  ...draggableStyle
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data,
      pillar: this.props.pillar,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        pillar: this.props.pillar,
        items: this.props.data,
      });
    }
  }

  onDragEnd(result) {
    if (this.props.template && this.props.edit) {
      if (!result.destination) {
        return;
      }

      const items = reorder(
        this.state.items,
        result.source.index,
        result.destination.index
      );

      this.setState(
        {
          items
        },
        () => {
          this.props.updateData(items, this.state.pillar);
        }
      );
    }
  }

  delete(index) {
    this.props.delete(index, this.state.pillar);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={{ width: "100%" }}>
              {this.state.items.map((item, index) => (
                <Draggable
                  key={this.state.pillar + '_' + index}
                  draggableId={`item-${item.id + '_' + index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {this.props.template && this.props.edit ?
                        <div onClick={() => this.delete(index)}>
                          <Fechar
                            style={{
                              position: "absolute",
                              left: "75%",
                              fontSize: "20px",
                              color: "#002960",
                              cursor: "pointer"
                            }}
                          />
                        </div>
                        : null}

                      <div
                        style={{
                          fontSize: "14px",
                          width: "82%",
                          textAlign: "left",
                          fontFamily: "Roboto"
                        }}
                      >
                        {item.content}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default withStyles(sweetAlertStyle)(Actions);