/**
 * Created by Itachi on 2017/2/13.
 */

var Mock = require("mockjs")
var address = require("./address.js").default

/*配置请求等待时间*/
Mock.setup({timeout: '800-1000'})


/*
 * 获取指定类型的能量
 * @param type:Int (1:线下活动 2：生命数字 3：正念训练 4：捐赠能量)
 * @param userId:String 用户ID
 * */
Mock.mock(address.getEnergyByType, {
    'status': 0,
    'data|0': [
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
    'data|3-20': [
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
 * 获取正念训练项
 * @noparam
 * */
Mock.mock(address.getTrains, {
    "status": "0",
    "data": [
        {
            "id": "1",
            "title": "正念静坐",
            "desc": "深度休息 恢复精力",
            "isDescChecked": true,
            "imageUrl": "http://joyiou.oss-cn-shanghai.aliyuncs.com/userimage/%E5%8D%88%E4%BC%91%E8%83%8C%E6%99%AF%E5%9B%BE.png",
            "text": "<b>正念静坐，一种智慧生活方式</b><p>\n\n正念是什么：正念是以不迎接不拒绝的方式将注意力集中于当下体验，是一种灵活的意识状态，它包括以开放和接纳的态度去关注并觉知个人的内在和外在世界 。</p><p><br></p><p>正念不会让你的生活匆匆滑过，而是意味着活在当下。&nbsp;\n</p><p><br></p><p>有多少宝宝都有这样的体验：&nbsp;</p><p>1.\t早上起不来，硬爬起来还是很困很累。&nbsp;</p><p>2.\t一开会就打哈欠，老板讲得欢你哈欠打得欢。&nbsp;</p><p>3.\t下午没精打采，但临近下班突然精神了，开始加班加点完成工作。&nbsp;</p><p>4.\t好不容易加班完成工作，一看已经9点半了，回到家10点半，越发精神了。</p><p>5.\t刷刷微信看看视频，居然又过了12点了。&nbsp;</p><p><br></p><p>宝宝累啊，可我们会休息吗？？？\n\n别急，喜宝送福利来了！\n找一个安静的地方坐下来，放松......\n\n宝宝又发现午休睡不着了？越睡越困？\n“糟糕，我怎么不会睡觉了？”“怎么脑子停不下来，想睡睡不着呢”“晚上没睡好，怎么中午还睡不好”\n\n喜宝有办法：\n《黄帝内经》云:“午”时（11点至13点）是人体经气合阳之时，最利于最利于养阳，阳气是健康的第一要义，是必养之气。午时休息30分钟即可完成阳气的聚合。这段时间聚养的阳气可确保人在未时至戊至之间（14点至20点），精神矍铄，身体轻快，头脑敏捷。将午睡与夜间的睡眠提到了同等重要的地位，这是非常符合“天人相应”理论的一种智慧生活方式。\n\n正念午休，用正念静坐的方法将本就属于您的轻松与活力归还于您。一个小技巧，放松与平静，你就成功了一半。让睡眠自己来找你。闭目养神是最高境界。\n\n正念静坐，一种智慧生活方式\n\n有多少宝宝都有这样的体验：\n1.\t早上起不来，硬爬起来还是很困很累。\n2.\t一开会就打哈欠，老板讲得欢你哈欠打得欢。\n3.\t下午没精打采，但临近下班突然精神了，开始加班加点完成工作。\n4.\t好不容易加班完成工作，一看已经9点半了，回到家10点半，越发精神了。5.\t刷刷微信看看视频，居然又过了12点了。\n宝宝累啊，可我们会休息吗？？？\n\n别急，喜宝送福利来了！\n找一个安静的地方坐下来，放松......\n\n宝宝又发现午休睡不着了？越睡越困？\n“糟糕，我怎么不会睡觉了？”“怎么脑子停不下来，想睡睡不着呢”“晚上没睡好，怎么中午还睡不好”\n\n喜宝有办法：\n《黄帝内经》云:“午”时（11点至13点）是人体经气合阳之时，最利于最利于养阳，阳气是健康的第一要义，是必养之气。午时休息30分钟即可完成阳气的聚合。这段时间聚养的阳气可确保人在未时至戊至之间（14点至20点），精神矍铄，身体轻快，头脑敏捷。将午睡与夜间的睡眠提到了同等重要的地位，这是非常符合“天人相应”理论的一种智慧生活方式。\n\n正念午休，用正念静坐的方法将本就属于您的轻松与活力归还于您。一个小技巧，放松与平静，你就成功了一半。让睡眠自己来找你。闭目养神是最高境界。\n</p>",
            "isTextChecked": false,
            "music": "http://joyiou.oss-cn-shanghai.aliyuncs.com/mp3/%E5%9D%90-%E6%89%8B%E6%9C%BA%E7%89%88.mp3",
            "isMusicChecked": true,
            "isAlarmChecked": false,
            "isVideoChecked": false
        },
        {
            "id": "2",
            "title": "正念行走",
            "desc": "放松身心 连接自然",
            "isDescChecked": true,
            "imageUrl": "http://joyiou.oss-cn-shanghai.aliyuncs.com/userimage/%E8%A1%8C%E8%B5%B0%E5%9B%BE.png",
            "text": "正念行走，身<i>心合一\n\n正念是什么</i>：正念是以不迎接不拒绝的方式将注意力集中于当下体验，是一种灵活的意识状态，它包括以开放和接纳的态度去关注并觉知个人的内在和外在世界 。正念不会让你的生活匆匆滑过，而是意味着活在当下。\n\n关于正念的各项练习，喜宝同学翻阅了大量的资料，力求让更多的人体验生命的喜悦。（喜宝好上进）\n科学家说了（此段较枯燥）:大脑和身体注定是密不可分的,目前的研究表明大脑与身体之间通过神经通路以及心脏、内脏和结缔组织（connective tissues）中的神经递质建立起直接联系。大脑通过肠神经系统（enteric nervous system）蔓延到身体各处。肠神经系统由近1亿个神经元组成。《情绪分子学：身心医疗的科学基础》一书的作者及药理学家坎迪斯B．珀特（Candace B. Pert）博士曾说过：“我已无法清晰区分大脑与身体。”珀特博士是正念练习的坚定拥趸者，认为正念练习是“通往美好感受最迅速、最容易、最便捷、最便宜的路径”“情绪分子遍布身体每个系统”“这种沟通系统实际上是身心智能的证明，这种智能有足够的智慧去追求健康”。\n正念行走是随时随地可进行的正念练习，很容易融入日常生活。比如，我们在去上班的路上、开会的路上、散步的时候都可进行正念行走。不过，如果能够专门安排时间进行正念行走，心中没有任何目的地限制，效果会格外显著。\n喜宝邀请您现在就安排一些时间来一段有意义的漫步。",
            "isTextChecked": false,
            "music": "http://joyiou.oss-cn-shanghai.aliyuncs.com/mp3/%E8%A1%8C-%E6%89%8B%E6%9C%BA%E8%AF%95%E5%90%AC%E7%89%88.mp3",
            "isMusicChecked": true,
            "isAlarmChecked": false,
            "isVideoChecked": false
        },
        {
            "id": "3",
            "title": "正念散步",
            "desc": "安住当下 舒缓情绪",
            "isDescChecked": true,
            "imageUrl": "http://joyiou.oss-cn-shanghai.aliyuncs.com/userimage/%E6%95%A3%E6%AD%A5%E5%9B%BE.png",
            "text": "正念散步，情绪急救包&nbsp;<div><p>正念是什么：正念是以不迎接不拒绝的方式将注意力集中于当下体验，是一种灵活的意识状态,</p><p>它包括以开放和接纳的态度去关注并觉知个人的内在和外在世界 。<span style=\"display: inline !important;\">正念不会让你的生活匆匆</span></p><p><span style=\"display: inline !important;\">过，而是意味着活在当下。</span></p><p>宝宝们，这些词在您心里或嘴里经常出现吗：\n疯了吧！\n抓狂！！\n啊！！！\n我不干了！！！！\n不可理喻！！！！！\n\n喜宝说，走走走，跟着我，正念散散步，回来就满血复活啦！\n\n走起！！！\n\n10分钟后\n喜宝一转身，托着下巴曰：又是一条好汉吧，干活去吧！</p></div>",
            "isTextChecked": false,
            "music": "http://joyiou.oss-cn-shanghai.aliyuncs.com/mp3/%E8%A1%8C-%E6%83%85%E7%BB%AA%E6%80%A5%E6%95%91%E5%8C%85-%E6%89%8B%E6%9C%BA%E8%AF%95%E5%90%AC%E7%89%88.mp3",
            "isMusicChecked": true,
            "isAlarmChecked": false,
            "isVideoChecked": false
        },
        {
            "id": "4",
            "title": "正念睡眠",
            "desc": "告别失眠 安然入睡",
            "isDescChecked": true,
            "imageUrl": "http://joyiou.oss-cn-shanghai.aliyuncs.com/userimage/%E5%85%A5%E7%9D%A1%E5%9B%BE.png",
            "text": "正念睡眠，提高的是睡商，太高级了\n\n正念是什么：正念是以不迎接不拒绝的方式将注意力集中于当下体验，是一种灵活的意识状态，它包括以开放和接纳的态度去关注并觉知个人的内在和外在世界 。正念不会让你的生活匆匆滑过，而是意味着活在当下。\n\n睡不好对诸位宝宝来说是一场灾难，灾难等级不亚于雾霾。\n\n喜宝来了，安然说道：放松、放松、再放松。\n\n只有放松一天的紧张和压力时，我们才能安然入睡。 睡眠这东西，有时不请自来，有时，又在关键时刻掉链子，正念对失眠效果显著。正念的基础在于态度和持之以恒的练习，成功练习离不开的最基本的态度就是“不评判，耐心，初学者心态，信任，不用力过度，全然接受以及放开一切”。这些态度对于睡眠同样值得借鉴：放松、放开一切，让睡眠自然而然降临。\n\n现在，宝宝们：去买张好床吧。\n",
            "isTextChecked": true,
            "music": "http://joyiou.oss-cn-shanghai.aliyuncs.com/mp3/%E5%8D%A7-iphonepod.mp3%E6%89%8B%E6%9C%BA%E7%89%88.mp3",
            "isMusicChecked": true,
            "alarm": "http://www.oss.com/闹钟.mp3",
            "isAlarmChecked": false,
            "video": "http://www.oss.com/巡展.avi",
            "isVideoChecked": false
        },
        {
            "id": "7",
            "title": "慈经",
            "desc": " ",
            "isDescChecked": false,
            "imageUrl": "http://joyiou.oss-cn-shanghai.aliyuncs.com/userimage/%E6%85%88%E7%BB%8F.png",
            "text": "《慈经》 ",
            "isTextChecked": false,
            "music": "http://joyiou.oss-cn-shanghai.aliyuncs.com/mp3/%E9%BB%84%E6%85%A7%E9%9F%B3-%E6%85%88%E7%BB%8F(%E4%B8%AD%E6%96%87%E5%BF%B5%E8%AF%B5%E7%89%88).mp3",
            "isMusicChecked": true,
            "isAlarmChecked": false,
            "isVideoChecked": false
        }
    ],
    "message": "ok"
})


/*
 * 获取所有的后台管理用户
 * @noparam
 * */
Mock.mock(address.users, {
    'status': 0,
    'data': [
        {
            'id': Mock.Random.guid(), /*用户ID*/
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
                    'allowVisit|0-1': 0,
                    'permission': 2, /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '2', /*模块ID*/
                    'name': '线下活动',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '3', /*模块ID*/
                    'name': '生命数字',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '4', /*模块ID*/
                    'name': '会员管理',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '5', /*模块ID*/
                    'name': '能量管理',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '6', /*模块ID*/
                    'name': '捐赠管理',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '7', /*模块ID*/
                    'name': '问卷反馈',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '8', /*模块ID*/
                    'name': '职级管理',
                    'allowVisit|0-1': 0,
                    'permission': '2', /*权限：1、仅仅查看 2、可编辑*/
                }
            ]
        },
        {
            'id': Mock.Random.guid(), /*用户ID*/
            'rankId': '1', /*职级类别ID*/
            'rankName': '普通管理员', /*职级类别名称*/
            'username': 'zzx',
            'password': '123456', /*md5格式*/
            'phone': '13476116543',
            'wxVerify': 1,
            'modules': [
                {
                    'id': '1', /*模块ID*/
                    'name': '正念训练',
                    'allowVisit|0-1': 0,
                    'permission': 2, /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '2', /*模块ID*/
                    'name': '线下活动',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '3', /*模块ID*/
                    'name': '生命数字',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '4', /*模块ID*/
                    'name': '会员管理',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '5', /*模块ID*/
                    'name': '能量管理',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '6', /*模块ID*/
                    'name': '捐赠管理',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '7', /*模块ID*/
                    'name': '问卷反馈',
                    'allowVisit|0-1': 0,
                    'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
                },
                {
                    'id': '8', /*模块ID*/
                    'name': '职级管理',
                    'allowVisit|0-1': 0,
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
        'id': Mock.Random.guid(),
        'rankId': '1',
        'rankName': '用户',
        'username': 'itachi',
        'password': '123456', /*md5格式*/
        'phone': '13476116543',
        'wxVerify': 1,
        'modules': [
            {
                'id': '1', /*模块ID*/
                'name': '正念训练',
                'allowVisit|0-1': 0,
                'permission|1': ['0', '1', '2'], /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '2', /*模块ID*/
                'name': '线下活动',
                'allowVisit|0-1': 0,
                'permission|1': ['0', '1', '2'], /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '3', /*模块ID*/
                'name': '生命数字',
                'allowVisit|0-1': 0,
                'permission|1': ['0', '1', '2'], /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '4', /*模块ID*/
                'name': '会员管理',
                'allowVisit|0-1': 0,
                'permission|1': ['0', '1', '2'], /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '5', /*模块ID*/
                'name': '能量管理',
                'allowVisit|0-1': 0,
                'permission|1': ['0', '1', '2'], /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '6', /*模块ID*/
                'name': '捐赠管理',
                'allowVisit|0-1': 0,
                'permission|1': ['0', '1', '2'], /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '7', /*模块ID*/
                'name': '问卷反馈',
                'allowVisit|0-1': 0,
                'permission|1': ['0', '1', '2'], /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '8', /*模块ID*/
                'name': '职级管理',
                'allowVisit|0-1': 0,
                'permission|1': ['0', '1', '2'], /*权限：1、仅仅查看 2、可编辑*/
            }
        ]
    }
})

/*
 * 获取需要计算能量的项目
 * @noparam
 * */
Mock.mock(address.energyProjects, {
    'status': 0,
    'data': [
        {
            id: '1',
            'name|1': ['正念行走', '正念散步', '喜悦捐赠']
        },
        {
            id: Mock.Random.guid(),
            'name|1': ['正念静坐', '线下活动']
        },
        {
            id: Mock.Random.guid(),
            'name|1': ['正念睡眠', '慈经']
        }
    ]
})

/*
 * 获取能量规则
 * @noparam
 * */
Mock.mock(address.energyRules, {
    'status': 0,
    'data': [
        {
            'id': Mock.Random.guid(),
            'projectId': '1',
            'projectName|1': ['正念静坐', '正念行走', '活动捐赠', '正念散步', '活动签到'],
            'value|1': [5, 6, 4, 7, 8, 3],
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
        'id': Mock.Random.guid(),
        'projectId': Mock.Random.guid(),
        'projectName|1': ['正念静坐', '正念行走', '活动捐赠', '正念散步', '活动签到'],
        'value|1': [5, 6, 4, 7, 8, 3],
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
        'rows|50-200': [
            {
                userId: Mock.Random.guid(), /*用户ID*/
                range: 1, /*能量排名*/
                nickname: '会飞的哈士奇',
                'name|1': ['', 'helloworld'],
                phone: '18674031166',
                trainEnergy: 10, /*训练能量*/
                activityEnergy: 20, /*活动能量*/
                lifeNumberEnergy: 15, /*生命数字*/
                donateEnergy: 50,
                totalEnergy: 95,
                'userLevel|1': [1, 2, 3]
            }
        ]
    }
})

/*
 *  更新训练项,包含新建和更新
 *  成功后统一返回训练项实体信息
 * */
Mock.mock(address.updateTrain, {
    'status': 0,
    'data': {
        id: Mock.Random.guid(),
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
 * 获取所有线下活动
 *  @noparam
 */
Mock.mock(address.offlineActivities, {
    'status': 0,
    'data|10-20': [
        {
            id: '1',
            title: '青螺营1',
            deadline: '2016-12-24',
            desc: '<ol><li>就是对的</li><li>不要带狗子</li></ol>',
            address: '北京市朝阳区酒仙桥路4号79798艺术区751动798艺术区751动798艺术区751动fff8艺术区751动力广场A17－0301，想想再设计三楼第一个木门',
            lat: 30.522002,
            lng: 114.364195,
            startDate: '2016-12-26 08:00',
            tags: "老年人|身心健康",
            endDate: '2018-12-28 16:00',
            enrollDate: '2016-12-24',
            createDate: '2016-12-23 09:45',
            link: 'mp.weixin.qq.com/s?__biz=MzI2MzU0Nzk1OA==&mid=224748',
            'isRelease|1': [0, 1, 2, -2] /*是否激活状态*/,
            limits: 0 /*人数限制，0：无限制 其他：有限制*/,
            enrolls: 5 /*报名人数*/,
            activityImageUrl: encodeURI('http://p8.qhimg.com/t019277942e2ab9709c.jpg'),
            qrcodeImageUrl: 'http://img.ibabyzone.cn/album/16/34/25/fangweiboerweima.jpg'
        },
        {
            id: '2',
            title: '青螺营2',
            deadline: '2016-12-24',
            desc: '<ol><li>就是对的</li><li>不要带狗子</li></ol>',
            address: '湖北省武汉市洪山区珞南街道华中师范大学',
            lat: 30.522002,
            lng: 114.364195,
            startDate: '2016-12-26 08:00',
            endDate: '2018-12-28 16:00',
            tags: "老年人|身心健康",
            enrollDate: '2016-12-24',
            createDate: '2016-12-23 09:45',
            willComeDate: '2016-12-25 10:38',
            link: 'mp.weixin.qq.com/s?__biz=MzI2MzU0Nzk1OA==&mid=224748',
            'isRelease|1': [0, 1, 2, -2]  /*是否激活状态*/,
            limits: 10 /*人数限制，0：无限制 其他：有限制*/,
            enrolls: 5 /*报名人数*/,
            activityImageUrl: decodeURI('http://joyiou.oss-cn-shanghai.aliyuncs.com/userimage/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-02-07%2011.52.30.png'),
            qrcodeImageUrl: 'http://img.ibabyzone.cn/album/16/34/25/fangweiboerweima.jpg'
        },
        {
            id: '3',
            title: '青螺营3',
            deadline: '2016-12-24',
            desc: '<ol><li>就是对的</li><li>不要带狗子</li></ol>',
            address: '湖北省武汉市洪山区珞南街道华中师范大学',
            lat: 30.522002,
            lng: 114.364195,
            tags: "老年人|身心健康",
            startDate: '2016-12-26 08:00',
            endDate: '2016-12-28 16:00',
            enrollDate: '2016-12-24',
            createDate: '2016-12-23 09:45',
            willComeDate: '2016-12-25 10:38',
            link: 'mp.weixin.qq.com/s?__biz=MzI2MzU0Nzk1OA==&mid=224748',
            isRelease: -2 /*是否激活状态*/,
            limits: 0 /*人数限制，0：无限制 其他：有限制*/,
            enrolls: 5 /*报名人数*/,
            activityImageUrl: 'http://p8.qhimg.com/t019277942e2ab9709c.jpg',
            qrcodeImageUrl: 'http://img.ibabyzone.cn/album/16/34/25/fangweiboerweima.jpg'
        }
    ]
})

/*
 * 更新活动,包含新建和更新.
 * 成功后统一返回活动实体信息
 * @param
 * */
Mock.mock(address.updateActivity, {
    'status': 0,
    'data': {
        id: '1',
        title: '喜悦活动冬季体验课更新过的',
        deadline: '2016-12-24',
        desc: '<ol><li>就是对的</li><li>不要带狗子</li></ol>',
        address: '湖北省武汉市洪山区珞南街道华中师范大学',
        lat: 30.522002,
        lng: 114.364195,
        startDate: '2016-12-26 08:00',
        tags: "老年人|身心健康",
        endDate: '2016-12-28 16:00',
        enrollDate: '2016-12-24',
        createDate: '2016-12-23 09:45',
        willComeDate: '2016-12-25 10:38',
        link: 'mp.weixin.qq.com/s?__biz=MzI2MzU0Nzk1OA==&mid=224748',
        isRelease: 0 /*是否激活状态*/,
        limits: 10 /*人数限制，0：无限制 其他：有限制*/,
        enrolls: 5 /*报名人数*/,
        activityImageUrl: 'http://p8.qhimg.com/t019277942e2ab9709c.jpg',
        qrcodeImageUrl: 'http://img.ibabyzone.cn/album/16/34/25/fangweiboerweima.jpg'
    }
})

/*
 * @param id:String 活动ID
 * @param pageSize:Int 页数
 * @param pageIndex:Int 第几页
 * @param searchKey:String 搜索关键字
 * */
Mock.mock(address.offlineActivityDetail, {
    'status': 0,
    'data': {
        'totalPages|3-20': 1,
        'items|10-20': [
            {
                'name|1': ['itachi', 'saskki', 'nanuduo'],
                'phone': '13476116543',
                'willCome|1': [0, 1, null],
                'signed|1': [0, 1, undefined],
                'age|1': ['21-30岁', '30-40岁', '40-50岁'],
                'sex|1': ['男', '女'],
                'wx': 'w1915655252',
                'adddress': '湖北省武汉市武昌区白沙洲街道',
                'company': '武汉开目信息技术股份有限公司',
                'job': '垃圾程序员',
                'education': '大学本科',
                'ill|1': ['', '高血压、糖尿病、冠心病', '青光眼'],
                'teaism': '',
                'activity|1': [0, 1, '']
            }
        ]
    }
})

/*
 * @param id:String 活动ID
 * @param isRelease:Int 是否发布
 * */
Mock.mock(address.modifyActivityRelease, {
    'status|0-1': 0,
    'message': ""
})

/*
 * 获取会员列表
 * @param pageSize:Int 页数
 * @param pageIndex:Int 第几页
 * @param searchKey:String 搜索关键字
 * */
Mock.mock(address.vips, {
    'status': 0,
    'data': {
        'totalPages': 0,
        'rows': []
    }
})

/*
 * @param id:String 活动ID
 * @param userId:String 用户ID
 * */
Mock.mock(address.deleteActivity, {
    'status': 0,
    'message': '删除失败'
})

/*
 * @param id:String 活动ID
 * @param userId:String 用户ID
 * @param isRelease:Bool 是否发布
 * */
Mock.mock(address.releaseActivity, {
    'status': 0,
    'message': '发布成功'
})

/*
 * @param username:String 用户名
 * @param password:String 密码 md5格式
 * */
Mock.mock(address.login, {
    'status': 0,
    'message': '用户名或密码错误',
    'data': {
        id: Mock.Random.guid(),
        username: 'Itachi',
        modules: [
            {
                'id': '1', /*模块ID*/
                'name': '正念训练',
                'allowVisit': 1,
                'permission': 2, /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '2', /*模块ID*/
                'name': '线下活动',
                'allowVisit': 1,
                'permission': 2, /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '3', /*模块ID*/
                'name': '生命数字',
                'allowVisit': 1,
                'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '4', /*模块ID*/
                'name': '会员管理',
                'allowVisit': 1,
                'permission': 1, /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '5', /*模块ID*/
                'name': '能量管理',
                'allowVisit': 1,
                'permission': 2, /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '6', /*模块ID*/
                'name': '捐赠管理',
                'allowVisit': 1,
                'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '7', /*模块ID*/
                'name': '问卷反馈',
                'allowVisit': 1,
                'permission|1': ['1', '2'], /*权限：1、仅仅查看 2、可编辑*/
            },
            {
                'id': '8', /*模块ID*/
                'name': '职级管理',
                'allowVisit': 1,
                'permission': 2, /*权限：1、仅仅查看 2、可编辑*/
            }
        ]
    }
})

/*文件上传*/
Mock.mock(address.fileUpload, {
    'status': 0,
    'data': 'http://joyiou.oss-cn-shanghai.aliyuncs.com/mp3/%E5%9D%90-%E6%89%8B%E6%9C%BA%E7%89%88.mp3'
})