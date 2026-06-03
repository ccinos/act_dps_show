/**
 * 报告组件数据对象
 */
export interface ReportComponentData {
  /**
   * 获取报告组件
   */
  reportComponent?: (args: {
    code: string;
  }) => unknown;
  /**
   * 获取报告组件列表
   */
  reportComponents?: (args?: {
    limit?: number;
    page?: number;
  }) => unknown;
}
