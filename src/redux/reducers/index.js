import {combineReducers} from 'redux'
import user from './user'
import activity from './activity'
import application from './application'
import train from './train'
import energyRule from './energyRule'

const rootReducer = combineReducers({
    user,
    activity,
    train,
    application,
    energyRule
})

export default rootReducer