import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up';
import './sidebar.styles.scss';

export default class Sidebar extends Component {
  render() {
    //TODO: use map from json file to simplify this code??
    return (
      <div className="sidebarContainer">
        <SidebarMenuComponent item={"All Products"} path={"/products"} />
        <SidebarMenuComponent item={"Most Popular"} path={"/products/tags/popular"} />
        <SidebarMenuComponent item={"Online Specials"} path={"/products/tags/sale"} />
        <SidebarMenuComponent item={"Thunder Bugles"} path={"/products/tags/bugles"} />
        <SidebarMenuComponent item={"RT-Reeds"} path={"/products/tags/rt-reeds"} />
        <SidebarMenuComponent item={"Golden Dome"} path={"/products/tags/golden-dome"} />
        <SidebarMenuComponent item={"X-Series"} path={"/products/tags/x-series"} />
        <SidebarMenuComponent item={"Big Bull Reeds"} path={"/products/tags/big-bull"} />
        <SidebarMenuComponent item={"Cow Calls"} path={"/products/tags/cow-calls"} />
        <SidebarMenuComponent item={"Hunting Movies"} path={"/products/tags/dvds"} />
        <SidebarMenuComponent item={"Accessories"} path={"/products/tags/other"} />
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
