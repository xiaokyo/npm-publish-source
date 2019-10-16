/**
 * 实现固钉
 * params
 * @offsetTop #距离显示屏幕上方多少距离是触发
 */
import React, { Component } from 'react'

const initClass = 'xiaok-affix'//内置容器样式
const fixStyle = { position: 'fixed', zIndex: 10 }
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {},
      initRect: {},
      initOffset: {}
    }
  }

  render() {
    const { style } = this.state
    const { children } = this.props
    return (
      <div className={initClass} style={style}>
        {children}
      </div>
    )
  }

  componentDidMount() {
    let affixDom = document.getElementsByClassName(initClass)[0]
    let _initTop = affixDom.offsetTop
    let _initRect = affixDom.getClientRects()[0]
    this.handleStyle(_initRect, _initTop)//初始固钉样式
    this.setState({
      initOffset: { top: _initTop },
      initRect: _initRect
    })
    document.addEventListener('scroll', this.handle)
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handle)
  }

  handle = () => this.handleStyle()
  handleStyle = (_initRect, _initTop) => {//处理样式
    const { initRect, initOffset } = this.state
    const { offsetTop } = this.props
    let initRect1 = typeof _initRect === 'undefined' ? initRect : _initRect,
      initTop1 = typeof _initTop === 'undefined' ? initOffset.top : _initTop
    let _style = {}
    if (document.documentElement.scrollTop + (offsetTop || 0) >= initTop1) {
      _style = ({ top: offsetTop == undefined ? initRect1.y : offsetTop, left: initRect1.x, width: initRect1.width, height: initRect1.height, ...fixStyle })
    }
    this.setState({
      style: _style
    })
  }

}