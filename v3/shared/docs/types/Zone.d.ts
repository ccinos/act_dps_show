import type { Bracket } from './Bracket';
import type { Difficulty } from './Difficulty';
import type { Encounter } from './Encounter';
import type { Expansion } from './Expansion';
import type { Partition } from './Partition';

/**
 * 来自资料片的单个副本区域，代表团队副本、地下城、竞技场等
 */
export interface Zone {
  /**
   * 副本区域的 ID
   */
  id: number;
  /**
   * 该副本区域的括号信息。如果副本区域不支持括号，则该字段将为 null
   */
  brackets?: Bracket;
  /**
   * 该副本区域支持的所有难度列表
   */
  difficulties?: Difficulty[];
  /**
   * 该副本区域中的战斗列表
   */
  encounters?: Encounter[];
  /**
   * 该副本区域所属的资料片
   */
  expansion: Expansion;
  /**
   * 整个副本区域（包括其所有分区）是否永久冻结。当副本区域被冻结时，涉及该副本区域的数据永远不会变化，可以永久缓存
   */
  frozen: boolean;
  /**
   * 副本区域的名称
   */
  name: string;
  /**
   * 该副本区域支持的所有分区列表
   */
  partitions?: Partition[];
}
