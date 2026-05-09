# FF Logs v1 API 文档

> **已弃用**: v1 API 已停止活跃开发，新应用请使用 [v2 API](https://www.archon.gg/ffxiv/articles/help/api-documentation)。

- **Base URL**: `https://www.fflogs.com:443/v1`
- **API Version**: 1.0.0
- **Response Content-Type**: `application/json`

---

## 通用数据模型

### Error

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | integer | 否 | HTTP 状态码 |
| error | string | 否 | 错误信息 |

```json
{
  "status": 0,
  "error": "string"
}
```

---

## 1. Zones（副本）

### `GET /zones`

获取 Zone 对象数组。每个 Zone 对应游戏中的一个副本/地下城实例，包含各自的战斗。

#### 响应模型

**Zone**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | integer | 是 | 唯一标识符 |
| name | string | 是 | 副本英文名称 |
| frozen | boolean | 是 | 排名和统计数据是否冻结（若为 true，则结果永不再变，无需重复请求） |
| encounters | Array\<Encounter\> | 是 | 该副本的战斗列表 |
| brackets | Array\<Bracket\> | 否 | 排名分段，排名和统计按每个分段收集 |

**Encounter**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | integer | 是 | 唯一标识符 |
| name | string | 是 | 战斗英文名称 |
| npcID | integer | 否 | NPC ID（仅 WoW），用于 WoW 进度 API |

**Bracket**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | integer | 是 | 唯一标识符 |
| name | string | 是 | 分段说明 |

<details>
<summary>响应示例</summary>

```json
[
  {
    "id": 0,
    "name": "string",
    "frozen": true,
    "encounters": [
      {
        "id": 0,
        "name": "string",
        "npcID": 0
      }
    ],
    "brackets": [
      {
        "id": 0,
        "name": "string"
      }
    ]
  }
]
```
</details>

#### 请求示例

```
https://www.fflogs.com:443/v1/zones?api_key=YOUR_API_KEY
```

---

## 2. Classes（职业）

### `GET /classes`

获取 Class 对象数组。每个 Class 对应游戏中的一个职业。

#### 响应模型

**Class**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | integer | 是 | 唯一标识符 |
| name | string | 是 | 职业英文名称 |
| specs | Array\<Spec\> | 是 | 该职业可用的专精列表 |

**Spec**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | integer | 是 | 唯一标识符 |
| name | string | 是 | 专精英文名称 |

<details>
<summary>响应示例</summary>

```json
[
  {
    "id": 0,
    "name": "string",
    "specs": [
      {
        "id": 0,
        "name": "string"
      }
    ]
  }
]
```
</details>

---

## 3. Rankings（排名）

### `GET /rankings/encounter/{encounterID}`

获取某个战斗的排名数据。返回包含总数量和 EncounterRanking 数组的对象。

#### 路径参数

| 参数 | 类型 | 说明 |
|------|------|------|
| encounterID | integer | 要获取排名的战斗 ID，可通过 `/zones` 获取 |

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| metric | string | 否 | 查询指标。战斗指标: `speed`, `execution`, `feats`；角色指标: `dps`, `hps`, `bossdps`, `tankhps`, `playerspeed`；仅 WoW: `krsi`(坦克生存), `progress`(公会进度) |
| size | string | 否 | 团队规模。仅适用于固定规模副本，灵活规模的副本须省略此参数 |
| difficulty | string | 否 | 难度: 1=LFR, 2=Flex, 3=Normal, 4=Heroic, 5=Mythic, 10=Challenge Mode, 100=WildStar/FF。仅一个难度的副本可省略 |
| partition | integer | 否 | 分区组。大部分副本只有 1 个分区，可省略。Hellfire Citadel 有 2 个分区(1=原版, 2=pre-patch)。Highmaul 和 BRF 有 2 个分区(1=US/EU, 2=Asia) |
| class | integer | 否 | 职业 ID（角色指标时有效），可通过 `/classes` 获取 |
| spec | integer | 否 | 专精 ID（角色指标时有效），可通过 `/classes` 获取 |
| bracket | integer | 否 | 分段 ID。省略或为 0 时检查所有分段。可通过 `/zones` 获取 |
| server | string | 否 | 服务器过滤（需同时指定 region），对应 Blizzard 的 slug 字段 |
| region | string | 否 | 区域缩写，如 `US`, `NA`, `EU` |
| page | integer | 否 | 页码，从 1 开始。默认 1。如 page=2, limit=300，则获取第 301-600 名 |
| filter | string | 否 | 搜索过滤字符串，可限定职业、专精、战斗时长、团队规模等。格式与排名页面使用的字符串一致 |
| includeCombatantInfo | boolean | 否 | 是否包含装备和天赋等战斗者信息，默认 false |
| excludeLeaderboard | boolean | 否 | 为 true 时仅包含有日志记录的排名，否则包含官方排行榜排名 |
| hardModeLevel | integer | 否 | WoW Classic 硬核模式等级。不支持时忽略。-1=任意硬核模式(含普通)，0=普通模式，1-4=不同硬核难度 |
| externalBuffs | integer | 否 | 外部增益过滤。大部分游戏/副本不支持。0=任意，1=必须有外部增益，2=排除外部增益 |

#### 响应模型

**EncounterRankings**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| total | integer | 是 | 符合过滤条件的排名总数 |
| rankings | Array\<EncounterRanking\> | 是 | EncounterRanking 对象数组 |

**EncounterRanking**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 角色名 |
| total | double | 否 | 个人排名的 DPS/HPS 数值 |
| class | long | 否 | 角色职业 |
| spec | long | 否 | 角色专精 |
| guild | string | 否 | 公会名 |
| server | string | 否 | 服务器 |
| region | string | 否 | 区域缩写 |
| duration | double | 否 | 战斗时长（毫秒） |
| startTime | double | 否 | 战斗发生的时间戳（毫秒精度） |
| damageTaken | double | 否 | 战斗中承受的总伤害 |
| deaths | double | 否 | 战斗中死亡人数 |
| itemLevel | double | 否 | 团队平均装等 / 个人角色装等 |
| patch | double | 否 | Challenge Mode 排名所在的补丁版本 |
| reportID | string | 否 | 包含此排名的报告 ID |
| fightID | double | 否 | 报告中对应的战斗 ID |
| team | Array\<TeamMember\> | 否 | Challenge Mode 的队员列表 |
| size | long | 否 | 团队规模（仅灵活规模副本设置） |

**TeamMember**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 角色名 |
| class | long | 否 | 职业 |
| spec | long | 否 | 专精 |

<details>
<summary>响应示例</summary>

```json
{
  "total": 0,
  "rankings": [
    {
      "name": "string",
      "total": 0,
      "class": 0,
      "spec": 0,
      "guild": "string",
      "server": "string",
      "region": "string",
      "duration": 0,
      "startTime": 0,
      "damageTaken": 0,
      "deaths": 0,
      "itemLevel": 0,
      "patch": 0,
      "reportID": "string",
      "fightID": 0,
      "team": [
        {
          "name": "string",
          "class": 0,
          "spec": 0
        }
      ],
      "size": 0
    }
  ]
}
```
</details>

---

### `GET /rankings/character/{characterName}/{serverName}/{serverRegion}`

获取指定角色在所有战斗中的排名数据。

#### 路径参数

| 参数 | 类型 | 说明 |
|------|------|------|
| characterName | string | 角色名 |
| serverName | string | 服务器名（WoW 中为 Blizzard API 返回的 slug 字段） |
| serverRegion | string | 区域缩写: `US`, `EU`, `KR`, `TW`, `CN` |

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| zone | string | 否 | 指定副本。省略则使用最新的开放副本 |
| encounter | string | 否 | 副本中的具体战斗 ID。省略则检查该副本所有战斗 |
| metric | string | 否 | 指标: `dps`, `hps`, `bossdps`, `tankhps`, `playerspeed`；仅 WoW: `krsi` |
| bracket | integer | 否 | 分段 ID。省略或为 0 时检查所有分段 |
| partition | integer | 否 | 分区组 |
| timeframe | string | 否 | `today`(当天排名) 或 `historical`(历史排名)，默认 `today` |
| includeCombatantInfo | boolean | 否 | 是否包含装备/天赋信息，默认 false |

#### 响应模型

**CharacterRanking**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| rank | long | 否 | 排名 |
| outOf | long | 否 | 总解析数。可用 rank/outOf 计算百分比 |
| total | double | 否 | DPS/HPS 数值 |
| class | long | 否 | 职业 |
| spec | long | 否 | 专精 |
| guild | string | 否 | 获得排名时的公会名 |
| duration | double | 否 | 战斗时长（毫秒） |
| startTime | double | 否 | 战斗发生的时间戳（毫秒精度） |
| itemLevel | double | 否 | 角色装等 |
| patch | double | 否 | Challenge Mode 补丁版本 |
| reportID | string | 否 | 包含此排名的报告 ID |
| fightID | double | 否 | 报告中的战斗 ID |
| difficulty | long | 否 | 难度设置 |
| size | long | 否 | 团队规模 |
| estimated | boolean | 否 | 是否为估算排名（超出 500 名截断限制） |

<details>
<summary>响应示例</summary>

```json
[
  {
    "rank": 0,
    "outOf": 0,
    "total": 0,
    "class": 0,
    "spec": 0,
    "guild": "string",
    "duration": 0,
    "startTime": 0,
    "itemLevel": 0,
    "patch": 0,
    "reportID": "string",
    "fightID": 0,
    "difficulty": 0,
    "size": 0,
    "estimated": true
  }
]
```
</details>

---

## 4. Parses（解析）

### `GET /parses/character/{characterName}/{serverName}/{serverRegion}`

获取角色在副本中所有专精的解析数据。包含每一次解析，而不仅仅是上榜的排名。

#### 路径参数

| 参数 | 类型 | 说明 |
|------|------|------|
| characterName | string | 角色名 |
| serverName | string | 服务器名 |
| serverRegion | string | 区域缩写: `US`, `EU`, `KR`, `TW`, `CN` |

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| zone | string | 否 | 副本 ID。省略则使用最新开放副本 |
| encounter | string | 否 | 战斗 ID。省略则检查所有战斗。若指定有效战斗，结果中还会包含该战斗的历史图表数据 |
| metric | string | 否 | 指标: `dps`, `hps`, `bossdps`, `tankhps`, `playerspeed`；仅 WoW: `krsi` |
| bracket | integer | 否 | 分段 ID。省略或为 0 时检查所有分段。特殊值 `-1` 可按分段百分比获取分数，即自动仅查看每条解析所属的分段 |
| compare | integer | 否 | 计算百分比时对比对象：0=排名，1=统计数据。默认 0 |
| partition | integer | 否 | 分区组 |
| timeframe | string | 否 | `today` 或 `historical`，默认 `today` |
| includeCombatantInfo | boolean | 否 | 是否包含装备/天赋信息，默认 false |

#### 响应模型

同 [CharacterRanking](#characterranking)。

<details>
<summary>响应示例</summary>

```json
[
  {
    "rank": 0,
    "outOf": 0,
    "total": 0,
    "class": 0,
    "spec": 0,
    "guild": "string",
    "duration": 0,
    "startTime": 0,
    "itemLevel": 0,
    "patch": 0,
    "reportID": "string",
    "fightID": 0,
    "difficulty": 0,
    "size": 0,
    "estimated": true
  }
]
```
</details>

---

## 5. Reports（报告列表）

### `GET /reports/guild/{guildName}/{serverName}/{serverRegion}`

获取指定公会的报告列表。

#### 路径参数

| 参数 | 类型 | 说明 |
|------|------|------|
| guildName | string | 公会名 |
| serverName | string | 服务器名（WoW 中为 slug 字段） |
| serverRegion | string | 区域缩写: `US`, `EU`, `KR`, `TW`, `CN` |

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| start | integer | 否 | 起始时间（UNIX 时间戳，毫秒精度）。省略则为 0 |
| end | integer | 否 | 结束时间（UNIX 时间戳，毫秒精度）。省略则为当前时间 |

#### 响应模型

**Report**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 否 | 报告代码，可在网站上通过 `/reports/<code>` 查看 |
| title | string | 否 | 报告标题 |
| owner | string | 否 | 上传者用户名 |
| zone | long | 否 | 副本 ID。`-1` 表示未知副本 |
| startTime | double | 否 | 报告起始时间（UNIX 时间戳，毫秒精度） |
| endTime | double | 否 | 报告结束时间（UNIX 时间戳，毫秒精度） |

<details>
<summary>响应示例</summary>

```json
[
  {
    "id": "string",
    "title": "string",
    "owner": "string",
    "zone": 0,
    "startTime": 0,
    "endTime": 0
  }
]
```
</details>

---

### `GET /reports/user/{userName}`

获取指定用户的个人日志报告列表。

#### 路径参数

| 参数 | 类型 | 说明 |
|------|------|------|
| userName | string | 用户名 |

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| start | integer | 否 | 起始时间（UNIX 时间戳，毫秒精度）。省略则为 0 |
| end | integer | 否 | 结束时间（UNIX 时间戳，毫秒精度）。省略则为当前时间 |

#### 响应模型

同 [Report](#report-1)。

---

## 6. Report（单报告详情）

### `GET /report/fights/{code}`

获取报告中的战斗列表及参与者信息。每个 Fight 对应一次 BOSS 尝试。

#### 路径参数

| 参数 | 类型 | 说明 |
|------|------|------|
| code | string | 报告代码 |

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| translate | boolean | 否 | 是否翻译为对应语言（如 cn.warcraftlogs.com 返回中文结果） |

#### 响应模型

同 [Report](#report-1)。

---

### `GET /report/events/{view}/{code}`

获取基于指定视图的事件数据，与网站上的 Events 视图完全对应。

#### 路径参数

| 参数 | 类型 | 说明 |
|------|------|------|
| view | string | 数据类型。支持: `summary`, `damage-done`, `damage-taken`, `healing`, `casts`, `summons`, `buffs`, `debuffs`, `deaths`, `threat`, `resources`, `interrupts`, `dispels` |
| code | string | 报告代码 |

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| start | integer | 否 | 起始时间（距报告开始时间的毫秒数）。省略则为 0 |
| end | integer | 否 | 结束时间（距报告开始时间的毫秒数）。省略则为 0 |
| hostility | integer | 否 | 敌对类型: 0=友方(默认), 1=敌方 |
| sourceid | integer | 否 | 按源 actor ID 过滤。其宠物也会被包含（除非 options 覆盖） |
| sourceinstance | integer | 否 | 按源 actor 实例 ID 过滤。用于查找特定 NPC 实例的所有事件 |
| sourceclass | string | 否 | 按源职业过滤（如 `Mage`） |
| targetid | integer | 否 | 按目标 actor ID 过滤（deaths/survivability/resources 视图不适用） |
| targetinstance | integer | 否 | 按目标 actor 实例 ID 过滤（deaths/survivability/resources 视图不适用） |
| targetclass | string | 否 | 按目标职业过滤（deaths/survivability/resources 视图不适用） |
| sourceAurasPresent | string | 否 | 逗号分隔的光环游戏 ID。仅在源身上存在该光环时匹配 |
| sourceAurasAbsent | string | 否 | 逗号分隔的光环游戏 ID。仅在源身上不存在该光环时匹配 |
| targetAurasPresent | string | 否 | 逗号分隔的光环游戏 ID。仅在目标身上存在该光环时匹配 |
| targetAurasAbsent | string | 否 | 逗号分隔的光环游戏 ID。仅在目标身上不存在该光环时匹配 |
| abilityid | integer | 否 | 按技能 ID 过滤。合并技能(WCL only)使用负数表示。deaths 视图中表示特定击杀技能。resources 视图中表示资源类型，有效类型见 [resource_types](https://www.fflogs.com/reports/resource_types/) |
| death | integer | 否 | 仅用于 deaths 视图。选择时间范围内匹配过滤条件的第 N 次死亡 |
| options | integer | 否 | 包含/排除选项，对应 Damage Done 面板中的 Include Overkill 等选项。deaths/survivability/resources 视图不适用 |
| cutoff | integer | 否 | 死亡截断值。设置后，发生指定次数的死亡后不再检查后续事件 |
| encounter | integer | 否 | 按战斗 ID 过滤，仅考虑特定战斗 |
| wipes | integer | 否 | 设为 1 时仅考虑灭团 |
| difficulty | integer | 否 | 按难度过滤 |
| filter | string | 否 | 用 WCL 表达式语言编写的过滤器。事件必须匹配过滤器才会被包含 |
| translate | boolean | 否 | 是否翻译结果 |

#### 响应模型

同 [Report](#report-1)。

---

### `GET /report/tables/{view}/{code}`

获取按 actor 或技能分组的伤害/治疗/施法总量表格。与网站 Tables 面板完全对应。

> **警告**: 此 API 会随 Tables 面板需求变化而改变，不应视为冻结 API，使用需自担风险。

#### 路径参数

| 参数 | 类型 | 说明 |
|------|------|------|
| view | string | 数据类型。支持: `summary`, `damage-done`, `damage-taken`, `healing`, `casts`, `summons`, `buffs`, `debuffs`, `deaths`, `survivability`, `resources`, `resources-gains` |
| code | string | 报告代码 |

#### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| start | integer | 否 | 起始时间（距报告开始时间的毫秒数）。省略则为 0 |
| end | integer | 否 | 结束时间（距报告开始时间的毫秒数）。省略则为 0 |
| hostility | integer | 否 | 敌对类型: 0=友方(默认), 1=敌方 |
| by | string | 否 | 分组方式: `source`(按源), `target`(按目标), `ability`(按技能)。省略则使用 WCL 默认行为。buffs/debuffs 视图中 `source`=源获得的光环, `target`=源施放的光环。deaths/survivability/resources 视图不适用 |
| sourceid | integer | 否 | 按源 actor ID 过滤。其宠物也会被包含（除非 options 覆盖） |
| sourceinstance | integer | 否 | 按源 actor 实例 ID 过滤 |
| sourceclass | string | 否 | 按源职业过滤 |
| targetid | integer | 否 | 按目标 actor ID 过滤（deaths/survivability/resources 视图不适用） |
| targetinstance | integer | 否 | 按目标 actor 实例 ID 过滤（deaths/survivability/resources 视图不适用） |
| targetclass | string | 否 | 按目标职业过滤（deaths/survivability/resources 视图不适用） |
| sourceAurasAbsent | string | 否 | 逗号分隔的光环游戏 ID。仅在源身上不存在该光环时匹配 |
| targetAurasPresent | string | 否 | 逗号分隔的光环游戏 ID。仅在目标身上存在该光环时匹配 |
| targetAurasAbsent | string | 否 | 逗号分隔的光环游戏 ID。仅在目标身上不存在该光环时匹配 |
| abilityid | integer | 否 | 按技能 ID 过滤。合并技能使用负数。deaths 视图中表示特定击杀技能。resources 视图中为资源类型，有效类型见 [resource_types](https://www.fflogs.com/reports/resource_types/) |
| options | integer | 否 | 包含/排除选项。deaths/survivability/resources 视图不适用 |
| cutoff | integer | 否 | 死亡截断值 |
| encounter | integer | 否 | 按战斗 ID 过滤 |
| wipes | integer | 否 | 设为 1 时仅考虑灭团 |
| difficulty | integer | 否 | 按难度过滤 |
| filter | string | 否 | WCL 表达式过滤器 |
| translate | boolean | 否 | 是否翻译结果 |

#### 响应模型

同 [Report](#report-1)。

---

## 通用响应错误

所有接口在发生意外错误时均返回 `Error` 模型：

| HTTP 状态码 | 原因 | 模型 |
|--------------|------|------|
| default | Unexpected error | [Error](#error) |

---

## 难度值对照

| 值 | 含义 |
|----|------|
| 1 | LFR |
| 2 | Flex |
| 3 | Normal |
| 4 | Heroic |
| 5 | Mythic |
| 10 | Challenge Mode |
| 100 | WildStar / FF |
