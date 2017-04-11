/*
 * 接口地址
 * */
import paths from '../constants/paths'

let address = {
    modules: () => {
        return [
            {
                "id": '1',
                'name': '正念训练',
                url: paths.trains,
                'items': [
                    {
                        'name': '正念训练项',
                        'icon': 'znxl',
                        url: paths.trains
                    }
                ]
            },
            {
                "id": '2',
                'name': '线下活动',
                url: paths.offlineActivities,
                'items': [
                    {
                        'name': '线下活动项',
                        'icon': 'xyhd',
                        url: paths.offlineActivities
                    }
                ]
            },
            {
                "id": '4',
                'name': '会员管理',
                url: paths.vips,
                'items': [
                    {
                        'name': '会员管理项',
                        'icon': 'hygl',
                        url: paths.vips
                    }
                ]
            },
            {
                "id": '2',
                'name': '能量管理',
                url: paths.energyRules,
                'items': [
                    {
                        'name': '能量规则',
                        'icon': 'nlgz',
                        url: paths.energyRules
                    },
                    {
                        'name': '能量排名',
                        'icon': 'nlpm',
                        url: paths.energyRange
                    }
                ]
            },
            {
                "id": '2',
                'name': '职级管理',
                url: paths.users,
                'items': [
                    {
                        'name': '职级管理项',
                        'icon': 'zjgl',
                        url: paths.users
                    }
                ]
            },
            /*["s_m_s_z"]: {
             "id": '3', 'name': '生命数字', 'items': [
             {'name': '生命数字项', 'icon': 'smsz'}
             ]
             },
             ["n_l_g_l"]: {
             "id": '2', 'name': '能量管理', 'items': [
             {'name': '能量规则', 'icon': 'nlgz'},
             {'name': '能量排名', 'icon': 'nlpm'}
             ]
             },*/
            /*["j_z_g_l"]: {
             "id": '2', 'name': '捐赠管理', 'items': [
             {'name': '捐赠管理项', 'icon': 'jzgl'}
             ]
             },
             ["w_j_f_k"]: {
             "id": '2', 'name': '问卷反馈', 'items': [
             {'name': '问卷反馈项', 'icon': 'wjfk'}
             ]
             },*/
            /*["z_j_g_l"]: {
             "id": '2', 'name': '职级管理', 'items': [
             {'name': '职级管理项', 'icon': 'zjgl'}
             ]
             }*/
        ]
    },
    offlineActivities: ['CheckInServer', 'getOfflineActivities'],
    fileUpload: `http://${__SERVER_URL__}/services/UploadData`,
    importExcel: `http://${__SERVER_URL__}/services/ImpExcelServlet`,
    exportExcel: `http://${__SERVER_URL__}/services/ExcelServlet`,
    updateActivity: ['CheckInServer', 'updateActivity'],
    modifyActivityRelease: ['CheckInServer', 'releaseActivity'],
    deleteActivity: ['CheckInServer', 'delActivity'],
    releaseActivity: ['CheckInServer', 'releaseActivity'],
    login: ['MaintenanceServer', 'login'],
    users: ['MaintenanceServer', 'getUsers'], /*获取职级用户*/
    updateUser: ['MaintenanceServer', 'updateUser'], /*更新职级用户*/
    deleteUser: ['MaintenanceServer', 'deleteUser'], /*删除职级用户*/
    getTrains: ['MaintenanceServer', 'getTrains'],
    vips: ['UserServer', 'getMemberInfoList'],
    offlineActivityDetail: ['CheckInServer', 'getOfflineActivityDetail'],
    updateTrain: ['MaintenanceServer', 'updateTrain'], /*更新或新建训练项*/
    deleteTrain: ['MaintenanceServer', 'deleteTrain'], /*删除训练项*/
    energyRange: ['IntegralServer', 'getEnergyRange'], /*获取能量排名*/
    energyRules: ['IntegralServer', 'getEnergyRules'], /*获取能量规则*/
    deleteEnergyRule: ['IntegralServer', 'deleteEnergyRule'], /*删除能量规则*/
    updateEnergyRule: ['IntegralServer', 'updateEnergyRule'], /*更新能量规则*/
    energyProjects: ['IntegralServer', 'getEnergyProjects'], /*获取需要计算能量项目*/
    getAllEnergy: ['IntegralServer', 'getAllEnergy'], /*获取用户所有能量*/
    getEnergyByType: ['IntegralServer', 'getEnergyByType'], /*获取指定类型的能量*/
}


/*定义地址转换函数*/
Object.defineProperty(address, "translate", {
    enumerable: false,
    get: () => (serviceName, interfaceName) => `http://${__SERVER_URL__}/services/${serviceName}/${interfaceName}`
})


/*重新定义地址*/
Object.keys(address).map(function (key) {
    const value = address[key]
    if (typeof value === 'function') {
        address[key] = {"isJson": true, "value": value()}
    } else if (typeof value === 'string' || typeof value === 'String') {
        // 保留
    } else {
        address[key] = address.translate(value[0], value[1])
    }
})

export default address