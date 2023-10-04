import React, { Component } from 'react';
import CSS from './Modal.module.scss';
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeKey);
  }

  onOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  onEscapeKey = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { isOpen, imageURL } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div className={CSS.Overlay} onClick={this.onOverlayClick}>
        <div className={CSS.Modal}>
          <img src={imageURL} alt="" />
        </div>
      </div>
    );
  }
}
