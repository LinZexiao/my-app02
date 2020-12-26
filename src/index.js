import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import 'antd/dist/antd.css';

import reducers from './reducers'


let store = createStore(reducers)

let mapStatesToProps = (state) => {
  let curChecked = state.listSeleted.items.filter(item => item.check)
  let curUnchecked = state.listSeleted.items.filter(item => !item.check)

  return {
    data: state,
    currentList: state.listSeleted,
    currentItem: state.itemSelected,
    curChecked: curChecked,
    curUnchecked: curUnchecked,
  }
}

let AppContainer = connect(mapStatesToProps)(App)


ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
