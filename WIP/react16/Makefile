
ifndef VERBOSE
.SILENT:
endif
# This hides all output unless call includes VERBOSE=1. So
# if you use "make up VERBOSE=1" it will display all output.
PROJECT_DIR := $(shell pwd)
DATE_NOW := $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")
FILE_SAFE_DATE_NOW := $(shell date -u +"%Y-%m-%dT%H-%M-%SZ")
# setup_flat: MEAN_PATH = "."
MEAN_PATH = "mean"
# test if mean installed

EXECUTABLES = git node mongo bower gulp docker yarn
K := $(foreach exec,$(EXECUTABLES),\
        $(if $(shell which $(exec)),some string,$(error "No $(exec) in PATH, consider doing brew install $(exec))))


# ifeq (, $(shell which git))
#  $(error "No git in $(PATH), consider doing brew install git")
# endif

# ifeq (, $(shell which node))
#  $(error "No node in $(PATH), consider doing brew install node")
# endif

# ifeq (, $(shell which mongo))
#  $(error "No mongo in $(PATH), consider doing brew install mongo")
# endif

# ifeq (, $(shell which bower))
#  $(error "No bower in $(PATH), consider doing brew install bower")
# endif


.PHONY: init
init:
	npm install --save react@^16.0.0 react-dom@^16.0.0
	yarn add webpack webpack-dev-server path
	yarn add babel-loader babel-core babel-preset-es2015 babel-preset-react --dev
	yarn add html-webpack-plugin

.PHONY: reset
reset:
	rm -rf mean

.PHONY: up
up:
	echo "Docker containers loading ..."
	cd $(MEAN_PATH); docker-compose up -d

.PHONY: down
down:
	echo "Docker containers exiting ..."
	cd $(MEAN_PATH); docker-compose stop $(docker ps -a -q --filter ancestor=meanjs --format="{{.ID}}"); docker-compose stop $(docker ps -a -q --filter ancestor=mean_db_1 --format="{{.ID}}")

.PHONY: terminal
terminal:
	docker exec -it mean_web-data_1 /bin/bash

.PHONY: show
show:
	docker ps -a

.PHONY: exited
exited:
	docker ps -aq -f status=exited

.PHONY: clean
clean:
	# remove all exited containers.
	docker ps -aq --no-trunc | xargs docker rm
