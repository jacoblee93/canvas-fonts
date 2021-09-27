#!/usr/bin/env bash

CUR_DIR="$PWD"

for package in ./packages/*
do
	cd "$CUR_DIR"
	cd "$package"
	npm publish
done