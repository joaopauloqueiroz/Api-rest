import React from "react";
import "assets/css/actions.css";
import apiWs from "../../api/apiWs";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Deleted from "components/Deleted";
import GridItem from "components/Grid/GridItem.jsx";
import Icone from "components/Card/IconeSwitch";
import SelectFind from "components/SelectFind";
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { actions1 } from "variables/language.jsx";
/**
 * SORTABLE LIST
 * @author Cristofer Marinho
 * @name SortableList
 * @param {editable=true||false, autocomplete=true||false, icon='MaterialIconName', name='Nome da Lista', title='Título da Lista'}
 * @function callBack -> Função do Botão criado com o @param icoCallBack {Recebe o MaterialIconName para criar botão de ação}
 * @function onAdd -> Executa função enviada antes de adicionar um item na lista !!! Importante quando não é enviado o @param idRel
 * @param token -> Enviado quando Lista Referencia algum node que contém referência guardada no token de acesso(Ex: idCompany)
 * @param reuseNode -> Quando TRUE, irá conectar o item encontrado no search como relacionamento, caso FALSE cria um novo node
 */
class SortableList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alert: null,
			deleteConfirm: null,
			autocomplete: this.props.autocomplete || false,
			callBack: this.props.callBack || null,
			callBackDados: this.props.callBackDados || null,
			icoCallBack: this.props.icoCallBack || null,
			delete: this.props.delete || false,
			edit: this.props.edit || false,
			icon: this.props.icon,
			idList: this.props.idRel || null,
			idRel: this.props.idRel || null,
			token: this.props.token || null,
			items: [],
			md: this.props.md || 3,
			name: this.props.name || null,
			reuseNode: this.props.reuseNode || false,
			reorder: this.props.reorder || false,
			sm: this.props.sm || 6,
			text: "",
			title: this.props.title,
			ws: this.props.ws || false,
			xs: this.props.xs || 12,
			data: this.props.data,
			onAdd: this.props.onAdd || null,
			editable: this.props.editable || false,
			editing: false,
			editNewValue: null,
		};
		this.inputCallBack = this.inputCallBack.bind(this);
		this.hideAlert = this.hideAlert.bind(this);
	}

	componentDidMount() {
		this.loadOptions();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) {
			this.setState({
				autocomplete: this.props.autocomplete || false,
				onAdd: this.props.onAdd || null,
				callBack: this.props.callBack || null,
				callBackDados: this.props.callBackDados || null,
				delete: this.props.delete || false,
				edit: this.props.edit || false,
				icon: this.props.icon,
				idList: this.props.idRel,
				idRel: this.props.idRel,
				token: this.props.token || null,
				md: this.props.md || 3,
				name: this.props.name,
				reuseNode: this.props.reuseNode || false,
				reorder: this.props.autocomplete || false,
				sm: this.props.sm || 6,
				title: this.props.title,
				xs: this.props.xs || 12,
				icoCallBack: this.props.icoCallBack || null,
				data: this.props.data,
				editable: this.props.editable || false,
			}, () => {
				if (prevProps.idRel !== this.props.idRel) {
					this.loadOptions();
				}
				if (this.props.idRel === true) {
					this.loadOptions();
				}
				if (this.state.onAddEx) {
					this.inputCallBack(this.state.onAddEx)
					this.setState({
						onAddEx: null
					})
				}
				if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
					this.reorderLastSave();
				}
			}
			)
		}
	}
	/**
	 * Funçã para atualizar os dados sem a necessidade de fazer chamada
	 * ao banco ou reload na página
	 * @CreateForJoãoPaulo
	 */
	reorderLastSave() {
		let items = this.state.items
		let data = this.state.data
		let form = {
			id: data.id,
			content: data.content,
			properties: {
				name: data.content,
				responsible: data.responsible,
				description: data.description,
			}
		}

		for (let x = 0; x < items.length; x++) {
			if (items[x].id === data.id) {
				items[x] = form
			}
		}

		this.setState({
			items
		})
	}

	hideAlert() {
		this.setState({
			alert: null
		});
	}
	openAlert(title, text) {
		this.setState({
			alert: (
				<SweetAlert
					warning
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
		})
	}

	enterValue = async e => {
		var exists;
		if (String(this.state.text) !== "") {
			if (parseInt(e.which, 10) === 13) {
				if (this.state.items.length > 0) {
					exists = this.state.items.find(item => {
						return item.content === e.target.value;
					});
				} else {
					exists = false;
				}
				if (!exists) {
					var valor = e.target.value;
					let add = await this.addValue(valor);
					this.setState(
						{
							items: [...this.state.items, { id: add, content: valor }],
							text: ""
						}
					)
				} else {
					this.openAlert(
						"Atenção",
						"Você não pode definir itens com o mesmo nome"
					);
				}
			}
		}
	};

	addValue = async (value, id, properties) => {
		if (this.props.idRel === true && this.state.onAdd) {

		} else {
			try {
				let dados = {
					idRel: this.state.idRel,
					name: this.state.name,
					item: value,
					properties,
					id,
					reuseNode: this.state.reuseNode,
				};
				const response = await apiWs.post(`/comp_SortableList/add/`, dados);
				return response.data.id;
			} catch (error) {
				console.log("errro load notices " + error);
				return false;
			}
		}
	}

	saveValue = async () => {
		if (this.props.idRel !== true) {
			try {
				let dados = {
					idRel: this.state.idRel,
					name: this.state.name,
					list: this.state.items
				};
				const response = await apiWs.post(`/comp_SortableList/reorder/`, dados);
				return response.data;
			} catch (error) {
				console.log("errro load notices " + error);
			}
		}
	};
	saveEdit = async (id) => {
		try {
			let dados = {
				id,
				name: this.state.editNewValue
			};
			const response = await apiWs.post(`/comp_SortableList/update/`, dados).then(a => true);
			if (response) {
				this.loadOptions()
			}
		} catch (err) {
			console.log(err)
		}
		this.setState({
			editing: false,
			editingItem: null
		}, () => {

		})
	}

	edit = async (index) => {
		if (this.state.editable) {
			this.setState({
				editing: true,
				editingItem: index
			}, () => {

			})
		}
	}


	loadOptions = async () => {
		if (this.state.idRel !== null && this.state.name !== null && this.state.idRel !== true) {
			try {
				const items = await apiWs
					.get(
						`/comp_SortableList/list/?id=${this.state.idRel}&list=${
						this.state.name
						}`
					)
					.then(res => res.data);
				this.setState({ items });
			} catch (err) {
				console.log(err);
			}
		} else {
			this.setState({ items: [] });
		}
	};

	inputCallBack = async (dados) => {
		if (this.state.idRel !== true && this.state.idRel != null) {
			if (dados.label) {
				var exists
				if (this.state.items.length > 0) {
					exists = this.state.items.find(item => {
						return item.content === dados.label;
					});
				} else {
					exists = false;
				}
				if (!exists) {
					var value = dados.value
					var label = dados.label
					var properties = dados.properties
					if (dados.value === dados.label) {
						value = ""
					}
					let add = await this.addValue(label, value, properties);
					if (value === "") {
						value = add
					}

					this.setState({
						items: [...this.state.items, { id: value, content: label, properties: properties }],
					}, () => {
						//this.saveValue();
					}
					);
				} else {
					this.openAlert(
						"Atenção",
						"Você não pode definir itens com o mesmo nome"
					);
				}
			}
		} else {
			this.setState({
				onAddEx: dados
			}, () => {
				this.state.onAdd()
			})
		}
	}
	onDragEnd = async result => {
		if (!result.destination) {
			return;
		}
		const items = await this.reorder(
			this.state.items,
			result.source.index,
			result.destination.index
		);

		this.setState({ items }, () => {
			this.saveValue();
		});
	};
	reorder(list, startIndex, endIndex) {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	}

	delete = async (index, itemId) => {
		await this.props.callDelete(itemId)
		try {
			apiWs.delete(
				`/comp_SortableList/item/${itemId}/?rel=${this.state.idRel}&list=${this.state.name}`,
				{}
			);
			const items = this.state.items;
			items.splice(index, 1);
			this.setState({
				items
			});
		} catch (err) {
			console.log(err);
		}
	};
	deleteConfirm = async (index, itemId) => {
		this.setState({
			deleteConfirm: (
				<Deleted
					title="Atenção"
					msg="Tem certeza que deseja excluir o aspecto?"
					onConfirm={() => {
						this.delete(index, itemId)
						this.setState({ deleteConfirm: null })
					}}
					onCancel={() => this.setState({ deleteConfirm: null })}
				/>
			)
		})
	}

	saveComponent(e, valor) {
		let data = [];
		let form = {
			id: data.length,
			content: e.target.value
		};

		if (String(valor) === "decisores") {
			data = this.state.itensDeciores.slice();
			this.setState(prevState => ({
				itensDeciores: [...prevState.itensDeciores, form],
				nameoptions: valor
			}));
		} else if (String(valor) === "influenciadores") {
			data = this.state.itensInfluenciadores.slice();
			this.setState(prevState => ({
				itensInfluenciadores: [...prevState.itensInfluenciadores, form],
				nameoptions: valor
			}));
		} else if (String(valor) === "impactados") {
			data = this.state.itensImpactados.slice();
			this.setState(prevState => ({
				itensImpactados: [...prevState.itensImpactados, form],
				nameoptions: valor
			}));
		} else if (String(valor) === "publicos") {
			data = this.state.itensPublicos.slice();
			this.setState(prevState => ({
				itensPublicos: [...prevState.itensPublicos, form],
				nameoptions: valor
			}));
		}
		data.push(form);

		//let content = [];
		if (String(this.state.id) !== "") {
			this.savePriority(this.tratarObjeto(data), valor);
		} else {
			this.savePriorityAux(this.tratarObjeto(data), valor);
		}
	}
	componentText(e, valor) {
		if (String(this.state.colorSave) === "#99a5b5") {
			if (this.state.id !== "") {
				this.saveComponent(e, valor);
			} else {
				this.alertMensagem(actions1.errooptions);
			}
		} else {
			this.saveComponent(e, valor);
		}
	}

	render() {
		return this.state.idRel ? (
			<GridItem md={this.state.md} xs={this.state.xs} sm={this.state.sm}>
				{this.state.alert}
				{this.state.deleteConfirm}
				<Card
					style={{
						boxShadow: "none",
						borderRadius: "0px",
						backgroundColor: "#ebedf0",
						marginTop: "1vh"
					}}
				>
					<div
						style={{
							position: "absolute",
							color: "#001e46",
							left: "8%",
							top: "1vh"
						}}
					>
						<Icone icon={this.state.icon} color="#001e46" size="20px" />
					</div>

					<CardHeader
						className="header-items"
						style={{
							textAlign: "center",
							fontSize: "12px",
							fontWeight: "bold",
							fontFamily: "Roboto",
							color: "#001e46"
						}}
					>
						{this.state.title}
					</CardHeader>
					<CardBody
						style={{ backgroundColor: "#ebedf0" }}
						className="bodyItems"
					>
						<div style={{ backgroundColor: "#ebedf0", width: "100%" }}>
							<DragDropContext onDragEnd={this.onDragEnd}>
								<Droppable droppableId="droppable">
									{(provided, snapshot) => (
										<div ref={provided.innerRef} style={{ width: "100%" }}>
											{this.state.items.length > 0
												? this.state.items.map((item, index) => (
													<Draggable
														key={this.state.option + "_" + index}
														draggableId={`item-${item.id + "_" + index}`}
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
																{this.state.editingItem === index && this.state.editing ? (
																	<div
																		onClick={() => this.saveEdit(item.id)}
																		style={{ position: "relative", float: 'right' }}
																	>
																		<Icone icon="save" color="#001e46" size="20px" />
																	</div>
																) : (null)}
																{this.state.callBack && this.state.icoCallBack && !this.state.editing ? (
																	<div
																		onClick={() => this.state.callBack(item, index, this.state.callBackDados)}
																		style={{ position: "relative", float: 'right' }}
																	>
																		<Icone icon={this.state.icoCallBack} color="#001e46" size="20px" />
																	</div>
																) : (
																		null
																	)}
																{!this.state.editing ? (
																	< div onClick={() => this.deleteConfirm(index, item.id)}
																		style={{ position: "relative", float: 'right' }}
																	>
																		<Icone icon="close" color="#001e46" size="20px" />
																	</div>
																) : (
																		null
																	)}


																<div
																	style={{
																		fontSize: "14px",
																		width: "82%",
																		textAlign: "left",
																		fontFamily: "Roboto"
																	}}
																	onDoubleClick={() => this.edit(index)}
																>
																	{this.state.editable && this.state.editing && this.state.editingItem === index ? (
																		<textarea placeholder='teste' style={{ width: '100%', border: 'none' }} onChange={e => this.setState({ editNewValue: e.target.value })}>{item.content}</textarea>
																	) : (
																			item.content
																		)}
																</div>
															</div>
														)}
													</Draggable>
												))
												: null}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</DragDropContext>
						</div>
					</CardBody>
					<CardFooter style={{ marginTop: "0%" }}>
						<SelectFind
							callBack={this.inputCallBack}
							idRel={this.state.idRel}
							listName={this.state.name}
							ws={this.state.ws}
							token={this.state.token}
						/>
						<div style={{ clear: "both" }}></div>
					</CardFooter>
				</Card>
			</GridItem >
		) : null;
	}
}


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

export default withStyles(sweetAlertStyle)(SortableList);