#!/usr/bin/env bash

# bash completion for hook commandline client

_hook_cli()
{
    local root=$(git rev-parse --show-cdup)

    local cur=${COMP_WORDS[COMP_CWORD]}
    local prev=${COMP_WORDS[COMP_CWORD-1]}

    local first=$(echo $cur | cut -d ':' -f 1)
    local second=$(echo $cur | cut -d ':' -f 2)

    local php_print_names='$json=json_decode(file_get_contents("php://stdin")); foreach($json as $item) {echo $item->name . "\n";}'

    # contextual completion
    case "$prev" in
      "generate:seed")
        # TODO: list collections from hook here
        COMPREPLY=( $( compgen -W "auth" -- $cur ) )
        return 0
        ;;

      "generate:observer")
        # TODO: list collections from hook here
        COMPREPLY=( $( compgen -W "auth" -- $cur ) )
        return 0
        ;;

      "generate:route")
        COMPREPLY=( $( compgen -W "get post put delete" -- $cur ) )
        return 0
        ;;

      "config:remove")
        # list configs from hook
        COMPREPLY=( $( compgen -W "$(hook config --json | php -r "$php_print_names")" -- $cur ) )
        return 0
        ;;

      "module:upload")
        COMPREPLY=( $( compgen -W "$(find hook-ext -name *.php)" -- $cur ) )
        return 0
        ;;

      "module:remove")
        # list modules from hook
        COMPREPLY=( $( compgen -W "$(hook modules --json | php -r "$php_print_names")" -- $cur ) )
        return 0
        ;;

      "db:seed")
        list="hook-ext/seeds"
        COMPREPLY=( $( compgen -W "$(ls "$root$list" | sed -e 's/\.[a-zA-Z]*$//')" -- $cur ) )
        return 0
        ;;

    esac

    # subcommands completion
    case "$first" in
      "app")
        COMPREPLY=( $( compgen -W "new" -- $second ) )
        return 0
        ;;

      "config")
        COMPREPLY=( $( compgen -W "set" -- $second ) )
        return 0
        ;;

      "cache")
        COMPREPLY=( $( compgen -W "clear" -- $second ) )
        return 0
        ;;

      "generate")
        COMPREPLY=( $( compgen -W "observer route schedule schema seed template channel" -- $second ) )
        return 0
        ;;

      "db")
        COMPREPLY=( $( compgen -W "seed" -- $second ) )
        return 0
        ;;

      "key")
        COMPREPLY=( $( compgen -W "new" -- $second ) )
        return 0
        ;;

      "schedule")
        COMPREPLY=( $( compgen -W "upload" -- $second ) )
        return 0
        ;;

      "module")
        COMPREPLY=( $( compgen -W "remove upload" -- $second ) )
        return 0
        ;;

    esac

    # complete options
    if [[ "$cur" == -* ]]; then
      COMPREPLY=( $( compgen -W "--app --config --debug --endpoint --help --json --javascript --version" -- $cur ) )
      return 0
    fi

    # complete main commands
    if [[ "$prev" == "hook" ]]; then
      COMPREPLY=( $(compgen -W "app: apps cache: console config config: db: deploy generate: key: keys module: modules schedule schedule:" -- $cur) )
      return 0
    fi
}

# complete is a bash builtin, but recent versions of ZSH come with a function
# called bashcompinit that will create a complete in ZSH. If the user is in
# ZSH, load and run bashcompinit before calling the complete function.
if [[ -n ${ZSH_VERSION-} ]]; then
  autoload -U +X bashcompinit && bashcompinit
fi
complete -F _hook_cli -o nospace hook
