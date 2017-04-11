import createReducer from '../../utils/create-reducer'
import {TRAIN} from '../../constants/actions'

const initialState = {
    loading: false,
    list: []
}

const actionHandlers = {
    /*
     * 生成活动列表
     * */
    [TRAIN.LIST]: (state, action) => {
        return {loading: false, list: action.list}
    },
    /*
     * 删除活动
     * */
    [TRAIN.DELETE]: (state, action) => {
        let list = [...state.list]
        list.splice(action.index, 1)
        return {loading: false, list: list}
    },
    /*
     * 更新或新增活动
     * */
    [TRAIN.UPDATE]: (state, action) => {
        let list = [...state.list]
        // 存在id就是更新
        if (action.operate == 'update') {
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == action.responseTrain.id) {
                    list[i] = action.responseTrain
                    break
                }
            }
        } else {
            list.unshift(action.responseTrain)
        }
        return {list: list}
    }
}

export default createReducer(initialState, actionHandlers)