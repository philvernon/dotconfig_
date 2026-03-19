#!/usr/bin/env sh

focus_window () {
    SPACE_NAME=$(yabai -m query --spaces --space | jq ".label")
    WINDOW_ID=$(yabai -m query --windows --space | jq ".[] | select (.app=${SPACE_NAME}).id")
    yabai -m window --focus "${WINDOW_ID}"
}
