#!/usr/bin/env python3
"""
updateLogConfig.py - 使用 FF Logs v1 API 更新 log_config.js 中的 zone/class 数据。
从 cn.fflogs.com 获取中文名，www.fflogs.com 作为补充。
更新前会自动备份原文件到 backups/ 目录。

用法:
    set FFLOGS_API_KEY=你的API_KEY    (Windows)
    export FFLOGS_API_KEY=你的API_KEY  (Linux/Mac)
    python updateLogConfig.py

    # 或直接传参
    python updateLogConfig.py --api-key 你的API_KEY

    # 仅预览变更，不写入
    python updateLogConfig.py --dry-run
"""

import json
import re
import os
import sys
import shutil
import argparse
from datetime import datetime
from urllib import request, parse
from urllib.error import HTTPError, URLError

# ---------------------------------------------------------------------------
# 配置
# ---------------------------------------------------------------------------
BASE_URL = "https://www.fflogs.com:443/v1"      # 国际服（英文，zone 最全）
CN_BASE_URL = "https://cn.fflogs.com/v1"         # 国服（中文名）

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(SCRIPT_DIR, "log_config.js")
BACKUP_DIR = os.path.join(SCRIPT_DIR, "backups")


# ---------------------------------------------------------------------------
# API 调用
# ---------------------------------------------------------------------------
def api_get(api_key, endpoint, base_url=BASE_URL, params=None):
    """调用 FF Logs v1 API"""
    if params is None:
        params = {}
    params["api_key"] = api_key
    url = f"{base_url}{endpoint}?{parse.urlencode(params)}"
    try:
        with request.urlopen(url, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"  [错误] HTTP {e.code}: {body[:200]}")
        return None
    except URLError as e:
        print(f"  [错误] 网络请求失败: {e.reason}")
        return None
    except json.JSONDecodeError:
        print(f"  [错误] API 返回数据格式异常")
        return None


# FF Logs API 不提供中文 zone 名（始终返回英文），因此保留一份内置中文映射。
# 新 zone 可手动往此表追加。
ZONE_CN_NAMES = {
    # 2.x
    2:  "迷宫挑战(60级)",
    4:  "讨伐歼灭战：高难度(60级)",
    5:  "魔航船虚无方舟",
    6:  "亚历山大机神城：启动之章",
    7:  "亚历山大零式机神城：启动之章",
    8:  "禁忌城邦玛哈",
    9:  "亚历山大机神城：律动之章",
    10: "亚历山大零式机神城：律动之章",
    12: "亚历山大机神城：天动之章",
    13: "亚历山大零式机神城：天动之章",
    # 3.x
    14: "迷宫挑战(70级)",
    15: "讨伐歼灭战：高难度(70级)",
    16: "欧米茄时空狭缝：德尔塔之章",
    17: "欧米茄零式时空狭缝：德尔塔之章",
    18: "失落之都拉巴纳斯塔",
    19: "巴哈姆特绝境战",
    20: "欧米茄时空狭缝：西格玛之章",
    21: "欧米茄零式时空狭缝：西格玛之章",
    22: "封闭圣塔黎铎拉纳大灯塔",
    23: "究极神兵绝境战",
    24: "欧米茄时空狭缝：阿尔法之章",
    25: "欧米茄零式时空狭缝：阿尔法之章",
    26: "乐欲之所瓯博讷修道院",
    # 4.x (Shadowbringers)
    27: "迷宫挑战(80级)",
    28: "讨伐歼灭战I：高难度(80级)",
    29: "伊甸希望乐园",
    30: "究极(红莲)",
    31: "复制工厂废墟",
    32: "究极",
    33: "伊甸零式希望乐园：共鸣之章",
    34: "讨伐歼灭战II：高难度(80级)",
    35: "人偶军事基地",
    36: "讨伐歼灭战：幻难度",
    37: "讨伐歼灭战III：高难度(80级)",
    38: "伊甸零式希望乐园：再生之章",
    39: "女王古殿",
    40: "希望之炮台",
    # 5.x (Endwalker)
    41: "迷宫挑战(90级)",
    42: "讨伐歼灭战I：高难度(90级)",
    43: "究极(上古)",
    44: "万魔殿：边狱之章",
    45: "幻想龙诗绝境战",
    46: "讨伐歼灭战：幻难度",
    47: "灿烂神域阿格莱亚",
    48: "女王古殿",
    49: "万魔殿零式：炼狱之章",
    50: "讨伐歼灭战II：高难度(90级)",
    51: "迷宫挑战(异闻)",
    52: "喜悦神域欧芙洛绪涅",
    53: "欧米茄绝境验证战",
    54: "万魔殿零式：天狱之章",
    55: "讨伐歼灭战III：高难度(90级)",
    56: "荣华神域塔利亚",
    # 6.x (Dawntrail)
    57: "迷宫挑战(100级)",
    58: "讨伐歼灭战I：高难度(100级)",
    59: "究极(传承)",
    60: "女王古殿",
    61: "迷宫挑战(异闻传承)",
    62: "AAC轻量级",
    63: "朱诺：第一巡行",
    64: "讨伐歼灭战：幻难度",
    65: "改写未来",
    66: "团队副本(混沌)",
    67: "讨伐歼灭战II：高难度(100级)",
    68: "AAC次重量级",
    69: "分叉之塔：血",
    70: "桑多瑞亚：第二巡行",
    71: "深层迷宫",
    72: "讨伐歼灭战III：高难度(100级)",
    73: "AAC重量级",
    74: "迷宫挑战(异闻)",
    75: "温达斯特：第三巡行",
}


