import React, { useState, useRef, useEffect } from 'react';
import './index.css'

// key 列表渲染
const aList = [
  { key: 100, name: '黄瓜树'},
  { key: 101, name: '弯路山'},
  { key: 102, name: '缓和楼'},
]

// 传递 JS 变量
const cnt = 100

// 逻辑运算（三元）
const flag = true

// 传递函数
function getName(){
  return ' A_Name '
}

// 较复杂的条件渲染
const mediaType = 1
function getArticleType() {
  if (mediaType === 0) {
    return <div>我是0类型</div>
  }
  else if (mediaType === 1) {
    return <div>我是1类型</div>
  }
  else {
    return <div>我是other类型</div>
  }
}

// 传递事件参数 e 与自定义参数
const handleClick = (element) => {
  console.log('BUTTOM_CLICKED', element)
}
const selfDefHandleClick = (SDH) => {
  console.log('SDH_CLICKED', SDH)
}

const TNDselfDefHandleClick = (SDH2,element) => {
  console.log(SDH2, element)
}

// 渲染组件
// 定义组件（函数首字母必须大写！！！）
function Button() {
  return <button>组件中的按钮</button>
}

const Button2 = () => {
  return <button>组件中的按钮2</button>
}

const xStyle = {
  color: 'blue',
  fontSize: '35px'
}

// 组件父传子（ props 包含父组件传递的所有参数）
function Son (props) {
  console.log(props);
  return <div>This is Son, {props.name}. JSX: {props.child}</div>
}

// 组件子传父
// 核心：在子组件中调用父组件中的函数并传递实参
function Son2 ({ onGetSonMsg }) {
  const sonMsg = 'This is Son2 msg.'
  return (
    <div>
      This is Son2
      <button onClick = { () => onGetSonMsg(sonMsg) }>sendMsg_S2A</button>
    </div>
  )
}

// useEffect 获取列表
const URL = 'http://geek.itheima.net/v1_0/channels'

// useEffect 清除副作用
function UninstallSon() {
  // 渲染时开启定时器
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('定时器执行中');
    }, 1000)

    // 清除副作用（return 某函数）
    return () => {
      clearInterval(timer)
    }
  }, [])
  return <div>This is UninstallSon</div>
}

// hook 函数
function useToggle() {
  const [toggleValue, setToggleValue] = useState(true)
  const toggle = () => {
    setToggleValue(!toggleValue)
  }
  // 封装自定义 hook 通用思路
  // 1. 声明一个以 use 打头的函数
  // 2. 在函数体内封装可复用的逻辑（只要是可复用的逻辑）
  // 3. 把组件中用到的状态或者回调 return 出（以对象或者数组）
  // 4. 在哪个组件中要用到这个逻辑，就执行这个函数，解构出来状态和回调进行使用
  return {
    toggleValue,
    toggle
  }
}



