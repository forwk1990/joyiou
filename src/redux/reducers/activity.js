import createReducer from '../../utils/create-reducer'
import {ACTIVITY} from '../../constants/actions'

const initialState = {
    loading: false,
    list: []
}

const actionHandlers = {
    /*
     * 发布活动
     * */
    [ACTIVITY.RELEASE]: (state, action) => {
        let list = [...state.list]
        if (list.length <= action.index)return state
        list[action.index].isRelease = action.isRelease
        return {loading: false, list: list}
    },
    /*
     * 处理活动相关信息前
     * */
    [ACTIVITY.BEFORE]: (state, action) => {
        return {loading: true}
    },
    /*
     * 生成活动列表
     * */
    [ACTIVITY.LIST]: (state, action) => {
        return {loading: false, list: action.list}
    },
    /*
     * 删除活动
     * */
    [ACTIVITY.DELETE]: (state, action) => {
        let list = [...state.list]
        list.splice(action.index, 1)
        return {loading: false, list: list}
    },
    /*
     * 更新或新增活动
     * */
    [ACTIVITY.UPDATE]: (state, action) => {
        let list = [...state.list]
        // 存在id就是更新
        if (action.operate == 'update') {
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == action.responseOfflineActivity.id) {
                    list[i] = action.responseOfflineActivity
                    break
                }
            }
        } else {
            list.unshift(action.responseOfflineActivity)
        }
        return {list: list}
    }
}

export default createReducer(initialState, actionHandlers)