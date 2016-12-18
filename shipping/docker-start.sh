
# needs migrations and liquibase.properties
# mvn liquibase:update

echo $DOCKER_HOST_IP dockerhost | tee -a /etc/hosts

npm run build && npm start
