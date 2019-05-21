/**
 * Botão com Texto + Ícone
 * 
 * Params{
 *      img: utilizado caso queira personalizar
 *      alt: altTag para img
 *      text: "texto para botão" || vazio mostra apenas icone
 *      color: Cor do Ícone
 *      
 * 
 * Using
 * 
 * verificaUrl(){
    if (window.location.href.indexOf('aspects') === -1) {
      this.setState({
        popup: null (popup em algumas telas estão recebendo 0|1 e outras null||Parametros)
      });
    }
  }
  componentDidUpdate(){
    //Função para ocultar popup quando history.back for acionado
    window.onpopstate = () => {
        this.verificaUrl();      
    }
    }
*/
import React from "react";
import Icon from "@material-ui/core/Icon";


class TextIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alt: this.props.alt || null,
      bgColor: this.props.bgColor || '#001e46',
      ico: this.props.ico || 'check',
      icoColor: this.props.icoColor || '#FFF',
      icoPosition: this.props.icoPosition || null,
      icoSize: this.props.icoSize || '25px',
      onClick: this.props.onClick || null,
      text: this.props.text || null,
      textColor: this.props.textColor || '#001e46',
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        alt: this.props.alt || null,
        bgColor: this.props.bgColor || '#001e46',
        ico: this.props.ico || 'check',
        icoColor: this.props.icoColor || '#FFF',
        icoPosition: this.props.icoPosition || null,
        icoSize: this.props.icoSize || '25px',
        onClick: this.props.onClick || null,
        text: this.props.text || null,
        textColor: this.props.textColor || '#001e46',
      })
    }
  }
  render() {
    const left = () => {
      return (
        <div
          style={{
            position: "relative",
            float: "left",
            marginTop: "5px",
            marginLeft: "10px",
            display: "flex",
            alignContent: "center center"
          }}
        >
          <div
            style={{
              backgroundColor: this.state.bgColor === 'none' ? 'rgba(0,0,0,0)' : this.state.bgColor,
              color: this.state.icoColor,
              marginLeft: "10px",
              width: this.state.icoSize,
              height: this.state.icoSize,
              borderRadius: this.state.icoSize,
              cursor: "pointer",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: 'center'
            }}
          >
            <Icon
              style={{
                width: this.state.bgColor === 'none' ? "100%" : "66%",
                height: this.state.bgColor === 'none' ? "100%" : "66%",
              }}
            >
              {this.state.ico}
            </Icon>
          </div>
          {this.state.text !== null ? (
            <div
              style={{
                display: "flex",
                marginLeft: "10px",
                color: this.state.textColor,
                fontWeight: "bold",
                fontFamily: "Roboto",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.state.text}
            </div>
          ) : (
              ""
            )}
        </div>
      );
    };
    const right = () => {
      return (
        <div
          className="icones-notice"
          style={{
            position: "relative",
            float: "right",
            clear: "both",
            display: "flex"
          }}
        >
          {this.state.text !== null ?
            <div
              style={{
                display: "flex",
                marginRight: "10px",
                color: this.state.textColor,
                fontWeight: "bold",
                fontFamily: "Roboto",
                cursor: "pointer",
                justifyContent: 'center',
                alignItems: "center",
              }}
            >
              {this.state.text}
            </div>
            : null}
          <div
            style={{
              backgroundColor: this.state.bgColor === 'none' ? 'rgba(0,0,0,0)' : this.state.bgColor,
              color: this.state.icoColor,
              marginRight: "1vh",
              width: this.state.icoSize,
              height: this.state.icoSize,
              borderRadius: this.state.icoSize,
              cursor: "pointer",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: 'center'
            }}
          >
            <Icon
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: this.state.bgColor === 'none' ? "100%" : "66%",
                height: this.state.bgColor === 'none' ? "100%" : "66%",
              }}
            >
              {this.state.ico}
            </Icon>
          </div>
        </div>
      );
    };
    return (
      <div onClick={this.state.onClick}>
        {this.state.icoPosition === "left" ? left() : right()}
      </div>
    );
  }
}

export default TextIcon;
