# Qt

```sh
git clone git://code.qt.io/qt/qt5.git
# or
# $ git clone https://code.qt.io/qt/qt5.git
cd qt5
perl init-repository
cd ../
export LLVM_INSTALL_DIR=/usr/llvm
mkdir qt5-build
cd qt5-build
../qt5/configure -developer-build -opensource -nomake examples -nomake tests
cmake -DCMAKE_BUILD_TYPE=Release ../qt5
cmake --build .
```

`/qt5-build/qtbase/lib/`

に共有ライブラリが生成される。
