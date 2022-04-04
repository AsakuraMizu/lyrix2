FROM gitpod/workspace-full-vnc

RUN sudo apt update && \
    sudo apt install -y --no-install-recommends \
    libwebkit2gtk-4.0-dev \
    libssl-dev \
    libgtk-3-dev \
    libappindicator3-dev \
    librsvg2-dev && \
    sudo apt clean && \
    sudo rm -rf /var/cache/apt/* /var/lib/apt/lists/* /tmp/*

RUN cargo install tauri-cli --locked --version ^1.0.0-rc
