import React from 'react';
import axios from 'axios';
import API_KEY from './../../config.js';
import MyOutfitCard from './MyOutfitCard.jsx';

class MyOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [],
      previewImage: '',
      averageRating: ''
    }
    this.addToOutfit = this.addToOutfit.bind(this);
    this.getOutfitImage = this.getOutfitImage.bind(this);
    this.getOutfitRating = this.getOutfitRating.bind(this);
  }

  componentDidMount() {
    this.getOutfitImage(this.props.currentProductId)
    this.getOutfitRating(this.props.currentProductId)
  }

  getOutfitImage(id) {
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

  getOutfitRating(id) {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta',
      headers: { 'Authorization': API_KEY },
      params: {
        product_id: this.props.currentProductId
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

  addToOutfit(product, rating, photo) {
    // event.preventDefault();
    console.log('addToOutfit button clicked');
    var outfitExists = false;
    for (var i = 0; i < this.state.outfits.length; i++) {
      if (this.state.outfits[i].product.id === product.id) {
        outfitExists = true;
        break;
      }
    }
    if (outfitExists === false) {
      let outfitObj = { product: product, rating: rating, photo: photo };
      let outfits = this.state.outfits;
      outfits.push(outfitObj);
      this.setState({
        outfits: outfits
      })
    }
  }


  render() {
    if (this.state.outfits.length === 0) {
      return (
        <div>
          <h1>YOUR OUTFIT</h1>
          <button onClick={() => this.addToOutfit(this.props.currentProduct, this.props.averageRating, this.props.currentStylePhotos[0].thumbnail_url)}> +Add to Outfit+ </button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>YOUR OUTFIT</h1>
          <button onClick={() => this.addToOutfit(this.props.currentProduct, this.props.averageRating, this.props.currentStylePhotos[0].thumbnail_url)}> +Add to Outfit+ </button>

          {this.state.outfits.map(outfit => {
            return <MyOutfitCard
              outfit={outfit} />
          })}
        </div>
      )

    }

  }
}

export default MyOutfit;