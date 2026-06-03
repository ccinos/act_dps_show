import type { CharacterPagination } from './CharacterPagination';
import type { Guild } from './Guild';
import type { ReportPagination } from './ReportPagination';
import type { CharacterPageRankingMetricType } from './CharacterPageRankingMetricType';
import type { CharacterRankingMetricType } from './CharacterRankingMetricType';
import type { RankingCompareType } from './RankingCompareType';
import type { RankingTimeframeType } from './RankingTimeframeType';
import type { RoleType } from './RoleType';
import type { Server } from './Server';
import type { JSON } from './JSON';

/**
 * 玩家角色。角色可以获得个人排行并出现在报告中
 */
export interface Character {
  /**
   * 角色的规范 ID。如果角色改名或转服，可以使用规范 ID 识别角色的最新版本
   */
  canonicalID: number;
  /**
   * 当前用户是否认领了该角色。仅在通过用户 API 访问且拥有 "view-user-profile" 权限时可访问
   */
  claimed?: boolean;
  /**
   * 角色的排行信息，可按特定副本、Boss、指标等过滤。该数据不视为冻结，可能随时变化。使用风险自负
   */
  encounterRankings?: (args?: {
    byBracket?: boolean;
    className?: string;
    compare?: RankingCompareType;
    difficulty?: number;
    encounterID: number;
    includeCombatantInfo?: boolean;
    includeOtherPlayers?: boolean;
    includeHistoricalGraph?: boolean;
    includePrivateLogs?: boolean;
    metric?: CharacterRankingMetricType;
    partition?: number;
    role?: RoleType;
    size?: number;
    specName?: string;
    timeframe?: RankingTimeframeType;
  }) => JSON;
  /**
   * 角色的缓存游戏数据，如装备。该数据从适当的来源获取（WoW 为 Blizzard API，FF 为 Lodestone）。该调用仅返回数据的缓存副本，不会主动去 Blizzard 或 Lodestone 获取新副本
   */
  gameData?: (args?: {
    specID?: number;
    forceUpdate?: boolean;
  }) => JSON;
  /**
   * 角色在其主公会中的公会等级。这不是网站上的用户等级，而是根据游戏数据的等级，例如 Warcraft 公会等级或 FFXIV 自由公司等级
   */
  guildRank: number;
  /**
   * 角色所属的所有公会
   */
  guilds?: Guild[];
  /**
   * 角色是否隐藏了所有排行
   */
  hidden: boolean;
  /**
   * 角色的 ID
   */
  id: number;
  /**
   * 角色的 Lodestone ID。可用于在 Lodestone 上获取角色信息
   */
  lodestoneID?: number;
  /**
   * 角色的名称
   */
  name: string;
  /**
   * 角色的最近报告
   */
  recentReports?: (args?: {
    limit?: number;
    page?: number;
  }) => ReportPagination;
  /**
   * 角色所属的服务器
   */
  server: Server;
  /**
   * 角色的排行信息，可按特定副本、Boss、指标等过滤。该数据不视为冻结，可能随时变化。使用风险自负
   */
  zoneRankings?: (args?: {
    byBracket?: boolean;
    className?: string;
    compare?: RankingCompareType;
    difficulty?: number;
    includePrivateLogs?: boolean;
    metric?: CharacterPageRankingMetricType;
    partition?: number;
    role?: RoleType;
    size?: number;
    specName?: string;
    timeframe?: RankingTimeframeType;
    zoneID?: number;
  }) => JSON;
}
