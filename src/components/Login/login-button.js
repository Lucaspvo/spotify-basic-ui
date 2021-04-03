import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import './login-button.css';

class LoginButton extends React.Component {
  render() {
    return (
      <Button
        onClick={this.props.onClick}
        className="login-btn"
        variant={this.getButtonVariants(this.props.type)}
      >
        { this.props.label }
        <FontAwesomeIcon icon={faSpotify} />
      </Button>
    );
  }

  getButtonVariants(type) {
    const mappingTypesToClasses = {
      dark: 'outline-dark',
      light: 'outline-light',
      info: 'outline-info',
      warning: 'outline-warning',
      danger: 'outline-danger',
      success: 'outline-success',
      secondary: 'outline-secondary',
      primary: 'outline-primary',
    };

    return mappingTypesToClasses[type];
  }
}

export default LoginButton;