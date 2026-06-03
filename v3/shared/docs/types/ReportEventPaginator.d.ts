import type { JSON } from './JSON';

/**
 * 报告事件分页器
 */
export interface ReportEventPaginator {
  /**
   * 事件数据
   */
  data?: JSON;
  /**
   * 下一页的开始时间
   */
  nextPageTimestamp?: number;
}
