import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider'; //defaultValueReducer
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
//import createMuiTheme from '@material-ui/core/styles/createMuiTheme';


const styles = {
  root: {
    width: '100%',
  }
}; 

/**
 * a value reducer that will snap to multiple of 10 but also to the edge value
 * Useful here because the max=104 is not a multiple of 10
 */
/*function valueReducer(rawValue, props, event) {
  const { disabled, max, min, step } = props;

  function roundToStep(number) {
    return Math.round(number / step) * step;
  }

  if (!disabled && step) {
    if (rawValue > min && rawValue < max) {
      if (rawValue === max - step) {
        // If moving the Slider using arrow keys and value is formerly an maximum edge value
        return roundToStep(rawValue + step / 2);
      }
      if (rawValue === min + step) {
        // Same for minimum edge value
        return roundToStep(rawValue - step / 2);
      }
      return roundToStep(rawValue);
    }
    return rawValue;
  }

  return defaultValueReducer(rawValue, props, event);
}*/

/**
 * this slider has a max that is not a multiple of its step. We use a custom
 * `valueReducer` to adjust the given values
 */
class SimpleSlider extends React.Component {
  state = {
    value: parseInt(this.props.value, 10) ,
    min: parseInt(this.props.min, 10),
    max: parseInt(this.props.max, 10),
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        value: parseInt(this.props.value, 10),
      });
    }
  }



  componentDidMount() {
    let elem = document.getElementById('slider10');
    let child = elem.childNodes[0];
    child.childNodes[0].style.backgroundColor = '#002960';
    child.childNodes[1].style.backgroundColor = '#002960';
    child.childNodes[2].style.backgroundColor = '#002960';
    child.childNodes[1].childNodes[0].style.backgroundColor = '#002960';
    
   // let valorfinal = this.state.max - this.state.min

    /*  if(valorfinal > 0 ){
      this.setState({
        max: parseInt(this.props.min, 10),
        min: parseInt(this.props.max, 10),
      });
    }  */
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.updateRange(value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { min } = this.state;
    const { max } = this.state;

    return (
      <div className={classes.root}>
        <Slider  
          id='slider10'
          value={value}
       //   valueReducer={valueReducer}
          min={min}
          max={max}
          step={1}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);