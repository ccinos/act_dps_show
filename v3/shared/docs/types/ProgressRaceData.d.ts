import type { JSON } from './JSON';

/**
 * 获取正在进行的世界首杀或服务器首杀竞速信息
 */
export interface ProgressRaceData {
  /**
   * 竞速数据
   */
  races?: JSON;
}
