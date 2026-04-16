#!/usr/bin/env bash

# Ajuste a URL do repositório depois de criá-lo no GitHub.
REPO_URL="git@github.com:SEU_USUARIO/prototipo-ui-ux.git"

printf "Inicializando repositório local...\n"
git init

git branch -M main

git add .
git commit -m "feat: estrutura inicial do prototipo ui ux"

git remote add origin "$REPO_URL"

printf "\nAgora envie com:\n"
printf "git push -u origin main\n"
