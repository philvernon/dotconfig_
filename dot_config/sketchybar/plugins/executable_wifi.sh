#!/usr/bin/env sh

CURRENT_WIFI="$(ipconfig getsummary $(networksetup -listallhardwareports | awk '/Hardware Port: Wi-Fi/{getline; print $2}') | awk -F ' SSID : ' '/ SSID : / {print $2}')"

if [ "$CURRENT_WIFI" = "" ]; then
  sketchybar --set $NAME label="Disconnected" icon=睊
else
  sketchybar --set $NAME label="$CURRENT_WIFI" icon=
fi
