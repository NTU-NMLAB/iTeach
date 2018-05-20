import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import PropTypes from 'prop-types'
import reducer from './src/reducers'
import RootNavigator from './src/navigator/RootNavigator'
import accountAction from './src/actions/account.action'
// import classMenu from './src/actions/classMenu'
import middlewares from './src/util/middlewares'
import mockData from './asset/mockData.json'

const addListener = createReduxBoundAddListener('root')
export const store = createStore(reducer, applyMiddleware(...middlewares))

const initStore = async () => {
  // Load data from local storage
  store.dispatch(mockData)
  store.dispatch(accountAction.get())
}

initStore()

const mapStateToProps = state => ({
  nav: state.nav,
})

class Root extends Component {
  render() {
    StatusBar.setBarStyle('light-content', true)
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
