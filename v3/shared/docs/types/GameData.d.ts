import type { GameAbilityPagination } from './GameAbilityPagination';
import type { GameAbility } from './GameAbility';
import type { GameClass } from './GameClass';
import type { GameFaction } from './GameFaction';
import type { GameItem } from './GameItem';
import type { GameItemPagination } from './GameItemPagination';
import type { GameMap } from './GameMap';
import type { GameMapPagination } from './GameMapPagination';

/**
 * 游戏对象包含诸如 NPC、职业、技能、物品、地图等数据集合。游戏数据仅在发布大版本补丁时才变化，因此应尽可能长时间缓存结果，并仅在游戏发布新内容时更新
 */
export interface GameData {
  /**
   * 游戏中的玩家和敌人技能
   */
  abilities?: (args?: {
    limit?: number;
    page?: number;
  }) => GameAbilityPagination;
  /**
   * 获取游戏中的单个技能
   */
  ability?: (args: {
    id: number;
  }) => GameAbility;
  /**
   * 获取游戏中的单个职业
   */
  class?: (args: {
    id: number;
    faction_id?: number;
    zone_id?: number;
  }) => GameClass;
  /**
   * 获取游戏支持的职业
   */
  classes?: (args?: {
    faction_id?: number;
    zone_id?: number;
  }) => GameClass[];
  /**
   * 获取所有公会和玩家可以加入的阵营
   */
  factions?: GameFaction[];
  /**
   * 获取游戏中的单个物品
   */
  item?: (args: {
    id: number;
  }) => GameItem;
  /**
   * 游戏中的物品
   */
  items?: (args?: {
    limit?: number;
    page?: number;
  }) => GameItemPagination;
  /**
   * 获取游戏中的单张地图
   */
  map?: (args: {
    id: number;
  }) => GameMap;
  /**
   * 游戏中的地图
   */
  maps?: (args?: {
    limit?: number;
    page?: number;
  }) => GameMapPagination;
}
