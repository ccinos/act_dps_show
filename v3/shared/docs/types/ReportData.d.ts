import type { Report } from './Report';
import type { ReportPagination } from './ReportPagination';

/**
 * ReportData 对象支持检索单个报告或按公会/用户筛选的报告集合
 */
export interface ReportData {
  /**
   * 通过代码获取特定报告
   */
  report?: (args: {
    code: string;
    allowUnlisted?: boolean;
  }) => Report;
  /**
   * 特定公会、公会标签或用户的报告集合
   */
  reports?: (args?: {
    endTime?: number;
    guildID?: number;
    guildName?: string;
    guildServerSlug?: string;
    guildServerRegion?: string;
    guildTagID?: number;
    userID?: number;
    limit?: number;
    page?: number;
    startTime?: number;
    zoneID?: number;
    gameZoneID?: number;
  }) => ReportPagination;
}
