#!/usr/bin/env sh

DATE="04/01/2023" #calcurse only returns the first appointments, not recurrent ones
TIME=$(date +%H%M)
CURRENT_TASK=$(calcurse -Q --filter-end-after "$DATE $TIME" | sed "3q;d" | xargs)

sketchybar --set $NAME label="$CURRENT_TASK"
