import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { addNavigationHelpers } from 'react-navigation'
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import PropTypes from 'prop-types'
import reducer from './src/reducers'
import RootNavigator from './src/navigator/RootNavigator'

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
)
const addListener = createReduxBoundAddListener('root')
const store = createStore(reducer, applyMiddleware(middleware))

const mapStateToProps = state => ({
  nav: state.nav,
})

class Root extends Component {
  render() {
    return (
      <RootNavigator navigation={ addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      }) } />
    )
  }
}

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
}

const RootWithNavigation = connect(mapStateToProps)(Root)

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <RootWithNavigation />
      </Provider>
    )
  }
}
