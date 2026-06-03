import type { ReportRankingMetricType } from './ReportRankingMetricType';
import type { RankingCompareType } from './RankingCompareType';
import type { RankingTimeframeType } from './RankingTimeframeType';

/**
 * 报告排行过滤器输入对象
 */
export interface ReportRankingsFilterInput {
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
   * 战斗 ID 列表
   */
  fightIDs?: number[];
  /**
   * 玩家指标类型
   */
  playerMetric?: ReportRankingMetricType;
  /**
   * 时间范围类型
   */
  timeframe?: RankingTimeframeType;
}
