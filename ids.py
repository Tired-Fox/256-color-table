import re

with open("index.html", "r", encoding="utf-8") as html:
    lines = html.readlines()

# Assuming all tr that need id's already have <tr id="xterm-">
with open("index.html", "w", encoding="utf-8") as html:
    index = -1
    for line in lines:
        if re.search(r"<td>\d{1,3}</td>", line) is not None:
            line = re.sub(r"<td>", f'<td id="code_xterm_{index}">', line)
            html.write(
                re.sub(
                    r'<td id="(.+)">([\S\s]+)</td>',
                    r'<td><button id="\1" onclick="'
                    + r"copyText('\1')"
                    + r'">\2</button></td>',
                    line,
                )
            )
        elif re.search(r"<td>#\S{6}</td>", line) is not None:
            line = re.sub(r"<td>", f'<td id="code_hex_{index}">', line)
            html.write(
                re.sub(
                    r'<td id="(.+)">([\S\s]+)</td>',
                    r'<td><button id="\1" onclick="'
                    + r"copyText('\1')"
                    + r'">\2</button></td>',
                    line,
                )
            )
        elif re.search(r"<td>rgb\(\d{1,3},\d{1,3},\d{1,3}\)</td>", line) is not None:
            line = re.sub(r"<td>", f'<td id="code_rgb_{index}">', line)
            html.write(
                re.sub(
                    r'<td id="(.+)">([\S\s]+)</td>',
                    r'<td><button id="\1" onclick="'
                    + r"copyText('\1')"
                    + r'">\2</button></td>',
                    line,
                )
            )
        elif (
            re.search(r"<td>hsl\(\d{1,3}%?,\d{1,3}%?,\d{1,3}%?\)</td>", line)
            is not None
        ):
            line = re.sub(r"<td>", f'<td id="code_hsl_{index}">', line)
            html.write(
                re.sub(
                    r'<td id="(.+)">([\S\s]+)</td>',
                    r'<td><button id="\1" onclick="'
                    + r"copyText('\1')"
                    + r'">\2</button></td>',
                    line,
                )
            )
        elif re.search(r"<td>[\S\s]+</td>", line) is not None:
            line = re.sub(r"<td>", f'<td id="code_name_{index}">', line)
            html.write(
                re.sub(
                    r'<td id="(.+)">([\S\s]+)</td>',
                    r'<td><button id="\1" onclick="'
                    + r"copyText('\1')"
                    + r'">\2</button></td>',
                    line,
                )
            )
        elif "xterm-" in line:
            index += 1
            html.write(line.replace("xterm-", f"xterm-{index}"))
        else:
            html.write(line)
