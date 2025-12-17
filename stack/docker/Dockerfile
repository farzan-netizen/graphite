ARG CACHE_IMAGE

# Load image with node module caches
FROM $CACHE_IMAGE AS dependency

WORKDIR /bm/app

ENV PATH /bm/node_modules/.bin:$PATH
ENV PORT 80
ENV NODE_ENV production

# Copy application files
COPY . .

# Build the Next.js application (dependencies already installed in cache image)
RUN pnpm build

# Expose port
EXPOSE $PORT

# Start the application
CMD [ "pnpm", "start" ]

