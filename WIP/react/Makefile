
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

EXECUTABLES = git node bower gulp
K := $(foreach exec,$(EXECUTABLES),\
        $(if $(shell which $(exec)),some string,$(error "No $(exec) in PATH, consider doing brew install $(exec))))

.PHONY: init
init:
	git init
	git remote add origin https://github.com/samelwitt/react-flux-es6-less-webpack.git
	git fetch origin
	git checkout -b master --track origin/master
	rm -rf .git
	git init
	npm i
.PHONY: reset
reset:
	rm -rf app
	rm .gitignore
	rm package.json
	rm package-lock.json
	rm README.md
	rm webpack.config.js
	rm -rf node_modules

.PHONY: up
up:
	npm start