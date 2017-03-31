import React, { Component, PropTypes } from 'react';
import Demo from '~/components/HomePageDemo';
import Featured from '~/components/ProductFeature';
import VideoIntro from '~/components/VideoIntro';
import GalleryFeature from '~/components/GalleryFeature';
import TabletProvider from '~/providers/TabletProvider';
import './home.styles.scss';

class Home extends Component {
  render() {
    return (
      <div>
        <VideoIntro/>
        <Featured/>
        <GalleryFeature/>
        <Demo/>
        <TabletProvider>
          <Banner2/>
        </TabletProvider>
      </div>
    );
  }
}


class Banner2 extends Component {

  static propTypes = {
    isTablet: PropTypes.bool
  }

  static defaultProps = {
    isTablet: false
  }

  render() {
    return this.props.isTablet ? this.renderTablet() : this.renderDesktop();
  }

  renderTablet() {
    return (
      <div className="mobileBannerContainer">
        <div className="rowContainer">
          <h3 className="banner2Header">Built for hunters,</h3>
          <div className="row">
            <h3 className="banner2Header">by hunters</h3>
            <h3 className="banner2Header highlight">&nbsp;since 1983.</h3>
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className="bannerContainer">
        <div className="rowContainer">
          <h2 className="header3">Built for hunters, by hunters</h2>
          <h2 className="header3 highlight">&nbsp;since 1983.</h2>
        </div>
      </div>
    );
  }
}

export default Home;
