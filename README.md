# PacketGenerator

## 概要
PacketGeneratorは、独自のパケット定義ファイル（.pks）からC#用のクラスや列挙型のソースコードを自動生成するツールです。パケット定義ファイルに記述されたクラスやenumの情報をパースし、C#で利用可能なコードを出力します。

## 主な機能
- 独自フォーマット（.pksファイル）でパケット構造を定義
- TypeScriptで記述されたパーサーにより、クラス・列挙型情報を抽出
- C#用のクラス・enumコードを自動生成し、指定ディレクトリ（packets/csharp）に出力

## ディレクトリ構成
- `src/` … パーサーやコンバーターなど主要なロジック
- `packets/` … パケット定義ファイル（.pks）を配置
- `packets/csharp/` … 生成されたC#コードの出力先

## 使い方
1. `packets/`ディレクトリに`.pks`ファイルを作成し、パケット構造を記述します。
2. `npm run build` でTypeScriptをビルドします。
3. `npm run dev` でパーサーを実行し、C#コードを自動生成します。
4. 生成されたC#ファイルは `packets/csharp/` に出力されます。

## パケット定義ファイル例
```pks
enum PacketTags {
    None
    SimpleEntity
    SimpleEntityList
    InitValueTest = 10
    IncrementTest
}

class SimpleEntity {
    PacketTag SimpleEntity
    u64 player_id
    f32 x
    f32 y
    string name
    vec<i32> item_ids
    i32 hp
}
```

## 開発者向け情報
- TypeScriptで実装されており、主要なロジックは`src/`配下にあります。
- 拡張やカスタマイズも容易です。

## ビルド方法
1. 依存パッケージのインストール
   ```powershell
   npm install
   ```
2. TypeScriptのビルド
   ```powershell
   npm run build
   ```
3. 開発用実行（C#コード自動生成）
   ```powershell
   npm run dev
   ```

## ライセンス
MIT License