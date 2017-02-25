import React, {PropTypes} from 'react';

import {splitProps} from './utils/PropTypes.js';

const propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
};

const defaultProps = {
  value: '',
  onValueChange: () => {},
  onChange: () => {},
  onKeyPress: () => {}
};

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.input = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && this.state.value != nextProps.value) {
      this.setState({value: nextProps.value});
    }
  }

  focus() {
    this.input.focus();
  }

  render() {
    let [props, elementProps] = splitProps(this.props, ['value', 'ref', 'onValueChange', 'onChange', 'onKeyPress']);

    return (
      <input
        {...props}
        ref={i => this.input = i}
        value={this.state.value}
        onChange={e => {
          this.setState({value: e.target.value});
          elementProps.onChange(e);
        }}
        onKeyPress={e => {
          if (e.charCode == 13) {
            elementProps.onValueChange(this.state.value);
            this.setState({value: ''});
          }
          elementProps.onKeyPress(e);
        }}
      />
    );
  }
}

Input.propTypes = propTypes;

Input.defaultProps = defaultProps;

export default Input;
