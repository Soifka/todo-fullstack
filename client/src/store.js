import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware);

const store = createStore(reducer, enhancer);

/* можно прописать так -->
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);
*/

sagaMiddleware.run(rootSaga); // saga это по сути requesrListener


export default store;