/**
 * 战斗排行指标类型枚举
 */
export enum FightRankingMetricType {
  /**
   * Boss 每秒伤害
   */
  bossdps = 'bossdps',
  /**
   * Boss cDPS 是 FFXIV 特有的指标，表示对 Boss 造成的伤害，已根据团队增益和减益进行调整
   */
  bosscdps = 'bosscdps',
  /**
   * Boss nDPS 是 FFXIV 特有的指标，表示对 Boss 造成的伤害，已根据团队增益和减益进行调整
   */
  bossndps = 'bossndps',
  /**
   * Boss rDPS 是 FFXIV 特有的指标，表示对 Boss 造成的伤害，已根据团队增益和减益进行调整
   */
  bossrdps = 'bossrdps',
  /**
   * 根据其他选中的参数选择合适的默认值
   */
  default = 'default',
  /**
   * 每秒伤害
   */
  dps = 'dps',
  /**
   * 每秒治疗
   */
  hps = 'hps',
  /**
   * 速度。并非所有副本都支持
   */
  speed = 'speed',
  /**
   * 执行时间
   */
  execution = 'execution'
}
