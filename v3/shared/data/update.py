#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FF14 技能数据下载脚本
用于从官网下载各个职业的技能数据

用法:
    python downloadSkills.py -a                              # 全量下载
    python downloadSkills.py -u <链接> -o <下载位置> -a      # 指定链接和目录，全量下载
    python downloadSkills.py                                  # 交互式选择下载
    python downloadSkills.py --help                          # 查看帮助
"""

import argparse
import os
import re
import sys
import urllib.request
from urllib.parse import urljoin

# ===================== 常量配置 =====================

DEFAULT_URL = 'https://actff1.web.sdo.com/project/20190917jobguid/index.html'
DEFAULT_OUTPUT = './official'

EXCLUDE_FILES = {
    'bannerconfig', 'indexpve', 'indexpvp',
    'navPvpConfig', 'navconfig', 'navpveConfig',
}

JOB_NAMES = {
    'astrologian': '占星术士',
    'bard':        '诗人',
    'blackmage':   '黑魔法师',
    'dancer':      '舞者',
    'darkknight':  '暗黑骑士',
    'dragoon':     '龙骑士',
    'gunbreaker':  '绝枪战士',
    'machinist':   '机工士',
    'monk':        '武僧',
    'ninja':       '忍者',
    'paladin':     '骑士',
    'pictomancer': '绘灵法师',
    'reaper':      '钐镰客',
    'redmage':     '赤魔法师',
    'sage':        '贤者',
    'samurai':     '武士',
    'scholar':     '学者',
    'summoner':    '召唤师',
    'viper':       '蝰蛇剑士',
    'warrior':     '战士',
    'whitemage':   '白魔法师',
}

# ===================== 键盘输入 =====================

if os.name == 'nt':
    import msvcrt

    def get_key():
        """Windows: 获取单个按键"""
        key = msvcrt.getch()
        if key in (b'\xe0', b'\x00'):
            key = msvcrt.getch()
            mapping = {b'H': 'UP', b'P': 'DOWN', b'K': 'LEFT', b'M': 'RIGHT'}
            return mapping.get(key, None)
        if key == b'\r':
            return 'ENTER'
        if key == b' ':
            return 'SPACE'
        if key == b'\x1b':
            return 'ESC'
        if key == b'\x03':
            raise KeyboardInterrupt
        try:
            return key.decode('utf-8').lower()
        except UnicodeDecodeError:
            return None
else:
    import termios
    import tty

    def get_key():
        """Unix: 获取单个按键"""
        fd = sys.stdin.fileno()
        old_settings = termios.tcgetattr(fd)
        try:
            tty.setraw(fd)
            ch = sys.stdin.buffer.read(1)
            if ch == b'\x1b':
                ch2 = sys.stdin.buffer.read(2)
                if len(ch2) == 2:
                    mapping = {b'[A': 'UP', b'[B': 'DOWN', b'[C': 'RIGHT', b'[D': 'LEFT'}
                    return mapping.get(ch2, 'ESC')
                return 'ESC'
            if ch == b'\r' or ch == b'\n':
                return 'ENTER'
            if ch == b' ':
                return 'SPACE'
            if ch == b'\x03':
                raise KeyboardInterrupt
            try:
                return ch.decode('utf-8').lower()
            except UnicodeDecodeError:
                return None
        finally:
            termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)


# ===================== 交互式菜单 =====================

class InteractiveMenu:
    """交互式多选/单选菜单 (ANSI 控制)"""

    def __init__(self, title, options, multi_select=True):
        self.title = title
        self.options = options
        self.multi_select = multi_select
        self.selected = [False] * len(options)
        if not multi_select and len(options) > 0:
            self.selected[0] = True
        self.cursor = 0

    def _render(self):
        sys.stdout.write('\033[?25l')
        sys.stdout.write('\033[2J\033[H')
        lines = [f'  {self.title}', '  ' + '-' * 40, '']
        for i, (label, _) in enumerate(self.options):
            is_cursor = '>' if i == self.cursor else ' '
            if self.multi_select:
                mark = '[*]' if self.selected[i] else '[ ]'
            else:
                mark = '(*)' if self.selected[i] else '( )'
            lines.append(f' {is_cursor} {mark} {label}')
        lines.append('')
        lines.append('  操作: W/S 或 ↑/↓ 移动  |  空格 选中  |  回车 确认  |  Q 退出')
        sys.stdout.write('\n'.join(lines))
        sys.stdout.flush()

    def run(self):
        self._render()
        while True:
            key = get_key()
            if key is None:
                continue

            if key in ('UP', 'w'):
                self.cursor = (self.cursor - 1) % len(self.options)
            elif key in ('DOWN', 's'):
                self.cursor = (self.cursor + 1) % len(self.options)
            elif key == 'SPACE':
                if self.multi_select:
                    self.selected[self.cursor] = not self.selected[self.cursor]
                else:
                    self.selected = [False] * len(self.options)
                    self.selected[self.cursor] = True
            elif key == 'ENTER':
                break
            elif key in ('ESC', 'q'):
                sys.stdout.write('\033[2J\033[H\033[?25h')
                sys.stdout.flush()
                print('[INFO] 用户取消操作')
                sys.exit(0)
            self._render()

        sys.stdout.write('\033[2J\033[H\033[?25h')
        sys.stdout.flush()

        if self.multi_select:
            return [self.options[i][1] for i, sel in enumerate(self.selected) if sel]
        else:
            for i, sel in enumerate(self.selected):
                if sel:
                    return self.options[i][1]
            return None


# ===================== 核心功能 =====================

def download_file(url, output_path):
    try:
        urllib.request.urlretrieve(url, output_path)
        print(f'[OK] 下载成功: {os.path.basename(output_path)}')
        return True
    except Exception as e:
        print(f'[FAIL] 下载失败: {os.path.basename(output_path)} - {str(e)}')
        return False


def fetch_job_list(url):
    with urllib.request.urlopen(url) as response:
        html_content = response.read().decode('utf-8')
    pattern = r"dateconfig/(\w+)\.js"
    matches = re.findall(pattern, html_content)
    raw_list = sorted(set(matches))
    return [guid for guid in raw_list if guid not in EXCLUDE_FILES]


def make_display_label(guid):
    cn_name = JOB_NAMES.get(guid, '')
    if cn_name:
        return f'{guid}  ({cn_name})'
    return guid


def run_download(job_guids, base_url, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    success = 0
    fail = 0
    print(f'\n[INFO] 开始下载 {len(job_guids)} 个文件...\n')
    for guid in job_guids:
        file_url = f'{base_url}{guid}.js'
        output_path = os.path.join(output_dir, f'{guid}.js')
        if download_file(file_url, output_path):
            success += 1
        else:
            fail += 1
    print()
    print('=' * 50)
    print('[INFO] 下载完成!')
    print(f'   成功: {success} 个文件')
    print(f'   失败: {fail} 个文件')
    print(f'   保存位置: {os.path.abspath(output_dir)}')
    print('=' * 50)


def interactive_mode(args):
    print('[INFO] 正在从官网获取职业列表...')
    try:
        job_guids = fetch_job_list(args.url)
    except Exception as e:
        print(f'[ERROR] 无法获取数据: {e}')
        sys.exit(1)

    if not job_guids:
        print('[ERROR] 未找到任何职业数据')
        sys.exit(1)

    print(f'[OK] 发现 {len(job_guids)} 个职业数据文件')

    mode_options = [
        ('全量下载 (下载所有职业数据)', 'all'),
        ('选择下载 (挑选需要的职业)', 'select'),
    ]
    menu = InteractiveMenu('请选择下载模式:', mode_options, multi_select=False)
    choice = menu.run()

    if choice == 'all':
        selected = job_guids
    else:
        job_options = [(make_display_label(g), g) for g in job_guids]
        menu2 = InteractiveMenu('请选择要下载的职业 (空格选中/取消):', job_options, multi_select=True)
        selected = menu2.run()
        if not selected:
            print('[INFO] 未选择任何职业，退出')
            sys.exit(0)

    base_url = urljoin(args.url, 'dateconfig/')
    run_download(selected, base_url, args.output)


def all_mode(args):
    print('[INFO] 正在从官网获取职业列表...')
    try:
        job_guids = fetch_job_list(args.url)
    except Exception as e:
        print(f'[ERROR] 无法获取数据: {e}')
        sys.exit(1)

    if not job_guids:
        print('[ERROR] 未找到任何职业数据')
        sys.exit(1)

    print(f'[OK] 发现 {len(job_guids)} 个职业数据文件')
    base_url = urljoin(args.url, 'dateconfig/')
    run_download(job_guids, base_url, args.output)


# ===================== 入口 =====================

def main():
    parser = argparse.ArgumentParser(
        description='FF14 技能数据下载脚本 - 从官网下载各职业技能数据',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
示例:
  python downloadSkills.py                    交互式选择下载
  python downloadSkills.py -a                 全量下载（使用默认链接和目录）
  python downloadSkills.py -a -o ./my_jobs    全量下载到指定目录
  python downloadSkills.py -u "URL" -a        指定链接全量下载
        ''',
    )
    parser.add_argument('-u', '--url', default=DEFAULT_URL, help='官网链接')
    parser.add_argument('-o', '--output', default=DEFAULT_OUTPUT, help='下载目录')
    parser.add_argument('-a', '--all', action='store_true', help='全量下载模式（跳过交互选择）')

    args = parser.parse_args()

    if args.all:
        all_mode(args)
    else:
        interactive_mode(args)


if __name__ == '__main__':
    main()
