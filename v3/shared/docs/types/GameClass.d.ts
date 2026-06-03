/**
 * 游戏职业对象
 */
export interface GameClass {
  /**
   * 职业 ID
   */
  id: number;
  /**
   * 职业名称
   */
  name: string;
  /**
   * 职业 Slug
   */
  slug: string;
  /**
   * 职业类型（坦克/治疗/DPS）
   */
  role?: string;
}
