import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import './moreMenu.styles.scss';

class MoreMenu extends Component {

  static propTypes = {
    className: PropTypes.string,
    onItemClick: PropTypes.func.isRequired
  }

  render() {
    const { className, onItemClick } = this.props;
    return (
      <div className={classnames('moreDropDown', className)}>
        <Link to="/gallery" className="menuLink" onClick={onItemClick}>
          <p className="subItem">Photo Gallery</p>
        </Link>
        <Link to="/events" className="menuLink" onClick={onItemClick}>
          <p className="subItem">Events</p>
        </Link>
        <Link to="/about" className="menuLink" onClick={onItemClick}>
          <p className="subItem">About</p>
        </Link>
      </div>
    );
  }
}

export default MoreMenu;
