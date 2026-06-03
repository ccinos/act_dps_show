/**
 * 报告组件过滤器输入对象
 */
export interface ReportComponentFilter {
  /**
   * 报告代码
   */
  code?: string;
  /**
   * 报告代码列表
   */
  codes?: string[];
  /**
   * 游戏区域 ID
   */
  gameZoneID?: number;
  /**
   * 游戏区域 ID 列表
   */
  gameZoneIDs?: number[];
  /**
   * 开始时间
   */
  startTime?: number;
  /**
   * 结束时间
   */
  endTime?: number;
  /**
   * 分页页码
   */
  page?: number;
  /**
   * 每页限制
   */
  limit?: number;
}
