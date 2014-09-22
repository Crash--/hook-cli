hook-cli
===

[hook](https://github.com/doubleleft/hook) commandline interface.

Bash Completion
---

Use Hook's bash completion by sourcing it in your .bashrc or .bash_profile.

Depending on where you installed hook-cli:

    if [ -f /path/to/hook-cli/completions/hook.bash ]; then
      . /path/to/meteorite/completions/hook.bash
    fi

Alternatively, you can create a symbolic link under bash_completion.d:

    ln -s /path/to/hook-cli/completions/hook.bash /path/to/bash_completion.d/hook

License
---

MIT
