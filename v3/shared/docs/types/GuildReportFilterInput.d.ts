/**
 * 公会报告过滤器输入对象
 */
export interface GuildReportFilterInput {
  /**
   * 结束时间
   */
  endTime?: number;
  /**
   * 公会 ID
   */
  guildID?: number;
  /**
   * 公会名称
   */
  guildName?: string;
  /**
   * 公会服务器 Slug
   */
  guildServerSlug?: string;
  /**
   * 公会服务器区域
   */
  guildServerRegion?: string;
  /**
   * 公会标签 ID
   */
  guildTagID?: number;
  /**
   * 用户 ID
   */
  userID?: number;
  /**
   * 限制数量
   */
  limit?: number;
  /**
   * 页码
   */
  page?: number;
  /**
   * 开始时间
   */
  startTime?: number;
  /**
   * 副本区域 ID
   */
  zoneID?: number;
  /**
   * 游戏区域 ID
   */
  gameZoneID?: number;
}
