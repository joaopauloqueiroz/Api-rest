/**
 * Painel de Notícias
 *
 *
 *
 **/

import React from "react";
import apiWs from "api/apiWs"

import NewsDetail from "components/News/Details.jsx";

//import NewsDetail from "./Details.jsx";
import NewsCard from "components/Card/News.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardTitle from "components/Card/CardTitle";
import Card from "components/Card/Card.jsx";
import BtTextIco from "components/Buttons/TextIcon.jsx";
import NewsEmpty from "components/Placeholder"
//css
import "assets/css/news.css";

/**
 * Api
 */
import api from "../../api"
/**
 * language
 */

import { news } from "variables/language.jsx";

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
          items: [],
        },
        outras: {
          items: [],
        },
        rss: {
          items: [],
        },
        rss2: {
          items: [],
        },
        internal: [],
      },
      newsView: [],
      popup: null,
      newsIntern: []
    };
  }
  verificaUrl() {
    var url = document.location.href;
    if (url.indexOf("detail") === -1) {
      this.setState({
        popup: null
      });
    }
  }

  componentDidUpdate() {
    window.addEventListener('popstate', () => {
      this.verificaUrl();
    }, false);
  }

  componentDidMount() {
    this.createRSSList();
    this.getNotices();
    if (window.location.href.indexOf("detail") === -1) {
      this.setState({
        popup: null
      });
    }
    else {
      window.history.back();
    }
  }

  createRSSList = async () => {
    const myRSS = await this.loadNews(73741);
    const outras = await this.loadNews(73744);
    const rss = await this.loadNews(73800);
    const rss2 = await this.loadNews(73199);

    this.setState({
      news: {
        destaques: myRSS,
        outras,
        rss,
        rss2
      }
    }, () => {
      this.rssPrint();
    }
    );
  };

  loadNews = async channel => {
    try {
      const response = await apiWs.get(`/news/request/?id=${channel}`)
      let res = response.data
      return res;

    } catch (error) {
      console.log('errro load notices ' + error)
    }
  };

  rssPrint = () => {
    this.setState({
      newsView: {
        destaques: this.rssRender(this.state.news.destaques, this.state.page.destaques, 4, 4),
        outras: this.rssRender(this.state.news.outras, this.state.page.outras, 4, 2, "h"),
        rss: this.rssRender(this.state.news.rss, this.state.page.rss, 6, 6),
        rss2: this.rssRender(this.state.news.rss2, this.state.page.rss2, 6, 6)
      }
    });
  };
  NewsOpenPopup(
    urlNotice = null,
    title = null,
    sourceName = null,
    id = null,
    tags = null,
    content = null,
    img = null
  ) {
    window.history.pushState("", "", "/news/detail");
    this.setState({
      popup: (
        <NewsDetail
          click={this.updateBox.bind(this)}
          content={content}
          delete={true}
          edit={true}
          id={id}
          img={img}
          title={title}
          noticeView={true}
          removeBox={this.removeBox.bind(this)}
          source={urlNotice}
          source_name={sourceName}
          tags={tags}
          updateNotice={this.updateNotice.bind(this)}
          urlNotice={urlNotice}
        />
      )
    });
  }

  updateNotice(data) {
    let id = data.id;
    let noticias = this.state.newsIntern;
    //let nt = noticias.find(element => (element = id));
    let index = noticias.findIndex(x => x.id === id);
    noticias[index] = data;

    this.setState({
      newsIntern: noticias
    });
  }

  removeBox(id) {
    let notices = this.state.newsIntern;
    for (let x = 0; x < notices.length; x++) {
      if (notices[x].id === id) {
        notices.splice(x, 1);
        break;
      }
    }
    this.setState({
      newsIntern: notices
    });
  }

  updateBox(data) {
    let notice = this.state.newsIntern;
    notice.unshift(data);
    this.setState({
      newsIntern: notice
    });
  }
  getNotices = async () => {
    let notices = [];
    try {
      const response = await apiWs.get(`/news/request/?id=${this.state.id}&company=false`)
      let data = response.data;

      notices = data.map((item) => {
        return {
          content: item.description,
          id: item.id,
          source: item.source,
          img: item.img,
          name: item.name,
          created: item.created,
          tags: item.tags,
          title: item.title
        }
      })
      this.setState({
        newsIntern: notices
      });

    } catch (error) {
      console.log('error request ' + error)
    }
  };
  likeNews = async (source, like, data) => {
    let body = {
      source,
      like,
      data
    };
    try {
      const resp = await api.post("/news/like", body);
      return resp.data;
    } catch (error) {
      console.log(error)
    }

  };
  rssRender(
    rss = [],
    page,
    limit = this.state.news.showLimit,
    newsLine = 3,
    model = "v"
  ) {
    let listRss = [];
    if (rss.length > 0) {
      listRss = rss.map((theNew, i) => {
        let listR;
        if (i + 1 > (page - 1) * limit && i < page * limit) {
          var imgSource = theNew.img;
          listR = <NewsCard
            key={i}
            onClick={() => {
              this.NewsOpenPopup(theNew.source, theNew.title, theNew.source_name, null, null, theNew.description, imgSource);
            }}
            onBtClick={e => {
              e.preventDefault();
              window.open(theNew.source, "_blank");
            }}
            news=""
            model={model}
            newsLine={newsLine}
            img={imgSource}
            pubDate={theNew.pubDate}
            alt=""
            title={theNew.title}
            shortDescription={theNew.description}
            content={theNew.description}
            source={theNew.source}
            source_name={theNew.source_name}
          />
        }
        return listR;
      });
      //img = null;
    }
    return listRss;
  }
  removeArray(index) {
    let news = this.state.newsIntern;
    news.splice(index, 1);
    this.setState({
      newsIntern: news,
    })
  }
  newsUpdate(page = 1, limit = 9, sessao = null) {
    if (sessao) {
      let newsCount = this.state.news[sessao].length;
      let paginas = Math.ceil(newsCount / limit);
      if (page > paginas) {
        this.setState(
          {
            page: {
              ...this.state.page,
              [sessao]: 1
            }
          },
          () => {
            this.rssPrint();
          }
        );
      } else {
        this.setState(
          {
            page: {
              ...this.state.page,
              [sessao]: page
            }
          },
          () => {
            this.rssPrint();
          }
        );
      }
    }
  }
  render() {
    //let shortDescription = "";
    let allNotices = [];
    if (this.state.newsIntern) {
      allNotices = this.state.newsIntern.map((item, i) => {
        return <NewsCard
          alt
          created={item.created}
          id={item.id}
          img={item.img}
          key={i}
          index={i}
          model={"v"}
          news
          newsLine={3}
          shortDescription={item.content ? item.content.substr(0, 150) + '...' : null}
          content={item.content}
          source={item.source}
          source_name={item.source_name}
          title={item.title}
          pubDate={item.pubDate}
          delete={true}
          removeArray={this.removeArray.bind(this)}
          onClick={() =>
            this.NewsOpenPopup(
              item.source,
              item.title,
              item.created,
              item.id,
              null,
              item.content,
              item.img,
            )
          }
          onBtClick={e => {
            window.open(item.source, "_blank");
          }
          }
        />
      });
    }
    return (
      <div>
        {this.state.popup == null ? (
          <div>
            <GridContainer style={{ backgroundColor: '#fff', minHeight: '50vh' }}>
              <GridItem md={12} xs={12} sm={12} style={{ marginBottom: '15px' }}>
                <CardTitle title={news.sessao.destaques} ico="star" />
              </GridItem>
              {this.state.newsView.destaques}
            </GridContainer>

            <GridContainer style={{ backgroundColor: '#fff', minHeight: '50vh', marginTop: '8vh' }}>
              <GridItem md={6} xs={12} sm={6}>
                <CardTitle title={news.sessao.outras} ico="chrome_reader_mode" ml='0px' />
              </GridItem>

              <GridItem md={6} xs={12} sm={6}>
                <Card style={{ marginTop: '10px', boxShadow: 'none' }}>
                  <BtTextIco
                    ico="playlist_add"
                    text="VISUALIZAR MAIS NOTÍCIAS"
                    onClick={() =>
                      this.newsUpdate(this.state.page.outras + 1, 4, "outras")
                    } // page, limit = 9, sessao = "destaques"
                  />
                </Card>
              </GridItem>
              {this.state.newsView.outras}
            </GridContainer>

            <GridContainer style={{ backgroundColor: '#fff', minHeight: '50vh', marginTop: '8vh' }}>
              <GridItem md={6} xs={12} sm={6}>
                <CardTitle title={news.sessao.colaboradores} ico="peoples" />
              </GridItem>

              <GridItem md={6} xs={12} sm={6}>
                <Card style={{ marginTop: '10px', boxShadow: 'none' }}>
                  <BtTextIco
                    ico="add"
                    text={news.btAdd}
                    onClick={() =>
                      this.NewsOpenPopup()
                    }
                  />
                </Card>
              </GridItem>
              {String(allNotices) !== "" ? allNotices : <NewsEmpty icone="people" text={news.placeholder} />}
            </GridContainer>


            <GridContainer style={{ backgroundColor: '#fff', minHeight: '50vh', marginTop: '8vh' }}>
              <GridItem md={6} xs={12} sm={6}>
                <CardTitle title={news.sessao.rss} ico="chrome_reader_mode" />
              </GridItem>

              <GridItem md={6} xs={12} sm={6}>
                <Card style={{ marginTop: '10px', boxShadow: 'none' }}>
                  <BtTextIco
                    ico="playlist_add"
                    text="VISUALIZAR MAIS NOTÍCIAS"
                    onClick={() =>
                      this.newsUpdate(this.state.page.rss + 1, 6, "rss")
                    } // page, limit = 9, sessao = "destaques"
                  />
                </Card>
              </GridItem>
              {this.state.newsView.rss}
            </GridContainer>


          </div>
        ) : (
            this.state.popup
          )}
      </div>
    );
  }
}

export default News;
