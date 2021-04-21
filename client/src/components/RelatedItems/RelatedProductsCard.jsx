import React from 'react';
import API_KEY from './../../config.js';
import axios from 'axios';
import StarsDisplay from '../StarsDisplay.jsx';

class RelatedProductsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: [],
      averageRating: 0
    }
    this.getRelatedProductsImage = this.getRelatedProductsImage.bind(this);
    this.getRelatedProductsRating = this.getRelatedProductsRating.bind(this);
  }

  componentDidMount() {
    this.getRelatedProductsImage(this.props.relatedProduct.id);
    this.getRelatedProductsRating(this.props.relatedProduct.id)
  }

  getRelatedProductsImage(id) {
    axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
      headers: { 'Authorization': API_KEY }
    })
      .then(response => {
        // console.log('response', response);
        this.setState({
          previewImage: response.data.results[0].photos[0].thumbnail_url
        });
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  getRelatedProductsRating(id) {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta',
      headers: { 'Authorization': API_KEY },
      params: {
        product_id: this.props.relatedProduct.id
      }
    })
      .then(response => {
        var ratings = response.data.ratings
        // console.log('response data ratings', response.data);
        var ratingKeys = Object.keys(response.data.ratings);
        var sum = 0;
        var divisor = 0;
        for (var i = 0; i < ratingKeys.length; i++) {
          var rating = Number(ratingKeys[i]);

          sum = sum + (rating * ratings[rating]);
          divisor = divisor + Number(ratings[rating]);
        }

        this.setState({
          averageRating: sum / divisor
        });
      })
      .catch((err) => {
        console.error(err.message);
      })

  }

  render() {
    let emptyStar = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.28347 1.54595C5.57692 0.951356 6.42479 0.951358 6.71825 1.54595L7.82997 3.79856L10.3159 4.15979C10.9721 4.25513 11.2341 5.06151 10.7592 5.52434L8.96043 7.27775L9.38507 9.75361C9.49716 10.4071 8.81122 10.9055 8.22431 10.597L6.00086 9.42801L3.7774 10.597C3.19049 10.9055 2.50455 10.4071 2.61664 9.75361L3.04128 7.27775L1.24246 5.52434C0.767651 5.06151 1.02966 4.25513 1.68584 4.15979L4.17174 3.79856L5.28347 1.54595ZM6.00086 2.35192L5.02194 4.33542C4.90541 4.57153 4.68016 4.73519 4.41959 4.77305L2.23067 5.09112L3.81459 6.63506C4.00313 6.81885 4.08917 7.08365 4.04466 7.34316L3.67075 9.52324L5.62858 8.49395C5.86164 8.37142 6.14007 8.37142 6.37313 8.49395L8.33096 9.52324L7.95705 7.34317C7.91254 7.08365 7.99858 6.81885 8.18713 6.63506L9.77105 5.09112L7.58212 4.77305C7.32156 4.73519 7.0963 4.57153 6.97977 4.33542L6.00086 2.35192Z" fill="#212121" />
    </svg>;

    return (
    <div class="column">
      <div className="related-products-card" onClick={this.props.handleCardClick}>
        <div className="star-button" onClick={this.props.handleStarClick}>{emptyStar}</div>
        <img class="hover-shadow cursor" src={this.state.previewImage}></img>
        <div class="cardInfo">
          <div>{this.props.relatedProduct.category}</div>
          <div> {this.props.relatedProduct.name}</div>
          <div>{this.props.relatedProduct.default_price}</div>
          <div><StarsDisplay stars={this.state.averageRating} key={this.state.averageRating} /></div>
        </div>
      </div >
    </div>
    )

  }
}

export default RelatedProductsCard;