import type { CharacterData } from './CharacterData';
import type { GameData } from './GameData';
import type { GuildData } from './GuildData';
import type { ProgressRaceData } from './ProgressRaceData';
import type { RateLimitData } from './RateLimitData';
import type { ReportData } from './ReportData';
import type { UserData } from './UserData';
import type { WorldData } from './WorldData';
import type { ReportComponentData } from './ReportComponentData';

/**
 * 根查询对象
 */
export interface Query {
  /**
   * 获取角色数据对象，用于检索单个角色或经过筛选的角色集合
   */
  characterData: CharacterData;
  /**
   * 获取游戏数据对象，其中包含技能、成就、职业、物品、NPC 等静态数据集合
   */
  gameData: GameData;
  /**
   * 获取公会数据对象，用于检索单个公会或经过筛选的公会集合
   */
  guildData: GuildData;
  /**
   * 获取正在进行的世界首杀或服务器首杀竞速信息。当没有竞速活动时此接口返回空。该数据每 30 秒才更新一次，请勿频繁请求
   */
  progressRaceData: ProgressRaceData;
  /**
   * 获取速率限制数据对象，查看当前密钥已消耗了多少点数
   */
  rateLimitData: RateLimitData;
  /**
   * 获取报告数据对象，用于检索单个报告，或按公会/用户筛选报告集合
   */
  reportData: ReportData;
  /**
   * 获取用户对象，用于获取已授权用户的 ID 和用户名
   */
  userData: UserData;
  /**
   * 获取世界数据对象，其中包含所有资料片、地区、子地区、服务器、副本区域、战斗等数据集合
   */
  worldData: WorldData;
  /**
   * 报告组件数据
   */
  reportComponentData: ReportComponentData;
  /**
   * 系统报告组件数据
   */
  systemReportComponentData: ReportComponentData;
}
