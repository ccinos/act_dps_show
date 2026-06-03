/**
 * 公会考勤过滤器输入对象
 */
export interface GuildAttendanceFilterInput {
  /**
   * 公会标签 ID
   */
  guildTagID?: number;
  /**
   * 限制数量
   */
  limit?: number;
  /**
   * 页码
   */
  page?: number;
  /**
   * 副本区域 ID
   */
  zoneID?: number;
}