def fetch_translations(api_key):
    """
    从 cn.fflogs.com 获取 encounter 中文名。
    zone 中文名使用内置 ZONE_CN_NAMES 映射（API 不提供中文 zone 名）。
    返回 {encounter_id: cn_name}
    """
    cn_encounter_names = {}

    try:
        zones_cn = api_get(api_key, "/zones", base_url=CN_BASE_URL)
    except Exception:
        zones_cn = None

    if zones_cn is None:
        print("  [警告] cn.fflogs.com 不可用，encounter 将使用英文名")
        return cn_encounter_names

    for z in zones_cn:
        for enc in z.get("encounters", []):
            eid = enc["id"]
            ename = enc.get("name", "")
            cn_encounter_names[eid] = ename

    print(f"  从国服获取到 {len(cn_encounter_names)} 个 encounter 中文名")
    return cn_encounter_names


# ---------------------------------------------------------------------------
# 解析 log_config.js
# ---------------------------------------------------------------------------
def parse_log_config():
    """解析 log_config.js，提取各变量值。文件不存在时返回空模板。"""
    if not os.path.exists(CONFIG_PATH):
        print("  log_config.js 不存在，将从 API 数据创建新文件")
        return {
            "content": None,
            "jobNameCnToType": {},
            "zoneList": [],
            "serverList": [],
            "zoneName": {},
            "_zoneById": {},
            "_encounterById": {},
            "_is_new": True,
        }

    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    result = {"content": content, "_is_new": False}

    patterns = {
        "jobNameCnToType": r"var jobNameCnToType\s*=\s*(\{[\s\S]*?\})\s*;",
        "zoneList":        r"var zoneList\s*=\s*(\[[\s\S]*?\])\s*;",
        "serverList":      r"var serverList\s*=\s*(\[[\s\S]*?\])\s*;",
        "zoneName":        r"var zoneName\s*=\s*(\{[\s\S]*?\})\s*;",
    }

    for key, pattern in patterns.items():
        m = re.search(pattern, content)
        if m:
            try:
                result[key] = json.loads(m.group(1))
            except json.JSONDecodeError as e:
                print(f"  [警告] 解析 {key} 失败: {e}")
                result[key] = {} if key not in ("zoneList", "serverList") else []
        else:
            print(f"  [警告] 未找到变量 {key}")
            result[key] = {} if key not in ("zoneList", "serverList") else []

    # 建立索引
    result["_zoneById"] = {}
    result["_encounterById"] = {}
    for z in result["zoneList"]:
        zid = str(z["id"])
        result["_zoneById"][zid] = z
        for enc in z.get("encounters", []):
            eid = str(enc["id"])
            result["_encounterById"][eid] = enc

    return result


# ---------------------------------------------------------------------------
# 版本推断
# ---------------------------------------------------------------------------
def get_game_version(zone_id):
    """根据 zone ID 推断游戏版本号"""
    if zone_id <= 13:
        return 3
    elif zone_id <= 26:
        return 4
    elif zone_id <= 40:
        return 5
    elif zone_id <= 56:
        return 6
    else:
        return 7


