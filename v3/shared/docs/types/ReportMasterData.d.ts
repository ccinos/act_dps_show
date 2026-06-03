import type { JSON } from './JSON';

/**
 * 报告主数据对象，包含所有技能、角色、NPC等信息
 */
export interface ReportMasterData {
  /**
   * 技能数据
   */
  abilities?: JSON;
  /**
   * 角色/演员数据
   */
  actors?: JSON;
  /**
   * 宠物数据
   */
  pets?: JSON;
  /**
   * NPC 数据
   */
  npcs?: JSON;
}
