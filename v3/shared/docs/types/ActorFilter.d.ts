/**
 * 角色/演员过滤器输入对象，用于指定特定演员筛选
 */
export interface ActorFilter {
  /**
   * 演员 ID
   */
  id?: number;
  /**
   * 演员 ID 列表
   */
  ids?: number[];
  /**
   * 演员名称
   */
  name?: string;
  /**
   * 演员名称列表
   */
  names?: string[];
  /**
   * 演员类型
   */
  type?: string;
}