def default_brackets(zone_id=None):
    """根据 zone ID 推断 brackets"""
    v = get_game_version(zone_id) if zone_id is not None else 7
    return {"min": v, "max": v + 0.1, "bucket": 0.1, "type": "版本"}


# ---------------------------------------------------------------------------
# 合并逻辑
# ---------------------------------------------------------------------------
def merge_zones(fresh_zones, config, cn_encounter_names):
    """
    用 API 返回的 zones 合并本地 zoneList:
    - zone 中文名使用内置 ZONE_CN_NAMES + 本地已有映射
    - encounter 中文名优先用 cn.fflogs.com，其次用本地已有
    - 更新 frozen 状态
    - 保留 API 不再返回的历史 zone（标记 frozen=True）
    """
    zone_name = dict(config["zoneName"])
    new_zone_list = []
    api_zone_by_id = {str(z["id"]): z for z in fresh_zones}
    stats = {"new_zones": [], "new_encounters": [], "removed_zones": [], "updated_zones": []}

    for api_z in fresh_zones:
        zid = str(api_z["id"])
        local_z = config["_zoneById"].get(zid)

        # zone 显示名：内置中文 > 本地已有 > API 英文（兜底）
        api_name = api_z.get("name", "")
        zone_cn_name = ZONE_CN_NAMES.get(api_z["id"], zone_name.get(zid, api_name))

        if local_z:
            # --- 已有 zone: 保留本地数据，更新 frozen ---
            merged = dict(local_z)
            if merged.get("frozen") != api_z.get("frozen"):
                stats["updated_zones"].append(
                    f"  [{zid}] frozen={api_z['frozen']} ({zone_cn_name})"
                )
            merged["frozen"] = api_z.get("frozen", False)

            # 合并 encounters
            local_enc_by_id = {}
            for enc in local_z.get("encounters", []):
                local_enc_by_id[str(enc["id"])] = enc

            merged_encounters = []
            for api_enc in api_z.get("encounters", []):
                eid = str(api_enc["id"])
                if eid in local_enc_by_id:
                    existing_enc = local_enc_by_id[eid]
                    cn_enc_name = cn_encounter_names.get(api_enc["id"], "")
                    if cn_enc_name and any('一' <= c <= '鿿' for c in cn_enc_name):
                        existing_enc["name"] = cn_enc_name
                    merged_encounters.append(existing_enc)
                else:
                    enc_cn_name = cn_encounter_names.get(api_enc["id"], api_enc["name"])
                    merged_encounters.append({
                        "id": api_enc["id"],
                        "name": enc_cn_name,
                    })
                    stats["new_encounters"].append(
                        f"  [{zid}] {zone_cn_name} -> [{eid}] {enc_cn_name}"
                    )
            merged["encounters"] = merged_encounters

            if "brackets" not in merged:
                merged["brackets"] = default_brackets(api_z["id"])

        else:
            # --- 新 zone ---
            merged = {
                "id": api_z["id"],
                "name": zone_cn_name,
                "frozen": api_z.get("frozen", False),
                "encounters": [
                    {
                        "id": e["id"],
                        "name": cn_encounter_names.get(e["id"], e["name"]),
                    }
                    for e in api_z.get("encounters", [])
                ],
                "brackets": default_brackets(api_z["id"]),
            }
            stats["new_zones"].append(f"  [{zid}] {zone_cn_name}")

        # zoneName 映射：优先中文名，API 兜底英文名永远不覆盖本地已有中文名
        existing = zone_name.get(zid, "")
        existing_is_cn = existing and any('一' <= c <= '鿿' for c in existing)
        if existing_is_cn:
            zone_cn_name = existing
        elif zid not in zone_name:
            zone_name[zid] = zone_cn_name

        new_zone_list.append(merged)

    # 保留 API 不再返回的旧 zone（标记冻结）
    existing_ids = set(api_zone_by_id.keys())
    for zid, z in config["_zoneById"].items():
        if zid not in existing_ids:
            z["frozen"] = True
            new_zone_list.append(z)
            stats["removed_zones"].append(f"  [{zid}] {z['name']}（API 已移除，强制冻结）")

    # 按 id 排序
    new_zone_list.sort(key=lambda z: z["id"])

    # zoneName 按 key 排序
    sorted_zone_name = {}
    for k in sorted(zone_name.keys(), key=int):
        sorted_zone_name[k] = zone_name[k]

    return new_zone_list, sorted_zone_name, stats


