import type { Character } from './Character';

/**
 * 角色分页对象
 */
export interface CharacterPagination {
  /**
   * 本次分页中返回的角色数据
   */
  data?: Character[];
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
