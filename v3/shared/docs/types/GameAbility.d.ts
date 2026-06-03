/**
 * 游戏技能对象
 */
export interface GameAbility {
  /**
   * 技能 ID
   */
  id: number;
  /**
   * 技能名称
   */
  name: string;
  /**
   * 技能图标
   */
  icon?: string;
  /**
   * 技能描述
   */
  description?: string;
}
