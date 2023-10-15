# SteamDeckに開発環境を構築する

端末で次のコマンドを実行する。

```sh
sudo steamos-readonl disable
sudo pacman-key --init
sudo pacman-key --populate archlinux
# sudo pacman -S bc
# sudo pacman -S --overwrite
sudo pacman -S linux-neptune-headers
sudo pacman -S glibc
sudo pacman -S linux-apt-headers
```

`.bashrc` ファイルを編集してパスを通す。

```sh
# ~/.bashrc
export C_INCLUDE_PATH="/lib/modules/$(uname -r)/build/include":$C_INCLUDE_PATH
export C_INCLUDE_PATH="/lib/modules/$(uname -r)/build/include/uapi":$C_INCLUDE_PATH
```

端末で次のコマンドを実行する。

```sh
sudo pacman -S libx11
sudo pacman -S xorgproto
sudo pacman -S glfw
sudo pacman -S libgl
# sudo pacman -S mesa
# sudo pacman -S glu
```