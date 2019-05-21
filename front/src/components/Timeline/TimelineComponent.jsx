/**
 * ASPECTOS DA MATRIX SWOT
 */
import $ from "jquery";
import api from "../../api";
import React from "react";
import styled from "styled-components";

/**
 * COMPONENTES
 */

import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
//import CardIcon from "components/Card/CardIcon.jsx";
import Timeline from "components/Timeline/Timeline.jsx";

/**
 * VARIAVEIS
 */
import {
	//swotPopupAspect,
	//swot1,
	painelMetasText
} from "variables/language.jsx";

/**
 * ESTILOS
 */
import "assets/css/aspects.css";
import AttachFile from "@material-ui/icons/AttachFile";
import Attachment from "@material-ui/icons/Attachment";
import Close from "@material-ui/icons/Close";
import Comment from "@material-ui/icons/Comment";
import Error from "@material-ui/icons/Error";
import Flag from "@material-ui/icons/Flag";
import FormatQuote from "@material-ui/icons/FormatQuote";
import InsertComment from "@material-ui/icons/InsertComment";
import VerticalAlignBottom from "@material-ui/icons/VerticalAlignBottom";
import VerticalAlignTop from "@material-ui/icons/VerticalAlignTop";
import PriorityHigh from "@material-ui/icons/PriorityHigh";
import RestoreFromTrash from "@material-ui/icons/RestoreFromTrash";
import Send from "@material-ui/icons/Send";
import TimelineIcon from "@material-ui/icons/Timeline";
import withStyles from "@material-ui/core/styles/withStyles";

import timelineStyle from "assets/jss/material-dashboard-pro-react/components/timelineStyle.jsx";


const Trash = styled.div`
  position: relative;
  display: inline-block;
  font-size: 14px;
  font-family: din-condensed, sans-serif;
  font-weight: 800;
  color: #99a5b5;
  margin-top: 3%;
  cursor: pointer;
  z-index: 3;
`;

const Filtros = styled.div`
  position: sticky;
  width: 98%;
  margin-top: -3%;
  left: 0%;
  color: #001e46;
  text-weight: 800;
  font-family: Roboto;
  background-color: #EBEDF0;
  text-align: right;
`;

const RestoreComment = styled.div`
  position: absolute;
  left: 90%;
  top: 7%;
  font-size: 14px;
  font-family: din-condensend, sans-serif;
  cursor: pointer;
`;

const DeleteComment = styled.div`
  position: absolute;
  left: 93%;
  top: 7%;
  font-size: 14px;
  font-family: din-condensend, sans-serif;
  cursor: pointer;
`;

const TestimonialIcon = styled.div`
  margin-top: 1vh;
  &:svg {
    width: 40px;
    height: 40px;
  },
`;

const Url = styled.a`
  &:link {
    color: #003f93;
  }
  ,
  &:visited {
    color: #99a5b5;
  }
  ,
  &:hover {
    color: #e0ac54;
  }
  ,
  &:active {
    color: #003f93;
  }
  ,cursor: pointer;
`;

const Comentario = styled.textarea`
  position: absolute;
  width: 83%;
  height: 32%;
  top: 45%;
  right: 15%;
  font-size: 14px;
  font-weight: normal;
  font-family: Roboto;
  resize: none;
  border: 0px solid;
  border-bottom: 1px solid #ccd2da;
  background-color: transparent;
`;

const Enviar = styled.div`
  position: absolute;
  right: 0;
  bottom: 10px;
  cursor: pointer;
  color: #001e46;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 800;
`;

const CardTestimonialDescription = styled.h5`
  font-style: italic;
  color: #999999;
  margin-bottom: 0;
  margin-top: 0;
  font-size: 12px;
`;

const CardCategory = styled.h6`
  position: absolute;
  color: transparent;
  top: 0.2vh;
  font-size: 0.45vw;
`;

