import type { Character } from './Character';

/**
 * 公会内特定报告的考勤信息
 */
export interface GuildAttendance {
  /**
   * 报告代码
   */
  reportCode?: string;
  /**
   * 参与角色列表
   */
  characters?: Character[];
  /**
   * 参与人数
   */
  attendanceCount?: number;
}
