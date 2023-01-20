# Dynamic Macro for Visual Studio Code

[![Node.js CI](https://github.com/tshino/vscode-dynamic-macro/actions/workflows/node.js.yml/badge.svg)](https://github.com/tshino/vscode-dynamic-macro/actions/workflows/node.js.yml)
[![CodeQL](https://github.com/tshino/vscode-dynamic-macro/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/tshino/vscode-dynamic-macro/actions/workflows/github-code-scanning/codeql)

このVS Code拡張を使うと、繰り返しのキーボード操作をシンプルな操作ですばやく実行できるようになります。

[増井俊之](https://github.com/masui)氏の[Dynamic Macro](https://scrapbox.io/masui/Dynamic_Macro)というテクニックをVS Code用に実装したものです。

## 使い方

<kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>L</kbd> （以下、<kbd>REPEAT</kbd>キーと表記）は次のように動作します。

1. 同じ操作を2回行った直後に<kbd>REPEAT</kbd>キーを押した場合
    - 1回分の操作が実行される。
    - 続けて<kbd>REPEAT</kbd>キーを押せば同じ操作が1回ずつ実行される。
    ```
    abc abc _
    -->
    abc abc abc _
    -->
    abc abc abc abc _
    ```
2. 同じ操作の2回目を途中まで行ったところで<kbd>REPEAT</kbd>キーを押した場合
    - まず2回目の操作の残り部分が実行される。
    - 続けて<kbd>REPEAT</kbd>キーを押せば同じ操作の全体が1回ずつ実行される。
    ```
    abc a_
    -->
    abc abc _
    -->
    abc abc abc _
    ```

## キーボードマクロとの違い

- 記録開始と記録終了の明示的な操作が不要
- どこからどこまでが繰り返しの1回分の操作かを意識しなくても使える

## 重要な注意事項

- **Keyboard Macro Betaが自動的にインストールされます**
    - Dynamic Macroは、別の拡張機能である [Keyboard Macro Beta](https://marketplace.visualstudio.com/items?itemName=tshino.kb-macro) の機能を利用して実現しているため、この2つが同時にインストールされます。
    - Keyboard Macro Betaは基本的なキーボードマクロ機能を提供しています。どのキー操作が記録可能かといった基本的なことはDynamic Macroでも共通なので、Keyboard Macro BetaのREADMEを参照してください。
- **インストールしただけでは動かない場合があります**
    - [Keyboard Macro Beta](https://marketplace.visualstudio.com/items?itemName=tshino.kb-macro)のREADMEを読んで必要な設定を行ってください。とくに、キーマップ拡張を使っている場合は必ず対応するラッパー（keymap wrapper）の設定が必要です。
- **Dynamic Macroをインストールすると `kb-macro.active` が常にtrueになります**
    - Keyboard Macro Betaはキー操作の記録状態を制御するために `kb-macro.active` というコンテキスト変数を提供していて、通常はキーボードマクロの記録開始から終了までの間だけ true になりますが、Dynamic Macroが同時にインストールされている場合は `kb-macro.active` が常にtrue になります。
    - そのため、すべてのラッパー（keybinding wrapper）が常時有効な状態です。
    - もし、追加のキー操作を定義するような何らかの拡張機能を他にインストールしている場合は、その操作に対応するラッパーを設定しないと、その拡張のキー操作が正しく働かない場合があります。

## コマンド

このVS Code拡張が提供するコマンドは1つだけです。

| コマンド名 | Command ID | 機能 | キー |
| ---------- | ---------- | ---- | ---- |
| Dynamic Macro: Repeat | `dynamic-macro.repeat` | 直前のキー操作を繰り返す | <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>L</kbd> |

もし誤って長いマクロを実行してしまった場合などは、<kbd>Esc</kbd>キーでマクロの実行を止めることができます。これはKeyboard Macro Betaが提供している機能です。

## 割り当てるキーの変更方法

以下のような記述を、VS Codeの設定ファイルの1つである `keybindings.json` に追加することで、キーの割り当てを変更できます。
```jsonc
    {
        // デフォルトの割り当てを無効化（コマンド名の前に付けたマイナス記号がポイント）
        "key": "ctrl+alt+l",
        "command": "-dynamic-macro.repeat"
    },
    {
        // 別のキーを割り当て（ctrl+alt+x のところを好きなキーに書き換えてください）
        "key": "ctrl+alt+x",
        "command": "dynamic-macro.repeat"
    }
```
`keybindings.json` ファイルはコマンドパレット（CTRL+SHIFT+P または CMD+SHIFT+P）から「Open Keyboard Shortcuts (JSON)」というコマンドを検索して実行すると開けます。

## 設定

VS Codeの設定画面から以下の設定を変更できます。

| 設定名 | 既定値 | 指定する値 |
| ------ | ------ | ---------- |
| Max Macro Length | 64 | 検出するマクロの最大長 <br>長いマクロの誤検出が気になる場合は小さめに設定してください |

## 変更履歴

[CHANGELOG.md](CHANGELOG.md)

## 参考

Toshiyuki Masui and Ken Nakayama. 1994. Repeat and predict—two keys to efficient text editing. In Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '94). Association for Computing Machinery, New York, NY, USA, 118–130. https://doi.org/10.1145/191666.191722
