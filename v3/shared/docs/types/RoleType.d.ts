/**
 * 角色类型枚举
 */
export enum RoleType {
  /**
   * 获取任意角色
   */
  Any = 'Any',
  /**
   * 仅获取 DPS 角色
   */
  DPS = 'DPS',
  /**
   * 仅获取治疗角色
   */
  Healer = 'Healer',
  /**
   * 仅获取坦克角色
   */
  Tank = 'Tank'
}
