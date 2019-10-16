/**
 * 实现固钉
 * params
 * @offsetTop #距离显示屏幕上方多少距离是触发
 */
import React, { useState, useEffect } from 'react'

const initClass = 'xiaok-affix'//内置容器样式
const fixStyle = { position: 'fixed', zIndex: 10 }
export default ({ children, offsetTop }) => {
  const [style, setStyle] = useState({})
  const [initRect, setinitRect] = useState({})
  const [initOffset, setInitOffset] = useState({})

  const handle = () => {//处理滚动事件
    handleStyle()
  }

  const handleStyle = (_initRect, _initTop) => {//处理样式
    let initRect1 = typeof _initRect === 'undefined' ? initRect : _initRect,
      initTop1 = typeof _initTop === 'undefined' ? initOffset.top : _initTop
    let _style = {}
    if (document.documentElement.scrollTop + (offsetTop || 0) >= initTop1) {
      _style = ({ top: offsetTop == undefined ? 0 : offsetTop, left: initRect1.x, width: initRect1.width, height: initRect1.height, ...fixStyle })
    }
    setStyle(_style)
  }

  useEffect(() => {//获得初始固钉容器的rect 这里只拿了top
    let affixDom = document.getElementsByClassName(initClass)[0]
    let _initTop = affixDom.offsetTop
    let _initRect = affixDom.getClientRects()[0]
    handleStyle(_initRect, _initTop)//初始固钉样式
    setInitOffset({ ...initOffset, top: _initTop })
    setinitRect(_initRect)
  }, [])

  useEffect(() => {//初始渲染和initRect改变后渲染，添加滚动事件
    document.addEventListener('scroll', handle)
    return () => document.removeEventListener('scroll', handle)
  }, [initRect, initOffset])

  return (
    <>
      <div className={initClass} style={style}>
        {children}
      </div>
    </>
  )
}