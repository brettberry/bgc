import React, { Component } from 'react';
import classnames from 'classnames';
import './productsMenu.styles.scss';

class ProductsMenu extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={classnames('dropdown', className)}>
        <div className="container">
          <Bugles />
          <Reeds />
          <DVDs />
          <Other />
        </div>
      </div>
    );
  }
}

function Bugles() {
  return (
    <div>
      <p className="columnTitle">Thunder Bugles</p>
      <p className="productNames">Original Berry Thunder Bugle</p>
      <p className="productNames">Thunder Bugle Pro</p>
      <p className="productNames">Mini Thunder Bugle</p>
      <p className="productNames">Golden Tone Grunt Tube</p>
      <p className="productNames">Golden Tone Shorty</p>
      <p className="columnTitle">Thunder Bugle Replacement Reeds</p>
      <p className="productNames">White Replacement Reed</p>
      <p className="productNames">Black Replacement Reed</p>
      <p className="productNames">Green Replacement Reed</p>
      <p className="productNames">Red Replacement Reed</p>
    </div>
  );
}

function Reeds() {
  return (
    <div>
      <p className="columnTitle">Elk Mouth Reeds</p>
      <p className="productNames">Golden Dome Large Bull</p>
      <p className="productNames">Golden Dome Medium Bull</p>
      <p className="productNames">Golden Dome Small Bull</p>
      <p className="productNames">X-Series Young Hot Bull</p>
      <p className="productNames">X-Series Herd Bull</p>
      <p className="productNames">X-Series Satellite Bull</p>
      <p className="productNames">X-Series Roosevelt</p>
      <p className="productNames">Classic Small Bull Single Reed</p>
      <p className="productNames">Classic Medium Bull Double Reed</p>
      <p className="productNames">Classic Large Bull Double Reed</p>
      <p className="productNames">Berry Deceiver Reed</p>
      <p className="productNames">Sleazy Cow Call Reed</p>
    </div>
  );
}

function DVDs() {
  return (
    <div>
      <h3 className="columnTitle">Cow Calls</h3>
      <p className="productNames">Sleazy Cow Call</p>
      <p className="productNames">Fatal Attraction</p>
      <h3 className="columnTitle">Hunting DVDs</h3>
      <p className="productNames">Elk Hunter's Training Day 2</p>
      <p className="productNames">Elk Hunter's Training Day</p>
      <p className="productNames">Hot Bulls 4</p>
      <p className="productNames">Hot Bulls 3</p>
      <p className="productNames">Bear Action 4</p>
      <p className="productNames">Bear Action 3</p>
      <p className="productNames">Speedgoats</p>
      <p className="productNames">Northwest Gobblers</p>
      <p className="productNames">Whitetail Extreme 2</p>
    </div>
  );
}

function Other() {
  return (
    <div>
      <h3 className="columnTitle">Other</h3>
      <p className="productNames">Buck Grunt and Bleat Call</p>
      <p className="productNames">Predator Call</p>
      <p className="productNames">Reed Holder</p>
      <p className="productNames">Berry Wind Detector</p>
      <p className="productNames">Power Arrow Gripper</p>
      <p className="productNames">Berry Fanny Pack</p>
    </div>
  );
}

export default ProductsMenu;
