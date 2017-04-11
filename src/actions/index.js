/**
 * Created by Itachi on 2017/2/21.
 */

import HttpChannel from '../channel'
import {USER, ACTIVITY, APP, TRAIN, ENERGYRULE} from '../constants/actions'
import {Message} from '../utils/utils'

/*
 * 登陆
 * @param username:String
 * @param password:String
 * */
const login = (username, password) => {
    let md5_password = md5(password)
    return (dispatch) => {
        Message.loading('正在为您登陆系统，请稍候...')
        return HttpChannel.login({username, password: md5_password})
            .then(function (user) {
                Message.close()
                dispatch({type: USER.LOGIN, user: user})
            }, function (error) {
                Message.close()
                Message.error(error.message)
            })
    }
}


const logout = () => {
    return (dispatch) => {
        Message.loading('正在为您安全退出，请稍候...')
        dispatch({type: USER.LOGOUT})
        Message.close()
    }
}

/*
 * 获取线下活动列表
 * */
const getOfflineActivityList = () => {
    return (dispatch) => {
        dispatch({type: ACTIVITY.BEFORE})
        return HttpChannel.offlineActivities({})
            .then(function (list) {
                console.log('offline list : ', list)
                dispatch({type: ACTIVITY.LIST, list: list})
            })
    }
}

/*
 * @param id:String 活动ID
 * @param userId:String 用户ID
 * @param indexOfList:Int 活动索引
 * */
const deleteOfflineActivity = (id, userId, indexOfList) => {
    return (dispatch) => {
        Message.loading('系统正在处理中，请耐心等候...')
        return HttpChannel.deleteActivity({id, userId})
            .then(function () {
                Message.close()
                dispatch({type: ACTIVITY.DELETE, index: indexOfList})
            }, function () {
                Message.error('哎呀，服务器好像没有反应了')
                Message.close()
            })
    }
}

/*
 * @param id:String 活动ID
 * @param userId:String 用户ID
 * @param isRelease:Bool 是否发布
 * @param indexOfList:Int 活动索引
 * */
const releaseOfflineActivity = (id, userId, isRelease, indexOfList) => {
    return (dispatch) => {
        Message.loading('系统正在处理中，请耐心等候...')
        return HttpChannel.releaseActivity({id, userId, isRelease: isRelease ? 1 : 0})
            .then(function () {
                Message.close()
                dispatch({type: ACTIVITY.RELEASE, index: indexOfList, isRelease})
            }, function () {
                Message.error('哎呀，服务器好像没有反应了')
                Message.close()
            })
    }
}

/*
 * 更新线下活动实体
 * @param offlineActivity:object 实体对象
 * */
const updateOfflineActivity = (offlineActivity) => {
    return (dispatch) => {
        Message.loading('系统正在处理中，请耐心等候...')
        return HttpChannel.updateActivity({...offlineActivity})
            .then(function (responseOfflineActivity) {
                Message.close()
                dispatch({
                    type: ACTIVITY.UPDATE,
                    responseOfflineActivity,
                    operate: !!offlineActivity.id ? 'update' : 'add'
                })
            }, function (error) {
                Message.close()
                Message.error(error.message)
            })
    }
}

/*切换侧边栏状态*/
const toggleSidebar = () => {
    return (dispatch) => {
        dispatch({type: APP.TOGGLE})
    }
}

/*
 * 获取所有训练项
 * */
const getTrains = () => {
    return (dispatch) => {
        return HttpChannel.getTrains({})
            .then(function (trains) {
                dispatch({
                    type: TRAIN.LIST,
                    list: trains
                })
            }, function (error) {
                Message.error(error.message)
            })
    }
}

/*
 * 获取能量规则
 * */
const getEnergyRules = () => {
    return (dispatch) => {
        return HttpChannel.energyRules({})
            .then(function (energyRules) {
                dispatch({
                    type: ENERGYRULE.LIST,
                    list: energyRules
                })
            }, function (error) {
                Message.error(error.message)
            })
    }
}

const getUsers = () => {
    return (dispatch) => {
        return HttpChannel.users({})
            .then(function (users) {
                dispatch({
                    type: USER.LIST,
                    list: users
                })
            }, function (error) {
                Message.error(error.message)
            })
    }
}

/*
 * 删除训练项
 * @param id:String 训练项ID
 * @param userId:String 用户ID (记录谁删除的)
 * @param indexOfList:Int 训练项索引
 * */
const deleteTrain = (id, userId, indexOfList) => {
    return (dispatch) => {
        Message.loading('系统正在处理中，请耐心等候...')
        return HttpChannel.deleteTrain({id, userId})
            .then(function () {
                Message.close()
                dispatch({type: TRAIN.DELETE, index: indexOfList})
            }, function () {
                Message.close()
                Message.error('哎呀，服务器好像没有反应了')
            })
    }
}


/*
 * 删除能量规则
 * */
const deleteEnergyRule = (id, userId, indexOfList) => {
    return (dispatch) => {
        Message.loading('系统正在处理中，请耐心等候...')
        return HttpChannel.deleteEnergyRule({id, userId})
            .then(function () {
                Message.close()
                dispatch({type: ENERGYRULE.DELETE, index: indexOfList})
            }, function () {
                Message.close()
                Message.error('哎呀，服务器好像没有反应了')
            })
    }
}

const deleteUser = (id, userId, indexOfList) => {
    return (dispatch) => {
        Message.loading('系统正在处理中，请耐心等候...')
        return HttpChannel.deleteUser({id, userId})
            .then(function () {
                Message.close()
                dispatch({type: USER.DELETE, index: indexOfList})
            }, function () {
                Message.close()
                Message.error('哎呀，服务器好像没有反应了')
            })
    }
}

const updateTrain = (train) => {
    return (dispatch) => {
        Message.loading('系统正在处理中，请耐心等候...')
        return HttpChannel.updateTrain({...train})
            .then(function (responseTrain) {
                Message.close()
                dispatch({
                    type: TRAIN.UPDATE,
                    responseTrain,
                    operate: !!train.id ? 'update' : 'add'
                })
            }, function (error) {
                Message.close()
                Message.error(error.message)
            })
    }
}

const updateUser = (user) => {
    return (dispatch) => {
        Message.loading('系统正在处理中，请耐心等候...')
        return HttpChannel.updateUser({...user})
            .then(function (responseUser) {
                Message.close()
                dispatch({
                    type: USER.UPDATE,
                    user,
                    responseUser,
                    operate: !!user.id ? 'update' : 'add'
                })
            }, function (error) {
                Message.close()
                Message.error(error.message)
            })
    }
}

const updateEnergyRule = (energyRule) => {
    return (dispatch) => {
        Message.loading('系统正在处理中，请耐心等候...')
        return HttpChannel.updateEnergyRule({...energyRule})
            .then(function (responseEnergyRule) {
                Message.close()
                dispatch({
                    type: ENERGYRULE.UPDATE,
                    energyRule,
                    responseEnergyRule,
                    operate: !!energyRule.id ? 'update' : 'add'
                })
            }, function (error) {
                Message.close()
                Message.error(error.message)
            })
    }
}


module.exports = {
    login,
    logout,
    toggleSidebar,
    getOfflineActivityList,
    deleteOfflineActivity,
    updateOfflineActivity,
    releaseOfflineActivity,
    getTrains,
    deleteTrain,
    updateTrain,
    getEnergyRules,
    updateEnergyRule,
    deleteEnergyRule,
    getUsers,
    updateUser,
    deleteUser
}