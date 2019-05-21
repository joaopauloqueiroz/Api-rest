import React from 'react';

import CardIcon from "components/Card/CardIcon.jsx";
import IconSvg from "@material-ui/core/SvgIcon";
import Icon from "@material-ui/core/Icon";

class CardTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ico: 'people',
            icoType: 'ico',
            ml: this.props.ml || '0px',
            title: null
        }
    }

    componentDidMount() {
        if (this.props.ico) {
            this.setState({
                ico: this.props.ico
            })
        }
        if (this.props.icoType) {
            this.setState({
                iconType: this.props.icoType
            })
        }
        if (this.props.title) {
            this.setState({
                title: this.props.title
            })
        } else {
            this.setState({
                title: "Título"
            })
        }
    }
    render() {
        return (
            <div>
                < CardIcon
                    color="sonneIcon"
                    style={{
                        width: "50px",
                        height: "50px",
                        marginLeft: this.state.ml,
                        color: "rgb(255, 255, 255)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: '-15px',
                    }
                    }
                >
                    {String(this.state.iconType) === 'svg' ?
                        <IconSvg name="ChromeReaderMode" style={{
                            width: "100%",
                            height: "100%",
                        }} />
                        :
                        <Icon
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >{this.state.ico}</Icon>
                    }
                </CardIcon >
                <div
                    style={{
                        position: 'absolute',
                        fontSize: "15px",
                        fontFamily: "din-condensed,sans-serif",
                        marginLeft: "69px",
                        width: "50vh",
                        color: "#002960",
                        fontWeight: "bold",
                        marginTop: "2vh"
                    }}
                >
                    {this.state.title}
                </div>
            </div>
        )
    }
}

export default CardTitle;