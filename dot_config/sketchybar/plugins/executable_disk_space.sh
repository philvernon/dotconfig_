#!/usr/bin/env sh

sketchybar --set $NAME label="$(df -H | awk '/\/dev\/disk3s1/ {printf("%s", $4)}')" icon=󰋊
