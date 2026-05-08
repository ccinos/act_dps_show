# Ccino DPS Show v3

**v3** 是 Ccino DPS Show 的迁移版本，基于 **Vue 3 + Vue Router 4** 完全重写

---

## 快速开始

### 使用方式（ACT 悬浮窗）

1. 打开 ACT → 插件 → 伤害统计美化
2. 美化模板路径填写 `https://ccinos.gitee.io/act_dps_show/v3/`
3. 点击重新加载

### 直接访问

将 `v3/index.html` 拖入浏览器，或通过本地 Web 服务器访问 `v3/` 目录。

### 路由导航

| 路径 | 功能 |
|------|------|
| `#/dps` | DPS 实时统计悬浮窗（默认页） |
| `#/timeline` | 技能时间轴分析 |
| `#/log-tool` | log分析工具 |

---

## 目录结构总览

```
v3/
├── index.html                     # 入口 HTML，加载所有资源
├── css/                           # 样式文件
├── fonts/                         # Glyphicons 字体图标
├── js/                            # JavaScript 源码
│   ├── app.js                     # Vue 应用入口，路由配置
│   ├── components/                # 全局 UI 组件
│   ├── composables/               # 可组合函数 (Composables)
│   └── views/                     # 页面视图组件
├── lib/                           # 第三方库
└── shared/                        # 共享模块
    ├── common.js                  # 全局工具函数
    ├── overlay-plugin.js          # OverlayPlugin 通信层
    ├── timeline_lang.js           # 多语言技能名称数据
    ├── log_config.js              # ACT 日志配置与副本列表
    └── data/                      # 职业技能数据
        ├── index.js               # 技能数据动态加载器
        ├── roleSkills.js          # 职能共用技能列表
        └── official/              # 各职业技能官方数据
```

---

## 各模块详细说明

### 入口文件

#### [index.html](./index.html)

- 项目唯一 HTML 页面
- 使用 `<router-view>` 通过 Hash 路由切换各视图
- 按顺序加载所有 JS 依赖：共享工具 → 通信层 → 数据加载器 → 第三方库 → 组件 → 视图 → 应用入口

---

### 样式 (css/)

| 文件 | 用途 |
|------|------|
| [bootstrap.min.css](./css/bootstrap.min.css) | Bootstrap 3 精简版，提供基础布局和表格样式 |
| [shared.css](./css/shared.css) | 全局公共样式（全局重置、滚动条、通用类） |
| [dps-overlay.css](./css/dps-overlay.css) | DPS 悬浮窗专用样式 |
| [timeline.css](./css/timeline.css) | 时间轴页面专用样式 |
| [settings.css](./css/settings.css) | 设置页面专用样式 |
| [ccino-select.css](./css/ccino-select.css) | 自定义下拉选择框组件样式 |
| [ccino-switch.css](./css/ccino-switch.css) | 自定义开关组件样式 |

---

### 图标字体 (fonts/)

- **glyphicons-halflings-regular** — Bootstrap 配套的 Glyphicons Halflings 图标字体（.eot / .svg / .ttf / .woff / .woff2）

---

### JavaScript 源码 (js/)

#### 应用入口

##### [app.js](./js/app.js)

- Vue 3 应用启动入口
- 配置 Hash 路由（`createWebHashHistory`）及以下路由表：

  | 路径 | 视图组件 | 说明 |
  |------|----------|------|
  | `/` | — | 重定向到 `/dps` |
  | `/dps` | `DpsOverlay` | DPS 统计悬浮窗 |
  | `/dps/setting` | `DpsSettings` | DPS 悬浮窗设置 |
  | `/simple-dps` | `SimpleDPS` | 简易 DPS 显示 |
  | `/timeline` | `Timeline` | 技能时间轴 |
  | `/simple-timeline` | `SimpleTimeline` | 简易时间轴 |
  | `/log-tool` | `LogTool` | 日志分析工具（多人对比） |
  | `/log-tool-single` | `LogToolSingle` | 日志分析工具（单人） |
  | `/log-tool-single/setting` | `LogsSettings` | 日志工具设置 |

- 全局注册自定义组件 `ccino-select` 和 `ccino-switch`

#### 可组合函数 (composables/)

##### [useOverlayData.js](./js/composables/useOverlayData.js)

- **用途**：实时战斗数据获取与状态管理
- **功能**：
  - 支持 WebSocket 直连（`HOST_PORT` 参数）和 OverlayPlugin 事件两种数据源
  - 暴露 `encounter`（副本信息）、`isActive`（战斗状态）、`combatants`（队员列表）、`yourData`（自身数据）、`resizable`（窗口锁定状态）
  - 每秒更新一次数据（`setInterval` 节流）

##### [useLocalStorage.js](./js/composables/useLocalStorage.js)

- **用途**：localStorage 持久化存储
- **功能**：将 ref 数据自动同步到 `localStorage`，支持深层监听（`deep: true`）
- **用法示例**：`const data = useLocalStorage('key', defaultValue)`

##### [useWindowPopup.js](./js/composables/useWindowPopup.js)

