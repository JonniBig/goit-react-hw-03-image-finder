import React, { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import CSS from '../App.module.scss';

export class Loader extends Component {
  render() {
    return (
      <div className={CSS.Loader}>
        <MagnifyingGlass
          visible={true}
          height={180}
          width={180}
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  }
}
