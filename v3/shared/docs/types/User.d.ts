import type { Guild } from './Guild';
import type { Character } from './Character';

/**
 * 网站的单个用户。大多数字段仅在以该用户身份通过 "view-user-profile" 权限进行身份验证时才可访问
 */
export interface User {
  /**
   * 用户的 ID
   */
  id: number;
  /**
   * 用户的名称
   */
  name: string;
  /**
   * 用户的头像，通常是主角色头像
   */
  avatar: string;
  /**
   * 用户所属的公会列表。仅在拥有 "view-user-profile" 权限通过用户身份验证时才可访问
   */
  guilds?: Guild[];
  /**
   * 该用户认领的角色。仅在拥有 "view-user-profile" 权限通过用户身份验证时才可访问
   */
  characters?: Character[];
}
