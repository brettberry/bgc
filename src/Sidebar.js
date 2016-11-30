import React, { Component, PropTypes } from 'react';
import './sidebar.styles.scss';
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebarContainer">
        <SidebarMenuComponent item={"All Products"} path={"/products"} />
        <SidebarMenuComponent item={"Most Popular"} path={"/products/tags/popular"} />
        <SidebarMenuComponent item={"Online Specials"} path={"/products/tags/online-specials"} />
        <SidebarMenuComponent item={"Thunder Bugles"} path={"/products/tags/bugles"} />
        <SidebarMenuComponent item={"Golden Dome"} path={"/products/tags/golden-dome"} />
        <SidebarMenuComponent item={"X-Series"} path={"/products/tags/x-series"} />
        <SidebarMenuComponent item={"Big Bull Reeds"} path={"/products/tags/big-bull"} />
        <SidebarMenuComponent item={"Cow Calls"} path={"/products/tags/cow-calls"} />
        <SidebarMenuComponent item={"Hunting Movies"} path={"/products/tags/dvds"} />
        <SidebarMenuComponent item={"Accessories"} path={"/products/tags/other"} />
        <SidebarMenuComponent item={"Clearance"} path={"/products/tags/sale"} />
      </div>
    );
  }
}

class SidebarMenuComponent extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    const { router } = this.context;
    const { item, path } = this.props;
    const isActive = router.isActive(path);

    return (
      <div>
        <Link to={path} className="categoryLink">
          <div className={classnames('categoryContainer', isActive && 'active')}>
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">{item}</h3>
          </div>
        </Link>
      </div>
    );
  }
}
