import type { CharacterPageRankingMetricType } from './CharacterPageRankingMetricType';
import type { RankingCompareType } from './RankingCompareType';
import type { RankingTimeframeType } from './RankingTimeframeType';
import type { RoleType } from './RoleType';

/**
 * 副本排行过滤器输入对象
 */
export interface ZoneRankingsFilterInput {
  /**
   * 是否按括号分组
   */
  byBracket?: boolean;
  /**
   * 职业名称
   */
  className?: string;
  /**
   * 对比类型
   */
  compare?: RankingCompareType;
  /**
   * 难度
   */
  difficulty?: number;
  /**
   * 是否包含私有日志
   */
  includePrivateLogs?: boolean;
  /**
   * 指标类型
   */
  metric?: CharacterPageRankingMetricType;
  /**
   * 分区
   */
  partition?: number;
  /**
   * 角色
   */
  role?: RoleType;
  /**
   * 团队规模
   */
  size?: number;
  /**
   * 专精名称
   */
  specName?: string;
  /**
   * 时间范围类型
   */
  timeframe?: RankingTimeframeType;
  /**
   * 副本 ID
   */
  zoneID?: number;
}
