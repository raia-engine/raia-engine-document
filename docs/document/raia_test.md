# Raiaのソフトウェアテスト


C言語で書かれた Raia のライブラリは、テストフレームワークに `sharedom/utest.h` を採用し、テストコードはC++で記述されます。

## utest.h

`~/Documents/` ディレクトリに raia リポジトリをクローンしていると仮定します。

```sh
cd ~/Documents/raia/src/third_party/cpp
```

## Google Testの取得を取得する

サブモジュールとしてgitリポジトリに追加します

```bash
git submodule add https://github.com/google/googletest.git googletest
```

## CMakeLists.txtの設定*

プロジェクトの `CMakeLists.txt` ファイルに以下の設定を追加します。

```cmake
cmake_minimum_required(VERSION 3.10)

project(YourProjectName)

# メインのC言語ソースコードをターゲットとして追加
add_executable(main_app src/main.c)

# Google TestをCMakeに組み込む
add_subdirectory(extern/googletest)

# Google Testのインクルードディレクトリを追加
include_directories(${gtest_SOURCE_DIR}/include ${gtest_SOURCE_DIR})

# テスト用のC++ファイルをターゲットとして追加
add_executable(tests tests/test_main.cpp)
target_link_libraries(tests gtest gtest_main)

# メインのC言語ソースとテストのC++ソースをリンク
target_link_libraries(tests main_app)
```

3. **テストの記述**:
    - `tests/test_main.cpp`のようなファイルを作成して、C++を使用してテストを記述します。

```cpp
#include <gtest/gtest.h>
extern "C" {
    #include "path_to_your_c_header.h"
}

TEST(YourTestCase, YourTestName) {
    // テストの内容を記述
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
```

注意: `extern "C"`ブロックを使用して、CのヘッダファイルをC++コードから読み込むことで、Cの関数や変数を正しくリンクすることができます。

4. **テストのビルドと実行**:
    - CMakeを使用してプロジェクトをビルドし、生成されたテストバイナリを実行してテストを実施します。

```bash
mkdir build
cd build
cmake ..
make
./tests
```

これで、CMakeプロジェクトにGoogle Testを組み込み、C言語のコードに対してC++でテストを実行する設定が完了しました。