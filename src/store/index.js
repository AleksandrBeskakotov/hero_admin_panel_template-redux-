import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import filtersReducer from '../reducers/filters';
import heroesReducer from '../reducers/heroes';


const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
}

// Расширения стора - функции dispatch методом enhancer
/* 
const enhancer = (createStore) => (...args) => {

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action);
    }
    return store;
} */

const store = createStore(
                combineReducers({filtersReducer, heroesReducer}), 
                compose(
                    applyMiddleware(ReduxThunk, stringMiddleware),
                    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;

