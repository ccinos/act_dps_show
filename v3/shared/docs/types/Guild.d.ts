import type { GuildAttendancePagination } from './GuildAttendancePagination';
import type { CharacterPagination } from './CharacterPagination';
import type { GuildRank } from './GuildRank';
import type { GuildZoneRankings } from './GuildZoneRankings';
import type { GameFaction } from './GameFaction';
import type { Server } from './Server';
import type { GuildTag } from './GuildTag';
import type { Guild } from './Guild';

/**
 * 单个公会。公会获得自己的排行并包含角色。它们可能对应游戏中的公会，或者是为了保存报告和排行而创建的自定义公会
 */
export interface Guild {
  /**
   * 公会的考勤报告。该查询的结果是分页的角色列表。该查询仅适用于可以验证公会名册的游戏，例如不适用于 Classic Warcraft
   */
  attendance?: (args?: {
    guildTagID?: number;
    limit?: number;
    page?: number;
    zoneID?: number;
  }) => GuildAttendancePagination;
  /**
   * 公会是否启用了竞争模式
   */
  competitionMode: boolean;
  /**
   * 公会的描述，与网站上的公会名称一起显示
   */
  description: string;
  /**
   * 公会的阵营
   */
  faction: GameFaction;
  /**
   * 公会的 ID
   */
  id: number;
  /**
   * 公会的名称
   */
  name: string;
  /**
   * 公会所属的服务器
   */
  server: Server;
  /**
   * 公会是否启用了隐身模式
   */
  stealthMode: boolean;
  /**
   * 用于标记报告的标签。在网站 UI 中，这些被称为 raid teams（固定队）
   */
  tags?: GuildTag[];
  /**
   * 特定公会的成员名册
   */
  members?: (args?: {
    limit?: number;
    page?: number;
  }) => CharacterPagination;
  /**
   * 当前用户在公会中的等级。仅在使用 "view-user-profile" 权限通过用户身份验证时可访问
   */
  currentUserRank?: GuildRank;
  /**
   * 公会的副本排行。如果未设置或为 null，则使用最新副本
   */
  zoneRanking?: (args?: {
    zoneId?: number;
  }) => GuildZoneRankings;
  /**
   * 公会的类型。值为 0 表示该公会是 Free Company（自由公司）。值为 1 表示该公会是 Static（固定队）
   */
  type: string;
  /**
   * 该固定队所属的父公会（如果存在）
   */
  parentGuild?: Guild;
  /**
   * 属于该自由公司的固定队集合
   */
  statics: Guild[];
}
