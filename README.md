# Dynamic Macro for Visual Studio Code

[増井俊之](https://github.com/masui)氏の[Dynamic Macro](https://scrapbox.io/masui/Dynamic_Macro)のVS Code版を開発するリポジトリです。

## 使い方

<kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>L</kbd> （<kbd>繰り返し</kbd>キー）は次のように動作します。

1. 同じ操作を2回行った直後に<kbd>繰り返し</kbd>キーを押した場合
    - 1回分の操作が実行される。
    - 続けて<kbd>繰り返し</kbd>キーを押せば同じ操作が1回ずつ実行される。
    ```
    abc abc _
    -->
    abc abc abc _
    -->
    abc abc abc abc _
    ```
2. 同じ操作の2回目を途中まで行ったところで<kbd>繰り返し</kbd>キーを押した場合
    - まず2回目の操作の残り部分が実行される。
    - 続けて<kbd>繰り返し</kbd>キーを押せば同じ操作の全体が1回ずつ実行される。
    ```
    abc a_
    -->
    abc abc _
    -->
    abc abc abc _
    ```

## 割り当てるキーの変更方法

以下のような記述を、VS Codeの設定ファイルの1つである `keybindings.json` に追加することで割り当てを変更できます。
```jsonc
    {
        // デフォルトの割り当てを無効化
        "key": "ctrl+alt+l",
        "command": "-dynamic-macro.repeat"
    },
    {
        // 別のキーを割り当て（ctrl+alt+x のところを好きなキーに書き換えてください）
        "key": "ctrl+alt+x",
        "command": "dynamic-macro.repeat"
    }
```
`keybindings.json` ファイルはコマンドパレット（CTRL+SHIFT+P または CMD+SHIFT+P）から「Preferences: Open Keyboard Shortcuts (JSON)」というコマンドを検索して実行すると開けます。

## 設定

VS Codeの設定画面から以下の設定を変更できます。

| 設定名 | 既定値 | 指定する値 |
| ------ | ------ | ---------- |
| Dynamic Macro: Max Macro Length | 64 | 検出するマクロの最大長 <br>長いマクロが誤検出が気になる場合は小さめに設定してください |

## インストール方法

Marketplace には未公開のため、以下のように手動でインストールする必要があります。
また、Dynamic Macro は既存の別のVS Code拡張である [Keyboard Macro Beta](https://github.com/tshino/vscode-kb-macro) の機能を利用して実現するため、それもインストールする必要があります。

Windowsでのみ動作確認済みですが、LinuxとmacOSでも同じく動作すると思います。

1. 必要なソフトウェアをインストール
    - [Node.js](https://nodejs.org/en/)
    - [Git](https://git-scm.com/)

2. Keyboard Macro Beta の最新版をインストール
    - [vscode-kb-macroリポジトリ](https://github.com/tshino/vscode-kb-macro)から最新版を取得します。ブランチはデフォルトの`main`をそのまま使います。
    ```
    git clone https://github.com/tshino/vscode-kb-macro.git
    cd vscode-kb-macro
    npm ci
    npx vsce package
    code --install-extension kb-macro-0.12.10.vsix
    cd ..
    ```
    - `.vsix`ファイルのファイル名にはバージョンが含まれるので、上に書いたコマンドは一例です。
    - VS Codeが既に起動している場合は、インストールした拡張を有効化するためにVS Codeを再起動するか、`Reload Window`コマンドを実行してください。
    - Keyboard Macro BetaのREADMEを読んで、必要な追加の作業があれば行ってください。とくに、VS Code上のキーマップ拡張を使っている場合は必ず対応するラッパー（keymap wrapper）の設定が必要です。

3. Dynamic Macro の最新版をインストール
    - 本リポジトリから最新版を取得します。
    ```
    git clone https://github.com/tshino/vscode-dynamic-macro.git
    cd vscode-dynamic-macro
    npm ci
    npx vsce package
    code --install-extension dynamic-macro-0.0.1.vsix
    cd ..
    ```
    - このようにインストールする代わりに、[VS Code上で拡張機能をデバッグ実行する方法](https://code.visualstudio.com/api/get-started/your-first-extension)もあります。

## 参考文献

Toshiyuki Masui and Ken Nakayama. 1994. Repeat and predict—two keys to efficient text editing. In Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '94). Association for Computing Machinery, New York, NY, USA, 118–130. https://doi.org/10.1145/191666.191722
