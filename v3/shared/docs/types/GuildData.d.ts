import type { Guild } from './Guild';
import type { GuildPagination } from './GuildPagination';

/**
 * GuildData 对象支持检索单个公会或经过筛选的公会集合
 */
export interface GuildData {
  /**
   * 通过 ID 或 名称/服务器slug/服务器区域 获取特定公会
   */
  guild?: (args?: {
    id?: number;
    name?: string;
    serverSlug?: string;
    serverRegion?: string;
  }) => Guild;
  /**
   * 网站支持的所有公会集合。可选择性地过滤到特定服务器 ID
   */
  guilds?: (args?: {
    limit?: number;
    page?: number;
    serverID?: number;
    serverSlug?: string;
    serverRegion?: string;
  }) => GuildPagination;
}
