import React, { Component } from 'react';
import CSS from '../App.module.scss';

export class ImageGallery extends Component {
  render() {
    const { children } = this.props;

    return <ul className={CSS.ImageGallery}>{children}</ul>;
  }
}
