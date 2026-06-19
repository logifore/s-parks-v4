# S-parks V6.5 Collaboration Guide

这个仓库按“你主 UI / 交互、同事同步做功能扩展”的方式协作。目标是让设计、功能和发布节奏彼此解耦，但仍然保持主分支稳定。

配套说明：

- `TEAM_WORKFLOW.md`: 给功能同事直接照着执行的流程
- `AGENTS.md`: 给 Codex / AI 助手执行时读取的规则

## 协作原则

- 不直接把开发中的内容推到 `main`
- 所有改动都通过分支开发，再用 Pull Request 合并
- UI 相关改动优先由你 review
- 认证、数据、权限、审核逻辑相关改动至少做一次功能 review
- 小改动也尽量写清楚影响范围，避免互相覆盖

## 建议分工

- 你负责：
  - `assets/css/`
  - `assets/js/renderers.js`
  - `assets/js/content.js`
  - 页面结构、视觉样式、交互动线
- 同事负责：
  - `assets/js/app.js`
  - `assets/js/auth.js`
  - `supabase/`
  - 登录、角色、权限、数据和功能扩展
- 共同 review：
  - 路由变化
  - 角色权限逻辑
  - 发布配置
  - README / 版本说明

## 分支规范

- 新功能：
  - `feature/ui-profile-refine`
  - `feature/auth-role-routing`
- 修复：
  - `fix/admin-review-actions`
  - `fix/mobile-nav-overlap`
- 文档：
  - `docs/collaboration-setup`

## 推荐流程

1. 从最新 `main` 拉取代码
2. 新建自己的功能分支
3. 在分支里开发和自测
4. 提交 Pull Request
5. 等 review 通过后再合并

## Pull Request 要求

- 标题尽量直接说明改动范围
- 描述要写清楚：
  - 改了什么
  - 为什么改
  - 影响了哪些页面或逻辑
- 涉及 UI 时，最好附截图或录屏
- 涉及账号、角色、审核逻辑时，说明测试了哪些角色

## 合并前检查

- 没有误改无关文件
- 没有把测试数据、临时凭据、私密配置提交进仓库
- UI 改动至少看过桌面和移动端
- 角色相关改动至少检查：
  - 普通用户
  - 创作者
  - 管理员

## GitHub 后台建议开启

建议在仓库的 GitHub Settings 中配置这些规则：

- Protect `main`
- Require a pull request before merging
- Require at least 1 approval
- Require review from Code Owners
- Restrict direct push to `main`

## CODEOWNERS

仓库已经提供：

- [.github/CODEOWNERS](/Users/ylfy/Desktop/workspace/sparks-v6/.github/CODEOWNERS)

当前先默认使用 `@logifore`。等你拿到同事 GitHub 用户名后，直接补到对应规则后面即可。