# ---------------------------------------------------------------------------
# 生成输出
# ---------------------------------------------------------------------------
def generate_output(config, new_zone_list, new_zone_name):
    """将更新后的数据嵌入原 JS 文件；文件不存在时生成全新文件"""
    if config.get("_is_new"):
        return render_new_file(config, new_zone_list, new_zone_name)

    content = config["content"]

    new_zone_json = json.dumps(new_zone_list, ensure_ascii=False, indent=2)
    content = re.sub(
        r"var zoneList\s*=\s*\[[\s\S]*?\];",
        f"var zoneList = {new_zone_json};",
        content,
    )

    new_server_json = json.dumps(config.get("serverList", []), ensure_ascii=False, indent=2)
    content = re.sub(
        r"var serverList\s*=\s*\[[\s\S]*?\];",
        f"var serverList = {new_server_json};",
        content,
    )

    new_zone_name_json = json.dumps(new_zone_name, ensure_ascii=False, indent=2)
    content = re.sub(
        r"var zoneName\s*=\s*\{[\s\S]*?\];",
        f"var zoneName = {new_zone_name_json};",
        content,
    )

    return content


def render_new_file(config, zone_list, zone_name):
    """根据 API 数据从零生成完整的 log_config.js"""
    job_json = json.dumps(config.get("jobNameCnToType", {}), ensure_ascii=False, indent=2)
    zone_list_json = json.dumps(zone_list, ensure_ascii=False, indent=2)
    server_json = json.dumps(config.get("serverList", []), ensure_ascii=False, indent=2)
    zone_name_json = json.dumps(zone_name, ensure_ascii=False, indent=2)

    return f"""'use strict';
var jobNameCnToType = {job_json};
var zoneList = {zone_list_json};
var serverList = {server_json};
var zoneName = {zone_name_json};"""


