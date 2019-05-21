import React from 'react';
import img from "assets/img/matrix_logo.png"
class Default extends React.Component {
  /*constructor(props) {
    super(props);
  }*/
  render() {
    return (
      <div style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '8%'}}>
      	<img alt={'Imagem padrão'} src={img} />
      </div>
    );
  }
}

export default Default