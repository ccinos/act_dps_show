/**
 * 游戏物品对象
 */
export interface GameItem {
  /**
   * 物品 ID
   */
  id: number;
  /**
   * 物品名称
   */
  name: string;
  /**
   * 物品等级
   */
  itemLevel?: number;
  /**
   * 物品图标
   */
  icon?: string;
}
