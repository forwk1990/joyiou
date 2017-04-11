/*
 * 用户登录
 * @param username:String 用户名
 * @param password:String 密码(md5格式)
 * */
Mock.mock(address.login, {
    'status': 0,
    'message': '用户名或密码错误',
    'data': {
        id: 'b9a15313-1FFB-c879-B2f2-66E1AFBc10D5',
        username: 'Uchiha Itachi',
        modules: [
            {
                'id': '1', /*模块ID*/
                'name': '正念训练',
                'allowVisit': 0,
                'permission': '1', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '2', /*模块ID*/
                'name': '线下活动',
                'allowVisit': 0,
                'permission': '1', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '3', /*模块ID*/
                'name': '生命数字',
                'allowVisit': 0,
                'permission': '1', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '4', /*模块ID*/
                'name': '会员管理',
                'allowVisit': 0,
                'permission': '1', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '5', /*模块ID*/
                'name': '能量管理',
                'allowVisit': 0,
                'permission': '1', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '6', /*模块ID*/
                'name': '捐赠管理',
                'allowVisit': 0,
                'permission': '1', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '7', /*模块ID*/
                'name': '问卷反馈',
                'allowVisit': 0,
                'permission': '1', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '8', /*模块ID*/
                'name': '职级管理',
                'allowVisit': 0,
                'permission': '1', /*权限：1、仅仅查看 2、可编辑*/
            }
        ]
    }
})

/*
 * 获取所有的后台管理用户
 * @no-param
 * */
Mock.mock(address.users, {
    'status': 0,
    'data': [
        {
            'id': 'b9a15313-1FFB-c879-B2f2-66E1AFBc10D5', /*用户ID*/
            'rankId': '1', /*职级类别ID*/
            'rankName': '超级管理员', /*职级类别名称*/
            'username': 'zzx',
            'password': '123456', /*md5格式*/
            'phone': '13476116543',
            'wxVerify': 1,
            'modules': [
                {
                    'id': '1', /*模块ID*/
                    'name': '正念训练',
                    'allowVisit': 0,
                    'permission': '1', /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '2', /*模块ID*/
                    'name': '线下活动',
                    'allowVisit': 0,
                    'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '3', /*模块ID*/
                    'name': '生命数字',
                    'allowVisit': 0,
                    'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '4', /*模块ID*/
                    'name': '会员管理',
                    'allowVisit': 0,
                    'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '5', /*模块ID*/
                    'name': '能量管理',
                    'allowVisit': 0,
                    'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '6', /*模块ID*/
                    'name': '捐赠管理',
                    'allowVisit': 0,
                    'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '7', /*模块ID*/
                    'name': '问卷反馈',
                    'allowVisit': 0,
                    'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '8', /*模块ID*/
                    'name': '职级管理',
                    'allowVisit': 0,
                    'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
                }
            ]
        }
    ]
})

/*
 * 删除管理用户
 * @param id:String (被删除的用户ID)
 * @param userId:String (当前操作用户ID)
 * */
Mock.mock(address.deleteUser, {
    'status': 0,
    'message': '服务器500'
})


/*
 * 更新管理用户
 * @param id:String 用户ID (null->新建)
 * @param rankId:String 职级类别ID
 * @param username:String 用户名称
 * @param password:String 用户登陆密码
 * @param phone:String 用户手机号
 * @param wxVerify:Int 是否开启微信验证
 * @param modules:[] 权限组
 * */
Mock.mock(address.updateUser, {
    'status': 0,
    'data': {
        'id': 'b9a15313-1FFB-c879-B2f2-66E1AFBc10D5',
        'rankId': '1',
        'rankName': '超级管理员',
        'username': 'zzx',
        'password': '123456', /*md5格式*/
        'phone': '13476116543',
        'wxVerify': 1,
        'modules': [
            {
                'id': '1', /*模块ID*/
                'name': '正念训练',
                'allowVisit': 0,
                'permission': '1', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '2', /*模块ID*/
                'name': '线下活动',
                'allowVisit': 0,
                'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '3', /*模块ID*/
                'name': '生命数字',
                'allowVisit': 0,
                'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '4', /*模块ID*/
                'name': '会员管理',
                'allowVisit': 0,
                'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '5', /*模块ID*/
                'name': '能量管理',
                'allowVisit': 0,
                'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '6', /*模块ID*/
                'name': '捐赠管理',
                'allowVisit': 0,
                'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '7', /*模块ID*/
                'name': '问卷反馈',
                'allowVisit': 0,
                'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '8', /*模块ID*/
                'name': '职级管理',
                'allowVisit': 0,
                'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
            }
        ]
    }
})


/*
 * 获取需要计算能量的项目
 * @no-param
 * */
Mock.mock(address.energyProjects, {
    'status': 0,
    'data': [
        {
            id: 'b9a15313-1FFB-c879-B2f2-66E1AFBc10D5',
            name: '喜悦捐赠'
        },
        {
            id: 'c9a15313-1FFB-c879-B2f2-66E1AFBc10D5',
            name: '线下活动'
        },
        {
            id: 'd9a15313-1FFB-c879-B2f2-66E1AFBc10D5',
            name: '正念睡眠'
        }
    ]
})

/*
 * 获取能量规则
 * @no-param
 * */
Mock.mock(address.energyRules, {
    'status': 0,
    'data': [
        {
            'id': 'b9a15313-1FFB-c879-B2f2-66E1AFBc10D5',
            'projectId': '1',
            'projectName': '正念静坐',
            'value': 5,
            'isActive': 1
        }
    ]
})

/*
 * @param id:String 规则ID
 * @param userId:String 用户ID
 * */
