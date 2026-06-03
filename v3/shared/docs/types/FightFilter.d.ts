/**
 * 战斗过滤器输入对象，用于筛选特定战斗
 */
export interface FightFilter {
  /**
   * 战斗 ID
   */
  id?: number;
  /**
   * 战斗 ID 列表
   */
  ids?: number[];
  /**
   * 难度 ID
   */
  difficulty?: number;
  /**
   * 副本区域 ID
   */
  encounterID?: number;
  /**
   * 击杀类型
   */
  killType?: number;
}
