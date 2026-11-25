export ZSH="$HOME/.oh-my-zsh"
export EDITOR='nano'
HISTFILE=${HISTFILE:-/cache/.zsh_history}

# Earlier Zsh containers used this filename for their history volume.
if [[ "$HISTFILE" == /cache/.zsh_history && ! -e "$HISTFILE" && -f /cache/.bash_history ]]; then
    (umask 077; cp -n /cache/.bash_history "$HISTFILE")
fi

ZSH_THEME="robbyrussell"

plugins=(docker git zsh-autosuggestions)

# Refresh Oh My Zsh when rebuilding the dev image.
zstyle ':omz:update' mode disabled
source "$ZSH/oh-my-zsh.sh"
setopt SHARE_HISTORY

## add make file auto complete
if [[ -f Makefile ]]; then
    complete -W "$(grep -oE '^[a-zA-Z0-9_.-]+:([^=]|$)' Makefile | sed 's/[^a-zA-Z0-9_.-]*$//')" make
fi

alias r="source ~/.zshrc"

help() {
    echo "Welcome , here are the command that you can run"
    echo "  "
    echo "r                 to load current source"
    echo "make              to run the make commands required for this project"
}


bindkey '^ ' autosuggest-accept

PROMPT='%F{blue}🐳%f:%F{green}%~%f $(git_prompt_info)%F{blue}%#%f '

# Customize the prompt colors
ZSH_THEME_GIT_PROMPT_PREFIX="git:(%F{yellow}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%f "

