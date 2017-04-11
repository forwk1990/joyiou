import React from 'react'
import './EnergyDetail.scss'
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane
import NavigationBar from '../common/NavigationBar'
import EnergyDetailTab from './EnergyDetailTab'
import address from '../../../channel/address'

class EnergyDetail extends React.Component {

    constructor(props) {
        super(props)
    }

    handleExportEvent() {

    }

    render() {
        const {closeEventHandler, model} = this.props
        const {nickname, name} = model
        const title = name ? `${nickname}(${name}) 能量详情` : `${nickname} 能量详情`
        return (
            <div className="cnt-wrapper">
                <div className="cnt-wrapper-bar">
                    <NavigationBar parentTitles={['能量排名']}
                                   title={title}
                                   closeEventHandler={closeEventHandler}
                                   buttons={[

                                   ]}/>
                </div>
                <div className="cnt-wrapper-cnt">
                    <div className="energy-detail">
                        <Tabs tabPosition="left">
                            <TabPane tab="全部能量" key="1">
                                <EnergyDetailTab action={address.getAllEnergy}
                                                 parameters={{userId: model.userId}}
                                                 columnKeyValues={[
                                                     {
                                                         name: 'name',
                                                         label: '项目'
                                                     }, {
                                                         name: 'date',
                                                         label: '时间'
                                                     }, {
                                                         name: 'energy',
                                                         label: '能量'
                                                     }
                                                 ]}/>
                            </TabPane>
                            <TabPane tab="线下活动能量" key="2">
                                <EnergyDetailTab action={address.getEnergyByType}
                                                 parameters={{userId: model.userId, type: 1}}
                                                 columnKeyValues={[
                                                     {
                                                         name: 'name',
                                                         label: '项目'
                                                     }, {
                                                         name: 'date',
                                                         label: '时间'
                                                     }, {
                                                         name: 'energy',
                                                         label: '能量'
                                                     }
                                                 ]}/>
                            </TabPane>
                            <TabPane tab="生命数字能量" key="3">
                                <EnergyDetailTab action={address.getEnergyByType}
                                                 parameters={{userId: model.userId, type: 2}}
                                                 columnKeyValues={[
                                                     {
                                                         name: 'name',
                                                         label: '项目'
                                                     }, {
                                                         name: 'date',
                                                         label: '时间'
                                                     }, {
                                                         name: 'energy',
                                                         label: '能量'
                                                     }
                                                 ]}/>
                            </TabPane>
                            <TabPane tab="正念训练能量" key="4">
                                <EnergyDetailTab action={address.getEnergyByType}
                                                 parameters={{userId: model.userId, type: 3}}
                                                 columnKeyValues={[
                                                     {
                                                         name: 'name',
                                                         label: '项目'
                                                     }, {
                                                         name: 'date',
                                                         label: '时间'
                                                     }, {
                                                         name: 'energy',
                                                         label: '能量'
                                                     }
                                                 ]}/>
                            </TabPane>
                            <TabPane tab="捐赠能量" key="5">
                                <EnergyDetailTab action={address.getEnergyByType}
                                                 parameters={{userId: model.userId, type: 4}}
                                                 columnKeyValues={[
                                                     {
                                                         name: 'name',
                                                         label: '项目'
                                                     }, {
                                                         name: 'date',
                                                         label: '时间'
                                                     }, {
                                                         name: 'energy',
                                                         label: '能量'
                                                     }
                                                 ]}/>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }

}

export default EnergyDetail