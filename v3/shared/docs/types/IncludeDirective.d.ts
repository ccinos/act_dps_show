/**
 * GraphQL @include 指令，用于条件性包含字段
 */
export interface IncludeDirective {
  /**
   * 布尔条件，为 true 时包含该字段
   */
  if: boolean;
}
