import React from "react";
//import PropTypes from "prop-types";
import defaultImage from "assets/img/default-avatar.png";
//import styled from "styled-components";
import $ from "jquery";
//import styled from "styled-components";
import {
  uploadFoto,
} from "variables/language.jsx";


class PictureUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: defaultImage,
      text: this.props.text,
      idUser: this.props.idUser,
      imageUrl: this.props.imageUrl
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  handleImageChange(e) {
    let parent = this;
    e.preventDefault(); 
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this.props.updateImage(file, reader);
    };
    reader.readAsDataURL(file);

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
        parent.props.imgUrl(data);
	    }
  });         

  }
  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  render() {

    return (
      <div className="picture-container ">
        <div className="picture" >
          <img
            src={this.state.imageUrl}
            className="picture-src"
            alt="..."
          />
          <input type="file" onChange={e => this.handleImageChange(e)} />
        </div>
        <h6 className="description">
          {this.state.text ? this.state.text : uploadFoto.selectImage}
        </h6>
      </div>
    );
  }
}

export default PictureUpload;
