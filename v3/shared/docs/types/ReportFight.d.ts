import type { ReportMapBoundingBox } from './ReportMapBoundingBox';
import type { ReportDungeonPull } from './ReportDungeonPull';
import type { ReportFightNPC } from './ReportFightNPC';
import type { ReportMap } from './ReportMap';
import type { GameZone } from './GameZone';
import type { PhaseTransition } from './PhaseTransition';

/**
 * ReportFight 表示报告中发生的单次战斗
 */
export interface ReportFight {
  /**
   * 战斗中玩家的平均物品等级
   */
  averageItemLevel?: number;
  /**
   * 战斗结束时活跃 Boss 的血量百分比
   */
  bossPercentage?: number;
  /**
   * 包围战斗中所有玩家/敌人位置的边界框
   */
  boundingBox?: ReportMapBoundingBox;
  /**
   * 不包括预拉取事件（如准备事件和施法事件）的战斗时间。仅从 6.4 补丁开始设置
   */
  combatTime?: number;
  /**
   * 战斗是否代表从开始到结束的完整团队副本，例如 Classic WoW 中完整通关黑翼之巢
   */
  completeRaid: boolean;
  /**
   * 团队副本、地下城或竞技场的难度设置。小怪战斗为 null
   */
  difficulty?: number;
  /**
   * 对于地下城，地下城中发生的拉取列表。拉取包含拉取中涉及的敌人的详细信息，以及显示拉取发生位置的地图信息
   */
  dungeonPulls?: ReportDungeonPull[];
  /**
   * 战斗的战斗 ID。如果 ID 为 0，则该战斗被视为小怪战斗
   */
  encounterID: number;
  /**
   * 战斗的结束时间。这是一个毫秒级精度的时间戳，相对于报告的开始时间，即报告的开始时间被视为时间 0
   */
  endTime: number;
  /**
   * 战斗中涉及的敌方 NPC 信息。包括每个 NPC 的报告 ID、实例计数和实例组计数
   */
  enemyNPCs?: ReportFightNPC[];
  /**
   * 战斗中涉及的敌方宠物信息。包括每个宠物的报告 ID、实例计数和实例组计数
   */
  enemyPets?: ReportFightNPC[];
  /**
   * 战斗中涉及的所有玩家的 ID。这些玩家可以在主数据角色表中引用，以获取每个参与者的详细信息
   */
  enemyPlayers?: number[];
  /**
   * 战斗的实际完成百分比。这是用于表示团灭进度的字段，因为战斗可能很复杂，有多个 Boss、没有 Boss、Boss 会治疗等等
   */
  fightPercentage?: number;
  /**
   * 战斗中涉及的友方 NPC 信息。包括每个 NPC 的报告 ID、实例计数和实例组计数
   */
  friendlyNPCs?: ReportFightNPC[];
  /**
   * 战斗中涉及的友方宠物信息。包括每个宠物的报告 ID、实例计数和实例组计数
   */
  friendlyPets?: ReportFightNPC[];
  /**
   * 战斗中涉及的所有玩家的 ID。这些玩家可以在主数据角色表中引用，以获取每个参与者的详细信息
   */
  friendlyPlayers?: number[];
  /**
   * 战斗发生的游戏区域。这不应与网站用于排行的区域混淆。这是实际的游戏内区域信息
   */
  gameZone?: GameZone;
  /**
   * 战斗是否存在回响（Echo）效果
   */
  hasEcho?: boolean;
  /**
   * 战斗的报告 ID。该 ID 可用于仅获取该战斗的事件、表格或图表
   */
  id: number;
  /**
   * 战斗是否仍在进行中。如果该字段为 false，则表示整个战斗已上传完毕
   */
  inProgress?: boolean;
  /**
   * 战斗是否是 Boss 击杀，即成功击杀。如果该字段为 false，则表示战斗是团灭或失败的尝试等
   */
  kill?: boolean;
  /**
   * 战斗结束时战斗所处的阶段。根据阶段类型（即普通阶段 vs 转阶段）从 1 开始计数
   */
  lastPhase?: number;
  /**
   * 战斗结束时战斗所处的阶段。始终从 0 开始递增，因此一个有三个实际阶段和两个转阶段的战斗将从 0 计数到 4
   */
  lastPhaseAsAbsoluteIndex?: number;
  /**
   * 战斗结束时战斗所处的阶段是否是转阶段
   */
  lastPhaseIsIntermission?: boolean;
  /**
   * 战斗中涉及的所有地图。对于单个 Boss，这通常是单张地图，但对于地下城，通常是多张地图
   */
  maps?: ReportMap[];
  /**
   * 战斗的名称
   */
  name: string;
  /**
   * 某些 Boss 战斗可能转换为小怪战斗（encounterID = 0）。当发生这种情况时，originalEncounterID 包含原始战斗的 ID
   */
  originalEncounterID?: number;
  /**
   * 战斗期间观察到的阶段转换列表
   */
  phaseTransitions?: PhaseTransition[];
  /**
   * 团队副本、地下城或竞技场的团队人数规模。小怪战斗为 null
   */
  size?: number;
  /**
   * 战斗是否使用标准阵容，定义为两个坦克、两个治疗、四个输出，且任何职业不超过两个
   */
  standardComposition?: boolean;
  /**
   * 战斗的开始时间。这是一个毫秒级精度的时间戳，相对于报告的开始时间，即报告的开始时间被视为时间 0
   */
  startTime: number;
  /**
   * 如果使用 Companion 应用明确呼叫了团灭，则该字段将包含时间。这是一个毫秒级精度的时间戳，相对于报告的开始时间，即报告的开始时间被视为时间 0
   */
  wipeCalledTime?: number;
}
