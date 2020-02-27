import './App.css'
import React from 'react'
import {connect} from 'react-redux'

function App(props) {
  return (
    <div>

    </div>
  )
}
export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchToProps(dispatch) {
    return {dispatch}
  }
)(App)