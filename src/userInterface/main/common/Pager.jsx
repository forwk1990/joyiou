import React from 'react'
import './Pager.scss'

class Pager extends React.Component {

    constructor(props) {
        super(props)
        this.state = {total: props.total, current: props.current, prevDisabled: false, nextDisabled: false}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({total: nextProps.total, current: nextProps.current})
    }

    render() {
        const prevArrowClassName = this.state.current === 1
            ? 'pager-prev icon-angle-left disabled'
            : 'pager-prev icon-angle-left'
        const nextArrowClassName = this.state.current == this.state.total
            ? 'pager-next icon-angle-right disabled'
            : 'pager-next icon-angle-right'
        return (this.state.total > 0) && (
                <div className="pager">
                    <div className={`${prevArrowClassName}`}
                         onClick={() => this.changePage(this.state.current - 1)}></div>
                    {this.generatePagination(this.state.current, this.state.total)}
                    <div className={`${nextArrowClassName}`}
                         onClick={() => this.changePage(this.state.current + 1)}></div>
                </div>
            )
    }

    changePage(willChangedToPageIndex) {
        if (willChangedToPageIndex <= 0) return
        if (willChangedToPageIndex > this.props.total) return
        const {switchPageToIndex} = this.props
        this.setState({current: willChangedToPageIndex})
        switchPageToIndex && typeof switchPageToIndex === 'function' && switchPageToIndex(willChangedToPageIndex)
    }

    generatePagination(current, total) {
        const self = this
        const getNumbers = (start, end) => {
            let numberItems = []
            for (let i = start; i <= end; i++) {
                const className = i == current ? 'pager-number active' : 'pager-number'
                numberItems.push((
                    <div onClick={() => self.changePage(i)} key={`page-number-${i}`} className={className}>{i}</div>))
            }
            return numberItems
        }

        let items = []
        // 7页之内全部显示
        if (total <= 7) {
            items = items.concat(getNumbers(1, total))
        } else {
            if (current < 5) { // 前5页
                items = items.concat(getNumbers(1, 5))
                items.push((<div onClick={() => self.changePage(current + 5)} key="page-number-sl"
                                 className="pager-number next"></div>))
                items.push((<div onClick={() => self.changePage(total)} key="page-number-end"
                                 className="pager-number">{total}</div>))
            } else if (current <= total && current >= total - 4) { // 后五页
                items.push((<div onClick={() => self.changePage(1)} key="page-number-begin"
                                 className="pager-number">1</div>))
                items.push((<div onClick={() => self.changePage(current - 5)} key="page-number-sl"
                                 className="pager-number prev"></div>))
                items = items.concat(getNumbers(total - 4, total))
            } else {// 居中5页
                items.push((
                    <div onClick={() => self.changePage(1)} key="page-number-1" className="pager-number">1</div>))
                items.push((<div onClick={() => self.changePage(current - 5)} key="page-number-sl-prev"
                                 className="pager-number prev"></div>))
                items = items.concat(getNumbers(current - 2, current + 2))
                items.push((<div onClick={() => self.changePage(current + 5)} key="page-number-sl-next"
                                 className="pager-number next"></div>))
                items.push((<div onClick={() => self.changePage(total)} key="page-number-end"
                                 className="pager-number">{total}</div>))
            }
        }
        return items
    }
}

export default Pager