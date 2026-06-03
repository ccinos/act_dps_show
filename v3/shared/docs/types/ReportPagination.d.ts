import type { Report } from './Report';

/**
 * 报告分页对象
 */
export interface ReportPagination {
  /**
   * 本次分页中返回的报告数据
   */
  data?: Report[];
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
