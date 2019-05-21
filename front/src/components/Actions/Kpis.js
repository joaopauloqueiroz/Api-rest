import React from "react";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";

import axios from "axios";
import quadrado1 from "assets/img/sonne/quadrado.svg";
import quadrado2 from "assets/img/sonne/quadrado2.svg";
import porcentagem1 from "assets/img/sonne/porcentagem1.svg";
import porcentagem2 from "assets/img/sonne/porcentagem2.svg";
import Money from "@material-ui/icons/AttachMoney";
import Prancheta from "@material-ui/icons/AssignmentLate";
import Moment from "moment";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

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
import styled from "styled-components";
import apiWs from "../../api/apiWs";

axios.defaults.withCredentials = true;

const InputNumber = styled.input`
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

registerLocale("pt-BR", pt);
setDefaultLocale("pt-BR");

class Kpis extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inicio: Moment(new Date()).format("YYYY-MM-DD"),
			fim: Moment(new Date()).format("YYYY-MM-DD"),
			unidade: "",
			valorInicial: "",
			valorMeta: "",
			id: this.props.id,
			acao: this.props.acao,
		};

		this.change = this.change.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		if (this.state.id != null && this.state.id !== '') {
			this.getData();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) {
			this.setState({
				id: this.props.id,
				acao: this.props.acao,
			});
			if (this.props.id != null && this.props.id !== '' && prevProps.id !== this.props.id) {
				this.getData();
			}
		}
	}

	getData = async () => {
		let id = this.state.id;
		if (id !== null && id !== '') {
			try {
				const response = await apiWs.get(`/kpi/request/?id=${id}`)
				this.setState({
					inicio: response.data.start_date,
					fim: response.data.end_date,
					unidade: response.data.unity,
					valorInicial: response.data.start_value,
					valorMeta: response.data.end_value,
				}, () => {
					this.props.setIdKpi(response.data.idKpi);
					/**
					 * Criar funçãpo para atualizar o componen pai para não perder dados
					 */
					this.props.updateData(response.data)
					this.calculoData();
				});
			} catch (error) {
				console.log('errro load notices ' + error)
			}
		}
    else{
      this.selecioneDatas("");
    }
	}

	handleChange(date) {
		if (date === null || date === '') {
			date = this.state.inicio;
		}
		else {
			date = Moment(date).format("YYYY-MM-DD");
		}
		this.setState({
			inicio: date,
		}, () => {
			if (String(date) !== '') {
				this.selecioneDatas("");
				this.props.updateKpi('inicio', date);
			}
		});
	}

	change(date) {
		if (date === null || date === '') {
			date = this.state.fim;
		}
		else {
			date = Moment(date).format("YYYY-MM-DD");
		}

		this.setState({
			fim: date,
			colorSave: "#d0ac54"
		}, () => {
			this.props.updateKpi('fim', date);
		});
	}

	componentWillMount() { }

	updateUnidade(valor) {
		let tarefa = false;
		let val1 = "";
		let val2 = "";

		if (String(valor) === "tarefa") {
			tarefa = true;
			val1 = 0;
			val2 = 100;
		}
		else if (String(valor) === "porcentagem") {
			val1 = 0;
			val2 = 100;
		}

		this.setState({
			unidade: valor,
			enableDisable: tarefa,
			valorInicial: val1,
			valorMeta: val2
		}, () => {
			this.props.updateKpi('unidade', valor);
			this.props.updateKpi('valorInicial', val1);
			this.props.updateKpi('valorMeta', val2);
		});
	}

	updateValor(valor, e) {
		if (String(e) === "inicio") {
			this.setState({
				inicio: valor.target.value
			}, () => {
				this.selecioneDatas(this.state.colorDatas);
				this.props.updateKpi('inicio', valor.target.value);
			}
			);
		}

		if (String(e) === "fim") {
			this.setState({
				fim: valor.target.value
			}, () => {
				this.selecioneDatas(8);
				this.props.updateKpi('fim', valor.target.value);
			}
			);
		}

		if (String(e) === "unidade") {
			this.setState({
				unidade: valor.target.value
			}, () => {
				this.props.updateKpi('unidade', valor.target.value);
			});
		}

		if (String(e) === "valorInicial") {
			let val = 0;
			if (!this.state.enableDisable) {
				val = valor.target.value;
			}

			this.setState({
				valorInicial: val
			}, () => {
				this.props.updateKpi('valorInicial', val);
			});
		}

		if (String(e) === "valorMeta") {
			let val2 = 0;
			if (!this.state.enableDisable) {
				val2 = valor.target.value;
			}

			this.setState({
				valorMeta: val2
			}, () => {
				this.props.updateKpi('valorMeta', val2);
			});
		}
	}

	calculoData() {
		let enable = false;
		if (String(this.state.unidade) === "tarefa") {
			enable = true;
		}

		let inicio = this.state.inicio;
		let fim = this.state.fim;
		if (String(inicio) !== '' && String(fim) !== '') {
			let diferenca = Moment(fim).diff(inicio, "days");
			let opcao = 0;

			if (parseInt(diferenca, 10) === 7) {
				opcao = 1;
			}
			else if (parseInt(diferenca, 10) === 15) {
				opcao = 2;
			}
			else if (parseInt(diferenca, 10) === 30) {
				opcao = 3;
			}
			else if (parseInt(diferenca, 10) === 60) {
				opcao = 4;
			}
			else if (parseInt(diferenca, 10) === 90) {
				opcao = 5;
			}
			else if (parseInt(diferenca, 10) === 180) {
				opcao = 6;
			}
			else if (parseInt(diferenca, 10) === 365) {
				opcao = 7;
			}

			this.setState({
				colorDatas: opcao,
				enableDisable: enable
			}, () => {
				// this.selecioneDatas(opcao)
			});
		}
	}

	fake() { }

	selecioneDatas(opcao) {
		let color = "#99a5b5";
		if (String(opcao) === "") {
			opcao = 1;
		}
		else {
			color = "rgb(208, 172, 84)";
		}

		let agora = Moment().format("YYYY-MM-DD");

		if (this.state.inicio !== Date && this.state.inicio !== "") {
			agora = this.state.inicio;
		}

		let proximo = "";
		if (opcao === 1) {
			proximo = Moment(agora)
				.add(7, "days")
				.format("YYYY-MM-DD");
		}
		else if (opcao === 2) {
			proximo = Moment(agora)
				.add(15, "days")
				.format("YYYY-MM-DD");
		}
		else if (opcao === 3) {
			proximo = Moment(agora)
				.add(30, "days")
				.format("YYYY-MM-DD");
		}
		else if (opcao === 4) {
			proximo = Moment(agora)
				.add(60, "days")
				.format("YYYY-MM-DD");
		}
		else if (opcao === 5) {
			proximo = Moment(agora)
				.add(90, "days")
				.format("YYYY-MM-DD");
		}
		else if (opcao === 6) {
			proximo = Moment(agora)
				.add(180, "days")
				.format("YYYY-MM-DD");
		}
		else if (opcao === 7) {
			proximo = Moment(agora)
				.add(365, "days")
				.format("YYYY-MM-DD");
		}
		else if (opcao === 8) {
			proximo = this.state.fim;
		}

		this.setState({
			inicio: agora,
			fim: proximo,
			colorDatas: opcao,
			colorSave: color
		}, () => {
			this.props.updateKpi('inicio', agora);
			this.props.updateKpi('fim', proximo);
		});
	}

	render() {
		return (
			<div>
				<GridContainer style={{ marginTop: "0vh" }}>
					<GridItem
						md={6}
						xs={12}
						sm={12}
						style={{ marginTop: "-25px" }}>
						<Card style={{ boxShadow: "none" }}>
							<div style={{
								fontFamily: "din-condensed, sans-serif",
								fontWeight: "bold",
								color: "#002960",
								fontSize: "13px"
							}}>
								<div className="icone-data">
									<Date style={{
										fontFamily: "din-condensed, sans-serif",
										fontWeight: "bold",
										color: "#002960"
									}} />
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
										set={true}
										dateFormat="dd-MM-yyyy"
										selected={Moment(this.state.inicio, "YYYY-MM-DD", true).isValid() ? this.state.inicio : Moment(new Date()).format("YYYY-MM-DD")}
										onChange={this.handleChange.bind(this)} />
									{}
								</div>
							</div>
						</Card>
					</GridItem>
					<GridItem
						md={6}
						xs={12}
						sm={12}
						style={{ marginTop: "-25px" }}>
						<Card style={{ boxShadow: "none" }}>
							<div style={{
								fontFamily: "din-condensed, sans-serif",
								fontWeight: "bold",
								color: "#002960",
								fontSize: "13px"
							}}>
								<div className="data-date-2">
									<Date
										id="date"
										style={{
											fontFamily: "din-condensed, sans-serif",
											fontWeight: "bold",
											color: "#002960"
										}} />
									<div className="text-data">{actions1.dataFim}</div>
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
										set={true}
										dateFormat="dd-MM-yyyy"
										selected={Moment(this.state.fim, "YYYY-MM-DD", true).isValid() ? this.state.fim : Moment(new Date()).format("YYYY-MM-DD")}
										onChange={this.change.bind(this)} />
								</div>
							</div>
						</Card>
					</GridItem>
					<GridItem
						md={12}
						xs={12}
						sm={12}
						style={{ marginTop: "10px" }}>
						<Card className="selecionedatas">
							<div>
								<span
									onClick={() => this.selecioneDatas(1)}
									style={{
										color:
											parseInt(this.state.colorDatas, 10) === 1
												? "#002960"
												: "#99a5b5",
										fontFamily: "Roboto",
										fontWeight: "bold",
										fontSize: "14px"
									}}>
									7 dias
                  </span>{" "} |
                  <span
									onClick={() => this.selecioneDatas(2)}
									style={{
										color:
											parseInt(this.state.colorDatas, 10) === 2
												? "#002960"
												: "#99a5b5",
										fontFamily: "Roboto",
										fontWeight: "bold",
										fontSize: "14px"
									}}>
									15 dias
                  </span>{" "} |
                  <span
									onClick={() => this.selecioneDatas(3)}
									style={{
										color:
											parseInt(this.state.colorDatas, 10) === 3
												? "#002960"
												: "#99a5b5",
										fontFamily: "Roboto",
										fontWeight: "bold",
										fontSize: "14px"
									}}>
									30 dias
                  </span>{" "} |
                  <span
									onClick={() => this.selecioneDatas(4)}
									style={{
										color:
											parseInt(this.state.colorDatas, 10) === 4
												? "#002960"
												: "#99a5b5",
										fontFamily: "Roboto",
										fontWeight: "bold",
										fontSize: "14px"
									}}>
									60 dias
                  </span>{" "} |
                  <span
									onClick={() => this.selecioneDatas(5)}
									style={{
										color:
											parseInt(this.state.colorDatas, 10) === 5
												? "#002960"
												: "#99a5b5",
										fontFamily: "Roboto",
										fontWeight: "bold",
										fontSize: "14px"
									}}>
									90 dias
                  </span>{" "} |
                  <span
									onClick={() => this.selecioneDatas(6)}
									style={{
										color:
											parseInt(this.state.colorDatas, 10) === 6
												? "#002960"
												: "#99a5b5",
										fontFamily: "Roboto",
										fontWeight: "bold",
										fontSize: "14px"
									}}>
									180 dias
                  </span>{" "} |
                  <span
									onClick={() => this.selecioneDatas(7)}
									style={{
										color:
											parseInt(this.state.colorDatas, 10) === 7
												? "#002960"
												: "#99a5b5",
										fontFamily: "Roboto",
										fontWeight: "bold",
										fontSize: "14px"
									}}>
									365 dias
                  </span>
							</div>
						</Card>
					</GridItem>
				</GridContainer>
				{
					this.state.acao == null && <div>
						<GridContainer>
							<GridItem
								md={2}
								sm={12}
								xs={12}
								style={{ marginTop: "-25px" }}>
								<Card style={{ boxShadow: "none" }}>
									<div
										style={{
											fontFamily: "din-condensed, sans-serif",
											fontWeight: "bold",
											color: "#002960",
											fontSize: "13px"
										}}>
										{actions1.unidade}:
                    </div>
								</Card>
							</GridItem>
							<GridItem
								md={2}
								sm={12}
								xs={12}
								style={{ marginTop: "-25px" }}>
								<Card style={{ marginLeft: "-32%", boxShadow: "none" }}>
									<div style={{
										fontFamily: "din-condensed, sans-serif",
										fontSize: "14px",
										fontWeight: "bold",
										color:
											String(this.state.unidade) === "numerico"
												? "#002960"
												: "#ccd2da",
										cursor: "pointer"
									}}
										onClick={() => this.updateUnidade("numerico")}>
										{actions1.numerico}
										<img alt="numerico"
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
							<GridItem
								md={2}
								sm={12}
								xs={12}
								style={{ marginTop: "-25px" }}>
								<Card style={{ boxShadow: "none" }}>
									<div style={{
										fontFamily: "din-condensed, sans-serif",
										fontSize: "14px",
										color:
											String(this.state.unidade) === "monetario"
												? "#002960"
												: "#ccd2da",
										cursor: "pointer",
										fontWeight: "bold",
										width: "18vh",
										textAlign: "left",
									}}
										onClick={() => this.updateUnidade("monetario")}>
										{actions1.monetario}
										<Money
											style={{
												position: "absolute",
												marginTop: "-2px",
												fontSize: "20px"
											}} />
									</div>
								</Card>
							</GridItem>
							<GridItem
								md={2}
								sm={12}
								xs={12}
								style={{ marginTop: "-25px" }}>
								<Card style={{ boxShadow: "none" }}>
									<div style={{
										fontFamily: "din-condensed, sans-serif",
										fontSize: "14px",
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
										onClick={() => this.updateUnidade("porcentagem")}>
										<img alt={"Porcentagem"}
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
											}} />
										{actions1.porcentagem}
									</div>
								</Card>
							</GridItem>
							<GridItem
								md={2}
								sm={12}
								xs={12}
								style={{ marginTop: "-25px" }}>
								<Card style={{ boxShadow: "none" }}>
									<div style={{
										fontFamily: "din-condensed, sans-serif",
										fontSize: "14px",
										fontWeight: "bold",
										color:
											String(this.state.unidade) === "tarefa"
												? "#002960"
												: "#ccd2da",
										cursor: "pointer",
										width: "192%",
										marginLeft: "20%"
									}}
										onClick={() => this.updateUnidade("tarefa")}>
										{actions1.tarefa}
										<Prancheta
											style={{
												marginTop: "-2px",
												marginLeft: "10%",
												position: "absolute",
												fontSize: "20px"
											}} />
									</div>
								</Card>
							</GridItem>
						</GridContainer>
						<GridContainer style={{ marginTop: "-2vh" }}>
							<GridItem
								md={6}
								xs={12}
								sm={12}
								style={{ marginTop: "-25px" }}>
								<Card style={{ boxShadow: "none" }}>
									<div style={{
										fontFamily: "din-condensed, sans-serif",
										fontWeight: "bold",
										color: "#002960",
										fontSize: "13px",
										position: "absolute",
										marginLeft: "4%"
									}}>
										{actions1Box.valorInicial}
									</div>
									<div style={{}}>
										<InputNumber
											type="number"
											placeholder="Unidade inicial"
											disabled={this.state.enableDisable}
											style={{
												width: "58%",
												marginLeft: "34%",
												marginTop: "-4px"
											}}
											value={this.state.valorInicial}
											onChange={evt =>
												this.updateValor(evt, "valorInicial")
											} />
									</div>
								</Card>
							</GridItem>
							<GridItem
								md={6}
								xs={12}
								sm={12}
								style={{ marginTop: "-25px" }}
							>
								<Card style={{ boxShadow: "none" }}>
									<div
										style={{
											fontFamily: "din-condensed, sans-serif",
											fontWeight: "bold",
											color: "#002960",
											fontSize: "13px",
											position: "absolute",
											marginLeft: "2%"
										}}>
										{actions1Box.valorMeta}
									</div>
									<div style={{}}>
										<InputNumber
											type="number"
											placeholder="Unidade final"
											disabled={this.state.enableDisable}
											style={{
												width: "54%",
												marginLeft: "35%",
												marginTop: "-4px"
											}}
											value={this.state.valorMeta}
											onChange={evt => this.updateValor(evt, "valorMeta")} />
									</div>
								</Card>
							</GridItem>
						</GridContainer>
					</div>
				}
			</div>
		);
	}
}

export default withStyles(sweetAlertStyle)(Kpis);
