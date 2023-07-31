# Desafio Web (React JS + Django)

Este desafio foi proposto pela beAnalytic, consiste em basicamente criar uma lista de tarefas, onde será possível cadastrar, alterar, deletar e listar as tarefas criadas.

## Frontend

No front-end, foi utilizando React JS, uma framework popular de Java Script.

O front-end é relativamente simples, ao iniciar o projeto, existirá um box para que a tarefa seja escrita e um botão logo ao lado para que a tarefa seja adicionada. Assim que iniciar, o sistema solicitará para o endpoint `/api/tasks/`, as tarefas registradas, caso não exista, nenhuma tarefa será adicionada a tela do usuário.

O botão de adicionar, cadastrá a tarefa com seu conteúdo e enviará para o endpoint `/api/tasks/`, a tarefa cadastrada.

Na tela do usuário, após houver uma ou mais tarefas cadastradas, os botões "editar" e "excluir", estarão respectivamente disponíveis.

O botão de editar, será responsável por alterar a tarefa do usuário, sendo assim, será possível reescrever a tarefa designada. Após a alteração, será enviado para o endpoint `/api/tasks/<task_id>/`, contendo o ID da tarefa alterada o seu novo conteúdo.

O botão excluir, será responsável por deletar e remover do banco de dados a tarefa escolhida pelo usuário, portanto, será enviado para o endpoint `/api/tasks/<task_id>/`, o ID da tarefa removida pelo usuário.

## Compilando e executando o frontend

Para compilar o front-end, de início, será necessário instalar os pacotes necessários, utilizando o comando abaixo:

`npm install`

Logo após, ter instalado os pacotes, basta rodar o seguinte comando para "buildar" o projeto:

`npm run build`

Agora, basta subir o projeto em uma instância utilizando Nginx ou PHP.

Caso você queira rodar em seu computador, após ter instalado as dependências, basta utilizar o seguinte comando:

`npm start`

Uma página será disponibilizada automaticamente onde o deploy foi realizado, para seu navegador padrão, e logo após você podera acessar também no endereço:

`http://localhost:3000/`