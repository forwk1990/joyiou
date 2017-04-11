import React from 'react'
import Switch from '../common/Switch'
import './OfflineActivities.scss'
import TitleBar from '../common/TitleBar'
import {connect} from 'react-redux'
import Loading from '../common/Loading'
import actions from '../../../actions'
import {Message} from '../../../utils/utils'
import ActivityUpdate from './ActivityUpdate'
import OfflineActivityDetail from './OfflineActivityDetail'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


/*线下活动单元格*/
class OfflineActivityCell extends React.Component {

    constructor(props) {
        super(props)
        this.state = {isRelease: props.model.isRelease}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isRelease: nextProps.model.isRelease})
    }

    render() {
        const {
            id,
            title,
            deadline,
            address,
            startDate,
            endDate,
            createDate,
            limits,
            enrolls,
            activityImageUrl
        } = this.props.model
        //const isOver = Date.parse(endDate) < new Date() || this.state.isRelease == 2 || this.state.isRelease == -2
        // /*
        //  关闭的活动可以再次开启 modify by itachi 2017-04-08
        // */
        const isOver = Date.parse(endDate) < new Date() || this.state.isRelease == 2
        const status = this.props.model.isRelease // isRelease 当 status用  0：没有发布、1：报名中(已开启) 、2：结束 、-2：关闭
        const index = this.props.index
        const editable = !!this.props.editable
        return (
            <div className="OfflineActivityCell">
                <div className="OfflineActivityCell-wrapper">
                    <div className="OfflineActivityCell-left">
                        <div className="OfflineActivityCell-left-title">
                            <span>{index}</span>
                            <span>{title}</span>
                        </div>
                        <div className="OfflineActivityCell-left-bottom">
                            <div className="OfflineActivityCell-left-bottom-image">
                                <img src={activityImageUrl}/>
                            </div>
                            <div className="OfflineActivityCell-left-bottom-info">
                                <div className="OfflineActivityCell-left-bottom-info-deadline">报名结束时间：{deadline}</div>
                                <div className="OfflineActivityCell-left-bottom-info-address"><span
                                    className="text-overflow">活动地点：{address}</span></div>
                                <div className="OfflineActivityCell-left-bottom-info-date">
                                    活动时间：{startDate}至{endDate}</div>
                            </div>
                        </div>
                    </div>
                    <div className="OfflineActivityCell-right">
                        <div className="OfflineActivityCell-right-top">
                            <div className="OfflineActivityCell-right-top-date">创建时间：{createDate}</div>
                            <div className="OfflineActivityCell-right-top-switch">
                                {
                                    !isOver && editable && (
                                        <Switch checkedImageUrl={require('29')}
                                                uncheckedImageUrl={require('30')}
                                                warningText='确定取消此活动吗?'
                                                valueChangeEventHandler={(value) => this.handleSwitchValueChangeEvent(value, id, this.props.userId, index - 1)}
                                                defaultValue={this.state.isRelease == 1}/>
                                    )
                                }
                            </div>
                            <div className="OfflineActivityCell-right-top-delete">
                                {!this.state.isRelease && editable && status != 1 &&
                                <img src={require('23')}
                                     onClick={() => this.handleDeleteEvent(id, this.props.userId, index - 1)}/>}
                            </div>
                        </div>
                        <div className="OfflineActivityCell-right-middle">
                            <span>{limits > 0 ? `(${enrolls}/${limits})` : ''}</span>
                            <span onClick={this.props.detailEventHandler}>报名详情</span>
                        </div>
                        <div className="OfflineActivityCell-right-bottom">
                            {
                                isOver ? (
                                        <span className="over">
                                            {
                                                status == 2 && "活动已结束"
                                            }
                                            {
                                                status == -2 && "活动已关闭"
                                            }
                                        </span>
                                    ) : (<span className={`${editable && status != 1 ? 'normal' : 'disabled'}`}
                                               onClick={() => editable && status != 1 && this.props.editEventHandler()}>编辑</span>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /*
     * 删除活动按钮点击事件处理
     * */
    handleDeleteEvent(id, userId, indexOfList) {
        const self = this
        Message.confirm('确定删除此活动吗', function () {
            setTimeout(function () {
                self.props.dispatch(actions.deleteOfflineActivity(id, userId, indexOfList))
            }, 300)
        })

    }

    /*
     * 活动发布点击事件处理
     * */
    handleSwitchValueChangeEvent(isRelease, id, userId, indexOfList) {
        this.props.dispatch(actions.releaseOfflineActivity(id, userId, isRelease, indexOfList))
    }

}

function ModalContent(props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

class OfflineActivities extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            offlineActivities: [],
            isActivityUpdateComponentVisible: false,
            isActivityDetailComponentVisible: false,
            currentOfflineActivity: null
        }
    }

    componentDidMount() {
        this.props.dispatch(actions.getOfflineActivityList())
    }

    render() {
        const self = this
        const buttons = this.props.editable ? [
                {"title": "添加活动", "eventHandler": () => this.handleAddActivityEvent()}
            ] : []
        return this.props.loadingOfflineActivities ? (<Loading/>) : (
                <div className="offlineActivities">
                    <div className="offlineActivities-bar">
                        <TitleBar title="线下活动项" buttons={buttons}/>
                    </div>
                    <div className="offlineActivities-content">
                        {
                            !!this.props.offlineActivities && this.props.offlineActivities.length > 0 && this.props.offlineActivities.map(function (offlineActivity, index) {
                                return !!offlineActivity && (
                                        <OfflineActivityCell key={`o-a-${index}`}
                                                             model={offlineActivity}
                                                             dispatch={self.props.dispatch}
                                                             userId={self.props.userId}
                                                             editable={self.props.editable}
                                                             detailEventHandler={() => self.handleActivityDetailClickEvent(offlineActivity)}
                                                             editEventHandler={() => self.handleActivityEditClickEvent(offlineActivity)}
                                                             index={(index + 1)}/>
                                    )
                            })}
                    </div>
                    {/*显示编辑或新建活动组件*/}
                    {
                        this.state.isActivityUpdateComponentVisible && (
                            <div className="offlineActivities-pop-wrapper">
                                <ReactCSSTransitionGroup
                                    transitionEnter={false}
                                    transitionLeave={true} transitionLeaveTimeout={800}
                                    transitionAppear={true} transitionAppearTimeout={800}
                                    transitionName={{
                                        leave: 'activity-pop-leave',
                                        leaveActive: 'activity-pop-leave-active',
                                        appear: 'activity-pop-appear',
                                        appearActive: 'activity-pop-appear-active'
                                    }} component={ModalContent}>
                                    <ActivityUpdate model={this.state.currentOfflineActivity}
                                                    closeEventHandler={() => this.setState({isActivityUpdateComponentVisible: false})}/>
                                </ReactCSSTransitionGroup>
                            </div>
                        )}
                    {/*显示活动详情*/}
                    {
                        this.state.isActivityDetailComponentVisible && (
                            <div className="offlineActivities-pop-wrapper">
                                <ReactCSSTransitionGroup
                                    transitionEnter={false}
                                    transitionLeave={true} transitionLeaveTimeout={800}
                                    transitionAppear={true} transitionAppearTimeout={800}
                                    transitionName={{
                                        leave: 'activity-pop-leave',
                                        leaveActive: 'activity-pop-leave-active',
                                        appear: 'activity-pop-appear',
                                        appearActive: 'activity-pop-appear-active'
                                    }} component={ModalContent}>
                                    <OfflineActivityDetail model={this.state.currentOfflineActivity}
                                                           closeEventHandler={() => this.setState({isActivityDetailComponentVisible: false})}/>
                                </ReactCSSTransitionGroup>
                            </div>
                        )}
                </div>
            )
    }

    handleActivityEditClickEvent(offlineActivity) {
        this.setState({isActivityUpdateComponentVisible: true, currentOfflineActivity: offlineActivity})
    }

    handleActivityDetailClickEvent(offlineActivity) {
        this.setState({isActivityDetailComponentVisible: true, currentOfflineActivity: offlineActivity})
    }

    handleAddActivityEvent() {
        this.setState({isActivityUpdateComponentVisible: true, currentOfflineActivity: null})
    }

}

const mapStateToProps = function (state) {
    return {
        loadingOfflineActivities: state.activity.loading,
        offlineActivities: state.activity.list,
        userId: state.user.id
    }
}

export default connect(mapStateToProps)(OfflineActivities)