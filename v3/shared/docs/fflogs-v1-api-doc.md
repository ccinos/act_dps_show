# FF Logs v1 API 完整文档总结

## 基本信息

| 属性 | 值 |
|------|-----|
| 版本 | 1.0.0 |
| 协议 | HTTPS |
| 主机 | www.fflogs.com |
| 基础路径 | /v1 |
| 已弃用状态 | 是 - 该API不再积极开发，推荐使用v2 API |
| v2 API文档 | https://www.archon.gg/ffxiv/articles/help/api-documentation |
| 认证方式 | api_key（API密钥在请求参数中传递） |
| 返回格式 | application/json |

---

## API 接口总览

### 1. Zones 接口

#### GET /zones
获取所有Zone对象数组，每个Zone对应游戏中的一个副本/突袭实例，包含自身的战斗列表。

**响应：** 200 返回Zone对象数组。

---

### 2. Classes 接口

#### GET /classes
获取所有Class对象数组，每个Class对应游戏中的一个职业。

**响应：** 200 返回Class对象数组。

---

### 3. Rankings 排行榜相关接口

#### GET /rankings/encounter/{encounterID}
获取指定战斗的排行榜，包含总计数和EncounterRanking对象数组。

**路径参数：**
- `encounterID` - 战斗ID，从/zones请求中获取

**查询参数：**
| 参数 | 类型 | 说明 |
|------|------|------|
| metric | string | 指标类型：战斗类为speed, execution, feats；角色类为dps, hps, bossdps, tankhps, playerspeed；WoW特有krsi（坦克生存）和progress（公会进度） |
| size | string | 团队规模（仅适用于固定人数团队） |
| difficulty | string | 难度：1=LFR, 2=Flex, 3=Normal, 4=Heroic, 5=Mythic, 10=挑战模式, 100=WildStar/FF |
| partition | integer | 分区，多数副本只有1个 |
| class | integer | 职业ID（角色指标时使用） |
| spec | integer | 专精ID（角色指标时使用） |
| bracket | integer | 分组ID，从/zones获取 |
| server | string | 服务器名（slug格式），需与region同时使用 |
| region | string | 地区缩写（US, EU, KR, TW, CN） |
| page | integer | 页码，默认1 |
| filter | string | 搜索过滤字符串，与网站排行榜页一致 |
| includeCombatantInfo | boolean | 是否包含战斗参与者详细信息（装备、天赋），默认false |
| excludeLeaderboard | boolean | 为true时仅返回有对应日志的排行 |
| hardModeLevel | integer | WoW Classic困难模式等级 |
| externalBuffs | integer | 外部增益过滤：0任意，1需要，2排除 |

#### GET /rankings/character/{characterName}/{serverName}/{serverRegion}
获取指定角色的所有角色排行榜数据数组。

**路径参数：**
- `characterName` - 角色名
- `serverName` - 服务器名
- `serverRegion` - 地区缩写（US, EU, KR, TW, CN）

**查询参数：** zone, encounter, metric, bracket, partition, timeframe, includeCombatantInfo

---

### 4. Parses 分析接口

#### GET /parses/character/{characterName}/{serverName}/{serverRegion}
获取角色在指定zone下所有职业的全部parse数据（不仅仅是排行榜数据）。

**路径参数：** 同上面角色排行榜接口

**查询参数：** zone, encounter, metric, bracket, compare, partition, timeframe, includeCombatantInfo

---

### 5. Reports 报告相关接口

#### GET /reports/guild/{guildName}/{serverName}/{serverRegion}
获取指定公会的报告列表。

**路径参数：**
- `guildName` - 公会名
- `serverName` - 服务器名
- `serverRegion` - 地区缩写

**查询参数：**
- start - 开始时间戳（毫秒级Unix时间，默认0）
- end - 结束时间戳（毫秒级Unix时间，默认当前时间）

#### GET /reports/user/{userName}
获取指定用户个人日志的报告列表。

**路径参数：** userName - 用户名
**查询参数：** start, end（同上）

---

### 6. Report 单报告接口

#### GET /report/fights/{code}
获取指定报告中的所有Fight和参与者信息，每个Fight对应一次Boss尝试。

**路径参数：** code - 报告唯一标识码
**查询参数：** translate - 是否翻译为主机语言（如中文环境返回中文结果）

#### GET /report/events/{view}/{code}
获取指定报告的事件流数据，完全对应网站Events视图。

**路径参数：**
- view - 数据类型：summary, damage-done, damage-taken, healing, casts, summons, buffs, debuffs, deaths, threat, resources, interrupts, dispels
- code - 报告唯一标识码

**大量查询参数：** start, end, hostility, sourceid, sourceinstance, sourceclass, targetid, targetinstance, targetclass, sourceAurasPresent, sourceAurasAbsent, targetAurasPresent, targetAurasAbsent, abilityid, death, options, cutoff, encounter, wipes, difficulty, filter, translate

#### GET /report/tables/{view}/{code}
获取指定报告的表格数据（伤害、治疗、施法汇总等），对应网站Tables面板，注意该API会随网站更新而变化，非完全冻结。

**路径参数：**
- view - 数据类型：summary, damage-done, damage-taken, healing, casts, summons, buffs, debuffs, deaths, survivability, resources, resources-gains
- code - 报告唯一标识码

**查询参数：** start, end, hostility, by, sourceid, sourceinstance, sourceclass, targetid, targetinstance, targetclass, sourceAurasAbsent, targetAurasPresent, targetAurasAbsent, abilityid, options, cutoff, encounter, wipes, difficulty, filter, translate

---

## 数据模型定义

### Zone
| 字段 | 类型 | 说明 |
|------|------|------|
| id | int | 唯一标识符 |
| name | string | 英文名称 |
| frozen | boolean | 排行榜数据是否已冻结 |
| encounters | Encounter[] | 该副本的战斗列表 |
| brackets | any[] | 分组信息数组 |

### Encounter
| 字段 | 说明 |
|------|------|
| id | 战斗ID |
| name | 战斗名称 |

### Class
| 字段 | 说明 |
|------|------|
| id | 职业ID |
| name | 职业名称 |
| specs | 专精列表 |

### EncounterRankings
包含总计数 + EncounterRanking数组

### CharacterRanking
角色排行/parse详情对象，记录单个战斗中的角色表现

### Report
报告对象，包含报告基本信息（代码、标题、时间、主人等）

### Fight
单次Boss尝试数据

### Error
错误信息对象

---

## 使用说明

1. **获取基础信息**：先用`/zones`和`/classes`获取所有副本、战斗、职业、专精的ID映射关系，后续调用依赖这些ID
2. **认证方式**：所有API请求都需要带上`api_key`查询参数传递你的FF Logs API密钥
3. **弃用提醒**：该v1 API不再维护，所有新项目请优先迁移到官方v2 API
