import React from "react";
import Icon from "@material-ui/core/Icon";

/**
 * class para inserção de icones generica
 */
/**
 *
 * recebe o nome do icone
 * cor do icone
 * tamanho da fonte do icone
 *
 */

class IconeSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: this.props.icon,
      color: this.props.color,
      size: this.props.size
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        icon: this.props.icon,
        color: this.props.color,
        size: this.props.size
      });
    }
  }

  render() {
    return (
      <Icon
        style={{
          color: this.state.color,
          fontSize: this.state.size
        }}
      >
        {this.state.icon}
      </Icon>
    );
  }
}

export default IconeSwitch;
