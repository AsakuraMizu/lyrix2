FROM gitpod/workspace-full-vnc

USER root

RUN apt update && \
    apt install -y --no-install-recommends libwebkit2gtk-4.0-37 && \
    apt clean && rm -rf /var/cache/apt/* && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*

USER gitpod

RUN curl -fsSL https://deno.land/x/install/install.sh | sh && \
    /home/gitpod/.deno/bin/deno completions bash > /home/gitpod/.bashrc.d/90-deno && \
    echo 'export DENO_INSTALL="/home/gitpod/.deno"' >> /home/gitpod/.bashrc.d/90-deno && \
    echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> /home/gitpod/.bashrc.d/90-deno
