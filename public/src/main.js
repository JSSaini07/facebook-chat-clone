import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app.js'
import allReducers from './reducers/index.js';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxPromise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
let store = createStoreWithMiddleware(allReducers);

class AppContainer extends React.Component {
render(){
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={App}/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
}

ReactDOM.render(<AppContainer/>, document.getElementById('app'));
