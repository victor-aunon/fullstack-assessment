DB_USER=root
DB_PASS=pass

backend-build:
	docker-compose build

backend-build-slim:
	docker-compose -f docker-compose.slim.yml build

backend-up:
	docker-compose up

backend-up-slim:
	docker-compose -f docker-compose.slim.yml up

backend-test-api:
	docker-compose -f docker-compose.apitest.yml up --abort-on-container-exit

backend-test-service:
	docker-compose -f docker-compose.servicetest.yml up --abort-on-container-exit

backend-down:
	docker-compose down

backend-dump:
	docker-compose exec -T mongodb sh -c 'mongodump --authenticationDatabase admin -u ${DB_USER} -p ${DB_PASS} -o /dbdump'

backend-load:
	docker-compose exec -T mongodb sh -c 'mongorestore --authenticationDatabase admin -u ${DB_USER} -p ${DB_PASS} --dir=/dbdump'

backend-dbshell:
	docker-compose exec mongodb mongo --authenticationDatabase admin -u ${DB_USER} -p ${DB_PASS}

backend-test: backend-dump
	echo ""
	make backend-load

$PHONY: backend-build backend-build-slim backend-up backend-up-slim backend-test-api backend-test-service backend-down backend-dump backend-load backend-dbshell backend-test
