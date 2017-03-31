import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up';
import map from 'lodash/map';

import { TagCollection } from '~/models';
import data from '~/data.json';
import './sidebar.styles.scss';

const tags = new TagCollection(data.tags);

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebarContainer">
        <SidebarMenuComponent item={"All Products"} path={"/products"}/>
        {map(tags.toArray(), (tag, key) => <SidebarMenuComponent item={tag.getTag()}
                                                                 path={`/products/tags/${tag.getTagPath()}`}
                                                                 key={key}/>
        )}
      </div>
    );
  }
}

class SidebarMenuComponent extends Component {

  static propTypes = {
      item: PropTypes.string,
      path: PropTypes.string
  }

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
