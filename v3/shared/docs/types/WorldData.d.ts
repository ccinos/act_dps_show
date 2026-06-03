import type { Encounter } from './Encounter';
import type { Expansion } from './Expansion';
import type { Region } from './Region';
import type { Server } from './Server';
import type { Subregion } from './Subregion';
import type { Zone } from './Zone';

/**
 * 世界数据对象包含诸如资料片、副本区域、战斗、地区、子地区等数据集合
 */
export interface WorldData {
  /**
   * 通过 ID 获取特定战斗
   */
  encounter?: (args: {
    id: number;
  }) => Encounter;
  /**
   * 通过 ID 获取单个资料片
   */
  expansion?: (args: {
    id: number;
  }) => Expansion;
  /**
   * 网站支持的所有资料片集合
   */
  expansions?: Expansion[];
  /**
   * 通过 ID 获取特定地区
   */
  region?: (args: {
    id: number;
  }) => Region;
  /**
   * 网站支持的所有地区集合
   */
  regions?: Region[];
  /**
   * 通过 ID 或 slug+区域 获取特定服务器
   */
  server?: (args?: {
    id?: number;
    region?: string;
    slug?: string;
  }) => Server;
  /**
   * 通过 ID 获取特定子地区
   */
  subregion?: (args: {
    id: number;
  }) => Subregion;
  /**
   * 通过 ID 获取特定副本区域
   */
  zone?: (args: {
    id: number;
  }) => Zone;
  /**
   * 获取网站支持的所有副本区域集合
   */
  zones?: (args?: {
    expansion_id?: number;
  }) => Zone[];
}
