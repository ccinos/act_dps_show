/**
 * 报告排行指标类型枚举
 */
export enum ReportRankingMetricType {
  /**
   * Boss cDPS 是 FFXIV 特有的指标，表示对 Boss 造成的伤害，已根据团队增益和减益进行调整
   */
  bosscdps = 'bosscdps',
  /**
   * Boss 每秒伤害
   */
  bossdps = 'bossdps',
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
   * 坦克的生存能力排行。已弃用。仅支持部分旧版 WoW 副本
   */
  krsi = 'krsi',
  /**
   * 分数。用于 WoW 史诗地下城和 ESO 试炼
   */
  playerscore = 'playerscore',
  /**
   * 速度。并非所有副本都支持
   */
  playerspeed = 'playerspeed',
  /**
   * cDPS 是 FFXIV 特有的指标，表示造成的伤害已根据团队增益和减益进行调整
   */
  cdps = 'cdps',
  /**
   * nDPS 是 FFXIV 特有的指标，表示造成的伤害已根据团队增益和减益进行调整
   */
  ndps = 'ndps',
  /**
   * rDPS 是 FFXIV 特有的指标，表示造成的伤害已根据团队增益和减益进行调整
   */
  rdps = 'rdps',
  /**
   * 对坦克每秒治疗
   */
  tankhps = 'tankhps',
  /**
   * 加权每秒伤害。WoW 特有的指标。用于移除填充伤害并奖励对高优先级目标造成的伤害
   */
  wdps = 'wdps'
}
