import React from 'react';
import Gallery from './Gallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import Checkout from './Checkout.jsx';
import axios from 'axios';
import API_KEY from '../config.js'


class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  render() {
    return (
      <div id = "overview">
      {/* {console.log(this.props.currentProduct)} */}
      <Gallery currentStylePhotos = {this.props.currentStylePhotos}/>
      <ProductInfo currentProduct = {this.props.currentProductFull} currentStyle = {this.props.currentStyle} rating = {this.props.averageRating} currentProductFeatures = {this.props.currentProductFeatures}/>
      <StyleSelector styles = {this.props.styles} currentStyle = {this.props.currentStyle} setStyle = {this.props.setStyle} currentStyleIndex = {this.props.currentStyleIndex}/>
      <Checkout currentStyleSkus = {this.props.currentStyleSkus} currentStyleSkusObj = {this.props.currentStyleSkusObj} currentStyleTotalQuantity = {this.props.currentStyleTotalQuantity}/>
      </div>

    )
  }
}

export default Overview;