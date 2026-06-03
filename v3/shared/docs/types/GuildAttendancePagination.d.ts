import type { GuildAttendance } from './GuildAttendance';

/**
 * 公会考勤分页对象
 */
export interface GuildAttendancePagination {
  /**
   * 考勤数据
   */
  data?: GuildAttendance[];
  /**
   * 当前页码
   */
  page?: number;
  /**
   * 每页条目数
   */
  limit?: number;
  /**
   * 总条目数
   */
  total?: number;
}
