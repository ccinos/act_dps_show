import type { Server } from './Server';

/**
 * 服务器分页对象
 */
export interface ServerPagination {
  /**
   * 本次分页中返回的服务器数据
   */
  data?: Server[];
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
