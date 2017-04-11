import createReducer from '../../utils/create-reducer'
import {APP} from '../../constants/actions.js'

const initialState = {
    isFold: false
}

const reducerHandlers = {
    [APP.FOLD]: () => {
        return {isFold: true}
    },
    [APP.UNFOLD]: () => {
        return {isFold: false}
    },
    [APP.TOGGLE]: (state) => {
        return {isFold: !state.isFold}
    }
}

export default createReducer(initialState, reducerHandlers)