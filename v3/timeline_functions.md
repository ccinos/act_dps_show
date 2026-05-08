# 原版 timeline.js vs Vue3 版方法对比清单

> 最后更新: 修复完成

## 修复状态总览

| 优先级 | 方法 | 状态 |
|--------|------|------|
| 🔴 高 | `onMouseWheelScale` + `setTick` | ✅ 已修复 |
| 🔴 高 | `onMouseDrag` - 改为偏移量计算 | ✅ 已修复 |
| 🔴 高 | `clearAll` - 已移植 | ✅ 已修复 |
| 🔴 高 | `checkAbilityTime` - 已移植 | ✅ 已修复 |
| 🔴 高 | `computeSkillTimeCount` + `checkSkillCount` - 已移植 | ✅ 已修复 |
| 🔴 高 | `checkSkillTime` - 恢复count>1积蓄次数逻辑 | ✅ 已修复 |
| 🟡 中 | `onMouseDragSimpleCheck` - 已移植 | ✅ 已修复 |
| 🟡 中 | `scrollOnMouseDrag` - 添加惯性滚动 | ✅ 已修复 |
| 🟡 中 | `skillDurationSliderOnMouseDrag` - 添加fallback | ✅ 已修复 |
| 🟡 中 | `onSvgScroll` - 添加dials.left/height | ✅ 已修复 |
| 🟢 低 | `insertEvent` min/sec 赋值bug | ✅ Vue3已修复（原版bug） |
| 🟡 中 | `computeBuffList` / `clearSelectRange` / `computeLineDataDmg` / `computeCurrentBuff` | ✅ 已修复 |

## 一、已修复的详细说明

### `onMouseWheelScale` + `setTick` (第200-220行)
- **问题**：Vue3直接修改`dials.tick`，缩放时鼠标位置会偏移
- **修复**：移植原版`setTick`函数，缩放时保持鼠标所在时间位置不变
- **新增到return**：`setTick`

### `onMouseDrag` (第222-240行)
- **问题**：Vue3使用`getBoundingClientRect`+`clientY`绝对位置计算，不跟手
- **修复**：改为原版偏移量计算方式(`dy=e.offsetY-drag.lastY`)，使用`y2time(dy)`计算时间增量
- **新增**：所有拖拽handler加上`drag.lastY=e.offsetY`初始化

### `clearAll` (第641-652行)
- **问题**：完全缺失
- **修复**：从原版移植，用于清除全部localStorage数据（处理白屏错误）

### `checkAbilityTime` (第407-420行)
- **问题**：完全缺失
- **修复**：从原版移植，判断能力技CD是否可用

### `computeSkillTimeCount` + `checkSkillCount` (第421-470行)
- **问题**：完全缺失，导致"积蓄次数"技能（如地星、天宫图）无法正常工作
- **修复**：从原版移植完整的多次使用技能逻辑

### `checkSkillTime` (第473-510行)
- **问题**：Vue3版本只做了基础CD检查，移除了`count>1`的积蓄次数逻辑
- **修复**：恢复完整的`checkSkillTime`，包含`count>1`时的`computeSkillTimeCount`/`checkSkillCount`调用

### `onMouseDragSimpleCheck` (第251-254行)
- **问题**：完全缺失
- **修复**：从原版移植，带检查函数的简单拖拽

### `scrollOnMouseDrag` (第267-295行)
- **问题**：Vue3版本无惯性滚动效果
- **修复**：添加原版的惯性滚动逻辑（mouseup后继续减速滚动，使用setInterval每30ms衰减0.97）

### `skillDurationSliderOnMouseDrag` (第265行)
- **问题**：缺少`skill.durationSlideRange`不存在时的fallback
- **修复**：添加`if (!skill.durationSlideRange) { skillOnMouseDrag(...); return; }`

### `onSvgScroll` (第195-202行)
- **问题**：只设置了`dials.top`，缺少`dials.left`和`dials.height`
- **修复**：补充`dials.left = svgContainer.scrollLeft`和`dials.height = svgContainer.clientHeight`

### `insertEvent` 赋值bug
- **原版bug**：第1560行 `if(isNaN(sec)) min=0;` 应该为 `if(isNaN(sec)) sec=0;`
- **Vue3**：已正确写为 `if(isNaN(sec)) sec=0;`，无需修复

### `computeSelectedRangeDmg` + `computeBuffList` + `clearSelectRange` + `computeLineDataDmg` + `computeCurrentBuff` (第303-470行)
- **问题**：Vue3的`computeSelectedRangeDmg`是空函数，伤害计算系统完全缺失
- **修复**：从原版移植完整的框选伤害计算系统，包括Buff列表计算、Dot计算、增伤/减伤计算、盾值计算

## 三、原版全局函数/Vue计算属性/Vue过滤器（参考信息）

### 全局函数

| # | 方法名 | 行号 | 参数 |
|---|--------|------|------|
| 1 | `axios.getUseCache` | 6 | `url, cacheKey` |
| 2 | `Array.prototype.insertSort` | 27 | `obj, handler` |
| 3 | `copy` | 41 | `src, dest` |
| 4 | `save` | 52 | `alldata` |
| 5 | `load` | 55 | 无 |
| 6 | `getFormat` | 2570 | `time` |
| 7 | `formatTime` | 2578 | `time` |
| 8 | `loadUserDefinedData` | 2613 | 无 |

### Vue computed (计算属性)

| # | 属性名 | 行号 |
|---|--------|------|
| 1 | `timelineOffset` | 2324 |
| 2 | `allUserDefinedSkillMap` | 2327 |
| 3 | `userDefinedJobSkillRef` | 2335 |
| 4 | `skillOption` | 2383 |
| 5 | `dialsLines` | 2390 |
| 6 | `svgHeight` | 2419 |
| 7 | `shownSkillInfo` | 2422 |

### Vue filters (过滤器)

| # | 过滤器名 | 行号 | 参数 |
|---|---------|------|------|
| 1 | `timeFormat` | 2437 | `time, fmt` |
| 2 | `skillNameFilter` | 2446 | `skillName` |
