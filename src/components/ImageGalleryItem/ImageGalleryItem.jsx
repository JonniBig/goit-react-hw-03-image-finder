import React, { Component } from 'react';
import CSS from '../App.module.scss';

export class ImageGalleryItem extends Component {
  render() {
    const { image, onClick } = this.props;

    return (
      <li className={CSS.ImageGalleryItem} onClick={onClick}>
        <img
          src={image.webformatURL}
          alt={image.user}
          className={CSS.ImageGalleryItemImage}
        />
      </li>
    );
  }
}
