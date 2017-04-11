/*用户action 名称常量*/
export const USER = {
    LOGIN: 'USER.LOGIN',
    LOGOUT: 'USER.LOGOUT',
    LIST: 'USER.LIST',
    DELETE: 'USER.DELETE',
    UPDATE: 'USER.UPDATE'
}

/*活动action 名称常量*/
export const ACTIVITY = {
    BEFORE: 'ACTIVITY.BEFORE', /*请求活动列表前*/
    RELEASE: 'ACTIVITY.RELEASE', /*发布活动*/
    LIST: 'ACTIVITY.LIST', /*活动列表*/
    DELETE: 'ACTIVITY.DELETE', /*删除活动*/
    UPDATE: 'ACTIVITY.UPDATE', /*更新活动，包含新增和更新*/
}

/*正念训练*/
export const TRAIN = {
    UPDATE: 'TRAIN.UPDATE',
    DELETE: 'TRAIN.DELETE',
    LIST: 'TRAIN.LIST'
}

/*能量规则*/
export const ENERGYRULE = {
    LIST: 'ENERGYRULE.LIST',
    DELETE: 'ENERGYRULE.DELETE',
    UPDATE: 'ENERGYRULE.UPDATE'
}

/*应用程序*/
export const APP = {
    TOGGLE:'APP.TOGGLE',
    FOLD: 'APP.FOLD', /*侧边栏折叠*/
    UNFOLD: 'APP.UNFOLD'/*侧边栏展开*/
}