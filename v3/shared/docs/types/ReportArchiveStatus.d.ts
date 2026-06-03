/**
 * 报告归档状态对象
 */
export interface ReportArchiveStatus {
  /**
   * 是否已归档
   */
  isArchived: boolean;
  /**
   * 归档日期
   */
  archiveDate?: number;
}
