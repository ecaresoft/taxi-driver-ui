FROM danlynn/ember-cli:3.10.1
# Environment vars
ARG EMBER_ENV
ENV EMBER_ENV $EMBER_ENV
WORKDIR /myapp
# Dependencies
COPY package.json yarn.lock ./
RUN yarn install
# Source
COPY testem.js .
COPY ember-cli-build.js .
COPY .ember-cli .
COPY .eslintrc.js .
COPY .eslintignore .
COPY .template-lintrc.js .
COPY .watchmanconfig .
COPY public ./public
COPY config ./config
COPY tests ./tests
COPY app ./app

RUN ember build --environment $EMBER_ENV
CMD ["ember", "serve"]