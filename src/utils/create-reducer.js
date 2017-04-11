/**
 * Created by Itachi on 2017/2/10.
 */

const createReducer = (initialState, reducerHandlers) => {
    return function (state = initialState, action) {
        const reducerHandler = reducerHandlers[action.type]
        if (!reducerHandler || typeof reducerHandler !== "function") return state
        let overrideState = reducerHandler(state, action)
        if (!overrideState) overrideState = initialState
        // make it like Object.assign({},...) eg.
        return {...state, ...overrideState}
    }
}

export default createReducer