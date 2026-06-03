/**
 * GraphQL @skip 指令，用于条件性跳过字段
 */
export interface SkipDirective {
  /**
   * 布尔条件，为 true 时跳过该字段
   */
  if: boolean;
}
