import type { Zone } from './Zone';

/**
 * 游戏的单个资料片
 */
export interface Expansion {
  /**
   * 资料片的 ID
   */
  id: number;
  /**
   * 资料片的本地化名称
   */
  name: string;
  /**
   * 该资料片支持的副本区域（例如团队副本和地下城）
   */
  zones?: Zone[];
}
