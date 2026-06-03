import type { GameItem } from './GameItem';

/**
 * 游戏物品分页对象
 */
export interface GameItemPagination {
  /**
   * 本次分页中返回的物品数据
   */
  data?: GameItem[];
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
