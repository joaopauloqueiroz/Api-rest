import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";
import axios from "axios";
// core components
//import Button from "components/CustomButtons/Button.jsx";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import $ from "jquery";
import Image from "@material-ui/icons/Image";
import {
  imageUpload,
} from "variables/language.jsx";



import styled from "styled-components";
/*const Buttton = styled.div`
  display: inline-block;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  margin-top: 1vh;
  color: #002960;
  font-weight: bold;
`;*/

/*position: absolute;
  right: 22%;
  bottom: 1vh;
*/

/*const Icon = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.2vw;
  height: 1.2vw;
  border-radius: 1.2vw;
  font-size: 1.2vw;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  color: white;
  background-color: #002960;
  margin-top: 5%;
  margin-left: 0.5%;
  margin-right: 1.5%;
  margin-bottom: 1%;
  margin-left: 5.5%;
`;*/

const Div = styled.div`
  width: 100%;
  display: inline-block;
  margin-right: -12%;
`;

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: this.props.imgUrlDefault,
      imgUrlDefault: this.props.imgUrlDefault,
      imagePreviewUrl: this.props.imgUrlDefault,
      idUser: this.props.idUser,
      //imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps !== this.props){
      this.setState({
        imagePreviewUrl: this.props.imgUrlDefault,
      });
    }
  }

  /*componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        //imagePreviewUrl: nextProps.imgUrlDefault
      });
    }
  }*/

  componentWillMount(){
      //this.setState({ imagePreviewUrl: this.state.imgUrlDefault });
  }

  handleImageChange(e) {
    let parent = this;
    this.props.closeLoad(true);
  /*   e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
      //  imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file); */

    var formData = new FormData();
    
    formData.append('image', $('input[type=file]')[0].files[0]);
    formData.append('id', this.props.idUser);
 
    $.ajax({
	    method: "POST",
      url: process.env.REACT_APP_API_URL+"/upload/upload",
	    cache: false,
	    data: formData,
	    contentType: false,
	    processData: false,
	    success: function(data){
        parent.props.saveIMG(data);
        parent.setState({
          imagePreviewUrl: 'https://blobmatrix.blob.core.windows.net/thumbnails/' + data,
        }, () => {
          parent.props.closeLoad(false);
        });
	    }
  });   
  
  let dados = {
    blobName: this.state.imagePreviewUrl,
  }

  let config = {
    headers: {
      Accept: "application/json"
    }, 
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

  axios.post(process.env.REACT_APP_API_URL+"/upload/delete/", dados, config)
    .then(function(response) {
      response.json.then(function(data){
        
      });
    }).catch(function(err){
    let erro = [];
      let values = err.response;
      if(values){
        for(let i=0;i<values.data.length; i++){
          erro[i] = values.data[i].msg;
        }
        parent.setState({
          errors: erro,
        });
      }
      else{
       // parent.removerCard();
      // setTimeout(function(){ window.location.reload() }, 450);
      }
    })
    .then(function(val){
  });

}

  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  handleClick() {
    this.props.corBtTrocarIMG();
    this.refs.fileInput.click();
  }
  handleRemove() {
    //let parent = this;
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    });
    this.props.saveIMG("");
    this.refs.fileInput.value = null;

  }
  render() {
    var {
      avatar,
      addButtonProps,
      changeButtonProps,
      //removeButtonProps
    } = this.props;

    return (
      <div className="fileinput text-center">
        <input type="file" onChange={this.handleImageChange} ref="fileInput"  id="file-picker" name="image" />
        <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
          <img onError={this.props.onError} src={this.state.imagePreviewUrl} alt="..." />
        </div>

        <div>
          {this.state.file === null ? (
            <Div className="description" {...addButtonProps} onClick={() => this.handleClick()}>
              <div {...changeButtonProps} className={this.props.divPai} > {imageUpload.trocarImagem}
                  &nbsp;&nbsp;<Image className={this.props.icone} />
               </div>
            </Div>
          ) : (
            <span>
             <Div className="description" {...addButtonProps} onClick={() => this.handleClick()}>
              <div {...changeButtonProps} className={this.props.divPai} > {imageUpload.trocarImagem}
                  &nbsp;&nbsp;<Image className={this.props.icone} />
               </div>
            </Div>
              {avatar ? <br /> : null}
            </span>
          )}
        </div>
        <div className="legenda" style={{textAlign: 'center'}}>{imageUpload.legenda1}</div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default ImageUpload;
