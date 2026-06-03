/**
 * 图表数据类型枚举
 */
export enum GraphDataType {
  /**
   * 摘要概览
   */
  Summary = 'Summary',
  /**
   * 增益效果
   */
  Buffs = 'Buffs',
  /**
   * 施法事件
   */
  Casts = 'Casts',
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
   * 生存能力（多次拉取的死亡信息）
   */
  Survivability = 'Survivability',
  /**
   * 威胁值事件
   */
  Threat = 'Threat'
}
