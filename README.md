# Dynamic Macro for Visual Studio Code

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

### キーボードマクロとの違い

いわゆるキーボードマクロは「記録の開始」と「記録の終了」という操作によって繰り返したい操作の内容を明示的に指定します。
Dynamic Macroの場合は記録の開始時に余分な操作が不要なことと、「どこからどこまでが繰り返しの1回分の操作か」ということを意識しなくても使えるメリットがあります。

## 重要な注意事項

このVS Code拡張は別のVS Code拡張である [Keyboard Macro Beta](https://marketplace.visualstudio.com/items?itemName=tshino.kb-macro) の機能を利用して実現しているため、これも自動でインストールされます。どのキー操作が記録可能かといった基本的なことはKeyboard Macro BetaのREADMEに書かれています。
また正しく動作させるためにはインストール後に追加の設定が必要な場合があります。Keyboard Macro BetaのREADMEを読んで必要な設定を行ってください。とくに、VS Code上のキーマップ拡張を使っている場合は必ず対応するラッパー（keymap wrapper）の設定が必要です。

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

## インストール方法（正式リリースまでの暫定的な情報です）

Marketplace には未公開のため、以下のように手動でインストールする必要があります。

Windowsでのみ動作確認済みですが、LinuxとmacOSでも同じ方法でインストールでき、動作すると思います。

1. 必要なソフトウェアをインストール
    - [Node.js](https://nodejs.org/en/)
    - [Git](https://git-scm.com/)

2. Dynamic Macro の最新版をインストール
    - 本リポジトリから最新版を取得します。
    ```
    git clone https://github.com/tshino/vscode-dynamic-macro.git
    cd vscode-dynamic-macro
    npm ci
    npx vsce package
    code --install-extension dynamic-macro-0.0.1.vsix
    ```
    - 最後の行はパッケージをVS Codeにインストールしています。
    - `.vsix`ファイルのファイル名にはバージョンが含まれるので、上に書いたコマンドは一例です。
    - このとき[Keyboard Macro Beta](https://marketplace.visualstudio.com/items?itemName=tshino.kb-macro)も（未インストールであれば）自動的にインストールされます。
    - VS Codeが既に起動している場合は、インストールした拡張を有効化するためにVS Codeを再起動するか、Reload Window コマンドを実行してください。
3. Keyboard Macro Betaの初期設定
    - Keyboard Macro BetaのREADMEを読んで、必要な追加の作業があれば行ってください。
    - とくに、VS Code上のキーマップ拡張を使っている場合は必ず対応するラッパー（keymap wrapper）の設定が必要です。

以上です。これでDynamic Macroが使えるはずです。

## 参考

Toshiyuki Masui and Ken Nakayama. 1994. Repeat and predict—two keys to efficient text editing. In Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '94). Association for Computing Machinery, New York, NY, USA, 118–130. https://doi.org/10.1145/191666.191722
