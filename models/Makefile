LOCAL_CONTAINER_NAME=modelserver
LOCAL_DOCKER_OPTIONS= -f docker-compose.yml


up:
	docker compose $(LOCAL_DOCKER_OPTIONS) up -d 

down:
	docker compose $(LOCAL_DOCKER_OPTIONS) down

stop:
	docker compose $(LOCAL_DOCKER_OPTIONS) stop

server:
	docker exec -it $(LOCAL_CONTAINER_NAME) gunicorn --bind 0.0.0.0:5000 api:app

build:
	docker compose $(LOCAL_DOCKER_OPTIONS) build