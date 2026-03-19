# --------------------------------------------------
# OPTIONS
# --------------------------------------------------

export ZSH="$HOME/.oh-my-zsh"
export EDITOR="nvim"
export GOPATH="$HOME/go"
export PNPM_HOME="$HOME/Library/pnpm"
export LYNX_CFG="$HOME/.config/lynx/lynx.cfg"

export ANDROID_HOME="$HOME/Library/Android/sdk"
export JAVA_HOME="/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home"

export FZF_DEFAULT_COMMAND="fd --type f"
export FZF_DEFAULT_OPTS='--color=bg+:-1'

zstyle ':omz:plugins:nvm' lazy yes

unsetopt BG_NICE

# --------------------------------------------------
# PATHS
# --------------------------------------------------

typeset -U path PATH

eval "$(/opt/homebrew/bin/brew shellenv)"

path=(
  "/opt/homebrew/bin"
  "/opt/homebrew/sbin"
  "/opt/homebrew/opt/postgresql@15/bin"
  "/opt/homebrew/opt/gnu-sed/libexec/gnubin"
  "/usr/local/opt/llvm/bin"
  "/usr/local/bin"
  "$ANDROID_HOME/emulator"
  "$ANDROID_HOME/tools"
  "$ANDROID_HOME/tools/bin"
  "$ANDROID_HOME/platform-tools"
  "$HOME/.cargo/bin"
  "$HOME/.local/bin"
  "$GOPATH/bin"
  "$HOME/bin"
  "$HOME/.spicetify"
  "$PNPM_HOME"
  "./node_modules/.bin"
  $path
)
export PATH

# --------------------------------------------------
# oh-my-zsh
# --------------------------------------------------
plugins=(
    git
    brew
    node
    macos
    npm
    golang
    docker
    docker-compose
    extract
    zsh-syntax-highlighting
    zsh-autosuggestions
    zsh-autopair
    fzf-tab
		nvm
		rust
)

fpath+=("${ZSH_CUSTOM:-${ZSH:-$HOME/.oh-my-zsh}/custom}/plugins/zsh-completions/src")
autoload -U compinit && compinit

source "$ZSH/oh-my-zsh.sh"

# --------------------------------------------------
# Completion
# --------------------------------------------------

if [[ -f "$HOME/.zsh/completions/_npm" ]]; then
  source "$HOME/.zsh/completions/_npm"
fi

# disable sort when completing `git checkout`
zstyle ':completion:*:git-checkout:*' sort false
# set list-colors to enable filename colorizing
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
# switch group using `,` and `.`
zstyle ':fzf-tab:*' switch-group ',' '.'
zstyle ':fzf-tab:*' prefix ''

# zstyle -d ':completion:*' format
# set descriptions format to enable group support
zstyle ':completion:*:descriptions' format '[%d]'

zstyle ':fzf-tab:*' show-group none
zstyle ':fzf-tab:*' fzf-pad 0
zstyle ':fzf-tab:*' fzf-min-height 0
zstyle ':fzf-tab:*' popup-min-size 0 0
zstyle ':fzf-tab:complete:cd:*' popup-pad 4 4
zstyle ':fzf-tab:*' fzf-command ftb-tmux-popup
zstyle ':fzf-tab:*' use-fzf-default-opts yes

# --------------------------------------------------
# Aliases
# --------------------------------------------------

alias c="clear"
alias tree="tree -I node_modules"
alias ev="exit"
alias nrd="npm run dev"
alias pbc="pwd | pbcopy"
alias love="/Applications/love.app/Contents/MacOS/love"
alias tmus="tmux"
# FOR NVIM CONFIG REWRITE
alias vimn="NVIM_APPNAME=neovim-rewrite nvim"

# Go to config
alias vc="cd $HOME/.config"
alias vcn="cd $HOME/.config/nvim"
alias cz="nvim $HOME/.zshrc"

# nvim
alias vim="nvim"
alias v="nvim"
alias vb="nvim '+SessionRestore'"
alias n="nvim"
alias ,="nvim ."

# apps
alias r="ranger"



# --------------------------------------------------
# Custom
# --------------------------------------------------

nf() {
	local search
	search=$(fzf-tmux -p --query="$1" -1)
	if [[ -n "$search" ]]; then
			nvim "$search"
	fi
}

focus_window() {
    SPACE_NAME=$(yabai -m query --spaces --space | jq -r ".label")
    WINDOW_ID=$(yabai -m query --windows --space | jq -r ".[] | select (.app=${SPACE_NAME}).id")
    yabai -m window --focus "${WINDOW_ID}"
}

# --------------------------------------------------
# Keybinds
# --------------------------------------------------

bindkey -s "^F" 'nf^M'


# --------------------------------------------------
# Tools
# --------------------------------------------------

eval "$(starship init zsh)"
eval "$(zoxide init zsh)"
