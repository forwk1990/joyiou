import createReducer from '../../utils/create-reducer'
import {ENERGYRULE} from '../../constants/actions'

const initialState = {
    list: []
}

const actionHandlers = {
    /*
     * 生成活动列表
     * */
    [ENERGYRULE.LIST]: (state, action) => {
        return {loading: false, list: action.list}
    },
    /*
     * 删除活动
     * */
    [ENERGYRULE.DELETE]: (state, action) => {
        let list = [...state.list]
        list.splice(action.index, 1)
        return {loading: false, list: list}
    },
    /*
     * 更新或新增活动
     * */
    [ENERGYRULE.UPDATE]: (state, action) => {
        let list = [...state.list]
        // 存在id就是更新
        if (action.operate == 'update') { // modify
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == action.energyRule.id) {
                    list[i] = action.responseEnergyRule
                    break
                }
            }
        } else { // new
            list.unshift(action.responseEnergyRule)
        }
        return {list: list}
    }
}

export default createReducer(initialState, actionHandlers)