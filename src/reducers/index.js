import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import blockdata from '../reducers/block';
import result from '../reducers/result';

const root_reducer = combineReducers({
    blockdata: blockdata,
    result: result,
    routing: routerReducer
})

export default root_reducer;