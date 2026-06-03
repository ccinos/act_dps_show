import type { Region } from './Region';
import type { Subregion } from './Subregion';
import type { GuildPagination } from './GuildPagination';
import type { CharacterPagination } from './CharacterPagination';

/**
 * 单个服务器。服务器对应角色和公会所在的实际游戏服务器
 */
export interface Server {
  /**
   * 服务器的 ID
   */
  id: number;
  /**
   * 服务器所属子地区本地化语言中的服务器名称
   */
  name: string;
  /**
   * 规范化名称是名称的转换，去掉空格。它是服务器在魔兽世界日志文件中出现的方式
   */
  normalizedName: string;
  /**
   * 服务器 slug，也是遵循 Blizzard 规则的名称转换。对于正式魔兽世界服务器，该 slug 为英文。对于所有其他游戏，slug 只是名称字段的转换
   */
  slug: string;
  /**
   * 该服务器所属的地区
   */
  region: Region;
  /**
   * 该服务器所属的子地区
   */
  subregion: Subregion;
  /**
   * 在该服务器（以及连接到该服务器的任何服务器）上找到的公会
   */
  guilds?: (args?: {
    limit?: number;
    page?: number;
  }) => GuildPagination;
  /**
   * 在该服务器（以及连接到该服务器的任何服务器）上找到的角色
   */
  characters?: (args?: {
    limit?: number;
    page?: number;
  }) => CharacterPagination;
}
