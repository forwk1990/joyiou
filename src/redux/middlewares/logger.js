
const logger = ({dispatch, getState}) => next => action => {
    __DEV__ && console.log('before dispatch - ', action.type);
    let result = next(action);
    __DEV__ && console.log('after dispatch - next state', getState());
    return result;
}
export default logger