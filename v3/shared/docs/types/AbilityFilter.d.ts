/**
 * 技能/能力过滤器输入对象，用于筛选特定技能
 */
export interface AbilityFilter {
  /**
   * 技能 ID
   */
  id?: number;
  /**
   * 技能 ID 列表
   */
  ids?: number[];
  /**
   * 使用技能 ID
   */
  useAbilityIDs?: boolean;
  /**
   * 使用演员 ID
   */
  useActorIDs?: boolean;
}
