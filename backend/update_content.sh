#!/bin/bash

content_1="Algoritmi"
content_2="Calcolo"
content_3="Algebra"
content_4="Probabilità"
content_5="Statistica"

echo "Updating content"

rm -rf ./content/*
rm -f ./static/images/posts/*

cp -rf ../my-obsidian-vault/00_Informatica/$content_1 ./content/
cp -rf ../my-obsidian-vault/01_Matematica/$content_2 ./content/
cp -rf ../my-obsidian-vault/01_Matematica/$content_3 ./content/
cp -rf ../my-obsidian-vault/01_Matematica/$content_4 ./content/
cp -rf ../my-obsidian-vault/01_Matematica/$content_5 ./content/
cp -rf ../my-obsidian-vault/images/* ./static/images/posts/

./update_tikz.sh

echo "Done"