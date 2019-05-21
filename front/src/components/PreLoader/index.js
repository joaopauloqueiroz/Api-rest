/**
 * PreLoader
 * Propriedades {fullScreen=>true|false}
 */
import React, { Component } from "react";
import Loads from 'assets/img/sonne/loading.gif'
import styled from 'styled-components';


const PreLoaderContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height:200px;
    padding-top:20px;
    padding-bottom:20px;
`

const Escurecer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 25%;
    width: 100%;
    height: 100%;
    background-color: #ffffffeb;
    z-index: 5501;
`

const Imgs = styled.img`
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%); /* Adicionar os prefixos dos navegadores */
     z-index: 5502;
     width: 5%;
     min-width: 60px;
`

class Load extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreen: props.fullScreen
        }
    }
    componentDidMount() {
        if (this.state.fullScreen == null) {
            this.setState({
                fullScreen: true
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.fullScreen === true ?
                    <Escurecer>
                        <Imgs src={Loads} alt="loading..." />
                    </Escurecer>
                    :
                    <PreLoaderContent>
                        <Imgs src={Loads} alt="loading..." />
                    </PreLoaderContent>
                }
            </div>
        )
    }
}

export default Load;

