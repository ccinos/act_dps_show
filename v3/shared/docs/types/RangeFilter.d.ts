/**
 * 范围过滤器输入对象，用于数值范围筛选
 */
export interface RangeFilter {
  /**
   * 最小值
   */
  min?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 精确值
   */
  exact?: number;
}