//////////////////////// APP_START ////////////////////////
function App() {

  // 使用 useState 实现计数器
  const [count, setCount] = useState(0)
  const counterClick = () => {
    setCount(count + 1)
  }
  const counterReturn = () => {
    setCount(0)
  }

  // 给 useState 传递参数
  const [form, setForm] = useState({ name: 'Jack' })
  const formClick = () => {
    if (form.name === 'Jack') {
      setForm({
        ...form,
        name: 'Jackson'
      })
    }
    else {
      setForm({
        ...form,
        name: 'Jack'
      })
    }
  }

  // 受控表单绑定
  const [value, setValue] = useState('')

  // React 中获取 DOM
  const inputRef = useRef(null)
  const logDOM = () => {
    console.log(inputRef.current);
  }

  // 组件父传子
  const fatherName = 'This is father App name'

  // 组件子传父（msg为形参）
  const [displayMsg, setDisplayMsg] = useState('')
  const getSon2Msg = (msg) => {
    console.log(msg);
    setDisplayMsg(msg)
  }

  // useEffect 获取列表
  // 创建状态数据
  const [resList, setResList] = useState([])
  useEffect (() => {
    // 获取 channel 列表
    async function getList () {
      const res = await fetch(URL)
      const resJsonList = await res.json()
      console.log(resJsonList);
      setResList(resJsonList.data.channels)
    }
    getList()
  }, [])

  // useEffect 无依赖项（初始 + 组件更新）
  const [useEffectCount, setUseEffectCount] = useState(0)
  useEffect(() => {
    console.log('副作用函数1执行了');
  })

  // useEffect 传入空数组依赖（初始执行）
  useEffect(() => {
    console.log('副作用函数2执行了');
  }, [])

  // useEffect 传入特定依赖（初始 + 依赖项变化时执行）
  useEffect(() => {
    console.log('副作用函数3执行了');
  }, [useEffectCount])

  // useEffect 清除副作用
  const [uninstallShow, setUninstallShow] = useState(true)

  // hook 函数
  const {toggleValue, toggle} = useToggle()



  //////////////////////// RETURN_START ////////////////////////
  return (
    <div className = "App">
      
      {/* 显示字符 */}
      this is an app.

      {/* 引号传递字符串 */}
      { ' this_is_a_string ' }

      {/* 传递 JS 变量 */}
      { cnt }

      {/* 传递函数 */}
      { getName() }

      {/* 调用方法 */}
      { new Date().getDate() }

      {/* 使用 JS 对象 */}
      <div style = {{ color: 'red' }}>
        this_is_div
      </div>
      
      {/* key 列表渲染 */}
      <ul>
        {aList.map( item => <li key = {item.key}>{item.name}</li> )}
      </ul>

      {/* 逻辑运算（三元） */}
      <div>
        {flag ? <span>flag_is_true</span> : <span>flag_is_false</span>}
      </div>

      {/* 较复杂的条件渲染 */}
      <div>
        {getArticleType()}
      </div>

      {/* 传递事件参数 e 与自定义参数 */}
      <div className = 'App'>
        <button onClick = {handleClick}>click here!</button>
        <button onClick = {() => selfDefHandleClick('Jack')}>'click here!</button>
        <button onClick = {(element) => TNDselfDefHandleClick('Jack', element)}>''click here!</button>
      </div>

      {/* 渲染组件 */}
      <div className = 'App'>
        {/* 自闭和 */}
        <Button />

        {/* 成对标签 */}
        <Button2></Button2>
      </div>

      {/* 使用 useState 实现计数器 */}
      <div className='App'>
        <button onClick = {counterClick}>The Count is {count}</button>
        <button onClick = {counterReturn}>RESET_THE_CNT</button>
      </div>
      {/* 给 useState 传递参数 */}
      <div>
        <button onClick = {formClick}>The name is {form.name}</button>
      </div>

      {/* 样式控制 */}
      <div>
        {/* 行内样式控制 */}
        <span style = {{ color: 'red', fontSize: '30px' }}> This is span </span>
        {/* 行外样式控制 */}
        <span style = { xStyle }> This is xStyle </span>
        {/* 通过 class 类名控制 */}
        <span className = "foo"> This is .foo </span>
      </div>
      
      {/* 受控表单绑定 */}
      <div>
        <input 
          type = "text"
          value = {value}
          onChange = {(e) => setValue(e.target.value)}
        />
      </div>

      {/* React 中获取 DOM */}
      <div>
        <input
          type = "text"
          ref = {inputRef}
        />
        <button onClick = {logDOM}>获取DOM</button>
      </div>

      {/* 组件父传子 */}
      <div>
        <Son 
          name = {fatherName}
          age = {18}
          isTrue = {false}
          list = {['Vue', 'React']}
          obj = {{name: 'Jack'}}
          anyFunction = {() => console.log(123)}
          child = {<span>This is a span</span>}
        />
        <Son>
          <span>This is a Span</span>
        </Son>
      </div>

      {/* 组件子传父 */}
      <div>
        This is Son2 msg in App, {displayMsg}
        <Son2 onGetSonMsg = {getSon2Msg} />
      </div>

      {/* useEffect 获取列表 */}
      <ul>
        {resList.map( item => <li key = {item.id}>{item.name}</li> )}
      </ul>

      {/* useEffect 无依赖项（初始 + 组件更新） */}
      <button onClick = { () => setUseEffectCount(useEffectCount +1)}>
        +{useEffectCount}
      </button>

      {/* useEffect 清除副作用 */}
      <div>
        {uninstallShow && <UninstallSon />}
        <button onClick = { () => setUninstallShow(false) }>卸载UninstallSon组件</button>
      </div>

      {/* hook 函数 */}
      <div>
        {toggleValue && <div>This is toggle</div>}
        <button onClick = {toggle}>TOGGLE</button>
      </div>



      {/* FATHER_DIV_END */}
    </div>
  );
}

export default App;
