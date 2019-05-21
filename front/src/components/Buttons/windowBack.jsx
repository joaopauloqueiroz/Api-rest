/**
 * Botão Voltar
 * 
 * Params{
 *      img: utilizado caso queira personalizar
 *      alt: altTag para img
 *      text: "texto para botão" || vazio mostra apenas icone
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

/**
 * Imagens Padrões
 */
import img from "assets/img/sonne/avancar_voltar.svg";

class buttonWindowBack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: null,
            alt: null,
            text: null,
            onClick: (event) => {
                var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
                if (is_safari) {
                    window.history.go(-1)
                    event.preventDefault()
                } else {
                    window.history.back()
                }
            }
        }
    }
    componentDidMount() {
        if (this.props.img) {
            this.setState({
                img: this.props.img
            })
        } else {
            this.setState({
                img
            })
        }
        if (this.props.alt) {
            this.setState({
                alt: this.props.alt
            })
        }
        if (this.props.text) {
            this.setState({
                text: this.props.text
            })
        }
        if (this.props.onClick) {
            this.setState({
                onClick: this.props.onClick
            })
        }
    }
    render() {
        return (
            <div onClick={this.state.onClick}>
                <div
                    style={{
                        color: "#fff",
                        marginTop: "2vh",
                        marginLeft: "-1vh",
                        width: "25px",
                        height: "26px",
                        borderRadius: "28px",
                        backgroundImage: `url(${this.state.img})`,
                        cursor: "pointer"
                    }}
                >
                    <img alt={this.state.alt} src={this.state.img} />
                </div>
                <div
                    style={{
                        marginLeft: "4vh",
                        color: "#001e46",
                        marginTop: "-22px",
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                        cursor: "pointer"
                    }}
                >
                    {this.state.text}
                </div>
            </div>
        )
    }
}

export default buttonWindowBack;