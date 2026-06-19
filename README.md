# S-parks V6.5 Release

S-parks V6.5 在 `sparks-v6` 主线上继续迭代，延续公开测试账号登录能力，并把对外发布链路统一收敛到一个固定公开地址，避免后续每次发版都更换访问网址。

## V6.5 重点

- 从 `sparks-v5` 复制出独立的 `sparks-v6` 工作目录，避免原版本丢失。
- 新增 `#guide` 专题页体系，把支持中心卡片、页脚条款和联系入口全部接成真实跳转页面。
- 把素材页工具按钮补成真实交互，支持展开筛选建议、切换排序、直接创建项目夹。
- 新建项目夹后可直接进入 `#project` 详情页，形成从素材浏览到项目沉淀的闭环。
- 统一加强边框、面板填充、文字对比和图层层级，降低旧版本里常见的导航压层、字体撞色和控件弱可见问题。
- 保留公开站点可直接登录的 3 个测试账号，同时补上 Supabase 公共前端配置，后续可平滑切换真实后端。
- 版本标识已同步到 `v6.5.0`，包括 `index.html`、前端配置、缓存参数和发布说明文案。
- 公开访问地址固定为 `https://s-parks.vercel.app`，后续版本继续覆盖同一公开站点。

## 当前路由

- `#home`: 首页 / 发现
- `#assets`: 素材库
- `#community`: 创作者社区
- `#support`: 支持中心
- `#guide?guide=...`: 专题指南页
- `#detail?asset=...`: 素材详情
- `#creator?creator=...&tab=...`: 创作者主页
- `#creator-onboarding`: 成为创作者
- `#account`: 个人主页
- `#upload`: 上传发布
- `#auth`: 登录注册
- `#licensing?asset=...`: 购买授权
- `#downloads`: 下载中心
- `#membership`: 积分会员
- `#admin`: 审核后台
- `#search`: 搜索结果
- `#collections`: 收藏夹 / 项目夹
- `#project?project=...`: 项目夹详情

## 关键文件

- `index.html`: 应用外壳、CSP、版本资源引用、页脚专题链接
- `assets/css/styles.css`: 设计系统、图层、边框、专题页与素材工具样式
- `assets/js/content.js`: 页面内容、专题页数据、素材与项目数据
- `assets/js/renderers.js`: 路由页面渲染器
- `assets/js/router.js`: Hash 路由解析与动态参数
- `assets/js/app.js`: 状态、交互、项目夹创建和页面事件
- `assets/js/config.js`: 前端版本号、本地登录兜底和 Supabase 公开配置

## 发布目标

- GitHub 仓库：继续使用 `https://github.com/logifore/s-parks-v6` 作为 `v6.x` 主发布仓库
- Vercel 项目：继续复用现有主项目承载最新 `v6.x` 生产版本
- 公开地址：固定为 `https://s-parks.vercel.app`
- 发布策略：直接替换当前线上主版本，让 GitHub `main` 与 Vercel 生产部署共同指向同一个最新版本

## 本地预览

```bash
/Users/ylfy/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m http.server 8768
```

然后打开：

```text
http://127.0.0.1:8768/
```

## 协作文档

- `CONTRIBUTING.md`: 仓库协作规则和 PR 要求
- `TEAM_WORKFLOW.md`: 给功能同事看的完整工作流程
- `AGENTS.md`: 给 Codex / AI 编码助手看的仓库操作约束

## 安全说明

V6.5 仍是前端原型，不包含真实生产密钥、支付凭据或后端管理口令。

- 当前前端配置中包含 Supabase 的公开项目地址和 publishable / anon key，这两项属于前端可公开配置，不是高权限服务端密钥。
- 当前仓库未引入数据库密码、service role key、支付密钥或私有环境变量。
- 正式上线前仍需补全服务端鉴权、上传校验、下载权限、限流、审计日志和内容审核流程。
