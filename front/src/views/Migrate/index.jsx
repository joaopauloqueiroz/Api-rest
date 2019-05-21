/**
 * Painel de Notícias
 *
 *
 *
 **/

import React from "react";
import axios from "axios";

import Button from "components/CustomButtons/Button.jsx";
//css
import "assets/css/news.css";

/**
 * language
 */

//import { news } from "variables/language.jsx";
//import { create } from "domain";

axios.defaults.withCredentials = true;

const config = {
    headers: {
        Accept: "application/json"
    }
};
class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsPage: 1,
            page: {
                destaques: 1,
                outras: 1,
                rss: 1,
                rss2: 1
            },
            news: {
                showLimit: 9,
                destaques: {
                    items: []
                },
                outras: {
                    items: []
                },
                rss: {
                    items: []
                },
                rss2: {
                    items: []
                },
                internal: []
            },
            newsView: [],
            popup: null,
            newsIntern: []
        };
    }
    migrate = async (dados) => {
        const req = await axios.post(process.env.REACT_APP_API_URL + "/news/migrateUPD", dados, config).then((res) => res)
        return req
    }
    a = async (type) => {
        const migrate = await axios.post(process.env.REACT_APP_API_URL + "/news/migrate", { type }, config).then(resp => resp.data)
        migrate.map(data => {
            if (data.source && data.source.indexOf('http') > -1) {
                axios.post(process.env.REACT_APP_API_URL + "/news/site", { url: data.source }, config).then(res => {
                    let dados = res.data
                    delete dados.body
                    axios.post(process.env.REACT_APP_API_URL + "/news/migrateUPD", { idAspect: data.id, dados }, config).then((res) => {
                        console.log(data.source + '---->add:' + res)
                        return res
                    })
                })
            }
            return true
        })
    }
    render() {
        return (
            <div>
                <Button color="primary" onClick={() => this.a('Threat')}>Threat</Button>
                <Button color="primary" onClick={() => this.a('Opportunity')}>Opportunity</Button>
                <Button color="primary" onClick={() => this.a('Weakness')}>Weakness</Button>
                <Button color="primary" onClick={() => this.a('Strength')}>Strength</Button>
            </div>
        );
    }
}

export default News;