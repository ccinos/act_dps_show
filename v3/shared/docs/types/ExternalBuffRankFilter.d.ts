/**
 * 外部增益排行过滤器枚举
 */
export enum ExternalBuffRankFilter {
  /**
   * 包括所有增益
   */
  All = 'All',
  /**
   * 仅包括有外部增益的排行
   */
  WithExternalBuffs = 'WithExternalBuffs',
  /**
   * 仅包括无外部增益的排行
   */
  NoExternalBuffs = 'NoExternalBuffs'
}
