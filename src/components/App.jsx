import React, { Component } from 'react';
import axios from 'axios';
import CSS from './App.module.scss';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38920750-ce35b8fd2527c3f11d87386ea';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    isModalOpen: false,
    selectedImageURL: '',
  };

  handleSearchSubmit = query => {
    if (!query.trim()) {
      alert('Please enter a valid search query.');
      return;
    }

    this.setState(
      { query, images: [], page: 1, isLoading: true, error: null },
      () => {
        this.loadImages();
      }
    );
  };

  loadImages = async () => {
    const { query, page } = this.state;

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: query,
          page: page,
          key: API_KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        },
      });
      const newImages = response.data.hits;
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        page: prevState.page + 1,
      }));
    } catch (error) {
      this.setState({ error });
      console.error('Error loading images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = () => {
    this.loadImages();
  };

  openModal = imageURL => {
    this.setState({
      isModalOpen: true,
      selectedImageURL: imageURL,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedImageURL: '',
    });
  };

  render() {
    const { images, isLoading, error, isModalOpen, selectedImageURL } =
      this.state;

    return (
      <div className={CSS.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={() => this.openModal(image.largeImageURL)}
            />
          ))}
        </ImageGallery>
        {isLoading ? <Loader /> : null}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.loadMoreImages} />
        )}
        {error && <p className={CSS.Error}>Error loading images.</p>}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            imageURL={selectedImageURL}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}
