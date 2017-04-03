import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import clickOutside from 'react-click-outside';
import './galleryMenu.styles.scss';

class GalleryMenu extends Component {

  static propTypes = {
    className: PropTypes.string,
    onItemClick: PropTypes.func.isRequired,
    onClose: PropTypes.func
  }

  handleClickOutside() {
    if (this.props.closeMenu) {
      this.props.closeMenu();
    }
  }

  render() {
    const { className, onItemClick } = this.props;
    return (
      <div className={classnames('galleryMenuContainer', className)}>
        <Link to="/gallery"
              className="galleryLink"
              onClick={onItemClick}>
          <p className="galleryOption">Berry Game Calls Pro Staff</p>
        </Link>
        <Link to="/customer-gallery"
              className="galleryLink"
              onClick={onItemClick}>
          <p className="galleryOption">Successful Customers</p>
        </Link>
      </div>
    );
  }
}

export default clickOutside(GalleryMenu);
