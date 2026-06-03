/**
 * 职业/类别过滤器输入对象
 */
export interface ClassFilter {
  /**
   * 类别名称
   */
  className?: string;
  /**
   * 类别名称列表
   */
  classNames?: string[];
  /**
   * 专精名称
   */
  specName?: string;
  /**
   * 专精名称列表
   */
  specNames?: string[];
}
