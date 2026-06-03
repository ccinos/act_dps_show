import type { ReportEventPaginator } from './ReportEventPaginator';
import type { ReportFight } from './ReportFight';
import type { GraphDataType } from './GraphDataType';
import type { EventDataType } from './EventDataType';
import type { HostilityType } from './HostilityType';
import type { KillType } from './KillType';
import type { GameDataType } from './GameDataType';
import type { ViewType } from './ViewType';
import type { ReportMasterData } from './ReportMasterData';
import type { User } from './User';
import type { JSON } from './JSON';
import type { Guild } from './Guild';
import type { GuildTag } from './GuildTag';
import type { Region } from './Region';
import type { ReportArchiveStatus } from './ReportArchiveStatus';
import type { EncounterPhases } from './EncounterPhases';
import type { Character } from './Character';
import type { ReportRankingMetricType } from './ReportRankingMetricType';
import type { RankingCompareType } from './RankingCompareType';
import type { RankingTimeframeType } from './RankingTimeframeType';
import type { TableDataType } from './TableDataType';

/**
 * 单个报告，由玩家上传到公会或个人日志
 */
export interface Report {
  /**
   * 报告代码，用于标识报告的唯一值
   */
  code: string;
  /**
   * 报告的结束时间。这是一个 Unix 时间戳，表示报告中包含的最后一个事件的时间戳
   */
  endTime: number;
  /**
   * 报告中分页的事件集合，可通过类型、来源、目标、技能等参数过滤。该数据不视为冻结，可能随时变化。使用风险自负
   */
  events?: (args?: {
    abilityID?: number;
    dataType?: EventDataType;
    death?: number;
    difficulty?: number;
    encounterID?: number;
    endTime?: number;
    fightIDs?: number[];
    filterExpression?: string;
    hostilityType?: HostilityType;
    includeResources?: boolean;
    killType?: KillType;
    limit?: number;
    sourceAurasAbsent?: string;
    sourceAurasPresent?: string;
    sourceClass?: string;
    sourceID?: number;
    sourceInstanceID?: number;
    startTime?: number;
    targetAurasAbsent?: string;
    targetAurasPresent?: string;
    targetClass?: string;
    targetID?: number;
    targetInstanceID?: number;
    translate?: boolean;
    useAbilityIDs?: boolean;
    useActorIDs?: boolean;
    viewOptions?: number;
    wipeCutoff?: number;
  }) => ReportEventPaginator;
  /**
   * 报告中的已导出分段数量。表示有多少分段已被处理用于排行
   */
  exportedSegments: number;
  /**
   * 报告中的战斗集合，包含参与玩家的详细信息
   */
  fights?: (args?: {
    difficulty?: number;
    encounterID?: number;
    fightIDs?: number[];
    killType?: KillType;
    translate?: boolean;
  }) => ReportFight[];
  /**
   * 报告的信息图表，可通过类型、来源、目标、技能等参数过滤。该数据不视为冻结，可能随时变化。使用风险自负
   */
  graph?: (args?: {
    abilityID?: number;
    dataType?: GraphDataType;
    death?: number;
    difficulty?: number;
    encounterID?: number;
    endTime?: number;
    fightIDs?: number[];
    filterExpression?: string;
    hostilityType?: HostilityType;
    killType?: KillType;
    sourceAurasAbsent?: string;
    sourceAurasPresent?: string;
    sourceClass?: string;
    sourceID?: number;
    sourceInstanceID?: number;
    startTime?: number;
    targetAurasAbsent?: string;
    targetAurasPresent?: string;
    targetClass?: string;
    targetID?: number;
    targetInstanceID?: number;
    translate?: boolean;
    viewOptions?: number;
    viewBy?: ViewType;
    wipeCutoff?: number;
  }) => JSON;
  /**
   * 报告所属的公会。如果为 null，则报告已上传到用户的个人日志
   */
  guild?: Guild;
  /**
   * 报告所属的公会标签。如果为 null，则报告未被标记
   */
  guildTag?: GuildTag;
  /**
   * 报告主文件中的数据。这包括版本信息、报告中出现的所有玩家、NPC 和宠物，以及报告中使用的所有游戏技能
   */
  masterData?: (args?: {
    translate?: boolean;
  }) => ReportMasterData;
  /**
   * 报告玩家的信息表格，包括他们的职业、天赋、装备等。该数据不视为冻结，可能随时变化。使用风险自负
   */
  playerDetails?: (args?: {
    difficulty?: number;
    encounterID?: number;
    endTime?: number;
    fightIDs?: number[];
    killType?: KillType;
    startTime?: number;
    translate?: boolean;
    includeCombatantInfo?: boolean;
  }) => JSON;
  /**
   * 上传报告的用户
   */
  owner?: User;
  /**
   * 报告中所有在击杀中排行的角色列表
   */
  rankedCharacters?: Character[];
  /**
   * 报告的排行信息，可按特定战斗、Boss、指标等过滤。该数据不视为冻结，可能随时变化。使用风险自负
   */
  rankings?: (args?: {
    compare?: RankingCompareType;
    difficulty?: number;
    encounterID?: number;
    fightIDs?: number[];
    playerMetric?: ReportRankingMetricType;
    timeframe?: RankingTimeframeType;
  }) => JSON;
  /**
   * 报告的区域
   */
  region?: Region;
  /**
   * 报告的版本号。当报告被重新导出时，该数字会增加
   */
  revision: number;
  /**
   * 报告中上传的分段数量
   */
  segments: number;
  /**
   * 报告的开始时间。这是一个 Unix 时间戳，表示报告中包含的第一个事件的时间戳
   */
  startTime: number;
  /**
   * 报告的信息表格，可通过类型、来源、目标、技能等参数过滤。该数据不视为冻结，可能随时变化。使用风险自负
   */
  table?: (args?: {
    abilityID?: number;
    dataType?: TableDataType;
    death?: number;
    difficulty?: number;
    encounterID?: number;
    endTime?: number;
    fightIDs?: number[];
    filterExpression?: string;
    hostilityType?: HostilityType;
    killType?: KillType;
    sourceAurasAbsent?: string;
    sourceAurasPresent?: string;
    sourceClass?: string;
    sourceID?: number;
    sourceInstanceID?: number;
    startTime?: number;
    targetAurasAbsent?: string;
    targetAurasPresent?: string;
    targetClass?: string;
    targetID?: number;
    targetInstanceID?: number;
    translate?: boolean;
    viewOptions?: number;
    viewBy?: ViewType;
    wipeCutoff?: number;
  }) => JSON;
  /**
   * 报告的标题
   */
  title: string;
  /**
   * 报告的可见性级别。可能的值为 'public'、'private' 和 'unlisted'
   */
  visibility: string;
  /**
   * 报告的主要副本区域。如果不存在支持的副本区域，则为 null
   */
  zone?: Zone;
  /**
   * 报告是否已归档。已归档报告的事件、表格和图表无法访问，除非检索用户拥有包含归档访问权限的订阅
   */
  archiveStatus?: ReportArchiveStatus;
  /**
   * 报告中观察到的所有 Boss 战斗的阶段信息。这需要加载战斗数据，但如果加载战斗和阶段，不会双重扣除 API 点数
   */
  phases?: EncounterPhases[];
}