Mock.mock(address.deleteEnergyRule, {
    'status': 0,
    'data': {}
})

/*
 * 更新能量规则,新建、编辑、发布都可以使用这个接口
 * @param id:String 能量规则ID (备注：如果为空就是新建)
 * @param name:String 能量规则名称
 * @param value:Int 能量规则值
 * @param isActive:Int 是否开启
 */
Mock.mock(address.updateEnergyRule, {
    'status': 0,
    'data': {
        'id': 'b9a15313-1FFB-c879-B2f2-66E1AFBc10D5',
        'projectId': 'aaf5313-1FeB-c849-Bcf2-66E1AFBc10D5',
        'projectName': '正念静坐',
        'value': 5,
        'isActive': 0
    }
})

/*
 * 获取能量排名
 * @param pageSize:Int 页数
 * @param pageIndex:Int 第几页
 * @param searchKey:String 搜索关键字
 * @param ascendingKey:String 升序排序字段
 * @param descendingKey:String 降序排序字段
 * */
Mock.mock(address.energyRange, {
    'status': 0,
    'data': {
        'totalPages': 10,
        'items': [
            {
                userId: 'b9a15313-1FFB-c879-B2f2-66E1AFBc10D5', /*用户ID*/
                range: 1, /*能量排名*/
                nickname: '会飞的哈士奇',
                name: 'hello',
                phone: '18674031166',
                trainEnergy: 10, /*训练能量*/
                activityEnergy: 20, /*活动能量*/
                lifeNumberEnergy: 15, /*生命数字*/
                donateEnergy: 50,
                totalEnergy: 95,
                userLevel: 1
            }
        ]
    }
})

/*
 * 获取正念训练项
 * @noparam
 * */
Mock.mock(address.getTrains, {
    'status': 0,
    'data': [
        {
            id: 'b9a15313-1FFB-c879-B2f2-66E1AFBc10D5',
            title: '正念午休1', /*为空就是不存在*/
            desc: '午休半小时 精神一整天',
            isDescChecked: true,
            imageUrl: "http://p8.qhimg.com/t019277942e2ab9709c.jpg",
            text: '<span style="color:red;">爱我中华</span>',
            isTextChecked: true,
            music: 'www.baidu.com',
            isMusicChecked: true,
            alarm: 'www.baidu.com',
            isAlarmChecked: true,
            video: 'www.baidu.com',
            isVideoChecked: true
        },
        {
            id: 'b9a15313-1FFB-c879-B2f2-66E1AFBc10D5',
            title: '正念午休2', /*为空就是不存在*/
            desc: '午休半小时 精神一整天',
            isDescChecked: true,
            imageUrl: "http://p8.qhimg.com/t019277942e2ab9709c.jpg",
            text: '',
            isTextChecked: false,
            music: 'www.baidu.com',
            isMusicChecked: true,
            alarm: 'www.baidu.com',
            isAlarmChecked: false,
            video: 'www.baidu.com',
            isVideoChecked: true
        },
        {
            id: 'b9a15313-1FFB-c879-B2f2-66E1AFBc10D5',
            title: '正念午休3', /*为空就是不存在*/
            desc: '午休半小时 精神一整天',
            isDescChecked: true,
            imageUrl: "http://p8.qhimg.com/t019277942e2ab9709c.jpg",
            text: '',
            isTextChecked: false,
            music: 'www.baidu.com',
            isMusicChecked: true,
            alarm: 'www.baidu.com',
            isAlarmChecked: false,
            video: 'www.baidu.com',
            isVideoChecked: true
        }
    ]
})

/*
 *  更新训练项,包含新建和更新
 *  成功后统一返回训练项实体信息
 *  参数与返回字段相同,id为null表示新建
 * */
Mock.mock(address.updateTrain, {
    'status': 0,
    'data': {
        id: "b9a15313-1FFB-c879-B2f2-66E1AFBc10D5",
        title: '正念午休', /*为空就是不存在*/
        desc: '午休半小时 精神一整天',
        isDescChecked: true,
        imageUrl: "http://p8.qhimg.com/t019277942e2ab9709c.jpg",
        text: '<span style="color:red;">学习学习</span>',
        isTextChecked: true,
        music: 'http://www.oss.com/正念训练.mp3',
        isMusicChecked: true,
        alarm: 'http://www.oss.com/闹钟.mp3',
        isAlarmChecked: true,
        video: 'http://www.oss.com/巡展.avi',
        isVideoChecked: true
    }
})

/*
 * 删除训练项
 * @param id:String 训练项ID
 * @param userId:String 用户ID (记录谁删除的)
 * */
Mock.mock(address.deleteTrain, {
    'status': 0,
    'data': {}
})

/*
 * 获取指定类型的能量
 * @param type:Int (1:线下活动 2：生命数字 3：正念训练 4：捐赠能量)
 * @param userId:String 用户ID
 * */
Mock.mock(address.getEnergyByType, {
    'status': 0,
    'data': [
        {
            'name': '正念睡眠',
            'date': '2017-03-16 09:52',
            'energy': 5
        },
        {
            'name': '慈经',
            'date': '2017-01-16 09:52',
            'energy': 8
        }
    ]
})

/*
 * 获取用户所有能量
 * @param userId:String 用户ID
 * */
Mock.mock(address.getAllEnergy, {
    'status': 0,
    'data': [
        {
            'name': '正念睡眠',
            'date': '2017-03-16 09:52',
            'energy': 5
        },
        {
            'name': '慈经',
            'date': '2017-01-16 09:52',
            'energy': 8
        }
    ]
})