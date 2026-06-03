/**
 * 排行榜排行类型枚举
 */
export enum LeaderboardRank {
  /**
   * 不限制排行榜
   */
  All = 'All',
  /**
   * 仅包括有日志的排行榜
   */
  WithLogs = 'WithLogs',
  /**
   * 仅包括无日志的排行榜
   */
  NoLogs = 'NoLogs'
}
