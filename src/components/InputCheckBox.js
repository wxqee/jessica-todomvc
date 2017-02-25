import React, {PropTypes} from 'react';

// import {splitProps} from './utils/PropTypes.js';

const propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  checked: false
};

class InputCheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked || false
    };

    this.input = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked && this.state.checked != nextProps.checked) {
      this.setState({checked: nextProps.checked});
    }
  }

  toggle() {
    let checked = !this.state.checked;

    this.setState({checked});

    this.props.onChange(checked);
  }

  render() {
    return (
      <input className="toggle-all" type="checkbox" checked={this.state.checked} onChange={this.toggle.bind(this)} />
    );
  }
}

InputCheckBox.propTypes = propTypes;

InputCheckBox.defaultProps = defaultProps;

export default InputCheckBox;
