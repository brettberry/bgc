import React, { Component } from 'react';
import { Link } from 'react-router';
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up';
import './mobileSidebar.styles.scss';


const categories = ['All Products', 'Most Popular', 'Online Specials',
                    'Thunder Bugles', 'Golden Dome', 'X-Series', 'Big Bull Reeds',
                    'Cow Calls', 'Hunting Movies', 'Accessories', 'Clearance'];

const paths = ["/products", "/products/tags/popular", "/products/tags/online-specials",
               "/products/tags/bugles", "/products/tags/golden-dome",
               "/products/tags/x-series", "/products/tags/big-bull", "/products/tags/cow-calls",
               "/products/tags/dvds", "/products/tags/other", "/products/tags/sale"]

export default class MobileSidebar extends Component {

  state = {
    index: 0
  }

  render() {
    const { index } = this.state;
    return (
      <div className="bottomBar">
        <Link to={paths[(index - 1) % paths.length]}>
          <FaChevronCircleUp className="leftArrow" />
        </Link>
        <h3 className="category">{categories[index]}</h3>
        <Link to={paths[(index + 1) % paths.length]}>
          <FaChevronCircleUp className="rightArrow" />
        </Link>
      </div>
    );
  }
}
