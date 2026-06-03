/**
 * 所有角色排行指标类型，以及用于显示在角色页面上的分数和伤害/治疗组合指标
 */
export enum CharacterPageRankingMetricType {
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
  wdps = 'wdps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对治疗的组合排行
   */
  healercombineddps = 'healercombineddps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对治疗的组合 Boss 排行
   */
  healercombinedbossdps = 'healercombinedbossdps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对治疗的组合 cDPS 排行
   */
  healercombinedcdps = 'healercombinedcdps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对治疗的组合 Boss cDPS 排行
   */
  healercombinedbosscdps = 'healercombinedbosscdps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对治疗的组合 nDPS 排行
   */
  healercombinedndps = 'healercombinedndps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对治疗的组合 Boss nDPS 排行
   */
  healercombinedbossndps = 'healercombinedbossndps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对治疗的组合 rDPS 排行
   */
  healercombinedrdps = 'healercombinedrdps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对治疗的组合 Boss rDPS 排行
   */
  healercombinedbossrdps = 'healercombinedbossrdps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对坦克的组合排行
   */
  tankcombineddps = 'tankcombineddps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对坦克的组合 Boss 排行
   */
  tankcombinedbossdps = 'tankcombinedbossdps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对坦克的组合 cDPS 排行
   */
  tankcombinedcdps = 'tankcombinedcdps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对坦克的组合 Boss cDPS 排行
   */
  tankcombinedbosscdps = 'tankcombinedbosscdps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对坦克的组合 nDPS 排行
   */
  tankcombinedndps = 'tankcombinedndps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对坦克的组合 Boss nDPS 排行
   */
  tankcombinedbossndps = 'tankcombinedbossndps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对坦克的组合 rDPS 排行
   */
  tankcombinedrdps = 'tankcombinedrdps',
  /**
   * FFXIV 特有指标。表示 8 人内容中一对坦克的组合 Boss rDPS 排行
   */
  tankcombinedbossrdps = 'tankcombinedbossrdps',
  /**
   * 分数和伤害组合。用于 WoW 史诗+和探险。返回分数排行以及额外的 throughputRankings 字段，包含按钥匙和物品等级过滤的伤害数据
   */
  points_and_damage = 'points_and_damage',
  /**
   * 分数和治疗组合。用于 WoW 史诗+和探险。返回分数排行以及额外的 throughputRankings 字段，包含按钥匙和物品等级过滤的治疗数据
   */
  points_and_healing = 'points_and_healing'
}
