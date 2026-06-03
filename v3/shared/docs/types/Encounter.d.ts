import type { Zone } from './Zone';
import type { CharacterRankingMetricType } from './CharacterRankingMetricType';
import type { FightRankingMetricType } from './FightRankingMetricType';
import type { LeaderboardRank } from './LeaderboardRank';
import type { HardModeLevelRankFilter } from './HardModeLevelRankFilter';
import type { ExternalBuffRankFilter } from './ExternalBuffRankFilter';
import type { JSON } from './JSON';

/**
 * 游戏中的单个战斗
 */
export interface Encounter {
  /**
   * 战斗的 ID
   */
  id: number;
  /**
   * 战斗的本地化名称
   */
  name: string;
  /**
   * 副本的玩家排行信息。该数据不视为冻结，可能随时变化。使用风险自负
   */
  characterRankings?: (args?: {
    bracket?: number;
    difficulty?: number;
    filter?: string;
    page?: number;
    partition?: number;
    serverRegion?: string;
    serverSlug?: string;
    size?: number;
    leaderboard?: LeaderboardRank;
    hardModeLevel?: HardModeLevelRankFilter;
    metric?: CharacterRankingMetricType;
    includeCombatantInfo?: boolean;
    includeOtherPlayers?: boolean;
    className?: string;
    specName?: string;
    externalBuffs?: ExternalBuffRankFilter;
  }) => JSON;
  /**
   * 副本的战斗排行信息。该数据不视为冻结，可能随时变化。使用风险自负
   */
  fightRankings?: (args?: {
    bracket?: number;
    difficulty?: number;
    filter?: string;
    page?: number;
    partition?: number;
    serverRegion?: string;
    serverSlug?: string;
    size?: number;
    leaderboard?: LeaderboardRank;
    hardModeLevel?: HardModeLevelRankFilter;
    metric?: FightRankingMetricType;
    includeOtherPlayers?: boolean;
  }) => JSON;
  /**
   * 该战斗所在的副本区域
   */
  zone: Zone;
}