const CardName = styled.div`
  position: absolute;
  width: 100%;
  top: 1vh;
  left: 0;
  font-size: 14px;
  color: #001e46;
  font-weight: 1000;
  text-align: center;
  text-transform: uppercase;
`;

const CardTitle = styled.h4`
  color: #001e46;
  margin-top: 0.3vh;
  font-size: 0.6vw;
  font-weight: 1000;
`;

class TimelineComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			name: this.props.name,
			template: this.props.template,
			edit: this.props.edit,
			type: this.props.type,
			userId: this.props.userId,
			avatar: this.props.avatar,
			comentario: "",
			data: this.props.data,
			warning: 0,
			filter: null,
			showDeleted: false,
			ordered: true,
			timelineType: this.props.timelineType,
			item: this.props.item,
			comments: this.props.comments != null ? this.props.comments : [],
		};

		if (this.props.id != null && String(this.props.id) !== ""
			&& String(this.props.timelineType) !== 'goal'
			&& String(this.props.timelineType) !== 'project') {
			this.carregarTimeline(this.props.id);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props && (String(this.props.timelineType) === 'goal' || String(this.props.timelineType) === 'project')) {
			this.setState({
				id: this.props.id,
				name: this.props.name,
				template: this.props.template,
				edit: this.props.edit,
				type: this.props.type,
				userId: this.props.userId,
				avatar: this.props.avatar,
				comentario: "",
				warning: 0,
				filter: null,
				timelineType: this.props.timelineType,
				item: this.props.item,
				comments: this.props.comments,
			});
		}
		else if (prevProps !== this.props) {
			this.setState({
				id: this.props.id,
				name: this.props.name,
				template: this.props.template,
				edit: this.props.edit,
				type: this.props.type,
				userId: this.props.userId,
				avatar: this.props.avatar,
				comentario: "",
				warning: 0,
				filter: null,
				timelineType: this.props.timelineType,
				item: this.props.item,
			});
		}
		if (this.props.id != null && String(this.props.id) !== "" &&
			this.props.id !== prevProps.id && String(this.props.timelineType) !== 'goal') {
			this.carregarTimeline(this.props.id);
		}

		//console.log(String(this.props.timelineType)==='' && this.props.range);
		if (String(this.props.timelineType) === '' && this.props.range) {
			this.carregarTimeline(this.props.id);
		}
	}

	carregarTimeline(id) {
		try {
			api.post(
				"/comment/request/" + this.state.timelineType, { id: id },
			).then(response => {
				let comments = response.data.data;
				let userId = response.data.id;
				let avatar = response.data.avatar;

				let comment = comments != null ? comments : [];
				this.setState({
					comments: comment,
					userId: userId,
					avatar: avatar
				}, () => {
					if (this.props.range) {
						this.props.rangeFalse();
					}
				});
			});
		} catch (err) {
			console.log(err)
		}
	}

	saveComment() {
		let type;
		let text = this.state.comentario;
		let warning = this.state.warning;
		if (parseInt(warning, 10) === 5) {
			type = "attachment";
			this.saveFile(type);
		}
		else {
			if (parseInt(warning, 10) === 2) {
				type = "milestone";
			}
			else if (parseInt(warning, 10) === 1) {
				type = "warning";
			}
			else if (parseInt(warning, 10) === 0) {
				type = "comment";
			}
			else if (parseInt(warning, 10) === 4) {
				type = "quote";
			}
			this.createComment(text, type);
		}
	}

	saveFile(type) {
		var formData = new FormData();

		formData.append("image", $("input[type=file]")[0].files[0]);
		formData.append("id", this.props.idUser);

		$.ajax({
			method: "POST",
			url: process.env.REACT_APP_API_URL + "/upload/upload",
			cache: false,
			data: formData,
			contentType: false,
			processData: false,
			success: data => {
				let link =
					"https://blobmatrix.blob.core.windows.net/thumbnails/" + data;
				let text =
					this.state.comentario != null ? this.state.comentario : "";
				this.createComment(text, type, link);
			}
		});
	}

	createComment = async (text, type, link) => {
		let date = new Date();
		let dateIso = "";

		let form = {
			text: text,
			type: type,
			date: date
		};

		if (type !== "milestone") {
			dateIso = date.toISOString();
		}

		let com = {
			id: "",
			date: String(dateIso) !== "" ? dateIso : date,
			text: text,
			type: type,
			userId: this.state.userId,
			userImage: this.props.avatar
		}

		if (parseInt(this.state.warning, 10) === 5) {
			form.link = link;
			com.link = link;
		}

		if (String(this.state.timelineType) === 'aspect') {
			form.idAspect = this.state.id;
			com.aspectId = form.idAspect;
			com.aspectName = this.state.name;
			form.aspectId = this.props.id;
		}
		else if (String(this.state.timelineType) === 'goal') {
			form.idGoal = this.state.id;

			com.goalId = form.idGoal;
			com.nameType = text;
			com.typeComment = "goal";
			com.goalName = this.state.item.nameGoal;
			com.combinationIndex = this.state.item.combinationIndex;
			com.combinationName = this.state.item.combinationName;
		}
		else if (String(this.state.timelineType) === 'news') {
			form.idAction = this.state.id;
			//form.data = this.state.data;
			com.idAction = this.state.id;
			api.post("/news/update", this.state.data)
				.then(res => {
					//console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		}
		else if (String(this.state.timelineType) === '') {
			form.idAction = this.state.id;
			com.goalName = this.state.item.nameGoal;
		}

		if (parseInt(this.state.warning, 10) === 2) {
			form.value = this.state.percentage;
			com.value = this.state.percentage;
		}

		if (parseInt(this.state.warning, 10) === 5) {
			form.link = link;
			com.link = link;
			com.changes = [];
		}

		//let comment = this.state.comments;
		form.userId = this.state.userId;
		form.userImage = this.props.avatar;

		let comments = this.state.comments;
		if (String(this.state.timelineType) === 'aspect' || String(this.state.timelineType) === '' || String(this.state.timelineType) === 'news') {
			comments.push(com);
		}

		const response = await api.post("/comment/create/" + this.state.timelineType, form)
		let data = response.data;
		com.id = data.id;

		this.setState({
			comentario: "",
			warning: 0,
			comment: comments
		}, () => {
			if (String(this.state.timelineType) === 'goal') {
				this.props.addComment(com);
			}
		});

	}

	filter(type) {
		if (String(type) !== String(this.state.filter)) {
			this.setState({
				filter: type
			});
		}
		else {
			this.setState({
				filter: null
			});
		}
	}

	convertDate(date) {
		function pad(s) {
			return s < 10 ? "0" + s : s;
		}

		let d = new Date(date);
		let newDate = [
			pad(d.getDate()),
			pad(d.getMonth() + 1),
			d.getFullYear()
		].join("/");
		//let hour = [pad(d.getHours()), pad(d.getMinutes()+1), d.getSeconds()].join(':');
		let hour = [pad(d.getHours()), pad(d.getMinutes() + 1)].join(":");
		return " " + newDate + "  |  " + hour + "h";
	}

	showDeleted() {
		this.setState({
			showDeleted: !this.state.showDeleted,
		});
	}

	apagarComentario(comment) {
		let form = {
			id: comment.id,
			date: new Date()
		};

		let comments = this.state.comments;

		for (let x = 0; x < comments.length; x++) {
			if (comments[x].id === form.id) {
				comments[x].deleted = true;
				comments[x].deletedDate = form.date;
				comments[x].deletedUser = this.state.id;
			}
		}

		api.post("/comment/delete/", form)
			.then((response) => {
				this.setState({
					comments: comments
				});
			})
			.catch((err) => {
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
			})
			.then((val) => { });
	}

	restaurarComentario(comment) {
		let form = {
			id: comment.id,
			date: new Date()
		};

		let comments = this.state.comments;

		for (let x = 0; x < comments.length; x++) {
			if (comments[x].id === form.id) {
				comments[x].deleted = false;
				delete comments[x].deletedDate;
				delete comments[x].deletedUser;
			}
		}

		api.post("/comment/restaurar/", form)
			.then((response) => {
				this.setState({
					comments: comments
				});
			})
			.catch((err) => {
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
			})
			.then((val) => { });
	}

	changeOrder() {
		this.setState({
			ordered: !this.state.ordered,
		});
	}

	render() {
		let y = 0;
		let quote = "";
		let deleted = false;
		let quoteImage = "";
		let quoteName = "";
		let quoteEmail = "";
		let stories = [];
		let comments = this.state.comments != null ? this.state.comments.slice() : [];

		comments.sort((a, b) => {
			return new Date(a.date) > new Date(b.date)
				? 1
				: new Date(a.date) < new Date(b.date)
					? -1
					: 0;
		});

		if (this.state.ordered) {
			if (this.state.showDeleted) {
				for (let x = 0; x < comments.length; x++) {
					if (this.state.filter == null ||
						String(this.state.filter) === String(comments[x].type)) {
						let date = this.convertDate(comments[x].date);
						let text = comments[x].text;
						let link =
							comments[x].link != null ? (
								<Url href={comments[x].link}>BAIXAR ANEXO</Url>
							) : (
									""
								);
						let del;
						if (this.state.template && this.state.edit) {
							del = comments[x].deleted ? (
								<RestoreComment
									onClick={() => this.restaurarComentario(comments[x])}>
									<RestoreFromTrash style={{ color: "#001e46" }} />
								</RestoreComment>) : (
									<DeleteComment onClick={() => this.apagarComentario(comments[x])}>
										X
                </DeleteComment>
								);
						}
						let delUser =
							comments[x].deletedUserName != null ? (
								<div>
									{painelMetasText.deletedFor}: {comments[x].deletedUserName}
								</div>
							) : (
									""
								);
						let acao =
							String(comments[x].typeComment) === "action" ? (
								<div>
									<p>Ação: {comments[x].nameType}</p>
								</div>
							) : (
									""
								);
						stories.push({
							inverted: y % 2 === 0 ? false : true,
							badgeColor: comments[x].deleted
								? "deleted"
								: String(comments[x].type) === "comment"
									? "comment"
									: String(comments[x].type) === "milestone"
										? "milestone"
										: String(comments[x].type) === "attachment"
											? "attachment"
											: String(comments[x].type) === "warning"
												? "problem"
												: "quote",
							badgeIcon: comments[x].deleted
								? Close
								: String(comments[x].type) === "comment"
									? Comment
									: String(comments[x].type) === "warning"
										? PriorityHigh
										: String(comments[x].type) === "milestone"
											? Flag
											: String(comments[x].type) === "attachment"
												? AttachFile
												: FormatQuote,
							body: (
								<div>
									{comments[x].deleted
										? "DELETADO"
										: String(comments[x].type) === "comment"
											? painelMetasText.textComentario + " " + date
											: String(comments[x].type) === "milestone"
												? painelMetasText.textMarco + " " + date
												: String(comments[x].type) === "attachment"
													? "Arquivo anexado" + date
													: String(comments[x].type) === "warning"
														? painelMetasText.textProblema + " " + date
														: "Citação" + date} - {comments[x].userName}
									<p>{del}</p>
								</div>
							),
							footer: (
								<div>
									<p>{acao}</p>
									<p>{text}</p>
									<div>{link}</div>
									{delUser}
								</div>
							)
						});
						y++;
					}
				}
			}
			else {
				for (let x = 0; x < comments.length; x++) {
					if (this.state.filter == null ||
						String(this.state.filter) === String(comments[x].type)) {
						let date = this.convertDate(comments[x].date);
						if (comments[x].deleted) {
							deleted = true;
						}

						if (!comments[x].deleted) {
							let text = comments[x].text;
							let link =
								comments[x].link != null ? (
									<Url href={comments[x].link}>BAIXAR ANEXO</Url>
								) : (
										""
									);
							let del;
							if (this.state.template && this.state.edit) {
								del = comments[x].deleted ? (
									<RestoreComment
										onClick={() => this.restaurarComentario(comments[x])}
									>
										<RestoreFromTrash style={{ color: "#001e46" }} />
									</RestoreComment>
								) : (
										<DeleteComment
											onClick={() => this.apagarComentario(comments[x])}>
											X
                  </DeleteComment>
									);
							}
							let acao =
								String(comments[x].typeComment) === "action" ? (
									<div>
										<p>Ação: {comments[x].nameType}</p>
									</div>
								) : ("");
							stories.push({
								inverted: y % 2 === 0 ? false : true,
								badgeColor:
									String(comments[x].type) === "comment"
										? "comment"
										: String(comments[x].type) === "milestone"
											? "milestone"
											: String(comments[x].type) === "attachment"
												? "attachment"
												: String(comments[x].type) === "warning"
													? "problem"
													: "quote",
								badgeIcon:
									String(comments[x].type) === "comment"
										? Comment
										: String(comments[x].type) === "warning"
											? PriorityHigh
											: String(comments[x].type) === "milestone"
												? Flag
												: String(comments[x].type) === "attachment"
													? AttachFile
													: FormatQuote,
								body: (
									<div>
										{String(comments[x].type) === "comment"
											? painelMetasText.textComentario + " " + date
											: String(comments[x].type) === "milestone"
												? painelMetasText.textMarco + " " + date
												: String(comments[x].type) === "attachment"
													? "Arquivo anexado" + date
													: String(comments[x].type) === "warning"
														? painelMetasText.textProblema + " " + date
														: "Citação" + date} - {comments[x].userName}
										<p>{del}</p>
									</div>
								),
								footer: (
									<div>
										<span>{acao}</span>
										<span>{text}</span>
										<div>{link}</div>
									</div>
								)
							});
							y++;
						}
					}
				}
			}
		}
		else {
			if (this.state.showDeleted) {
				for (let x = comments.length - 1; x >= 0; x--) {
					if (this.state.filter == null ||
						String(this.state.filter) === String(comments[x].type)) {
						let date = this.convertDate(comments[x].date);
						let text = comments[x].text;
						let link =
							comments[x].link != null ? (
								<Url href={comments[x].link}>BAIXAR ANEXO</Url>
							) : (
									""
								);
						let del;
						if (this.state.template && this.state.edit) {
							del = comments[x].deleted ? (
								<RestoreComment
									onClick={() => this.restaurarComentario(comments[x])}>
									<RestoreFromTrash style={{ color: "#001e46" }} />
								</RestoreComment>) : (
									<DeleteComment onClick={() => this.apagarComentario(comments[x])}>
										X
              </DeleteComment>
								);
						}
						let delUser =
							comments[x].deletedUserName != null ? (
								<div>
									{painelMetasText.deletedFor}: {comments[x].deletedUserName}
								</div>
							) : (
									""
								);
						let acao =
							String(comments[x].typeComment) === "action" ? (
								<div>
									<p>Ação: {comments[x].nameType}</p>
								</div>
							) : (
									""
								);
						stories.push({
							inverted: y % 2 === 0 ? false : true,
							badgeColor: comments[x].deleted
								? "deleted"
								: String(comments[x].type) === "comment"
									? "comment"
									: String(comments[x].type) === "milestone"
										? "milestone"
										: String(comments[x].type) === "attachment"
											? "attachment"
											: String(comments[x].type) === "warning"
												? "problem"
												: "quote",
							badgeIcon: comments[x].deleted
								? Close
								: String(comments[x].type) === "comment"
									? Comment
									: String(comments[x].type) === "warning"
										? PriorityHigh
										: String(comments[x].type) === "milestone"
											? Flag
											: String(comments[x].type) === "attachment"
												? AttachFile
												: FormatQuote,
							body: (
								<div>
									{comments[x].deleted
										? "DELETADO"
										: String(comments[x].type) === "comment"
											? painelMetasText.textComentario + " " + date
											: String(comments[x].type) === "milestone"
												? painelMetasText.textMarco + " " + date
												: String(comments[x].type) === "attachment"
													? "Arquivo anexado" + date
													: String(comments[x].type) === "warning"
														? painelMetasText.textProblema + " " + date
														: "Citação" + date} - {comments[x].userName}
									<p>{del}</p>
								</div>
							),
							footer: (
								<div>
									<p>{acao}</p>
									<p>{text}</p>
									<div>{link}</div>
									{delUser}
								</div>
							)
						});
						y++;
					}
				}
			}
			else {
				for (let x = comments.length - 1; x >= 0; x--) {
					if (this.state.filter == null ||
						String(this.state.filter) === String(comments[x].type)) {
						let date = this.convertDate(comments[x].date);
						if (comments[x].deleted) {
							deleted = true;
						}

						if (!comments[x].deleted) {
							let text = comments[x].text;
							let link =
								comments[x].link != null ? (
									<Url href={comments[x].link}>BAIXAR ANEXO</Url>
								) : (
										""
									);
							let del;
							if (this.state.template && this.state.edit) {
								del = comments[x].deleted ? (
									<RestoreComment
										onClick={() => this.restaurarComentario(comments[x])}
									>
										<RestoreFromTrash style={{ color: "#001e46" }} />
									</RestoreComment>
								) : (
										<DeleteComment
											onClick={() => this.apagarComentario(comments[x])}
										>
											X
                  </DeleteComment>
									);
							}
							let acao =
								String(comments[x].typeComment) === "action" ? (
									<div>
										<p>Ação: {comments[x].nameType}</p>
									</div>
								) : (
										""
									);
							stories.push({
								inverted: y % 2 === 0 ? false : true,
								badgeColor:
									String(comments[x].type) === "comment"
										? "comment"
										: String(comments[x].type) === "milestone"
											? "milestone"
											: String(comments[x].type) === "attachment"
												? "attachment"
												: String(comments[x].type) === "warning"
													? "problem"
													: "quote",
								badgeIcon:
									String(comments[x].type) === "comment"
										? Comment
										: String(comments[x].type) === "warning"
											? PriorityHigh
											: String(comments[x].type) === "milestone"
												? Flag
												: String(comments[x].type) === "attachment"
													? AttachFile
													: FormatQuote,
								body: (
									<div>
										{String(comments[x].type) === "comment"
											? painelMetasText.textComentario + " " + date
											: String(comments[x].type) === "milestone"
												? painelMetasText.textMarco + " " + date
												: String(comments[x].type) === "attachment"
													? "Arquivo anexado" + date
													: String(comments[x].type) === "warning"
														? painelMetasText.textProblema + " " + date
														: "Citação" + date} - {comments[x].userName}
										<p>{del}</p>
									</div>
								),
								footer: (
									<div>
										<p>{acao}</p>
										<p>{text}</p>
										<div>{link}</div>
									</div>
								)
							});
							y++;
						}
					}
				}
			}
		}

		let timeline = <Timeline style={{ backgroundColor: '#ebedf0' }} stories={stories} />;

		return (
			<CardBody
				id="scroll"
				style={{
					position: "relative",
					width: "100%",
					minHeight: "50%",
					backgroundColor: "#ebedf0",
					height: "auto",
					marginBottom: "1vh",
					top: '3vh',
					left: "0%",
				}}>
				<CardHeader
					color="azul"
					style={{
						position: 'absolute',
						display: "flex",
						width: "101.5%",
						height: "4vh",
						top: "1%",
						left: "-23px",
						fontWeight: "bold",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
						cursor: "pointer",
						fontFamily: "din-condensed,sans-serif",
						fontSize: "14px",
						backgroundColor: "#031b47"
					}}>
					<TimelineIcon /> &nbsp;&nbsp;{painelMetasText.tituloTimeline}
					<span style={{
						position: 'absolute',
						right: '3%',
						fontFamily: 'Roboto',
						cursor: 'pointer',
					}} onClick={() => this.changeOrder()}>
						<span style={{
							position: 'relative'
						}}>{painelMetasText.dateOrder}</span>
						{this.state.ordered ?
							<VerticalAlignTop
								style={{
									position: 'absolute',
									fontSize: "22px",
									marginTop: '-3px',
									color: "white",
									zIndex: "1000",
									cursor: "pointer",
								}} />
							:
							<VerticalAlignBottom
								style={{
									position: 'absolute',
									fontSize: "22px",
									marginTop: '-3px',
									color: "white",
									zIndex: "1000",
									cursor: "pointer",
								}} />
						}
					</span>
				</CardHeader>
				<Trash style={{ color: deleted ? "#001e46" : "#99a5b5" }}
					onClick={() => this.showDeleted()}>
					{painelMetasText.restaurar}{" "}
					<RestoreFromTrash
						style={{
							position: "relative",
							color: deleted ? "#001e46" : "#99a5b5",
							fontSize: "36px",
							display: "inline-block",
							top: "10px",
							marginLeft: "4px"
						}} />
				</Trash>
				<Filtros>
					<b style={{
						position: "absolute",
						marginLeft: "-65px"
					}}>{painelMetasText.filtro}:</b>
					<span style={{
						position: 'relative',
						top: '-5px'
					}}>
						<span style={{ cursor: "pointer" }}
							onClick={() => this.filter("comment")}>
							<Comment style={{
								fontSize: "22px",
								color:
									String(this.state.filter) === "comment"
										? "#e0ac54"
										: "#001e46"
							}} />
						</span>
						<span style={{ cursor: "pointer" }}
							onClick={() => this.filter("warning")}>
							<PriorityHigh
								style={{
									fontSize: "22px",
									color:
										String(this.state.filter) === "warning"
											? "#e0ac54"
											: "#001e46"
								}} />
						</span>
						<span style={{ cursor: "pointer" }}
							onClick={() => this.filter("milestone")}>
							<Flag style={{
								fontSize: "24px",
								color:
									String(this.state.filter) === "milestone"
										? "#e0ac54"
										: "#001e46"
							}} />
						</span>
						<span style={{ cursor: "pointer" }}
							onClick={() => this.filter("attachment")}>
							<Attachment
								style={{
									fontSize: "26px",
									cursor: "pointer",
									zIndex: "1000",
									color:
										String(this.state.filter) === "attachment"
											? "#e0ac54"
											: "#001e46"
								}} />
						</span>
						<span style={{ cursor: "pointer" }}
							onClick={() => this.filter("quote")}>
							<FormatQuote
								style={{
									position: 'absolute',
									marginTop: '-2px',
									fontSize: '32px',
									color:
										String(this.state.filter) === "quote" ? "#e0ac54" : "#001e46"
								}} />
						</span>
					</span>
					{/*************/}
				</Filtros>
				{String(quote) !== "" ? (
					<Card testimonial
						style={{
							position: "absolute",
							width: "41%",
							height: "14.5vh"
						}}>
						<TestimonialIcon>
							<FormatQuote style={{ color: "#E0B9AC" }} />
						</TestimonialIcon>
						<CardBody style={{ marginTop: "-3vh" }}>
							<CardTestimonialDescription>{quote}</CardTestimonialDescription>
						</CardBody>
						<CardFooter testimonial>
							<CardTitle>{quoteName}</CardTitle>
							<CardCategory>{quoteEmail}</CardCategory>
							<CardAvatar
								style={{ width: "18%" }}
								testimonial
								testimonialFooter >
								<img alt={"Usuário citação"}
									src={
										quoteImage != null && String(quoteImage) !== ""
											? quoteImage
											: "../../images/avatar.jpg"
									} />
							</CardAvatar>
						</CardFooter>
					</Card>
				) : null}
				<div style={{ marginTop: "5vh", backgroundColor: '#ebedf0' }}>{timeline}</div>
				{this.state.timelineType !== 'project' &&
					<Card
						style={{
							height: "10.5vh",
							top: "0%",
							borderRadius: '0',
							marginBottom: '0',
							backgroundColor: "rgb(235, 237, 240)"
						}}>
						<CardHeader>
							<CardName>
								<div style={{ cursor: "pointer" }}
									onClick={() => this.setState({ warning: 0 })}>
									<InsertComment
										style={{
											position: "absolute",
											top: "0.1vh",
											left: "1%",
											cursor: "pointer"
										}}
									/>
									<div
										style={{
											position: "absolute",
											top: "0.1vh",
											left: "6%",
											cursor: "pointer"
										}}>
										{painelMetasText.inserirComentario}
									</div>
								</div>
								<div
									style={{
										cursor: "pointer"
									}}
								>
									<input
										onClick={() => this.setState({ warning: 5 })}
										style={{
											position: "absolute",
											width: "24px",
											top: "0px",
											right: "9.5%",
											cursor: "pointer",
											opacity: "0",
											zIndex: "1500",
											height: "24px",
											fontSize: "0",
										}}
										type="file"
									/>
								</div>
								<div
									style={{
										position: "absolute",
										width: "5vh",
										top: "-4px",
										right: "10%",
										cursor: "pointer"
									}}
									onClick={() => this.setState({ warning: 5 })}
								>
									<Attachment
										style={{
											position: "absolute",
											top: "0.1vh",
											cursor: "pointer",
											zIndex: "1000",
											color:
												parseInt(this.state.warning, 10) === 5
													? "#e4003a"
													: "rgba(0, 0, 0, 0.4)"
										}}
									/>
								</div>
								<div
									style={{
										position: "absolute",
										width: "5vh",
										top: "-4px",
										right: "5.3%",
										cursor: "pointer"
									}}
									onClick={() => this.setState({ warning: 4 })}
								>
									<FormatQuote
										style={{
											position: "absolute",
											top: "0.1vh",
											color:
												parseInt(this.state.warning, 10) === 4
													? "#e4003a"
													: "rgba(0, 0, 0, 0.4)"
										}}
									/>
								</div>
								<div
									style={{
										position: "absolute",
										width: "5vh",
										top: "-4px",
										right: "1%",
										cursor: "pointer"
									}}
									onClick={() =>
										this.setState({
											warning: 1
										})
									}>
									<Error
										style={{
											position: "absolute",
											top: "0.4vh",
											color:
												parseInt(this.state.warning, 10) === 1
													? "#e4003a"
													: "rgba(0, 0, 0, 0.4)"
										}} />
								</div>
							</CardName>
						</CardHeader>
						<Comentario
							onChange={evt => this.setState({ comentario: evt.target.value })}
							value={this.state.comentario}
						/>
						<div
							style={{
								position: "absolute",
								width: "90%",
								bottom: "0.2vh",
								right: "1vw",
								whiteSpace: "nowrap"
							}}>
							{this.state.template &&
								this.state.edit &&
								this.state.id != null &&
								String(this.state.id) !== "" ? (
									<Enviar onClick={() => this.saveComment()}>
										{painelMetasText.enviar}
										<Send
											style={{
												position: "relative",
												top: "8px",
												left: "6px"
											}}
										/>
									</Enviar>
								) : null}
						</div>
					</Card>
				}
			</CardBody>
		);
	}
}

export default withStyles(timelineStyle)(TimelineComponent);