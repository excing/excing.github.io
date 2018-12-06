# excing.github.io
It is the excing's blog

前后端分离, mysql 作为数据存储服务.

后台项目: [BlogZoneServer](https://github.com/excing/BlogZoneServer)

### 项目结构

- index.html: 首页
- list.html: 列表页
- view.html: 文章内容页
- edit.html: 文章编辑页
- config.js: 配置文件，仅支持配置 api domain

### 权限说明

- admin
- 游客

#### admin 权限

全权限，编辑和查看。

#### 游客权限

不可编辑，查看权限有五种：

- 默认：列表可见，内容可见
- 1: 列表不可见，内容可见
- 2: 列表可见，内容口令可见
- 3: 列表不可见，内容不可见
- 4: 列表不可见，内容口令可见

### 修改历史

- 2018.12 支持返回顶部；添加 markdown 在线演示页面.
- 2018.11 支持音频 markdown 文本标记；支持生成 html 时添加目录锚点.
- 2018.11 支持显示目录的 markdown 标记 `[TOC]`; 支持显示视频的 markdown 标记; 修改了 markdown css, 使之与 prism 的代码样式一致; 全部使用 `JsDelivr CDN`.
- 2018.11 支持 `时序图`、`流程图` 编辑和显示，完善 `数学公式` 编辑和显示功能
- 2018.11 支持数学公式编辑和显示，美化表格样式
- 2018.8 支持代码高亮
- 2018.8 支持 markdown 编辑
- 2018.8 添加博客首页、列表页、内容页、编辑页
- 2018.8 重启项目