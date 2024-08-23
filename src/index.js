// 整个项目的起点

// React 核心包
import React from 'react';
import ReactDOM from 'react-dom/client';

// 导入项目根组件
import App from './App';

// 把 App 根组件渲染到 id 为 root 的 DOM 节点上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
)