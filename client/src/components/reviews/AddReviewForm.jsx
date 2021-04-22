import React from 'react';
import AddStarRating from './AddStarRating.jsx';
import AddCharaRating from './AddCharaRating.jsx';

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starRating: 0,
      charaRatings: {},
      summary: '',
      body: ''
    }
    this.handleStar = this.handleStar.bind(this);
    this.handleRecommended = this.handleRecommended.bind(this);
    this.handleChara = this.handleChara.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleStar(starCount) {
    // When AddStarRating Component receives a click, it returns the star Count of the star.
    // 1-5
    this.setState({
      starRating: starCount
    })
  }

  handleRecommended(e) {
    this.setState({
      recommended: e.target.value
    })
  }

  handleChara(chara, rating) {
    // this.state.charaRating = {chara1: rating1, chara2: rating2, etc.}
    let currentRatings = this.state.charaRatings;
    currentRatings[chara] = rating;
    this.setState({
      charaRatings: currentRatings
    });
  }

  handleTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h2>Write Your Review</h2>
        <h3>About the {this.props.product.name}</h3>
        <AddStarRating starCount={this.state.starRating} handleClick = {this.handleStar}></AddStarRating>
        <p>Do you recommend product?</p>
        <div className='add-review recommended-form'>
          <input type='radio' name='recommend' value={true} id='add-review-recommended-yes' required='required' checked={this.state.recommended === 'true'} onChange={this.handleRecommended}></input>
          <label htmlFor='add-review-recommended-yes'>Yes</label>
          <input type='radio' name='recommend' value={false} id='add-review-recommended-no' required='required' checked={this.state.recommended === 'false'} onChange={this.handleRecommended}></input>
          <label htmlFor='add-review-recommended-no'>No</label>
        </div>
        <p>Characteristic Section</p>
        {this.props.characteristics.map((chara)=>{
          return <AddCharaRating key={chara} chara={chara} handleChara = {this.handleChara} charaRatings={this.state.charaRatings}/>;
        })}
        <span>Review Summary</span>
        <input name='summary' onChange={this.handleTextChange} type='text' placeholder='Example: Best purchase ever!' maxLength={60} value={this.state.summary}></input>
        <p>Review Body</p>
        <div className='add-review-body'>
          <textarea name='body' onChange={this.handleTextChange} placeholder='Why did you like the product or not?' maxLength={1000} minLength={50} value={this.state.body} required='required' cols={40} rows={5}></textarea>
          {(this.state.body.length < 50)
          ? <div>Minimum required characters left: {50 - this.state.body.length}</div>
          : <div>Minimum reached</div>}
        </div>
        <p>Upload photos</p>
        <p>nickname?</p>
        <p>email?</p>
        <p>Submit Button</p>
      </div>
    );
  }
}
export default AddReviewForm;