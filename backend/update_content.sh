#!/bin/bash

content_1="Algoritmi"
content_2="Calcolo"
content_3="Algebra"
content_4="Probabilità"
content_5="Statistica"
content_6="Ottimizzazione"

echo "Updating content"

rm -rf ./content/theory/introduction/*
rm -rf ./content/theory/supervised-learning/*
rm -rf ./content/theory/unsupervised-learning/*
rm -rf ./content/theory/math-for-ml/*
rm -rf ./content/theory/deep-learning/*
rm -rf ./content/theory/computer-vision/*
rm -rf ./content/theory/nlp/*
rm -rf ./content/theory/reinforcement-learning/*
rm -rf ./content/theory/generative-models/*
rm -rf ./static/images/posts/*
#rm -rf ./static/images/tikz/*

cp -rf "../../my-obsidian-vault/00_Informatica/$content_1/Introduzione al Machine Learning/"* ./content/theory/introduction/
cp -rf "../../my-obsidian-vault/00_Informatica/$content_1/Supervised Learning/"* ./content/theory/supervised-learning/
cp -rf "../../my-obsidian-vault/00_Informatica/$content_1/Unsupervised Learning/"* ./content/theory/unsupervised-learning/
cp -rf "../../my-obsidian-vault/00_Informatica/$content_1/Natural Language Processing/"* ./content/theory/nlp/
cp -rf "../../my-obsidian-vault/01_Matematica/$content_2"  ./content/theory/math-for-ml/
cp -rf "../../my-obsidian-vault/01_Matematica/$content_3"  ./content/theory/math-for-ml/
cp -rf "../../my-obsidian-vault/01_Matematica/$content_4"  ./content/theory/math-for-ml/
cp -rf "../../my-obsidian-vault/01_Matematica/$content_5"  ./content/theory/math-for-ml/
cp -rf "../../my-obsidian-vault/01_Matematica/$content_6"  ./content/theory/math-for-ml/
cp -rf "../../my-obsidian-vault/images/"* ./static/images/posts/

./update_tikz.sh

echo "Done"