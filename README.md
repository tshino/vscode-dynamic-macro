# Dynamic Macro for Visual Studio Code

[増井俊之](https://github.com/masui)氏の[Dynamic Macro](https://scrapbox.io/masui/Dynamic_Macro)のVS Code版を開発するリポジトリです。

## インストール

開発中のため（Marketplace には未公開なので）以下のように手動でインストールする必要があります。
また、Dynamic Macro は既存の別のVS Code拡張である [Keyboard Macro Beta](https://github.com/tshino/vscode-kb-macro) の機能を利用して実現するため、それもインストールする必要があります。

1. 必要なソフトウェアをインストール
    - [Node.js](https://nodejs.org/en/)
    - [Git](https://git-scm.com/)

2. Keyboard Macro Beta の最新版をインストール
    - [vscode-kb-macroリポジトリ](https://github.com/tshino/vscode-kb-macro)から最新版を取得します。ブランチはデフォルトの`main`をそのまま使います。
    ```
    git clone https://github.com/tshino/vscode-kb-macro.git
    cd vscode-kb-macro
    npm ci
    vsce package
    code --install-extension kb-macro-0.12.10.vsix
    cd ..
    ```
    - `vsce`コマンドは `npm install vsce` でインストールできます。
    - `.vsix`ファイルのファイル名にはバージョンが含まれるので、上に書いたコマンドは一例です。
    - VS Codeが既に起動している場合は、インストールした拡張を有効化するためにVS Codeを再起動するか、`Reload Window`コマンドを実行してください。
    - Keyboard Macro BetaのREADMEを読んで、必要な追加の作業があれば行ってください。とくに、VS Code上のキーマップ拡張を使っている場合は必ず対応するラッパー（keymap wrapper）の設定が必要です。

3. Dynamic Macro の最新版をインストール
    - 本リポジトリから最新版を取得します。
    ```
    git clone https://github.com/tshino/vscode-dynamic-macro.git
    cd vscode-dynamic-macro
    npm ci
    vsce package
    code --install-extension dynamic-macro-0.0.1.vsix
    cd ..
    ```
    - このようにインストールする代わりに、[VS Code上で拡張機能をデバッグ実行する方法](https://code.visualstudio.com/api/get-started/your-first-extension)もあります。

## 利用

Dynamic Macroの機能は未実装です。
代わりに <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>L</kbd> で「最後に入力したキーを再実行」できるようにしてあります。
これは、Dynamic Macro機能を実装するための道具立てが揃ったことの確認の意味で実装したものです。
道具立てとは以下のものです。

- [Background Recording API](https://github.com/tshino/vscode-kb-macro/issues/176)
    - VS Code上で入力されたコマンド列（文字入力もコマンドとして扱う）を記録し続けるAPI
- [History API](https://github.com/tshino/vscode-kb-macro/issues/177)
    - 最新の入力コマンド列を取得するAPI
- Playbackコマンド
    - 任意のコマンド列を指定して再実行するコマンド
