import React, { Component } from 'react';
import { connect } from 'react-redux'

class PollsList extends Component {
  render() {
    console.log('this are the props >>>>polls<<<<<: ', this.props)
    return (
      <div className="App">
        PollsList
      </div>
    );
  }
}

function mapStateToProps ({ questions }) {
  return {
    questionsIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(PollsList);
