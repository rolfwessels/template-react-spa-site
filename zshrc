export ZSH="$HOME/.oh-my-zsh"
export EDITOR='nano'
ZSH_THEME="robbyrussell"

plugins=(docker git zsh-autosuggestions)

source $ZSH/oh-my-zsh.sh

## add make file auto complete
complete -W "`grep -oE '^[a-zA-Z0-9_.-]+:([^=]|$)' Makefile | sed 's/[^a-zA-Z0-9_.-]*$//'`" make

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
ZSH_THEME_GIT_PROMPT_PREFIX="%F{yellow}"  # Git branch prefix
ZSH_THEME_GIT_PROMPT_SUFFIX="%f"            # Reset color after Git branch

