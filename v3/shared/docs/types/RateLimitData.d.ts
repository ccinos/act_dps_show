/**
 * 速率限制数据对象，查看当前密钥已消耗了多少点数
 */
export interface RateLimitData {
  /**
   * 每小时总点数上限
   */
  limitPerHour: number;
  /**
   * 当前小时已消耗点数
   */
  pointsSpentThisHour: number;
  /**
   * 距离点数重置的秒数
   */
  pointsResetIn: number;
}
