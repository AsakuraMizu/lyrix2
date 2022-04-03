FROM gitpod/workspace-full-vnc

RUN echo 'keyboard-configuration keyboard-configuration/layout select English (US)' | sudo debconf-set-selections && \
    echo 'keyboard-configuration keyboard-configuration/variant select English (US)' | sudo debconf-set-selections && \
    sudo apt update && \
    sudo apt install -y libwebkit2gtk-4.0-37

RUN curl -fsSL https://deno.land/x/install/install.sh | sh && \
    /home/gitpod/.deno/bin/deno completions bash > /home/gitpod/.bashrc.d/90-deno && \
    echo 'export DENO_INSTALL="/home/gitpod/.deno"' >> /home/gitpod/.bashrc.d/90-deno && \
    echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> /home/gitpod/.bashrc.d/90-deno
