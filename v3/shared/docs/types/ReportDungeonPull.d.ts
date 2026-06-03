import type { ReportDungeonPullNPC } from './ReportDungeonPullNPC';

/**
 * 报告地下城拉取对象
 */
export interface ReportDungeonPull {
  /**
   * 拉取 ID
   */
  id?: number;
  /**
   * 拉取名称
   */
  name?: string;
  /**
   * 拉取的开始时间
   */
  startTime?: number;
  /**
   * 拉取的结束时间
   */
  endTime?: number;
  /**
   * 拉取中的 NPC 列表
   */
  npcs?: ReportDungeonPullNPC[];
}
