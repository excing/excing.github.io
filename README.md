# excing.github.io
It is the excing's blog

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

