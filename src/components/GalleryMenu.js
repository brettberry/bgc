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
    const { className } = this.props;
    return (
      <div className={classnames('galleryMenuContainer', className)}>
        <Link to="/gallery" className="galleryLink">
          <p className="galleryOption">BGC Pro Staff</p>
        </Link>
        <Link to="" className="galleryLink">
          <p className="galleryOption">Successful Customers</p>
        </Link>
      </div>
    );
  }
}

export default clickOutside(GalleryMenu);
