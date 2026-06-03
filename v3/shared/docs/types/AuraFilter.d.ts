/**
 * 光环/增益过滤器输入对象，用于筛选特定光环
 */
export interface AuraFilter {
  /**
   * 光环名称列表
   */
  aurasPresent?: string[];
  /**
   * 光环名称列表（不包含）
   */
  aurasAbsent?: string[];
}
