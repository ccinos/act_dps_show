/**
 * 事件数据类型枚举
 */
export enum EventDataType {
  /**
   * 所有事件
   */
  All = 'All',
  /**
   * 增益效果
   */
  Buffs = 'Buffs',
  /**
   * 施法事件
   */
  Casts = 'Casts',
  /**
   * 战斗者信息事件（包括装备）
   */
  CombatantInfo = 'CombatantInfo',
  /**
   * 造成的伤害
   */
  DamageDone = 'DamageDone',
  /**
   * 受到的伤害
   */
  DamageTaken = 'DamageTaken',
  /**
   * 死亡事件
   */
  Deaths = 'Deaths',
  /**
   * 减益效果
   */
  Debuffs = 'Debuffs',
  /**
   * 驱散事件
   */
  Dispels = 'Dispels',
  /**
   * 造成的治疗
   */
  Healing = 'Healing',
  /**
   * 打断事件
   */
  Interrupts = 'Interrupts',
  /**
   * 资源事件
   */
  Resources = 'Resources',
  /**
   * 召唤事件
   */
  Summons = 'Summons',
  /**
   * 威胁值事件
   */
  Threat = 'Threat'
}