- **用途**：弹窗窗口管理
- **功能**：
  - `openPopup(routeHash, width, height)` — 打开指定路由的新窗口
  - `pollClosed(onClosed)` — 轮询检测弹窗是否关闭
  - `closePopup()` — 清理资源

#### 全局 UI 组件

##### [ccino-switch.js](./js/components/ccino-switch.js)

- **用途**：开关切换组件
- **Props**：`modelValue` (Boolean)
- **事件**：`update:modelValue` / `change`
- **特性**：点击切换开/关状态，配合 `ccino-switch.css` 样式

##### [ccino-select.js](./js/components/ccino-select.js)

- **用途**：自定义下拉选择框组件
- **Props**：`options` (Array) / `modelValue`
- **事件**：`update:modelValue` / `change`
- **特性**：支持 slot 自定义选项渲染和选中值显示

#### 页面视图 (views/)

##### [dps-overlay.js](./js/views/dps-overlay.js)

- **用途**：**DPS 统计悬浮窗主视图**（`#/dps`）
- **功能**：
  - 实时展示队伍 DPS、HPS、暴击率、直击率、死亡次数等
  - 支持多数据系列切换（伤害/奶量）
  - 支持按职业排序、自定义配色、数据条显示
  - 双击标题栏打开设置页面
  - 迷你模式（折叠详情）

##### [dps-settings.js](./js/views/dps-settings.js)

- **用途**：DPS 悬浮窗设置页（`#/dps/setting`）
- **功能**：提供 DPS 悬浮窗的详细配置选项（字体、颜色、列显隐等）

##### [simple-dps.js](./js/views/simple-dps.js)

- **用途**：简易 DPS 显示（`#/simple-dps`）
- **功能**：极简布局，仅显示队伍总 DPS 和每人 DPS，适合只需要基础数据的场景

##### [timeline.js](./js/views/timeline.js)

- **用途**：**技能时间轴分析核心视图**（`#/timeline`）
- **功能**：
  - 技能选择：从预设或自定义技能列表中选取待追踪的技能
  - 数据导入：支持从 **ffxivlogs 在线日志** 或 **ACT 本地 .log 文件** 导入战斗数据
  - 时间轴渲染：以图形化方式展示技能施放序列
  - 事件对齐：支持按事件/GCD/能力技对齐时间轴
  - 批量导入/导出：支持文本批量操作事件和技能轴

##### [simple-timeline.js](./js/views/simple-timeline.js)

- **用途**：简易时间轴视图（`#/simple-timeline`）
- **功能**：简化版时间轴展示，轻量级使用场景

##### [log-tool.js](./js/views/log-tool.js)

- **用途**：日志分析工具 — 多人对比模式（`#/log-tool`）
- **功能**：对比分析多个玩家的技能施放数据

##### [log-tool-single.js](./js/views/log-tool-single.js)

- **用途**：日志分析工具 — 单人模式（`#/log-tool-single`）

##### [logs-settings.js](./js/views/logs-settings.js)

- **用途**：日志工具设置页（`#/log-tool-single/setting`）

---

### 第三方库 (lib/)

| 文件 | 说明 |
|------|------|
| [vue.global.js](./lib/vue.global.js) | Vue 3 全局构建版（开发调试用） |
| [vue.global.prod.js](./lib/vue.global.prod.js) | Vue 3 全局构建版（生产用） |
| [vue-router.global.prod.js](./lib/vue-router.global.prod.js) | Vue Router 4 全局构建版 |
| [axios.min.js](./lib/axios.min.js) | HTTP 客户端（用于 ffxivlogs API 调用） |

---

### 共享模块 (shared/)

#### [common.js](./shared/common.js)

- **用途**：全局工具函数
- **提供**：
  - `padLeft(s, c, length)` — 字符串前补字符
  - `mergeObj(dest, src)` — 深度合并对象
  - `formatDate(date, fmt)` — 日期格式化
  - 百度统计（区分 Gitee / 其他环境）

#### [overlay-plugin.js](./shared/overlay-plugin.js)

- **用途**：OverlayPlugin / WebSocket 通信层
- **功能**：
  - 自动检测连接方式：优先 `OVERLAY_WS` WebSocket，降级到 OverlayPlugin API
  - 提供 `addOverlayListener(event, cb)` — 订阅 ACT 事件
  - 提供 `callOverlayHandler(msg)` — 向 ACT 发送请求
  - 提供 `dispatchOverlayEvent(msg)` — 手动派发事件
  - 自动重连机制（WebSocket 断开后 300ms 重试）
- **职业工具**：`Util` 对象提供职业判断工具（`jobToRole`、`isTankJob`、`isHealerJob` 等）

#### [timeline_lang.js](./shared/timeline_lang.js)

- **用途**：技能多语言名称数据库
- **内容**：包含大量 FFXIV 技能的中、英、日、德、法五语言名称映射（`skillLangData` 数组），用于时间轴显示时的语言切换

#### [log_config.js](./shared/log_config.js)

- **用途**：ACT 日志解析配置
- **内容**：
  - `jobNameCnToType` — 职业中文名 → 英文缩写映射
  - `zoneList` — 副本列表（含 ID、名称、遭遇战列表、分档配置），用于日志解析时的时间范围分段