# ---------------------------------------------------------------------------
# 备份
# ---------------------------------------------------------------------------
def backup_config():
    os.makedirs(BACKUP_DIR, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = os.path.join(BACKUP_DIR, f"log_config_{timestamp}.js")
    shutil.copy2(CONFIG_PATH, backup_path)
    return backup_path


# ---------------------------------------------------------------------------
# 主流程
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description="使用 FF Logs API 更新 log_config.js")
    parser.add_argument("--api-key", help="FF Logs API Key（优先于环境变量）")
    parser.add_argument("--dry-run", action="store_true", help="仅预览变更，不写入文件")
    parser.add_argument("--no-classes", action="store_true", help="跳过 /classes 接口")
    parser.add_argument("--no-zones", action="store_true", help="跳过 /zones 接口")
    args = parser.parse_args()

    api_key = args.api_key or os.environ.get("FFLOGS_API_KEY")
    if not api_key:
        print("=" * 60)
        print("  错误: 请提供 FF Logs API Key")
        print("=" * 60)
        print()
        print("方式 1: 设置环境变量")
        print("  Windows: set FFLOGS_API_KEY=你的KEY")
        print("  Linux:   export FFLOGS_API_KEY=你的KEY")
        print()
        print("方式 2: 命令行传参")
        print("  python updateLogConfig.py --api-key 你的KEY")
        print()
        print("获取 API Key: https://www.fflogs.com/profile")
        sys.exit(1)

    print("=" * 60)
    print("  FF Logs 配置更新工具")
    print("=" * 60)

    # 1. 解析本地配置
    print("\n[1/6] 解析本地 log_config.js ...")
    config = parse_log_config()
    is_new = config.get("_is_new", False)
    print(f"  当前 zone 数量: {len(config['_zoneById'])}")
    print(f"  当前 zoneName 映射数: {len(config.get('zoneName', {}))}")
    print(f"  当前 serverList 数量: {len(config.get('serverList', []))}")
    print(f"  当前 jobNameCnToType 数量: {len(config.get('jobNameCnToType', {}))}")

    # 新文件不允许跳过 zone 拉取（否则生成空文件）
    if is_new and args.no_zones:
        print("  [错误] 文件不存在时不能使用 --no-zones，否则无法生成数据")
        sys.exit(1)

    # 2. 从国服获取 encounter 中文名
    cn_encounter_names = {}
    if not args.no_zones:
        print("\n[2/6] 从 cn.fflogs.com 获取 encounter 中文翻译 ...")
        cn_encounter_names = fetch_translations(api_key)

    # 3. 从国际服获取完整 zones
    new_zone_list = config["zoneList"]
    new_zone_name = config["zoneName"]
    zones_stats = {}

    if not args.no_zones:
        print("\n[3/6] 从 www.fflogs.com 获取完整 zone 列表 ...")
        fresh_zones = api_get(api_key, "/zones")
        if fresh_zones is None:
            print("  [错误] /zones 接口失败，跳过 zone 更新")
        else:
            print(f"  API 返回 {len(fresh_zones)} 个 zone")
            new_zone_list, new_zone_name, zones_stats = merge_zones(
                fresh_zones, config, cn_encounter_names
            )
    else:
        print("\n[3/6] 跳过 /zones (--no-zones)")

    # 4. /classes
    classes_stats = {}
    if not args.no_classes:
        print("\n[4/6] 调用 /classes API ...")
        fresh_classes = api_get(api_key, "/classes")
        if fresh_classes is None:
            print("  [错误] /classes 接口失败，跳过 class 更新")
        else:
            print(f"  API 返回 {len(fresh_classes)} 个 class")
            classes_stats = show_class_changes(fresh_classes, config)
    else:
        print("\n[4/6] 跳过 /classes (--no-classes)")

    # 5. 生成输出
    print("\n[5/6] 生成更新内容 ...")
    new_content = generate_output(config, new_zone_list, new_zone_name)

    # 6. 写入
    if args.dry_run:
        print("\n[6/6] [DRY-RUN] 预览变更（不写入）...")
        print("-" * 40)
        print_stats(zones_stats, classes_stats)
        print("=" * 60)
        print("  DRY-RUN 模式，未修改任何文件")
        sys.exit(0)

    print("\n[6/6] 备份并写入 ...")
    if is_new:
        print("  新文件，无需备份")
    else:
        backup_path = backup_config()
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        f.write(new_content)

    print("-" * 40)
    print_stats(zones_stats, classes_stats)
    print("=" * 60)
    print(f"  [完成] log_config.js 已更新!")
    if not is_new:
        print(f"  备份文件: {backup_path}")


def print_stats(zones_stats, classes_stats):
    """打印变更统计"""
    if zones_stats:
        print(f"\n  [Zones 变更]")
        if zones_stats.get("new_zones"):
            print(f"  新增 zone ({len(zones_stats['new_zones'])}):")
            for s in zones_stats["new_zones"]:
                print(f"    {s}")
        if zones_stats.get("removed_zones"):
            print(f"  已移除 zone ({len(zones_stats['removed_zones'])}):")
            for s in zones_stats["removed_zones"]:
                print(f"    {s}")
        if zones_stats.get("updated_zones"):
            print(f"  状态更新 zone ({len(zones_stats['updated_zones'])}):")
            for s in zones_stats["updated_zones"]:
                print(f"    {s}")
        if zones_stats.get("new_encounters"):
            print(f"  新增 encounter ({len(zones_stats['new_encounters'])}):")
            for s in zones_stats["new_encounters"]:
                print(f"    {s}")
        if not any(zones_stats.values()):
            print("  (无变更)")
    if classes_stats:
        print(f"\n  [Classes 变更]")
        if classes_stats.get("new_classes"):
            for s in classes_stats["new_classes"]:
                print(f"    {s}")
        if not any(classes_stats.values()):
            print("  (无变更)")


def show_class_changes(fresh_classes, config):
    """对比 API 返回的 classes 与本地 jobNameCnToType"""
    stats = {"new_classes": []}
    existing_abbrs = set(config["jobNameCnToType"].values())

    for cls in fresh_classes:
        name = cls.get("name", "")
        found = any(
            name.lower() == abbr.lower() or name[:3].lower() == abbr[:3].lower()
            for abbr in existing_abbrs
        )
        if not found:
            stats["new_classes"].append(
                f"  API 新增 class: {name} (specs: {[s['name'] for s in cls.get('specs',[])]})"
            )

    return stats


if __name__ == "__main__":
    main()
