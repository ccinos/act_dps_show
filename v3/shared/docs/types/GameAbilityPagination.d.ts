import type { GameAbility } from './GameAbility';

/**
 * 游戏技能分页对象
 */
export interface GameAbilityPagination {
  /**
   * 本次分页中返回的技能数据
   */
  data?: GameAbility[];
  /**
   * 当前页码
   */
  page?: number;
  /**
   * 每页条目数
   */
  limit?: number;
  /**
   * 总条目数
   */
  total?: number;
}
