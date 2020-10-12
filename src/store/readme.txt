App.js
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from './store/actions';

<input type="email" value={email} onChange={(e) => dispatch(Actions.EditEmail({email: e.target.value}))}/>

index.js
import Reducer from './store';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

const store = createStore(Reducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
