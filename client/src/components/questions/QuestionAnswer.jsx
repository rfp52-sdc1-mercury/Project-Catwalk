import React from 'react';
import QuestionAnswerUser from './QuestionAnswerUser.jsx'
import QuestionAnswerHelpfulness from './QuestionAnswerHelpfulness.jsx'
import moment from 'moment';
moment().format();

class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {answer} = this.props;
    // const {answerer_name: user} = answer;
    console.log(answer.date)
    return (
      <div className="answers">
      <p>
        {answer.body}
      </p>
      <div className="userHelpfulness">
      <QuestionAnswerUser answer={answer} />
      <p>{moment(answer.date).format('MMMM Do YYYY')}</p>
      <QuestionAnswerHelpfulness />
      </div>
      </div>
    )
  }
}

export default QuestionAnswer;