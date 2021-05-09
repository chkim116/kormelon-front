#!/bin/sh
# NextJS on Elastic Beanstalk with Circle CI
# https://blog.agney.dev/nextjs-on-eb-ci/
# If the directory, `dist`, doesn't exist, create `dist`
stat dist || mkdir dist

# Archive artifacts
zip dist/kormelon-front.zip -r ./ -x "*.git/*" "*node_modules/*" "*.next/static/*" "*.next/cache/*"

# Setup eb config
mkdir .elasticbeanstalk
cat << EOF > .elasticbeanstalk/config.yml
deploy:
    artifact: dist/kormelon-front.zip
EOF