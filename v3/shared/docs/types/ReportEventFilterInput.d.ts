import type { EventDataType } from './EventDataType';
import type { HostilityType } from './HostilityType';
import type { KillType } from './KillType';
import type { ActorFilter } from './ActorFilter';
import type { AbilityFilter } from './AbilityFilter';
import type { TimeFilter } from './TimeFilter';
import type { AuraFilter } from './AuraFilter';
import type { ClassFilter } from './ClassFilter';
import type { FightFilter } from './FightFilter';

/**
 * 报告事件过滤器完整输入对象
 */
export interface ReportEventFilterInput {
  /**
   * 技能 ID
   */
  abilityID?: number;
  /**
   * 数据类型
   */
  dataType?: EventDataType;
  /**
   * 死亡事件 ID
   */
  death?: number;
  /**
   * 难度
   */
  difficulty?: number;
  /**
   * 副本 ID
   */
  encounterID?: number;
  /**
   * 敌意类型
   */
  hostilityType?: HostilityType;
  /**
   * 是否包含资源
   */
  includeResources?: boolean;
  /**
   * 击杀类型
   */
  killType?: KillType;
  /**
   * 限制返回数量
   */
  limit?: number;
  /**
   * 源角色过滤器
   */
  source?: ActorFilter;
  /**
   * 目标角色过滤器
   */
  target?: ActorFilter;
  /**
   * 时间过滤器
   */
  time?: TimeFilter;
  /**
   * 光环过滤器
   */
  sourceAuras?: AuraFilter;
  /**
   * 光环过滤器（目标）
   */
  targetAuras?: AuraFilter;
  /**
   * 职业过滤器
   */
  sourceClass?: ClassFilter;
  /**
   * 职业过滤器（目标）
   */
  targetClass?: ClassFilter;
  /**
   * 战斗过滤器
   */
  fights?: FightFilter;
  /**
   * 是否翻译
   */
  translate?: boolean;
  /**
   * 过滤表达式
   */
  filterExpression?: string;
  /**
   * wipe 截止值
   */
  wipeCutoff?: number;
  /**
   * 查看选项
   */
  viewOptions?: number;
}
