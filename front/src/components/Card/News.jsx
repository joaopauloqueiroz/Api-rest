/**
 * Card Notícias
 *
 * Params{
 *      alt: altTag para img
 *      img: utilizado para imagem de destaque
 *      news: id da noticia
 *      newsLine: Quantas Notícias Serão Exibidas na ROW em caso de VP PC : de 1 à 6
 *      orientation: v=Vertical | h=horizontal
 *      shortDescription: Descrição Curta da Noticia
 *      source: FULL URL da Noticia
 *      source_name: Fonte da Notícia
 *      title: Título da Notícia
 *      modAspect: true | false / Ativa o módulo de envio da notícia para Aspecto
 * Using
 *
 *
**/
//CORE
import React from "react"
import Selects from "react-select"
import SweetAlert from "react-bootstrap-sweetalert"
import moment from "moment-timezone"

//COMPONENTS
import Card from "components/Card/Card"
import CardBody from "components/Card/CardBody"
import CustomInput from "components/CustomInput/CustomInput.jsx"
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import TextIcon from "components/Buttons/TextIcon"
import TimelineComponent from "components/Timeline/TimelineComponent.jsx"
import Deleted from "components/Deleted"
import PreLoader from "components/PreLoader"

//STYLES
import cardImagesStyles from "assets/jss/material-dashboard-pro-react/cardImagesStyles";
import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/styles/withStyles";
import Home from "@material-ui/icons/Home";
import PowerOff from "@material-ui/icons/ArrowDownward";
import PowerOn from "@material-ui/icons/ArrowUpward";
import Landscape from "@material-ui/icons/Landscape";
import TrendingDown from "@material-ui/icons/TrendingDown";
import TrendingUp from "@material-ui/icons/TrendingUp";
import InputAdornment from "@material-ui/core/InputAdornment";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import Web from "@material-ui/icons/Web";
import apiWs from "../../api/apiWs";
import api from "../../api";


//VARS
import {
	swotPopupAspect,
	swot1,
} from "variables/language.jsx";

class NewsCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alert: null,
			alt: this.props.alt || null,
			aspectDelete: this.props.delete || false,
			aspectOptions: [],
			aspectType: this.props.type || "Opportunity",
			btText: this.props.btText || "LER MAIS",
			content: this.props.shortDescription,
			deleteConfirm: null,
			idPlan: this.props.idPlan || null,
			idRel: this.props.idRel || null,
			img: this.props.img || null,
			index: this.props.index || this.props.key,
			like: this.props.like || false,
			load: this.props.notice || false,
			maxHeight: this.props.maxHeight || "auto",
			modAspect: this.props.modAspect || false,
			newsLine: this.props.newsLine || 3,
			onBtClick: this.props.onBtClick ? this.props.onBtClick : null,
			onClick: this.props.onClick ? this.props.onClick : null,
			orientation: this.isMobile() ? "H" : this.props.model || "v",
			planOptions: [],
			pubDate: this.props.pubDate || null,
			recorteImg: 'cover',
			resume: true,
			shortDescription: this.props.shortDescription || "Descrição curta da notícia",
			source: this.props.source || null,
			sourceList: this.props.sourceList || [],
			source_name: this.props.source_name || null,
			title: this.props.title || null,
			toAspect: false,
			unlike: this.props.unlike || false,
			preloader: {
				visible: false
			}
		}

	}
	componentDidMount() {
		if (this.state.modAspect) {
			this.planLoad();
		}
		this.requestLike();
		if (this.state.newsLine > 6) {
			this.setState({
				newsLine: 6
			});
		}
		if (this.props.resume) {
			this.setState({
				resume: this.props.resume
			})
		} else {
			this.setState({
				resume: true
			})
		}
		setTimeout(() => {
			this.calcularDimensaoImg()
		}, 10)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) {
			if (this.state.modAspect) {
				this.planLoad();
			}
			this.setState({
				alt: this.props.alt || null,
				aspectDelete: this.props.delete || false,
				aspectType: this.props.type || "Opportunity",
				btText: this.props.btText || "LER MAIS",
				content: this.props.shortDescription,
				idPlan: this.props.idPlan || null,
				idRel: this.props.idRel || null,
				img: this.props.img || null,
				index: this.props.index,
				like: this.props.like || false,
				load: this.props.notice || false,
				maxHeight: this.props.maxHeight || "auto",
				modAspect: this.props.modAspect || false,
				newsLine: this.props.newsLine || 3,
				onBtClick: this.props.onBtClick ? this.props.onBtClick : null,
				onClick: this.props.onClick ? this.props.onClick : null,
				orientation: this.props.model || "v",
				recorteImg: 'cover',
				resume: this.props.resume,
				shortDescription: this.props.shortDescription || null,
				source: this.props.source || null,
				sourceList: this.props.sourceList || [],
				source_name: this.props.source_name || null,
				title: this.props.title || null,
				toAspect: false,
				unlike: this.props.unlike || false,
			}, () => {
				this.calcularDimensaoImg()
			});

		}
	}

	isMobile() {
		if (navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
		) {
			return true;
		}
		else {
			return false;
		}
	}

	calcularDimensaoImg = () => {
		let imagem = new Image()
		let dimensao = 0;
		imagem.src = this.state.img
		imagem.onload = () => {
			dimensao = imagem.width / imagem.height
			if (imagem.width < imagem.height) {
				this.setState({
					recorteImg: 'cover'
				})
			}
			if (imagem.width < 199) {
				this.setState({
					recorteImg: 'auto'
				})
			}
			if (dimensao < 1.2) {
				this.setState({
					recorteImg: 'contain'
				})
			}
		}
	}

	like() {
		this.likeNews(this.state.source, true, {
			img: this.state.img,
			source_name: this.state.source_name,
			source: this.state.source,
			content: this.state.shortDescription,
			title: this.state.title,
			tags: this.state.tags
		})
		this.setState({
			like: true,
			unlike: false
		})
	}

	unlike() {
		this.likeNews(this.state.source, false, {
			img: this.state.img,
			source_name: this.state.source_name,
			source: this.state.source,
			content: this.state.shortDescription,
			title: this.state.title,
			tags: this.state.tags
		})
		this.setState({
			like: false,
			unlike: true
		})
	}

	likeNews = async (source, like, data) => {
		try {
			apiWs.post("/news/like", { source, like, data }).then(res => res)
		} catch (err) {
			console.log(err)
		}
	};

	deleteNews = async () => {
		try {
			apiWs.delete(`/news/run/?source=${this.state.source}&rel=${this.state.idRel}`)
				.then(res => {
					this.props.removeArray(this.state.index);
				})
				.catch(err => {
					console.log(err);
				});
		} catch (err) {
			console.log(err)
		}
	};
	deleteConfirm = async () => {
		this.setState({
			deleteConfirm: (
				<Deleted
					title="Atenção"
					msg="Tem certeza que deseja excluir esta notícia?"
					onConfirm={() => {
						this.deleteNews()
						this.setState({ deleteConfirm: null })
					}}
					onCancel={() => this.setState({ deleteConfirm: null })}
				/>
			)
		})
	}

	async requestLike() {
		let retorno;
		try {
			retorno = await apiWs.get(`/news/like/?source=${this.state.source}`).then((response) => {
				return response.data;
			})
		} catch (error) {
			console.log(error)
		}

		if (retorno && retorno.length > 0) {
			if (retorno[0].like) {
				this.setState({ like: true, unlike: false })
			}
			if (retorno[0].unlike) {
				this.setState({ unlike: true, like: false })
			}
		}
	}
	toAspects() {
		this.setState({
			toAspect: true
		})
	}
	handlePlanChange = selectedOption => {
		let valor = selectedOption["value"];
		this.setState({ idPlan: valor }, () => { this.aspectLoad() });
	};
	handleAspectChange = selectedOption => {
		let valor = selectedOption["value"];
		this.setState({ idRel: valor }, () => { this.aspectLoad() });
	}
	hideAlert() {
		this.setState({
			alert: null
		});
	}
	alert(title, text) {
		this.setState({
			alert: (
				<SweetAlert
					danger
					style={{ display: "block", marginTop: "-100px" }}
					title={title}
					onConfirm={() => this.hideAlert()}
					onCancel={() => this.hideAlert()}
					confirmBtnCssClass={
						this.props.classes.button + " " + this.props.classes.success
					}
				>
					{text}
				</SweetAlert>
			)
		});
	}
	saveAspect = async (close) => {
		if (this.state.modAspect && this.state.idPlan === null) {
			this.alert('Atenção!', 'Você deve selecionar um plano')
		} else {
			let form = {
				content: this.state.shortDescription,
				idPlan: this.state.idPlan,
				idRel: this.state.idRel,
				img: this.state.img,
				source: this.state.source,
				source_name: this.state.source_name,
				tags: this.state.tags,
				title: this.state.title,
				name: this.state.title,
				type: this.state.aspectType,
				description: this.state.shortDescription
			};

			if (this.state.id !== "" && this.state.id !== null) {
				form.id = this.state.id;
			}
			try {
				await apiWs.post(`/news/update/`, form)
					.then((response) => {
						this.setState({
							toAspect: false
						}, () => {
							//this.props.callBack()
						})

					})
			} catch (err) {
				console.log(err.response)
				let erro = [];
				let values = err.response;
				if (values) {
					for (let i = 0; i < values.data.length; i++) {
						erro[i] = values.data[i].msg;
					}
					this.setState({
						errors: erro
					});
				}
			}
		}
	}

	changeType(type) {
		this.setState({
			aspectType: type,
			colorBtn: "#99a5b5"
		}, () => {
			this.aspectLoad()
		});

	}
	planLoad = (template) => {
		try {
			api.get("/plan/find/")
				.then(response => {
					let data = response.data;
					let planOptions = [];
					if (data.node && data.node.length) {
						for (let x = 0; x < data.node.length; x++) {
							planOptions.push({
								value: data.node[x].identity.low,
								label: data.node[x].properties.name
							});
						}
						this.setState({
							planOptions
						});
					}
				});
		} catch (err) {
			console.log(err)
		}
	}
	aspectLoad = async () => {
		if (this.state.idPlan === null) {
			this.setState({
				alert: (
					<SweetAlert
						danger
						style={{ display: "block", marginTop: "-100px" }}
						title="Atenção!"
						onConfirm={() => this.hideAlert()}
						onCancel={() => this.hideAlert()}
						confirmBtnCssClass={
							this.props.classes.button + " " + this.props.classes.success
						}
					>
						Você deve selecionar um plano
          </SweetAlert>
				)
			});
		} else {
			try {
				const response = await apiWs.get(`/aspect/list/?idRel=${this.state.idPlan}&list=${this.state.aspectType}`)
				let data = response.data;
				let aspectOptions = [];
				aspectOptions.push({
					value: 'New',
					label: 'Criar novo Aspecto'
				});
				data.map(item => {
					aspectOptions.push(item);
					return true
				})
				this.setState({
					aspectOptions
				})
			} catch (error) {
				console.log('Algo deu errado ' + error)
			}
		}
	}
	loadSource = async (url) => {
		const existURL = await this.state.sourceList.find(source => source.url === url)
		if (existURL) {
			this.alert('Atenção', "Notícia já existe")
		} else {
			this.setState({
				preloader: {
					visible: true
				}
			});
			try {
				const res = await apiWs.get(`/news/sourceInfo/?url=${url}`)
				var dados = {
					img: res.data.img,
					content: res.data.description,
					shortDescription: res.data.description,
					source: url,
					source_name: res.data.source_name,
					title: res.data.title,
					name: res.data.title,
				}
				this.setState({
					img: res.data.img,
					content: res.data.description,
					shortDescription: res.data.description,
					source: url,
					source_name: res.data.source_name,
					title: res.data.title,
					name: res.data.title,
					preloader: {
						visible: false
					}
				}, () => {
					this.calcularDimensaoImg()
					if (this.state.modAspect) {
						this.saveAspect()
						this.props.callBack(dados)
					} else if (this.state.idRel) {
						this.saveAspect()
						this.props.callBack(dados)
					}
				});

			} catch (error) {
				console.log('Algo deu errado ' + error)
			}
		}
	}
	render() {
		const { classes } = this.props;
		const imgStyle = {
			position: "relative",
			minWidth: "100%",
			height: "100%",
			backgroundImage: "url('" + this.state.img + "')",
			backgroundSize: this.state.recorteImg,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
			paddingBottom: this.state.maxHeight !== 'auto' ? "45%" : "56.25%"
		}
		const pubDate = new Date(this.state.pubDate * 1000)
		return (
			<GridItem
				sm={12}
				md={
					12 / this.state.newsLine}
				lg={
					12 / this.state.newsLine}
				style={{ marginTop: '0vh' }
				}
			>
				{this.state.alert}
				{this.state.deleteConfirm}
				{this.state.preloader.visible ? (
					<PreLoader fullScreen={false} />
				) : (
						this.state.source ? (
							<GridContainer>
								<GridItem xs={12} sm={12} md={12}>
									<Card style={String(this.state.orientation) === "h" ? cardH : cardV}>
										{this.state.img === null ? (
											<div
												className="noticia-placeholder"
												style={String(this.state.orientation) === "h" ? hStyleNoImg : vStyleNoImg}
												onClick={this.state.onClick}
											>
												<div className="icone-noticia-placeholder">
													<Icon
														style={{
															position: "relative",
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															width: "auto",
															height: "auto",
															color: "#ccd2da",
															fontSize: "5rem"
														}}
													>
														chrome_reader_mode
                </Icon>
												</div>
												<div className="text-notice-placeholder">SEM IMAGEM</div>
											</div>
										) : (
												<div
													className="noticia-placeholder"
													style={String(this.state.orientation) === "h" ? hStyleImg : vStyleImg}
													onClick={this.state.onClick}
												>
													<div
														style={imgStyle}
													/>
												</div>
											)}
										<CardBody style={this.state.orientation === "h" ? hBody : vBody}>
											<div style={{ position: "relative", float: "left", fontFamily: "Roboto", fontSize: "12px" }}>
												{this.props.created && !this.state.source_name ? ("Criador: ") : (this.state.source_name ? ("Fonte:") : (null): null)}
											<span
													style={{
														fontSize: "13px",
														color: "#002960",
														fontWeight: "bold"
													}}
												>
													{this.props.source_name}
												</span> - {this.state.pubDate ? moment(pubDate).tz('America/Sao_Paulo').format('DD/MM/YYYY H:mm') : null}
											</div>
											<div
												style={{ postiton: "relative", float: "right", width: this.state.modAspect ? "260px" : "auto" }}
											>
												{this.state.modAspect && this.state.source ? (
													this.state.toAspect === true ?
														<TextIcon textColor='#001e46' bgColor="none" icoColor='#e0ac54' text='Salvar no Aspecto' ico='save' onClick={() => this.saveAspect()} />
														:
														<TextIcon textColor='#ccd2da' bgColor='#e0ac54' text='Enviar para Aspecto' ico='add' onClick={() => this.toAspects()} />

												) : (
														null
													)
												}
												<Icon
													style={{
														position: "relative",
														float: "left",
														width: "24px",
														height: "100%",
														color: this.state.like ? "#002960" : "#ccd2da",
														cursor: "pointer"
													}}
													onClick={() => this.like()}
												>
													thumb_up_alt
              </Icon>
												<Icon
													style={{
														position: "relative",
														float: "left",
														width: "24px",
														height: "100%",
														color: this.state.unlike ? "#ab002c" : "#ccd2da",
														cursor: "pointer"
													}}
													onClick={() => this.unlike()}
												>
													thumb_down_alt
              </Icon>
												{this.state.aspectDelete ?
													<Icon
														style={{
															position: "relative",
															float: "left",
															width: "24px",
															height: "100%",
															color: "#ccd2da",
															cursor: "pointer"
														}}
														onClick={() => this.deleteConfirm()}
													>
														delete
              </Icon>
													: null}
											</div>
											<h4
												style={{
													position: "relative",
													float: "left",
													maxWidth: "calc(100% - 50px)",
													marginTop: "3px",
													minHeight: "50px",
													color: "#001e46",
													fontWeight: "bold",
													fontFamily: "Roboto",
													clear: "both"
												}}
												onClick={this.state.onClick}
											>
												{this.state.title}
											</h4>
											<GridContainer>
												<GridItem md={this.state.toAspect ? 7 : 12}>
													<div>
														{this.state.shortDescription}
													</div>
													<div id="newsContentRender" style={{ postiton: "relative", float: "left", clear: "both", width: "100%" }}>
														<div
															style={{
																position: "relative",
																float: "right",
																marginTop: "3px",
																color: "#001e46",
																fontWeight: "bold",
																fontFamily: "Roboto",
																cursor: "pointer",
																clear: "both"
															}}
															onClick={(event) => {
																event.preventDefault()
																window.open(`${this.state.source}`, '_blank')
															}
															}
														>
															{this.state.btText}
														</div>
													</div>
												</GridItem>
												{this.state.modAspect ? (
													this.state.toAspect === true ? (
														<GridItem md={this.state.toAspect ? 5 : 12} xs={12} sm={12} className="line" style={{ zIndex: "15000", display: this.state.toAspect ? "block" : "none" }}>
															<div>
																<Selects
																	className=""
																	onChange={this.handlePlanChange}
																	options={this.state.planOptions}
																	isSearchable="true"
																	placeholder="SELECIONE O PLANO"
																	style={{ marginBottom: "2vh" }}
																	danger={true}
																	theme={theme => ({
																		...theme,
																		borderRadius: 0,
																		colors: {
																			...theme.colors,
																			primary25: "#E0AC54",
																			primary: "#E0AC54"
																		}
																	})}
																/>
																<br />
																<div className="text-aspects-right">
																	{swotPopupAspect.selecione}
																</div>
																<GridContainer className="sub-cntainer">
																	<GridItem md={7} sm={6} xs={12} className="itens-pai">
																		<div className="item-aspectos">
																			{swot1.aspectosExternos}
																		</div>
																		<div className="itens-internos">
																			<section className="section-icon-pai-2">
																				<Landscape className="icon-home" />
																			</section>
																			<div className="flechas-2">
																				<section
																					className="icons-and-text"
																					style={{
																						color:
																							this.state.aspectType === "Opportunity"
																								? "#002960"
																								: "#99a5b5"
																					}}
																					onClick={() => this.changeType("Opportunity")}
																				>
																					<div>
																						<TrendingUp />
																					</div>
																					<div className="item-aspectos-1">
																						{swotPopupAspect.oportunidade}
																					</div>
																				</section>
																				<section
																					className="icons-and-text text-left"
																					style={{
																						color:
																							this.state.aspectType === "Threat"
																								? "#002960"
																								: "#99a5b5"
																					}}
																					onClick={() => this.changeType("Threat")}
																				>
																					<TrendingDown />
																					<div className="item-aspectos-1">
																						{swotPopupAspect.ameaca}
																					</div>
																				</section>
																			</div>
																		</div>
																	</GridItem>
																	<GridItem md={5} sm={6} xs={12} className="itens-pai">
																		<div className="item-aspectos">
																			{swot1.aspectosInternos}
																		</div>
																		<div className="itens-internos">
																			<section className="section-icon-pai">
																				<Home className="icon-home" />
																			</section>
																			<div className="flechas">
																				<section
																					className="icons-and-text tamanho1"
																					style={{
																						color:
																							this.state.aspectType === "Strength"
																								? "#002960"
																								: "#99a5b5"
																					}}
																					onClick={() => this.changeType("Strength")}
																				>
																					<PowerOn />
																					<div className="item-aspectos-1">
																						{swotPopupAspect.forca}
																					</div>
																				</section>
																				<section
																					className="icons-and-text fraqueza-2"
																					style={{
																						color:
																							this.state.aspectType === "Weakness"
																								? "#002960"
																								: "#99a5b5"
																					}}
																					onClick={() => this.changeType("Weakness")}
																				>
																					<PowerOff />
																					<div className="item-aspectos-1">
																						{swotPopupAspect.fraqueza}
																					</div>
																				</section>
																			</div>
																		</div>
																	</GridItem>


																</GridContainer>
																<br />
																{this.state.idPlan ?
																	<div style={{ zIndex: 15000, }}>
																		<Selects
																			className=""
																			onChange={this.handleAspectChange}
																			options={this.state.aspectOptions}
																			isSearchable="true"
																			placeholder="SELECIONE O ASPECTO"
																			style={{ marginBottom: "2vh", zIndex: 10000, }}
																			danger={true}
																			theme={theme => ({
																				...theme,
																				borderRadius: 0,
																				zIndex: 10000,
																				colors: {
																					...theme.colors,
																					primary25: "#E0AC54",
																					primary: "#E0AC54"
																				}
																			})}
																		/>
																	</div>
																	: null}
																<br />
															</div>
														</GridItem>
													) : (null)
												) : (null)
												}
											</GridContainer>
										</CardBody>
										{this.state.resume === false ? (
											<TimelineComponent
												timelineType={'news'}
												name={this.state.name}
												type={this.state.type}
												userId={this.state.userId}
												avatar={this.state.avatar}
												id={this.state.source}
												style={{ zIndex: '0' }}
												data={{
													content: this.state.shortDescription,
													img: this.state.img,
													source: this.state.source,
													source_name: this.state.source_name,
													tags: this.state.tags,
													title: this.state.title,
													name: this.state.title
												}
												}
												template={true}
												edit={true}
											/>
										) : (null)}
									</Card >
								</GridItem>
							</GridContainer>
						) : (
								<CustomInput
									labelText={"URL da Notícia"}
									id="source"
									formControlProps={{
										fullWidth: true,
										value: this.state.name
									}}
									inputProps={{
										placeholder: 'Cole aqui o LINK completo da Notícia',
										type: "text",
										value: this.state.source,
										endAdornment: (
											<InputAdornment position="start">
												<Web
													style={{ marginTop: "15px" }}
													className={classes.inputAdornmentIcon + " icone-input"}
												/>
											</InputAdornment>
										),
										onChange: evt => {
											this.loadSource(evt.target.value)
										}

									}}
								/>
							)
					)
				}
			</GridItem >
		);
	}
}
export default withStyles(sweetAlertStyle, cardImagesStyles)(NewsCard);
//export default withStyles(cardImagesStyles)(NewsCard);

const vBody = {
	padding: "10px 0px 0px 0px"
};
const vStyleNoImg = {
	paddingTop: "10%",
	paddingBottom: "calc(40% - 5rem)"
};
const vStyleImg = {
	height: 'calc(100% - 6rem)'
};

const hBody = {
	width: "calc(50% - 10px)",
	padding: "10px 0px 0px 0px",
	marginLeft: "10px"
};
const hStyleNoImg = {
	width: "calc(50% - 10px)",
};
const hStyleImg = {
	position: "relative",
	float: "left",
	width: "calc(50% - 10px)"
};


const cardH = {
	marginTop: "0px",
	boxShadow: "none",
	display: "flex",
	flexDirection: "row",
	minHeight: "100%",
	cursor: "pointer"
};
const cardV = {
	marginTop: "0px",
	boxShadow: "none",
	display: "flex",
	cursor: "pointer"
};
