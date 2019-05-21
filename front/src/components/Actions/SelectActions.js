import React from 'react'
import SelectInput from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {
    actions1Select,
  } from "variables/language.jsx";

  
class SelectActions extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        users : this.props.users,
        estilo: this.props.estilo,
        estiloSelect: this.props.selectEstilo,
        selected: this.props.id,
        styleDiv: this.props.styleDiv,
      }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
          this.setState({
            users : this.props.users,
            selected: this.props.id,
          });
        }
      }

      update(e){
        this.props.change(e);
      }
   
    render(){
        let options = this.state.users.map((item, i) => 
          <MenuItem value={item.id} key={item+i}>
            {item.name}
          </MenuItem>);

        let selected = this.state.selected==null || String(this.state.selected) === '' ? 'default' : parseInt(this.state.selected, 10);
        
        return (
          <div className="form-group actionsSelect acao" style={this.state.styleDiv}>
            <SelectInput className="form-control selectedAlert" style={this.state.estiloSelect} 
              onChange={evt => this.update(evt)} value={selected}>
              <MenuItem disabled value="default" key="vazio">
                {actions1Select.selecioneResponsavel}
              </MenuItem>
             {options}
            </SelectInput>
          </div>
        )
    }
}

export default SelectActions