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







# POST api/categorias
## Criando uma nova categoria
Crie uma nova categoria enviando uma requisição **POST** contendo os campos `categoria` e `cor`. Ambas são obrigatórias. Após o envio, receberá como resposta um JSON contendo as informações da categoria criada.

#### Informações contidas no objeto de resposta
- id
- categoria
- cor
- updatedAt
- createdAt

#### Resposta no caso de erro
##### Campo não preenchido
Caso algum dos campos obrigatórios `categoria` e/ou `cor` não forem preenchidos, receberá uma mensagem de erro **{"error":"Campo(s) 'categoria' não informado(s)."}**.

##### Formato inválido
Caso algum dos campos obrigatórios `categoria` e/ou `cor` não sejam enviados no formado aceito *string*, receberá uma mensagem de erro **{"error":"Campo 'categoria' inválido. Deve ser do tipo 'string'"}**.

##### Envio de requisição com corpo vazio
Se a requisição for enviada sem nenhum parâmetro, receberá a mensagem de erro: **{"error":"Campo(s) não informado(s)."}**.


# GET api/categorias
## Exibindo todas as categorias
Envie uma requisição **GET** para receber uma lista contendo todas as categorias criadas em formato JSON.

#### Informações contidas no objeto de resposta
Lista de objetos contendo as seguintes informações de cada item:
- id
- categoria
- cor
- updatedAt
- createdAt

# GET api/categorias/{idCategoria}
## Exibindo uma categoria
Envie uma requisição **GET** utilizando o número do `id` como parâmetro da requisição `{idCategoria}` para receber um JSON com as informações da categoria a que o `id` pertence.

#### Informações contidas no objeto de resposta:
- id
- categoria
- cor
- updatedAt
- createdAt

#### Resposta no caso de erro
Caso informe um `id` inexistente no banco de dados, receberá a mensagem de erro: **{"error":"Categoria #*{idCategoria}* não encontrada."}**.



# PATCH api/categorias/{idCategoria}
## Editando informações em uma categoria
Envie uma requisição **PATCH** utilizando o número do `id` como parâmetro da requisição `{idCategoria}`, e informe no corpo da requisição os parâmetros que deseja alterar. Os parâmetros aceitos são `categoria` e/ou `cor`. Após o envio, receberá como resposta um JSON contendo as informações atualizadas da categoria editada.

#### Informações contidas no objeto de resposta
- id
- categoria
- cor
- updatedAt
- createdAt

#### Resposta em caso de erro
##### Campo não preenchido
Caso algum dos campos obrigatórios `categoria` e/ou `cor` não forem preenchidos, receberá uma mensagem de erro **{"error":"Campo(s) 'categoria' não informado(s)."}**.

##### Formato inválido
Caso algum dos campos obrigatórios `categoria` e/ou `cor` não sejam enviados no formado aceito *string*, receberá uma mensagem de erro **{"error":"Campo 'categoria' inválido. Deve ser do tipo 'string'"}**.

##### Envio de requisição com corpo vazio
Se a requisição for enviada sem nenhum parâmetro, receberá a mensagem de erro: **{"error":"Campo(s) não informado(s)."}**.



DELETE api/categorias/{idCategoria}
## Excluindo uma categoria
Envie uma requisição **DELETE** utilizando o número do `id` como parâmetro da requisição `{idCategoria}` para excluir a categoria a que o `id` se refere.

#### Informações contidas no objeto de resposta
Mensagem informando o número do `id` do objeto que foi excluído do banco de dados.

POST api/categorias/{idCategoria}/videos

