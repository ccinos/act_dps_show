import type { CharacterRankingMetricType } from './CharacterRankingMetricType';
import type { RankingCompareType } from './RankingCompareType';
import type { RankingTimeframeType } from './RankingTimeframeType';
import type { RoleType } from './RoleType';

/**
 * 角色排行过滤器输入对象
 */
export interface CharacterRankingsFilterInput {
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
   * 副本 ID
   */
  encounterID?: number;
  /**
   * 是否包含战斗者信息
   */
  includeCombatantInfo?: boolean;
  /**
   * 是否包含其他玩家
   */
  includeOtherPlayers?: boolean;
  /**
   * 是否包含历史图表
   */
  includeHistoricalGraph?: boolean;
  /**
   * 是否包含私有日志
   */
  includePrivateLogs?: boolean;
  /**
   * 指标类型
   */
  metric?: CharacterRankingMetricType;
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
}
