import type { Guild } from './Guild';

/**
 * 公会分页对象
 */
export interface GuildPagination {
  /**
   * 本次分页中返回的公会数据
   */
  data?: Guild[];
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
