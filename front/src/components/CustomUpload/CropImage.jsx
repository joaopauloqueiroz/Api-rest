import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";
//import axios from "axios";

// core components
//import Button from "components/CustomButtons/Button.jsx";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import defaultAvatar from "assets/img/image_placeholder.jpg";
import defaultImage from "assets/img/placeholder.jpg";
import $ from "jquery";
import Image from "@material-ui/icons/Image";


import SweetAlert from "react-bootstrap-sweetalert";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import styled from "styled-components";


import {
  imageUpload,
} from "variables/language.jsx";


const Btnsuccess = styled.button`
  padding: 2%;
  background-color: #6fd61c;
  border-radius: 18px;
  border: none;
  padding-left: 4%;
  padding-right: 4%;

  cursor: pointer;
  color: #ffffff;
  font-family: Roboto;
  font-weight: bold;
  font-size: 10pt;
`;


const Btncancel = styled.button`
  padding: 2%;
  background-color: #ff0000;
  border-radius: 18px;
  border: none;
  padding-left: 4%;
  padding-right: 4%;
  margin-right: 10%;
  cursor: pointer;
  color: #ffffff;
  font-family: Roboto;
  font-weight: bold;
  font-size: 10pt;
`;

const Div = styled.div``;

class CropImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      idUser: this.props.idUser,
      imagePreviewUrl: this.props.imgUrl ? defaultAvatar : defaultImage,
      imgCortada: '',
      popup: true,
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleImageChange(e) {
    let parent = this;
     parent.props.closeLoad(true);
    e.preventDefault();
    let reader = new FileReader();
    if (e.target.files[0] != null) {
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
    else {
      this.props.closeLoad(false);
    }
  }

  salvarCortada() {
    let parent = this;
    var formData = new FormData();
    var nameImg = $('input[type=file]')[0].files[0].name;
    var typeImg = $('input[type=file]')[0].files[0].type;
    var imgCs = this.state.imgCortada;
    var imgResult = this.urltoFile(imgCs, nameImg, typeImg)
    var imgFinal;

    imgResult.then(function (result) {
      imgFinal = result;

      formData.append('image', imgFinal);
      formData.append('id', parent.props.idUser);

      $.ajax({
        method: "POST",
        url: process.env.REACT_APP_API_URL + "/upload/upload",
        cache: false,
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
          console.log(data)
          parent.props.imgUrl(data);
          parent.props.closeLoad(false);
          parent.props.statusPopup();
        }
      });
    });
  }

  fecharPopup() {
    this.props.statusPopup();
    this.props.closeLoad(false);
  }

  closeLoad(valor) {
    this.setState({
      load: valor,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    });
    this.refs.fileInput.value = null;
  }

  _crop() {
    // image in dataUrl
    var img = this.refs.cropper.getCroppedCanvas().toDataURL();
    this.setState({
      imgCortada: img
    });
  }

  urltoFile(url, filename, mimeType) {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }

  render() {
    var {
      avatar,
      addButtonProps,
      changeButtonProps,
      //removeButtonProps
    } = this.props;

    return (
      <GridContainer justify="center">
        <SweetAlert
          style={{ display: "table", marginTop: "-300px", width: "30%", color: '#6b6a6a', zIndex: '20000' }}
          //  title={login.titleInfo}
          showConfirm={false}
          showCancel={false}
        >
          <GridItem>
            <div className="fileinput text-center">
              <input type="file" onChange={this.handleImageChange} ref="fileInput" id="file-picker" name="image" />
              <div style={{ maxWidth: '600px' }}>
                {/*    <img src={this.state.imagePreviewUrl} alt="..." className="img-company"/> */}
                <Cropper
                  ref='cropper'
                  src={this.state.imagePreviewUrl}
                  style={{ height: 400, width: '100%' }}
                  aspectRatio={this.props.aspectRatio}
                  guides={true}
                  crop={this._crop.bind(this)} />

              </div>

              <div className={this.props.classes ? this.props.classes : ""}>
                {this.state.file === null ? (
                  <Div className={"description"} {...addButtonProps} onClick={() => this.handleClick()}>
                    <div {...changeButtonProps} className={this.props.divPai} > {imageUpload.trocarImagem}
                      &nbsp;&nbsp;<Image className={this.props.icone + "aqu " + this.props.modelo} />
                    </div>
                  </Div>
                ) : (
                    <Div className={"description"} {...addButtonProps} onClick={() => this.handleClick()}>
                      <div {...changeButtonProps} className={this.props.divPai} > {imageUpload.trocarImagem}
                        &nbsp;&nbsp;<Image className={this.props.icone + "" + this.props.modelo} />
                      </div>
                    </Div>
                  )}
              </div>
              <div className="legenda" style={{ textAlign: 'center' }}>{this.props.legenda}</div>
            </div>
          </GridItem>
          <br />
          <Btncancel onClick={e => this.fecharPopup()} >{imageUpload.cancelar}</Btncancel>
          <Btnsuccess onClick={e => this.salvarCortada()}>{imageUpload.salvar}</Btnsuccess>

        </SweetAlert>
      </GridContainer>
    );
  }
}

export default CropImage;
