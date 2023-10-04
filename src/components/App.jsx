import React, { Component } from 'react';
import CSS from './App.module.scss';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../services/getImages';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    isModalOpen: false,
    selectedImageURL: '',
    totalHits: 0,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.loadImages();
    }
  }

  handleSearchSubmit = query => {
    if (!query.trim()) {
      alert('Please enter a valid search query.');
      return;
    }

    this.setState({ query, images: [], page: 1, isLoading: true, error: null });
  };

  loadImages = async () => {
    const { query, page } = this.state;

    try {
      const data = await fetchImages(query, page);

      if (data.hits.length === 0) {
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
      console.error('Error loading images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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
        {images.length > 0 &&
          !isLoading &&
          this.state.page < Math.ceil(this.state.totalHits / 12) && (
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
