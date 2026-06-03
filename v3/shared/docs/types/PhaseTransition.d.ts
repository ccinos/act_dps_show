/**
 * 阶段转换对象
 */
export interface PhaseTransition {
  /**
   * 阶段编号
   */
  phase?: number;
  /**
   * 转换发生的时间
   */
  startTime?: number;
}
