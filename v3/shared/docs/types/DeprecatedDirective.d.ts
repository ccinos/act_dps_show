/**
 * GraphQL @deprecated 指令，用于标记已弃用的字段或枚举值
 */
export interface DeprecatedDirective {
  /**
   * 弃用说明信息
   */
  reason?: string;
}
