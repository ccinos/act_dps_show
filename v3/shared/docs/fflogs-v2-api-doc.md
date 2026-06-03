# FF Logs v2 API 文档

## 文档总览
这份文档完整收录了官方 FFLogs v2 API 的内容，包括：
- 完整的 OAuth 2.0 认证体系
- 核心 GraphQL Schema 根查询的完整定义
- 对象类型索引（完整的 TypeScript 定义在 types/ 文件夹中）
- 可直接运行的查询示例代码
- 官方完整的缓存策略与配额管理指南

---

## 第一部分：OAuth 2.0 认证体系

### 1.1 获取 Client ID 和 Client Secret
1. 登录 FF Logs
2. 访问 [客户端管理页面](https://www.fflogs.com/api/clients/)
3. 点击 "Create Client" 创建新客户端
4. 填写客户端名称（该名称会在用户授权时显示给用户）
5. 填写重定向 URI，多个 URI 用逗号分隔，注意转义 URI 内的逗号
6. 点击 Create 完成创建

### 1.2 核心 OAuth URI
| URI | 用途 |
|-----|------|
| 授权地址 | https://www.fflogs.com/oauth/authorize |
| Token 地址 | https://www.fflogs.com/oauth/token |

开发者使用 OAuth 库时，通常需要这四项：**client_id, client_secret, authorize_uri, token_uri**。

### 1.3 三种认证流程详解

#### 流程 1：客户端凭证流（Client Credentials Flow）
- **用途**：访问公共 API，无需用户授权，仅能访问公开信息，不可访问私有报告
- **API 端点**：https://www.fflogs.com/api/v2/client
- **请求方式**：通过 Basic HTTP Auth 传递 client_id 作为用户名，client_secret 作为密码
- **Form Data**：`grant_type=client_credentials`
- **示例 Curl 命令**：
  ```bash
  curl -u {client_id}:{client_secret} -d grant_type=client_credentials https://www.fflogs.com/oauth/token
  ```
- **后续请求头**：`Authorization: Bearer <access_token>`
- **注意事项**：浏览器端应用如使用此流程可能遇到 CORS 限制，建议通过代理服务器获取 Token，或改用 PKCE 流程。

#### 流程 2：授权码流（Authorization Code Flow）
- **用途**：访问私有 API，需用户授权，可获取用户的私有报告等敏感数据
- **API 端点**：https://www.fflogs.com/api/v2/user
- **适用场景**：能安全存储客户端密钥的服务端应用

**第一步 - 获取授权码请求参数：**
| 参数 | 说明 |
|------|------|
| client_id | 开发者的客户端 ID |
| state | 半随机数据串，用于回调时验证 |
| redirect_uri | 用户授权完成后的回调地址 |
| response_type | 必须设为 "code" |

用户授权后会被重定向到 redirect_uri，URL 中会附带 state 和 code 参数。

**第二步 - 用授权码换取 Access Token 的 POST 参数：**
| 参数 | 说明 |
|------|------|
| redirect_uri | 与第一步完全相同的重定向 URI |
| grant_type | 必须为 "authorization_code" |
| code | 第一步获得的授权码 |

**示例 Curl 命令**：
```bash
curl -X POST https://www.fflogs.com/oauth/token \
  -u <client id>:<client secret> \
  -d redirect_uri=<redirect URI used in authorize request> \
  -d grant_type=authorization_code \
  -d code=<authorization code>
```

#### 流程 3：PKCE 码流（PKCE Code Flow）
- **用途**：同样访问私有 API，但适用于无法安全存储客户端密钥的应用（如纯浏览器端 App）
- **API 端点**：https://www.fflogs.com/api/v2/user
- **核心机制**：使用 code_challenge / code_verifier 代替 client_secret

**第一步 - 生成 Code Verifier 和 Code Challenge（PHP 示例）：**
```php
$code_verifier = Str::random(128);
$encoded = base64_encode(hash('sha256', $code_verifier, true));
$codeChallenge = strtr(rtrim($encoded, '='), '+/', '-_');
```
- code_verifier：43-128 位随机字符串，包含字母数字及 `- . _ ~`
- code_challenge：对 verifier 做 SHA256 哈希后，进行 URL 安全的 Base64 编码

**第一步 - 授权码请求参数：**
| 参数 | 说明 |
|------|------|
| client_id | 开发者的客户端 ID |
| code_challenge | 上面生成的 code_challenge |
| code_challenge_method | 必须为 "S256" |
| state | 半随机数据串 |
| redirect_uri | 回调地址 |
| response_type | "code" |

**第二步 - 换取 Access Token 的 POST 参数：**
| 参数 | 说明 |
|------|------|
| client_id | 开发者的客户端 ID |
| code_verifier | 第一步生成的原始 verifier |
| redirect_uri | 回调地址 |
| grant_type | "authorization_code" |
| code | 授权码 |

---

## 第二部分：GraphQL 核心根查询（Root Query）

Schema 定义总入口：
```graphql
schema {
  query: Query
}
```

### 2.1 完整 Query 对象定义
```graphql
type Query {
  # 获取角色数据对象，用于检索单个角色或经过筛选的角色集合
  characterData: CharacterData
  
  # 获取游戏数据对象，其中包含技能、成就、职业、物品、NPC 等静态数据集合
  gameData: GameData
  
  # 获取公会数据对象，用于检索单个公会或经过筛选的公会集合
  guildData: GuildData
  
  # 获取正在进行的世界首杀或服务器首杀竞速信息。当没有竞速活动时此接口返回空。该数据每 30 秒才更新一次，请勿频繁请求
  progressRaceData: ProgressRaceData
  
  # 获取速率限制数据对象，查看当前密钥已消耗了多少点数
  rateLimitData: RateLimitData
  
  # 获取报告数据对象，用于检索单个报告，或按公会/用户筛选报告集合
  reportData: ReportData
  
  # 获取用户对象，用于获取已授权用户的 ID 和用户名
  userData: UserData
  
  # 获取世界数据对象，其中包含所有资料片、地区、子地区、服务器、副本区域、战斗等数据集合
  worldData: WorldData
  
  reportComponentData: ReportComponentData
  systemReportComponentData: ReportComponentData
}
```

---

## 第三部分：对象类型索引

所有完整的数据结构定义都已保存在 `types/` 文件夹中，这里是所有对象的索引，包含简要说明和文件路径。

### 主要对象类型
| 对象名称 | 简要说明 | 文件路径 |
|---------|---------|---------|
| Bracket | 排行分段对象 | [types/Bracket.d.ts](types/Bracket.d.ts) |
| Character | 角色对象 | [types/Character.d.ts](types/Character.d.ts) |
| CharacterData | 角色数据入口对象 | [types/CharacterData.d.ts](types/CharacterData.d.ts) |
| CharacterPagination | 角色分页对象 | [types/CharacterPagination.d.ts](types/CharacterPagination.d.ts) |
| Difficulty | 难度对象 | [types/Difficulty.d.ts](types/Difficulty.d.ts) |
| Encounter | 战斗对象 | [types/Encounter.d.ts](types/Encounter.d.ts) |
| EncounterPhases | 战斗阶段对象 | [types/EncounterPhases.d.ts](types/EncounterPhases.d.ts) |
| Expansion | 资料片对象 | [types/Expansion.d.ts](types/Expansion.d.ts) |
| GameAbility | 游戏技能对象 | [types/GameAbility.d.ts](types/GameAbility.d.ts) |
| GameAbilityPagination | 技能分页对象 | [types/GameAbilityPagination.d.ts](types/GameAbilityPagination.d.ts) |
| GameClass | 游戏职业对象 | [types/GameClass.d.ts](types/GameClass.d.ts) |
| GameData | 游戏静态数据入口对象 | [types/GameData.d.ts](types/GameData.d.ts) |
| GameFaction | 游戏阵营对象 | [types/GameFaction.d.ts](types/GameFaction.d.ts) |
| GameItem | 游戏物品对象 | [types/GameItem.d.ts](types/GameItem.d.ts) |
| GameItemPagination | 物品分页对象 | [types/GameItemPagination.d.ts](types/GameItemPagination.d.ts) |
| GameMap | 游戏地图对象 | [types/GameMap.d.ts](types/GameMap.d.ts) |
| GameMapPagination | 地图分页对象 | [types/GameMapPagination.d.ts](types/GameMapPagination.d.ts) |
| GameZone | 游戏区域对象 | [types/GameZone.d.ts](types/GameZone.d.ts) |
| Guild | 公会对象 | [types/Guild.d.ts](types/Guild.d.ts) |
| GuildAttendance | 公会考勤对象 | [types/GuildAttendance.d.ts](types/GuildAttendance.d.ts) |
| GuildAttendancePagination | 考勤分页对象 | [types/GuildAttendancePagination.d.ts](types/GuildAttendancePagination.d.ts) |
| GuildData | 公会数据入口对象 | [types/GuildData.d.ts](types/GuildData.d.ts) |
| GuildPagination | 公会分页对象 | [types/GuildPagination.d.ts](types/GuildPagination.d.ts) |
| GuildRank | 公会排行对象 | [types/GuildRank.d.ts](types/GuildRank.d.ts) |
| GuildTag | 公会标签对象 | [types/GuildTag.d.ts](types/GuildTag.d.ts) |
| GuildZoneRankings | 公会副本区域排行对象 | [types/GuildZoneRankings.d.ts](types/GuildZoneRankings.d.ts) |
| Partition | 分区对象 | [types/Partition.d.ts](types/Partition.d.ts) |
| PhaseTransition | 阶段转换对象 | [types/PhaseTransition.d.ts](types/PhaseTransition.d.ts) |
| ProgressRaceData | 首杀竞速数据对象 | [types/ProgressRaceData.d.ts](types/ProgressRaceData.d.ts) |
| Query | GraphQL 查询入口对象 | [types/Query.d.ts](types/Query.d.ts) |
| RateLimitData | 速率限制数据对象 | [types/RateLimitData.d.ts](types/RateLimitData.d.ts) |
| Region | 地区对象 | [types/Region.d.ts](types/Region.d.ts) |
| Report | 报告核心对象 | [types/Report.d.ts](types/Report.d.ts) |
| ReportArchiveStatus | 报告归档状态对象 | [types/ReportArchiveStatus.d.ts](types/ReportArchiveStatus.d.ts) |
| ReportComponentData | 报告组件数据对象 | [types/ReportComponentData.d.ts](types/ReportComponentData.d.ts) |
| ReportData | 报告数据入口对象 | [types/ReportData.d.ts](types/ReportData.d.ts) |
| ReportDungeonPull | 副本拉怪对象 | [types/ReportDungeonPull.d.ts](types/ReportDungeonPull.d.ts) |
| ReportDungeonPullNPC | 副本拉怪NPC对象 | [types/ReportDungeonPullNPC.d.ts](types/ReportDungeonPullNPC.d.ts) |
| ReportEventPaginator | 报告事件分页器对象 | [types/ReportEventPaginator.d.ts](types/ReportEventPaginator.d.ts) |
| ReportFight | 单次战斗对象 | [types/ReportFight.d.ts](types/ReportFight.d.ts) |
| ReportFightNPC | 战斗NPC对象 | [types/ReportFightNPC.d.ts](types/ReportFightNPC.d.ts) |
| ReportMap | 报告地图对象 | [types/ReportMap.d.ts](types/ReportMap.d.ts) |
| ReportMapBoundingBox | 报告地图边界框对象 | [types/ReportMapBoundingBox.d.ts](types/ReportMapBoundingBox.d.ts) |
| ReportMasterData | 报告主数据对象 | [types/ReportMasterData.d.ts](types/ReportMasterData.d.ts) |
| ReportPagination | 报告分页对象 | [types/ReportPagination.d.ts](types/ReportPagination.d.ts) |
| Server | 服务器对象 | [types/Server.d.ts](types/Server.d.ts) |
| ServerPagination | 服务器分页对象 | [types/ServerPagination.d.ts](types/ServerPagination.d.ts) |
| Subregion | 子地区对象 | [types/Subregion.d.ts](types/Subregion.d.ts) |
| User | 用户对象 | [types/User.d.ts](types/User.d.ts) |
| UserData | 用户数据入口对象 | [types/UserData.d.ts](types/UserData.d.ts) |
| WorldData | 世界静态数据入口对象 | [types/WorldData.d.ts](types/WorldData.d.ts) |
| Zone | 副本区域对象 | [types/Zone.d.ts](types/Zone.d.ts) |

### 枚举类型
| 枚举名称 | 简要说明 | 文件路径 |
|---------|---------|---------|
| CharacterPageRankingMetricType | 角色页面排行指标枚举 | [types/CharacterPageRankingMetricType.d.ts](types/CharacterPageRankingMetricType.d.ts) |
| CharacterRankingMetricType | 角色排行指标枚举 | [types/CharacterRankingMetricType.d.ts](types/CharacterRankingMetricType.d.ts) |
| EventDataType | 事件数据类型枚举 | [types/EventDataType.d.ts](types/EventDataType.d.ts) |
| ExternalBuffRankFilter | 外部增益排行过滤器枚举 | [types/ExternalBuffRankFilter.d.ts](types/ExternalBuffRankFilter.d.ts) |
| FightRankingMetricType | 战斗排行指标枚举 | [types/FightRankingMetricType.d.ts](types/FightRankingMetricType.d.ts) |
| GraphDataType | 图表数据类型枚举 | [types/GraphDataType.d.ts](types/GraphDataType.d.ts) |
| HardModeLevelRankFilter | 困难模式等级排行过滤器枚举 | [types/HardModeLevelRankFilter.d.ts](types/HardModeLevelRankFilter.d.ts) |
| HostilityType | 敌对类型枚举 | [types/HostilityType.d.ts](types/HostilityType.d.ts) |
| KillType | 击杀类型枚举 | [types/KillType.d.ts](types/KillType.d.ts) |
| LeaderboardRank | 排行榜排行枚举 | [types/LeaderboardRank.d.ts](types/LeaderboardRank.d.ts) |
| RankingCompareType | 排行比较类型枚举 | [types/RankingCompareType.d.ts](types/RankingCompareType.d.ts) |
| RankingTimeframeType | 排行时间范围类型枚举 | [types/RankingTimeframeType.d.ts](types/RankingTimeframeType.d.ts) |
| ReportRankingMetricType | 报告排行指标枚举 | [types/ReportRankingMetricType.d.ts](types/ReportRankingMetricType.d.ts) |
| RoleType | 角色类型枚举 | [types/RoleType.d.ts](types/RoleType.d.ts) |
| TableDataType | 表格数据类型枚举 | [types/TableDataType.d.ts](types/TableDataType.d.ts) |
| ViewType | 视图类型枚举 | [types/ViewType.d.ts](types/ViewType.d.ts) |

### 输入对象类型
| 输入对象名称 | 简要说明 | 文件路径 |
|------------|---------|---------|
| ActorFilter | 角色过滤器 | [types/ActorFilter.d.ts](types/ActorFilter.d.ts) |
| AbilityFilter | 技能过滤器 | [types/AbilityFilter.d.ts](types/AbilityFilter.d.ts) |
| AuraFilter | 光环过滤器 | [types/AuraFilter.d.ts](types/AuraFilter.d.ts) |
| CharacterGameDataFilterInput | 角色游戏数据过滤输入 | [types/CharacterGameDataFilterInput.d.ts](types/CharacterGameDataFilterInput.d.ts) |
| CharacterRankingsFilterInput | 角色排行过滤输入 | [types/CharacterRankingsFilterInput.d.ts](types/CharacterRankingsFilterInput.d.ts) |
| ClassFilter | 职业过滤器 | [types/ClassFilter.d.ts](types/ClassFilter.d.ts) |
| FightFilter | 战斗过滤器 | [types/FightFilter.d.ts](types/FightFilter.d.ts) |
| FightRankingsFilterInput | 战斗排行过滤输入 | [types/FightRankingsFilterInput.d.ts](types/FightRankingsFilterInput.d.ts) |
| GuildAttendanceFilterInput | 公会考勤过滤输入 | [types/GuildAttendanceFilterInput.d.ts](types/GuildAttendanceFilterInput.d.ts) |
| GuildMemberFilterInput | 公会成员过滤输入 | [types/GuildMemberFilterInput.d.ts](types/GuildMemberFilterInput.d.ts) |
| GuildReportFilterInput | 公会报告过滤输入 | [types/GuildReportFilterInput.d.ts](types/GuildReportFilterInput.d.ts) |
| RangeFilter | 范围过滤器 | [types/RangeFilter.d.ts](types/RangeFilter.d.ts) |
| ReportComponentFilter | 报告组件过滤器 | [types/ReportComponentFilter.d.ts](types/ReportComponentFilter.d.ts) |
| ReportEventFilterInput | 报告事件过滤输入 | [types/ReportEventFilterInput.d.ts](types/ReportEventFilterInput.d.ts) |
| ReportGraphFilterInput | 报告图表过滤输入 | [types/ReportGraphFilterInput.d.ts](types/ReportGraphFilterInput.d.ts) |
| ReportRankingsFilterInput | 报告排行过滤输入 | [types/ReportRankingsFilterInput.d.ts](types/ReportRankingsFilterInput.d.ts) |
| ReportTableFilterInput | 报告表格过滤输入 | [types/ReportTableFilterInput.d.ts](types/ReportTableFilterInput.d.ts) |
| TimeFilter | 时间过滤器 | [types/TimeFilter.d.ts](types/TimeFilter.d.ts) |
| ZoneRankingsFilterInput | 副本区域排行过滤输入 | [types/ZoneRankingsFilterInput.d.ts](types/ZoneRankingsFilterInput.d.ts) |

### 指令类型
| 指令名称 | 简要说明 | 文件路径 |
|---------|---------|---------|
| DeprecatedDirective | 废弃指令 | [types/DeprecatedDirective.d.ts](types/DeprecatedDirective.d.ts) |
| IncludeDirective | 包含指令 | [types/IncludeDirective.d.ts](types/IncludeDirective.d.ts) |
| OneOfDirective | 互斥指令 | [types/OneOfDirective.d.ts](types/OneOfDirective.d.ts) |
| SkipDirective | 跳过指令 | [types/SkipDirective.d.ts](types/SkipDirective.d.ts) |
| SpecifiedByDirective | 指定指令 | [types/SpecifiedByDirective.d.ts](types/SpecifiedByDirective.d.ts) |

---

## 第四部分：官方完整缓存与配额管理指南

### 4.1 缓存策略（最重要的优化）
| 数据类型 | 缓存策略 | 说明 |
|----------|----------|------|
| GameData（技能/职业/物品） | **永久缓存** | 仅在游戏大版本补丁时才变化，完全可以永久缓存 |
| 报告元数据（战斗列表/角色列表） | 两级缓存 | - 新报告（最后几小时内有新战斗）：缓存 5-10 分钟<br>- 旧报告：永久缓存 |
| 报告详细数据（事件/表格/图表） | 永久缓存 | 只要 fight 的 inProgress 不为 true，数据完全不会变化 |
| 排行榜/角色/公会数据 | 数小时以上 | 根据你的业务需求决定数据新鲜度 |

### 4.2 请求排队策略
- 速率限制是小时级重置，每整点后点数完全恢复
- 使用队列分散请求，避免在短时间耗尽所有配额
- 为请求设置优先级，低优先级任务（如后台数据）在点数不足时先暂停
- 非关键任务可以安排在非高峰时段执行

### 4.3 配额监控查询
```graphql
query {
  rateLimitData {
    limitPerHour      # 每小时总点数上限
    pointsSpentThisHour  # 当前小时已消耗点数
    pointsResetIn     # 距离点数重置的秒数
  }
}
```

---

## 第五部分：示例代码

### 示例 1：纯 requests 方式获取 Access Token 并查询基础数据
```python
import requests

CLIENT_ID = "YOUR_CLIENT_ID"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"

def get_token():
    resp = requests.post(
        "https://www.fflogs.com/oauth/token",
        auth=(CLIENT_ID, CLIENT_SECRET),
        data={"grant_type": "client_credentials"}
    )
    return resp.json()["access_token"]

def gql_query(token, query, variables=None):
    resp = requests.post(
        "https://www.fflogs.com/api/v2/client",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json={"query": query, "variables": variables}
    )
    return resp.json()

# 获取 Token
token = get_token()
print(f"Token 已获取: {token[:30]}...")

# 获取配额状态
print("\n=== 配额信息 ===")
q_result = gql_query(token, """
query {
  rateLimitData {
    limitPerHour
    pointsSpentThisHour
    pointsResetIn
  }
}
""")
print(q_result)

# 获取所有副本区域
print("\n=== 所有副本列表 ===")
z_result = gql_query(token, """
query {
  worldData {
    zones {
      id
      name
      frozen
    }
  }
}
""")
for z in z_result["data"]["worldData"]["zones"]:
    print(f"  ID: {z['id']}, 名称: {z['name']}, 已冻结: {z['frozen']}")
```

### 示例 2：使用 fflogsapi 库分析报告
```python
# 安装: pip install fflogsapi
from config import CLIENT_ID, CLIENT_SECRET
from fflogsapi import FFLogsClient

client = FFLogsClient(CLIENT_ID, CLIENT_SECRET)

# 获取特定报告
report = client.get_report('rGARYmQwTKbahXz9')

# 遍历战斗
for fight in report:
    print(f'战斗 #{fight.id}: {fight.name()}')
    print(f'  击杀状态: {fight.is_kill()}')
    print(f'  战斗时长: {fight.duration()} 秒')
    
# 保存缓存到本地，大幅降低下次的 API 消耗
client.close()
client.save_cache()
```

---

---

## 第六部分：Javascript 完整示例

> 核心说明：
> - 使用 PKCE 码流
> - 使用公共 CORS 代理服务解决跨域问题

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>FFLogs PKCE Demo - GitHub Pages</title>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body style="max-width: 900px; margin: 40px auto; padding: 0 20px; font-family: system-ui;">
  <h1>FFLogs 角色 Logs 查询 (PKCE 纯前端版)</h1>
  
  <div id="authSection" style="margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h3>步骤 1: 配置信息</h3>
    <div style="margin: 10px 0;">
      <label>Client ID: </label>
      <input id="clientId" type="text" placeholder="你的 Client ID" style="width: 300px; padding: 8px;" />
    </div>
    <div style="margin: 10px 0;">
      <label>CORS 代理 (可选): </label>
      <input id="corsProxy" type="text" placeholder="https://api.allorigins.win/raw?url=" style="width: 300px; padding: 8px;" value="https://api.allorigins.win/raw?url=" />
    </div>
    <button onclick="startPKCEAuth()" style="padding: 10px 24px; font-size: 16px; cursor: pointer; background: #2563eb; color: white; border: none; border-radius: 6px;">
      开始 PKCE 授权
    </button>
  </div>

  <div id="querySection" style="margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; display: none;">
    <h3>步骤 2: 查询公开角色数据</h3>
    <div style="margin: 10px 0;">
      <label>角色名: </label>
      <input id="charName" type="text" placeholder="例如: 阿莉塞" style="width: 200px; padding: 8px;" />
    </div>
    <div style="margin: 10px 0;">
      <label>服务器 Slug: </label>
      <input id="serverSlug" type="text" placeholder="例如: hongyuhaixia" style="width: 200px; padding: 8px;" />
    </div>
    <div style="margin: 10px 0;">
      <label>服务器区域: </label>
      <input id="serverRegion" type="text" placeholder="CN" style="width: 100px; padding: 8px;" value="CN" />
    </div>
    <button onclick="queryCharacterLogs()" style="padding: 10px 24px; font-size: 16px; cursor: pointer; background: #16a34a; color: white; border: none; border-radius: 6px;">
      查询该角色的公开 Logs
    </button>
  </div>

  <div id="log" style="background:#f8fafc;padding:20px;margin-top:20px;white-space:pre-wrap; border-radius:8px; border: 1px solid #e2e8f0; font-family: monospace; font-size: 13px;"></div>

  <script>
    const LOG_KEYS = {
      ACCESS_TOKEN: 'fflogs_pkce_access_token',
      CODE_VERIFIER: 'fflogs_pkce_code_verifier',
      STATE: 'fflogs_pkce_state'
    };

    function addLog(text) {
      document.getElementById('log').textContent += text + '\n';
      console.log(text);
    }

    // ========================================
    // PKCE 核心工具函数 (FFLogs 官方标准实现)
    // ========================================
    
    /**
     * 生成 43-128 位的随机 Code Verifier
     */
    function generateCodeVerifier() {
      const arr = new Uint8Array(64);
      crypto.getRandomValues(arr);
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
      return Array.from(arr).map(n => chars[n % chars.length]).join('');
    }

    /**
     * 生成 Code Challenge: SHA256(verifier) → URL 安全 Base64
     */
    async function generateCodeChallenge(verifier) {
      const encoder = new TextEncoder();
      const data = encoder.encode(verifier);
      const digest = await crypto.subtle.digest('SHA-256', data);
      
      // 转换成 URL 安全的 Base64 (不带填充 =)
      return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    }

    /**
     * 生成随机 State 参数
     */
    function generateState() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // ========================================
    // 开始 PKCE 授权流程第一步：跳转到 FFLogs
    // ========================================
    async function startPKCEAuth() {
      const clientId = document.getElementById('clientId').value.trim();
      if (!clientId) {
        alert('请输入你的 Client ID!');
        return;
      }

      const verifier = generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      const state = generateState();
      
      // 保存到 localStorage，授权回调回来后使用
      localStorage.setItem(LOG_KEYS.CODE_VERIFIER, verifier);
      localStorage.setItem(LOG_KEYS.STATE, state);
      localStorage.setItem('client_id', clientId);

      const redirectUri = window.location.href.split('?')[0]; // 当前页面 URL 作为回调地址
      
      addLog('正在跳转到 FFLogs 授权页面...');
      addLog(`Code Verifier 已生成: ${verifier.substring(0, 20)}...`);
      addLog(`Redirect URI: ${redirectUri}`);

      const authUrl = new URL('https://www.fflogs.com/oauth/authorize');
      authUrl.searchParams.set('client_id', clientId);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('state', state);
      authUrl.searchParams.set('code_challenge', challenge);
      authUrl.searchParams.set('code_challenge_method', 'S256');
      
      window.location.href = authUrl.toString();
    }

    // ========================================
    // 授权回调回来：用 Code 交换 Access Token
    // ========================================
    async function exchangeCodeForToken() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      if (!code) return null; // 没有授权码，说明不是回调回来的

      const verifier = localStorage.getItem(LOG_KEYS.CODE_VERIFIER);
      const savedState = localStorage.getItem(LOG_KEYS.STATE);
      const clientId = localStorage.getItem('client_id');

      if (!verifier || !savedState || state !== savedState) {
        addLog('❌ State 验证失败，可能是 CSRF 攻击!');
        return null;
      }

      const corsProxy = document.getElementById('corsProxy').value.trim();
      const tokenUri = 'https://www.fflogs.com/oauth/token';
      const finalUrl = corsProxy ? corsProxy + encodeURIComponent(tokenUri) : tokenUri;

      addLog('[回调处理] 正在用授权码交换 Access Token...');
      
      const formData = new URLSearchParams();
      formData.append('client_id', clientId);
      formData.append('code', code);
      formData.append('code_verifier', verifier);
      formData.append('grant_type', 'authorization_code');
      formData.append('redirect_uri', window.location.href.split('?')[0]);

      try {
        const resp = await axios.post(finalUrl, formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        if (resp.data.access_token) {
          addLog(`✅ 获取 Token 成功! 有效期: ${resp.data.expires_in} 秒`);
          localStorage.setItem(LOG_KEYS.ACCESS_TOKEN, resp.data.access_token);
          
          // 清理 URL 里的 code 参数，保持页面干净
          window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
          
          return resp.data.access_token;
        } else {
          addLog('❌ Token 响应失败: ' + JSON.stringify(resp.data));
        }
      } catch (err) {
        addLog('❌ 交换 Token 出错: ' + (err.response?.data || err.message));
      }
      return null;
    }

    // ========================================
    // 执行 GraphQL 查询（获取公开角色 Logs）
    // ========================================
    async function queryCharacterLogs() {
      const accessToken = localStorage.getItem(LOG_KEYS.ACCESS_TOKEN);
      if (!accessToken) {
        alert('请先完成 PKCE 授权!');
        return;
      }

      const name = document.getElementById('charName').value.trim();
      const serverSlug = document.getElementById('serverSlug').value.trim();
      const serverRegion = document.getElementById('serverRegion').value.trim();
      const corsProxy = document.getElementById('corsProxy').value.trim();

      const apiUri = 'https://www.fflogs.com/api/v2/user'; // PKCE 使用 /user 端点，公开数据完全可访问
      const finalApiUrl = corsProxy ? corsProxy + encodeURIComponent(apiUri) : apiUri;

      try {
        addLog(`\n查询角色: ${name} @ ${serverSlug} (${serverRegion})`);
        
        const result = await axios.post(finalApiUrl, {
          query: `
            query ($name: String!, $serverSlug: String!, $serverRegion: String!) {
              characterData {
                character(name: $name, serverSlug: $serverSlug, serverRegion: $serverRegion) {
                  id
                  name
                  canonicalID
                  server { name region { name } }
                  recentReports(limit: 15) {
                    data {
                      code
                      title
                      startTime
                      endTime
                      zone { name }
                    }
                  }
                }
              }
            }
          `,
          variables: { name, serverSlug, serverRegion }
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const data = result.data;
        if (data.errors) throw new Error(JSON.stringify(data.errors));

        const char = data.data.characterData.character;
        if (!char) {
          addLog('❌ 未找到该角色');
          return;
        }

        addLog(`\n✅ 角色找到! ID: ${char.id}, 服务器: ${char.server.name}`);
        addLog(`\n📋 该角色公开报告列表 (${char.recentReports.data.length} 份):`);
        
        char.recentReports.data.forEach((r, i) => {
          const time = new Date(r.startTime).toLocaleString('zh-CN');
          addLog(`  [${i+1}] ${r.code} → ${r.title} | 副本: ${r.zone?.name || '-'} | ${time}`);
        });

        addLog('\n🎉 全部查询完成!');
        
      } catch (err) {
        addLog('❌ 查询出错: ' + (err.response?.data || err.message));
      }
    }

    // ========================================
    // 页面加载时检查是否是授权回调
    // ========================================
    window.onload = async function () {
      document.getElementById('log').textContent = '';
      
      const existingToken = localStorage.getItem(LOG_KEYS.ACCESS_TOKEN);
      
      if (window.location.search.includes('code=')) {
        addLog('检测到授权回调，正在处理...');
        const newToken = await exchangeCodeForToken();
        if (newToken) {
          document.getElementById('querySection').style.display = 'block';
        }
      } else if (existingToken) {
        addLog('✅ 已从本地存储恢复 Access Token');
        document.getElementById('querySection').style.display = 'block';
      }
    };
  </script>
</body>
</html>
```


## 第七部分：完整 Schema 文档在线入口
- 官方完整在线 Schema：https://www.fflogs.com/v2-api-docs/ff/
- 推荐 GraphQL 客户端：Altair GraphQL（https://altairgraphql.dev/）
