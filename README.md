# Desafio Back End - Alura Dev

# https://aluraflixapi.herokuapp.com/videos

## Objetivo
Projeto desenvolvido durante o Alura Challenges - Back End, com a proposta de criação de uma API seguindo o padrão REST para o recebimento de requisições e armazenamento de informações referentes aos vídeos da plataforma [Aluraflix](https://github.com/alura-cursos/aluraflix-front/tree/semana-1).

### Inserindo novo vídeo no banco de dados
<sup>desafio-alura-backend/infrastructure/[tables.js](desafio-alura-backend/infrastructure/tables.js)</sup>\
Os campos obrigatórios no corpo da requisição POST para inserção de novo item no banco de dados são:
- titulo (*máximo 70 caracteres*)
- url (*máximo 255 caracteres*)
- descricao (*máximo 3000 caracteres*)

### Alterando campos de um vídeo no banco de dados
<sup>desafio-alura-backend/infrastructure/[tables.js](desafio-alura-backend/infrastructure/tables.js)</sup>\
Os campos e limites de caracteres são os mesmos da requisição POST de inserção, porém neste caso o método a ser utilizado é o PATCH, e os campos são opcionais, e não mais obrigatórios.

### Recebendo todos os vídeos do banco de dados
<sup>desafio-alura-backend/infrastructure/[tables.js](desafio-alura-backend/infrastructure/tables.js)</sup>\
Para receber todos os items do banco de dados basta acessar o endpoint **/videos** através de uma requisição do tipo GET.

### Excluindo um vídeo do banco de dados
<sup>desafio-alura-backend/infrastructure/[tables.js](desafio-alura-backend/infrastructure/tables.js)</sup>\
Para excluir um item do banco de dados basta enviar uma requisição do tipo DELETE com o endpoint /videos/**id**.

### Tecnologias utilizadas
Abaixo são listadas as ferramentas utilizadas na construção do projeto:

#### NodeJS / Express / Consign
<sup>desafio-alura-backend/config/[customExpress.js](https://github.com/juamerico/desafio-alura-backend/blob/main/config/customExpress.js)</sup>\
A API é baseada em [Node](https://nodejs.org/en/), com o framework [Express](https://www.npmjs.com/package/express) para a configuração das rotas do servidor.\
A biblioteca [Consign](https://www.npmjs.com/package/consign) é utilizada para criar o vínculo entre os módulos.

#### MySQL
<sup>desafio-alura-backend/infrastructure/[dbConnection.js](https://github.com/juamerico/desafio-alura-backend/blob/main/infrastructure/dbConnection.js)</sup>\
O Banco de Dados da aplicação é baseado em [MySQL](https://www.npmjs.com/package/mysql).