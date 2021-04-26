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
    this.deleteOutfit = this.deleteOutfit.bind(this);
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
    console.log('addToOutfit', this.state.outfits);
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

  deleteOutfit(outfit) {
    console.log('deleteOutfit');
    var outfitIndex = this.state.outfits.indexOf(outfit);
    console.log('outfitIndex', outfitIndex)
    this.state.outfits.splice(outfitIndex, 1);
    this.setState({
      outfits: this.state.outfits
    })
  }


  //   render() {
  //     if (this.state.outfits.length === 0) {
  //       return (
  //         <div>
  //           <h1>YOUR OUTFIT</h1>
  //           <a className="add-button" onClick={() => this.addToOutfit(this.props.currentProduct, this.props.averageRating, this.props.currentStylePhotos[0].thumbnail_url)}> Add Outfit+ </a>
  //         </div>
  //       )
  //     } else {
  //       return (
  //         <div>
  //           <h1>YOUR OUTFIT</h1>
  //           <a className="prev">&#10094;</a>

  //           <div className="outfit-container">

  //             <div className="outfits-card" >
  //               <img className="placeholder" src={this.props.previewImage}></img>
  //               <a className="add-button" onClick={() => this.addToOutfit(this.props.currentProduct, this.props.averageRating, this.props.currentStylePhotos[0].thumbnail_url)}> Add Outfit+ </a>
  //               <div className="cardInfo">
  //                 <div>{null}</div>
  //                 <div>{null}</div>
  //                 <div>{null}</div>
  //                 <div>{null}</div>
  //               </div>
  //             </div >

  //             {this.state.outfits.map(outfit => {
  //               return <MyOutfitCard
  //                 outfit={outfit} key={outfit.id} deleteOutfit={() => this.deleteOutfit(outfit)} />
  //             })}

  //           </div>

  //           <a className="next">&#10095;</a>
  //         </div>
  //       )

  //     }

  //   }
  // }


  render() {
    if (this.state.outfits.length === 0) {
      return (
        <div className='related-items'>
          <h1>YOUR OUTFIT</h1>
          <a className="add-button" onClick={() => this.addToOutfit(this.props.currentProduct, this.props.averageRating, this.props.currentStylePhotos[0].thumbnail_url)}> Add Outfit+ </a>
        </div>
      )
    } else {
      return (
        <div className='related-items'>
          <h1>YOUR OUTFIT</h1>
          <a className="prev">&#10094;</a>
          <div className="column">
            <div className="outfits-card" >
              <img className="placeholder" src={this.props.previewImage}></img>
              <a className="add-button" onClick={() => this.addToOutfit(this.props.currentProduct, this.props.averageRating, this.props.currentStylePhotos[0].thumbnail_url)}> Add Outfit+ </a>
              <div className="cardInfo">
                <div>{null}</div>
                <div>{null}</div>
                <div>{null}</div>
                <div>{null}</div>
              </div>
            </div >
          </div>

          {this.state.outfits.map(outfit => {
            return <MyOutfitCard
              outfit={outfit} key={outfit.id} deleteOutfit={() => this.deleteOutfit(outfit)} />
          })}
          <a className="next">&#10095;</a>
        </div>
      )
    }
  }
}


export default MyOutfit;