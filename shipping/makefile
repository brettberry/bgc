
liquibase:
	@mvn dependency:copy-dependencies
	@liquibase --driverPropertiesFile=./liquibase.properties update

build:
	npm run build

default: build
	npm start

test: build
	npm test
