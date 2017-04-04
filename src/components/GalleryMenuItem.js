import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import GalleryMenu from './GalleryMenu';
import './galleryMenu.styles.scss';

class GalleryMenuItem extends Component {

  state = {
    showDropDown: false
  }

  showDropDown() {
    this.setState({ showDropDown: true });
    clearTimeout(this.timeout);
  }

  closeDropDown() {
    this.timeout = setTimeout(() => {
      this.setState({ showDropDown: false });
    }, 300);
  }

  render() {
    return (
      <div className={classnames('menuItem', this.state.showDropDown && 'showGalleryMenu')}
           onMouseEnter={() => this.showDropDown()}
           onMouseLeave={() => this.closeDropDown()}>
        <Link to="/gallery"
              className="menuLink"
              onClick={() => this.setState({ showDropDown: false })}>
          <h3 className="item">Gallery</h3>
          <div className="underline"/>
        </Link>
        <GalleryMenu className="galleryMenu"
                     onItemClick={() => this.setState({ showDropDown: false })}/>
      </div>
    );
  }
}

export default GalleryMenuItem;