#### 数据层 (data/)

##### [index.js](./shared/data/index.js)

- **用途**：职业技能数据动态加载器
- **功能**：
  - `loadSkillData()` — 动态从 `official/` 文件夹加载所有职业技能脚本
  - 将官方 JSON 数据转换为内部统一格式（提取威力/CD/持续时间/减伤/增伤等字段）
  - 返回 5 个数据集合：`allSkills`、`allSkillMap`、`jobTypeSkill`、`jobSkill`、`jobTypeJob`
  - 支持缓存：已加载或加载中时返回同一 Promise
  - 智能路径解析：自动从当前 URL 推断数据文件路径
- **工具函数**：`getNum`、`getDmg`、`getDot`、`getDur`、`getReduceDmg` 等威力/效果解析器

##### [roleSkills.js](./shared/data/roleSkills.js)

- **用途**：职能共用技能列表（自动生成）
- **内容**：按职能分类（奶妈/远敏/魔法/坦克/近战）列出各职能通用技能名称

##### official/ — 20 个职业技能数据

| 文件 | 职业 | 文件 | 职业 |
|------|------|------|------|
| [paladin.js](./shared/data/official/paladin.js) | 骑士 | [warrior.js](./shared/data/official/warrior.js) | 战士 |
| [darkknight.js](./shared/data/official/darkknight.js) | 暗黑骑士 | [gunbreaker.js](./shared/data/official/gunbreaker.js) | 绝枪战士 |
| [whitemage.js](./shared/data/official/whitemage.js) | 白魔法师 | [scholar.js](./shared/data/official/scholar.js) | 学者 |
| [astrologian.js](./shared/data/official/astrologian.js) | 占星术士 | [sage.js](./shared/data/official/sage.js) | 贤者 |
| [monk.js](./shared/data/official/monk.js) | 武僧 | [dragoon.js](./shared/data/official/dragoon.js) | 龙骑士 |
| [ninja.js](./shared/data/official/ninja.js) | 忍者 | [samurai.js](./shared/data/official/samurai.js) | 武士 |
| [reaper.js](./shared/data/official/reaper.js) | 钐镰客 | [viper.js](./shared/data/official/viper.js) | 蝰蛇剑士 |
| [bard.js](./shared/data/official/bard.js) | 诗人 | [machinist.js](./shared/data/official/machinist.js) | 机工士 |
| [dancer.js](./shared/data/official/dancer.js) | 舞者 | [blackmage.js](./shared/data/official/blackmage.js) | 黑魔法师 |
| [summoner.js](./shared/data/official/summoner.js) | 召唤师 | [redmage.js](./shared/data/official/redmage.js) | 赤魔法师 |
| [pictomancer.js](./shared/data/official/pictomancer.js) | 绘灵法师 | | |

每个文件包含对应职业的全部技能数据，字段说明：
- `name` — 技能名称
- `classification` — 技能类型（战技/能力/魔法）
- `cast` — 咏唱时间
- `recast` — 复唱时间
- `cost` — 消耗
- `content` — 技能效果描述（含威力、持续时间等）
- `distant`/`range` — 距离/范围

---

## 数据流架构

```
ACT (实战)
   │
   ├── WebSocket ──→ useOverlayData (composable) ──→ Views (DPS / Timeline)
   │
   └── OverlayPlugin API
          │
          └── overlay-plugin.js (通信层)
                  │
                  ├── addOverlayListener('CombatData', cb)
                  ├── callOverlayHandler(msg)
                  └── dispatchOverlayEvent(msg)

职业技能数据
   │
   └── shared/data/index.js (loadSkillData)
           │
           ├── shared/data/official/*.js (20个职业官方数据)
           └── shared/data/roleSkills.js (职能共用技能)

日志导入
   │
   ├── ffxivlogs.cn API ──→ axios ──→ Timeline 视图
   └── ACT .log 文件 ──→ 本地解析 ──→ Timeline 视图
```

---

## 主要功能特性

1. **实时 DPS 监控** — 通过 WebSocket/OverlayPlugin 获取战斗数据，支持多种数据维度展示
2. **技能时间轴** — 可视化展示技能施放序列，支持对齐、筛选、拖拽排序
3. **日志导入分析** — 支持 ffxivlogs 在线日志和 ACT 本地日志文件的导入与解析
4. **职业技能数据库** — 内置 20 个职业的官方技能数据，支持自定义技能
5. **多语言支持** — 技能名称支持中/英/日/德/法五种语言
6. **弹窗分离** — 设置页可独立弹窗显示，不影响主悬浮窗

---

## 与旧版的主要区别

| 特性 | v3 | 旧版 |
|------|----|------|
| 前端框架 | Vue 3 + Vue Router 4 | 原生 JS |
| 路由管理 | Hash 路由多页面 | 单页面 |
| 组件化 | 自定义组件（开关、下拉框） | 无 |
| 技能数据 | 20 个职业官方数据动态加载 | 有限数据 |
| 日志导入 | 支持 ffxivlogs + ACT .log | 有限/不支持 |
| 代码架构 | composables 分离逻辑 | 逻辑耦合 |
