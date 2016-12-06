import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import './moreMenu.styles.scss';

class MoreMenu extends Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const { className } = this.props;
    return (
      <div className={classnames('moreDropDown', className)}>
        <Link to="/gallery" className="menuLink">
          <p className="subItem">Photo Gallery</p>
        </Link>
        <Link to="/events" className="menuLink">
          <p className="subItem">Events</p>
        </Link>
        <Link to="/about" className="menuLink">
          <p className="subItem">About</p>
        </Link>
      </div>
    );
  }
}

export default MoreMenu;
