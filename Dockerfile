# Base image
FROM python:3.8-slim-bullseye

# Use bash as default shell
RUN rm -f /bin/sh && ln -s /bin/bash /bin/sh

# Install system dependencies
RUN apt-get update -y && apt-get install -y --no-install-recommends \
    curl \
    nano \
    wget \
    gnupg \
    git \
    ca-certificates \
    build-essential \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 16.x and Yarn
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn \
    && rm -rf /var/lib/apt/lists/*

# Environment variables
ENV ENV_TYPE=staging
ENV MONGO_HOST=mongo
ENV MONGO_PORT=27017
ENV PYTHONPATH=$PYTHONPATH:/src/

# Copy and install Python dependencies
COPY src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
