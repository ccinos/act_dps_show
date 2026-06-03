import type { Subregion } from './Subregion';
import type { ServerPagination } from './ServerPagination';

/**
 * 游戏的单个地区
 */
export interface Region {
  /**
   * 地区的 ID
   */
  id: number;
  /**
   * 地区的本地化缩写名称，例如美国用 US
   */
  compactName: string;
  /**
   * 地区的本地化名称
   */
  name: string;
  /**
   * 地区的 slug，在通过服务器查找角色和公会时可用
   */
  slug: string;
  /**
   * 该地区包含的子地区
   */
  subregions?: Subregion[];
  /**
   * 该地区中找到的服务器
   */
  servers?: (args?: {
    limit?: number;
    page?: number;
  }) => ServerPagination;
}
