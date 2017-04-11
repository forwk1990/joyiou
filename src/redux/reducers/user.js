import createReducer from '../../utils/create-reducer'
import {USER} from '../../constants/actions.js'


const initialState = {
    id: null,
    username: null,
    list: [],
    modules: []
}

const reducerHandlers = {
    [USER.LOGIN]: (state, action) => {
        return action.user
    },
    [USER.LOGOUT]: () => {
        return null
    },
    /*
     * 生成活动列表
     * */
    [USER.LIST]: (state, action) => {
        return {list: action.list}
    },
    /*
     * 删除活动
     * */
    [USER.DELETE]: (state, action) => {
        let list = [...state.list]
        list.splice(action.index, 1)
        return {list: list}
    },
    /*
     * 更新或新增活动
     * */
    [USER.UPDATE]: (state, action) => {
        let list = [...state.list]
        // 存在id就是更新
        if (action.operate == 'update') { // modify
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == action.user.id) {
                    list[i] = action.responseUser
                    break
                }
            }
        } else { // new
            list.unshift(action.responseUser)
        }
        return {list: list}
    }
}

export default createReducer(initialState, reducerHandlers)