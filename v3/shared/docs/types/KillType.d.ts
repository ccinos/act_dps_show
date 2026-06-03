/**
 * 击杀类型枚举
 */
export enum KillType {
  /**
   * 包括小怪和战斗
   */
  All = 'All',
  /**
   * 仅包括战斗（击杀和团灭）
   */
  Encounters = 'Encounters',
  /**
   * 仅包括成功击杀的战斗
   */
  Kills = 'Kills',
  /**
   * 仅包括小怪
   */
  Trash = 'Trash',
  /**
   * 仅包括团灭的战斗
   */
  Wipes = 'Wipes'
}
