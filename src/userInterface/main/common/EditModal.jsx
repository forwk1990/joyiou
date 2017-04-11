import React from 'react'
import './EditModal.scss'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function ModalContent(props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

class EditModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: true
        }
    }

    handleCloseEvent(callback) {
        this.setState({isModalVisible: false})
        setTimeout(function () {
            callback()
        },250)
    }

    render() {
        const {onCloseHandler, buttons} = this.props
        const overlayClassName = this.state.isModalVisible ? 'edit-modal-overlay' : 'edit-modal-overlay overlayDisappearAnimation'
        return (
            <div className="edit-modal" key="edit-modal">
                <div className={overlayClassName}></div>
                <ReactCSSTransitionGroup
                    transitionEnter={false}
                    transitionLeave={true} transitionLeaveTimeout={800}
                    transitionAppear={true} transitionAppearTimeout={1000}
                    transitionName={ {
                        leave: 'edit-leave',
                        leaveActive: 'edit-leave-active',
                        appear: 'edit-appear',
                        appearActive: 'edit-appear-active'
                    } } component={ModalContent}>
                    {
                        this.state.isModalVisible && (
                            <div className="edit-modal-wrapper">
                                <div className="edit-modal-wrapper-header">
                                    <span className="close" onClick={() => this.handleCloseEvent(onCloseHandler)}></span>
                                </div>
                                <div className="edit-modal-wrapper-content">
                                    {this.props.children}
                                </div>
                                <div className="edit-modal-wrapper-bottom">
                                    {
                                        buttons.map(function (button, index) {
                                            return (
                                                <div key={index} className="edit-modal-wrapper-bottom-button"
                                                     onClick={button.eventHandler}>{button.title}</div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                </ReactCSSTransitionGroup>
            </div>
        )
    }

}

export default EditModal