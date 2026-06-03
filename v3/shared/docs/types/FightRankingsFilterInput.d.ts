import type { FightRankingMetricType } from './FightRankingMetricType';
import type { LeaderboardRank } from './LeaderboardRank';
import type { HardModeLevelRankFilter } from './HardModeLevelRankFilter';
import type { ExternalBuffRankFilter } from './ExternalBuffRankFilter';

/**
 * 战斗排行过滤器输入对象
 */
export interface FightRankingsFilterInput {
  /**
   * 括号
   */
  bracket?: number;
  /**
   * 难度
   */
  difficulty?: number;
  /**
   * 过滤器
   */
  filter?: string;
  /**
   * 页码
   */
  page?: number;
  /**
   * 分区
   */
  partition?: number;
  /**
   * 服务器地区
   */
  serverRegion?: string;
  /**
   * 服务器 Slug
   */
  serverSlug?: string;
  /**
   * 团队规模
   */
  size?: number;
  /**
   * 排行榜排行类型
   */
  leaderboard?: LeaderboardRank;
  /**
   * 困难模式等级过滤
   */
  hardModeLevel?: HardModeLevelRankFilter;
  /**
   * 指标类型
   */
  metric?: FightRankingMetricType;
  /**
   * 是否包含其他玩家
   */
  includeOtherPlayers?: boolean;
  /**
   * 外部增益过滤
   */
  externalBuffs?: ExternalBuffRankFilter;
}
