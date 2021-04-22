import React from 'react';
import StarsDisplay from './StarsDisplay.jsx';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className = "product-info">
        <h1 id = "title"> {this.props.currentProduct.name}</h1>
        <div id = "price">
        {this.props.currentStyle.sale_price ? <div className = "original-price-strikethrough">{'$'+this.props.currentStyle.original_price}</div> : <div className = "original-price">{'$'+this.props.currentStyle.original_price}</div>} {this.props.currentStyle.sale_price && <div className = "sale-price">{'$'+this.props.currentStyle.sale_price}</div>}
        </div>
        <div id = "rating"><b>Rating:</b> <StarsDisplay stars = {this.props.rating} key = {this.props.rating}/> {/*this.props.rating*/} (Read all reviews)</div>

        <div id = "category"><b>Category:</b> {this.props.currentProduct.category}</div>
        {/* <div id = "product-info-2">
          <div id = "product-overview">Product Overview: {this.props.currentProduct.description}</div>
          <div id = "product-features">
          {this.props.currentProductFeatures.map((feature) => {
          return (
            <div className = "feature">
              {feature.feature}: {feature.value}
            </div>
          )
        })}
          </div>
        </div> */}
        {/* {JSON.stringify(this.props.currentProduct.features)} */}

        <div id = "socials">
        <b>Share:</b> FACEBOOK     TWITTER     PINTEREST
        </div>
      </div>
    )
  }
}

export default ProductInfo;