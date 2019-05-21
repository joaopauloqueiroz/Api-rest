import React from "react";
import SelectInput from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { actions1 } from "variables/language.jsx";

class SelectActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
      estilo: this.props.estilo,
      estiloSelect: this.props.selectEstilo,
      selected: this.props.id,
      styleDiv: this.props.styleDiv
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        users: this.props.users,
        selected: this.props.id
      });
    }
  }
  update(e) {
    this.props.change(e);
  }

  render() {
    let options = this.state.users.map((item, i) => (
      <MenuItem value={item} key={item + i}>
        {item}
      </MenuItem>
    ));
    let selecionado =
      this.state.selected == null || String(this.state.selected) === ""
        ? actions1.selecioneMedida
        : this.state.selected;

    return (
      <div className="form-group medida" style={this.state.styleDiv}>
        <SelectInput
          className="form-control"
          style={this.state.estiloSelect}
          onChange={evt => this.update(evt)}
          value={selecionado}
        >
          <MenuItem disabled value={actions1.selecioneMedida}>
            {actions1.selecioneMedida}
          </MenuItem>
          {options}
        </SelectInput>
      </div>
    );
  }
}

export default SelectActions;
