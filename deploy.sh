#!/usr/bin/env bash

APP_ENV=$1

if [ -z "$APP_ENV" ]; then
  echo "Please env"
  exit
fi

echo "APP_ENV: $APP_ENV"

prompt_confirm() {
  while true; do
    read -r -n 1 -p "${1:-Continue?} [y/n]: " REPLY
    case $REPLY in
      [yY]) echo ; return 0 ;;
      [nN]) echo ; return 1 ;;
      *) printf " \033[31m %s \n\033[0m" "invalid input"
    esac
  done
}

prompt_confirm "Are you sure?" || exit 0

if [ "$APP_ENV" == "production" ]; then
  prompt_confirm "You are try to deploy Production. Really?" || exit 0
fi

case $APP_ENV in
dev)
  S3_BUCKET=
  CLOUD_FRONT_ID=
  ;;
staging)
  S3_BUCKET=
  CLOUD_FRONT_ID=
  ;;
production)
  S3_BUCKET=
  CLOUD_FRONT_ID=
  ;;
esac


echo "S3_BUCKET: $S3_BUCKET"
echo "CLOUD_FRONT_ID: $CLOUD_FRONT_ID"
LOG_DATE_FILE="$(date '+%Y%m%d%H%M%S')-$APP_ENV-$USER.log"
echo "LOG FILE: $LOG_DATE_FILE"

webpack --progress --mode="$APP_ENV" && \
aws --profile bigc-deploy s3 sync ./dist s3://"$S3_BUCKET" --delete >> "$LOG_DATE_FILE" && \
aws --profile bigc-deploy cloudfront create-invalidation --distribution-id "$CLOUD_FRONT_ID" --paths '/*' >> "$LOG_DATE_FILE" && \
#aws --profile mama s3 cp "./$LOG_DATE_FILE" "s3://2022mamalog/deploy/$LOG_DATE_FILE" > /dev/null

rm -f "./$LOG_DATE_FILE"
echo "== Deploy $APP_ENV Complete"
logger -s "Deploy [$APP_ENV] Complete. USER [$USER]. S3_BUCKET: [$S3_BUCKET]. CLOUD_FRONT_ID: [$CLOUD_FRONT_ID]" 2>> ./deploy.log