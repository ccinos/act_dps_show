import type { GameMap } from './GameMap';

/**
 * 游戏地图分页对象
 */
export interface GameMapPagination {
  /**
   * 本次分页中返回的地图数据
   */
  data?: GameMap[];
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
