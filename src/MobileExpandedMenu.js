import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MdClose from 'react-icons/lib/md/close';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import './mobileNavigationBar.styles.scss';

class MobileExpandedMenu extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired
  }

  state = {
    showProductsMenu: false,
    showMainMenu: false
  }

  handleShowProducts() {
    this.setState({
      showProductsMenu: !this.state.showProductsMenu
    });
  }

  handleShowMainMenu() {
    this.setState({
      showMainMenu: true,
      showProductsMenu: false
    });
  }
  render() {
    return this.state.showProductsMenu ? this.renderProducts() : this.renderMainMenu();
  }

  renderMainMenu() {
    return (
      <div className="mobileMenu">
        <MdClose className="exit" onClick={this.props.onClose}/>
        <div className="menuContainer">
          <Link to="/" className="link">
            <h3 className="item" onClick={this.props.onClose}>Home</h3>
          </Link>
            <div className="horizontalRule" />
          <h3 className="item" onClick={this.handleShowProducts.bind(this)}>Products</h3>
          <Link to="/demos" className="link">
            <h3 className="item" onClick={this.props.onClose}>Demos</h3>
          </Link>
          <Link to="/about" className="link">
            <h3 className="item" onClick={this.props.onClose}>About</h3>
          </Link>
          <Link to="/gallery" className="link">
            <h3 className="item" onClick={this.props.onClose}>Gallery</h3>
          </Link>
          {/* <Link to="/events" className="link">
            <h3 className="item" onClick={this.props.onClose}>Events</h3>
          </Link> */}
        </div>
      </div>
    );
  }

  renderProducts() {
    if (!this.state.showProductsMenu) {
      return;
    }
    return (
      <div className="mobileMenu">
        <MdChevronLeft className="backButton" onClick={this.handleShowMainMenu.bind(this)}/>
        <MdClose className="exit" onClick={this.props.onClose}/>
        <div className="menuContainer">
          <Link to="/products" className="link">
            <h3 className="item" onClick={this.props.onClose}>All Products</h3>
          </Link>
            <div className="horizontalRule"/>
          <Link to="/products/tags/bugles" className="link">
            <h3 className="item" onClick={this.props.onClose}>Bugles</h3>
          </Link>
          <Link to="/products/tags/reeds" className="link">
            <h3 className="item" onClick={this.props.onClose}>Reeds</h3>
          </Link>
          <Link to="/products/tags/cow-calls" className="link">
            <h3 className="item" onClick={this.props.onClose}>Cow Calls</h3>
          </Link>
          <Link to="/products/tags/dvds" className="link">
            <h3 className="item" onClick={this.props.onClose}>DVDs</h3>
          </Link>
          <Link to="/products/tags/other" className="link">
            <h3 className="item" onClick={this.props.onClose}>Other</h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default MobileExpandedMenu;
