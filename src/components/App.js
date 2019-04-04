import React, { Component } from 'react';
import Dashboard from './Dashboard'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    console.log('this are the props >>>>app<<<<<: ', this.props)
    return (
      <div className="App">
        <LoadingBar />
        {this.props.loading === true
          ? null
          : <div>
            <Dashboard />
          </div>}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)