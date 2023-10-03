import React, { Component } from 'react';
import CSS from './Button.module.scss';

export class Button extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button type="button" className={CSS.Button} onClick={onClick}>
        Load more
      </button>
    );
  }
}
