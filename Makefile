setup: install

install:
	npm ci

build:
	npm run build

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

start:
	npm run dev

install:
	npm ci
