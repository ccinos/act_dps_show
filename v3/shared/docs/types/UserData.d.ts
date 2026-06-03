import type { User } from './User';

/**
 * UserData 对象支持获取已授权用户的 ID 和用户名
 */
export interface UserData {
  /**
   * 获取当前已授权的用户
   */
  user?: User;
}
