#!/usr/bin/env bash

direction="$1"

# case "$direction" in
#     L) yabai -m window --focus west ;;
#     R) yabai -m window --focus east ;;
#     U) yabai -m window --focus north ;;
#     D) yabai -m window --focus south ;;
# esac

# Fallback to yabai window focus
case "$direction" in
    L) if [ $(tmux display-message -p '#{pane_at_left}') -ne 1 ]; then tmux select-pane -L; else yabai -m window --focus west || true; fi ;;
    R) if [ $(tmux display-message -p '#{pane_at_right}') -ne 1 ]; then tmux select-pane -R; else yabai -m window --focus east || true; fi || yabai -m window --focus recent ;; # go to recent if nothing east
    U) if [ $(tmux display-message -p '#{pane_at_top}') -ne 1 ]; then tmux select-pane -U; else yabai -m window --focus north || true; fi ;;
    D)  if [ $(tmux display-message -p '#{pane_at_bottom}') -ne 1 ]; then tmux select-pane -D; else yabai -m window --focus south || true; fi ;;
esac
#
# Fallback to yabai window focus
