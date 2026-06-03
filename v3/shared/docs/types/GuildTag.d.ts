import type { Guild } from './Guild';

/**
 * 特定公会的标签。标签可用于对公会内的报告进行分类。在网站 UI 中，它们被称为报告标签
 */
export interface GuildTag {
  /**
   * 标签的 ID
   */
  id: number;
  /**
   * 标签所属的公会
   */
  guild: Guild;
  /**
   * 标签的名称
   */
  name: string;
}
