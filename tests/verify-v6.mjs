import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jsRoot = path.join(projectRoot, "assets/js");
const cssPath = path.join(projectRoot, "assets/css/styles.css");
const indexPath = path.join(projectRoot, "index.html");
const appPath = path.join(jsRoot, "app.js");
const configPath = path.join(jsRoot, "config.js");
const routerPath = path.join(jsRoot, "router.js");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function loadRuntime() {
  const context = { window: {}, console };
  vm.createContext(context);
  ["content.js", "utils.js", "renderers.js"].forEach((file) => {
    const source = fs.readFileSync(path.join(jsRoot, file), "utf8");
    vm.runInContext(source, context, { filename: file });
  });
  context.window.SparksRouter = {
    hrefFor(route, value) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const search = new URLSearchParams();
        Object.entries(value).forEach(([key, rawValue]) => {
          if (rawValue === undefined || rawValue === null || rawValue === "") return;
          search.set(key, rawValue);
        });
        const query = search.toString();
        return query ? `#${route}?${query}` : `#${route}`;
      }

      const keyMap = {
        detail: "asset",
        creator: "creator",
        project: "project",
        licensing: "asset",
        guide: "guide"
      };
      const key = keyMap[route];
      if (!key || !value) return `#${route}`;
      return `#${route}?${key}=${encodeURIComponent(value)}`;
    }
  };
  return {
    content: context.window.SPARKS_CONTENT,
    renderers: context.window.SparksRenderers.renderers
  };
}

function checkGuides(content, renderers, state, css) {
  assert(content.hiddenRoutes.some((item) => item.route === "guide"), "content.js 缺少 guide 隐藏路由");
  assert(content.guides["account-management"], "content.js 缺少账户管理专题");
  const html = renderers.guide(content, { ...state, activeGuideId: "account-management" });
  assert(html.includes("guide-hero"), "专题页缺少 guide hero 结构");
  assert(html.includes("前往登录"), "专题页缺少快速跳转按钮");
  assert(html.includes("#guide?guide=upload-assets"), "专题页缺少相关专题跳转");
  assert(css.includes(".guide-layout"), "样式中缺少 guide 布局");
}

function checkSupport(renderers, content, state, css) {
  const html = renderers.support(content, state);
  assert(html.includes('data-support-search'), "支持页缺少搜索表单标识");
  assert(html.includes("#guide?guide=account-management"), "支持页卡片仍未指向专题页");
  assert(html.includes("#guide?guide=privacy-policy"), "支持页缺少政策页跳转");
  assert(css.includes(".support-links-grid"), "支持页缺少专题链接样式");
}

function checkAssets(renderers, content, state, css, appSource) {
  const html = renderers.assets(content, { ...state, assetSort: "featured", assetToolsOpen: true });
  assert(html.includes("新建项目夹"), "素材页缺少项目夹入口");
  assert(html.includes("工作流补全"), "素材页缺少工作流说明面板");
  assert(html.includes("精选排序"), "素材页缺少排序按钮文案");
  assert(appSource.includes("createProjectFromCurrentContext"), "app.js 缺少项目夹创建逻辑");
  assert(appSource.includes("toggle-asset-sort"), "app.js 缺少素材排序交互");
  assert(css.includes(".asset-tools-panel"), "样式中缺少素材工具面板");
}

function checkVersionAndSafety(configSource, indexSource, routerSource) {
  assert(configSource.includes('version: "sparks-v6.5.0"'), "config.js 版本号不是 v6.5.0");
  assert(configSource.includes('authStorageKey: "sparks-v6-5-session"'), "config.js 会话 key 不是 v6.5");
  assert(configSource.includes('supabaseUrl: "https://nyntzzycktnzghaffvzr.supabase.co"'), "supabaseUrl 未同步到当前公开配置");
  assert(configSource.includes('supabaseAnonKey: "sb_publishable_kn_S6ekzdaE_QVjaseSZ7A_gQAz1zRF"'), "supabaseAnonKey 未同步到当前公开配置");
  assert(indexSource.includes('S-parks V6.5 | 创作者工作流平台'), "index.html 标题未同步到 v6.5");
  assert(indexSource.includes('#guide?guide=privacy-policy'), "页脚隐私政策未连接到专题页");
  assert(routerSource.includes('guide: "guide"'), "router.js 缺少 guide 动态参数");
}

function main() {
  const { content, renderers } = loadRuntime();
  const css = fs.readFileSync(cssPath, "utf8");
  const appSource = fs.readFileSync(appPath, "utf8");
  const configSource = fs.readFileSync(configPath, "utf8");
  const indexSource = fs.readFileSync(indexPath, "utf8");
  const routerSource = fs.readFileSync(routerPath, "utf8");
  const state = {
    query: "",
    selectedCategory: "全部",
    assetSort: "featured",
    assetToolsOpen: false,
    sceneTime: "day",
    creatorTab: "works",
    projects: content.projects,
    downloadRecords: content.downloads.records,
    downloadActivity: content.downloads.activity,
    downloadQueue: content.downloads.queue,
    pointsBalance: 10000,
    detailAssetId: content.assets.items[0].id,
    activeCreatorId: "elena-voss",
    activeGuideId: "account-management"
  };

  checkGuides(content, renderers, state, css);
  checkSupport(renderers, content, state, css);
  checkAssets(renderers, content, state, css, appSource);
  checkVersionAndSafety(configSource, indexSource, routerSource);

  console.log("verify-v6: ok");
}

main();
