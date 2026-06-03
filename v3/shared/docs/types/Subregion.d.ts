import type { Region } from './Region';
import type { ServerPagination } from './ServerPagination';

/**
 * 单个子地区。子地区用于将地区划分为子类别，例如欧洲地区的法国或德国子地区
 */
export interface Subregion {
  /**
   * 子地区的 ID
   */
  id: number;
  /**
   * 子地区的本地化名称
   */
  name: string;
  /**
   * 该子地区所在的地区
   */
  region: Region;
  /**
   * 该子地区中找到的服务器
   */
  servers?: (args?: {
    limit?: number;
    page?: number;
  }) => ServerPagination;
}
