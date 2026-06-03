import type { Character } from './Character';
import type { CharacterPagination } from './CharacterPagination';

/**
 * CharacterData 对象支持检索单个角色或经过筛选的角色集合
 */
export interface CharacterData {
  /**
   * 通过 ID 或 名称/服务器slug/服务器区域 获取特定角色
   */
  character?: (args?: {
    id?: number;
    name?: string;
    serverSlug?: string;
    serverRegion?: string;
    lodestoneID?: number;
  }) => Character;
  /**
   * 特定公会的角色集合
   */
  characters?: (args: {
    guildID: number;
    limit?: number;
    page?: number;
  }) => CharacterPagination;
}
