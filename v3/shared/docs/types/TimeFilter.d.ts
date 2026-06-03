/**
 * 时间过滤器输入对象，用于指定时间范围筛选
 */
export interface TimeFilter {
  /**
   * 开始时间（毫秒级时间戳）
   */
  startTime?: number;
  /**
   * 结束时间（毫秒级时间戳）
   */
  endTime?: number;
  /**
   * 相对开始时间
   */
  relativeStartTime?: number;
  /**
   * 相对结束时间
   */
  relativeEndTime?: number;
}
