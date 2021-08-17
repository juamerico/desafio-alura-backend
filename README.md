# https://documenter.getpostman.com/view/16743677/Tzz8sd5R

# POST api/categorias
## Criando uma nova categoria
Crie uma nova categoria enviando uma requisição **POST** contendo os campos `categoria` e `cor`. Ambos são obrigatórios. Após o envio, receberá como resposta um JSON contendo as informações da categoria criada.

#### Informações contidas no objeto de resposta
- id
- categoria
- cor
- updatedAt
- createdAt

#### Resposta no caso de erro
##### Campo não preenchido
Caso algum dos campos obrigatórios `categoria` e/ou `cor` não sejam preenchidos, receberá uma mensagem de erro **{"error":"Campo(s) '*nomeDoCampo*' não informado(s)."}**.

##### Formato inválido
Caso algum dos campos obrigatórios `categoria` e/ou `cor` não sejam enviados no formado aceito *string*, receberá uma mensagem de erro **{"error":"Campo '*nomeDoCampo*' inválido. Deve ser do tipo 'string'"}**.

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

#### Resposta no caso de erro
##### Banco de dados vazio
Caso o banco de dados não contenha nenhuma categoria, receberá uma mensagem de erro: **{"error":"Categoria # não encontrada."}**


# GET api/categorias/?page={numPagina}
## Exibindo todas as categorias com paginação
Envie uma requisição **GET**, informando nos *query params* o número da página, para receber um JSON contendo cinco categorias de cada vez.

#### Informações contidas no objeto de resposta
- objeto indicando se há página anterior
- objeto indicando página atual
- objeto indicando se há próxima página\
\
Lista de objetos contendo as seguintes informações de cada item:
- id
- categoria
- cor
- updatedAt
- createdAt

#### Resposta no caso de erro
##### Banco de dados vazio
Caso o banco de dados não contenha nenhuma categoria, receberá uma mensagem de erro: **{"error":"Categoria # não encontrada."}**


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
##### Envio de requisição com corpo vazio
Se a requisição for enviada sem nenhum parâmetro, receberá a mensagem de erro: **{"error":"Campo(s) não informado(s)."}**.


# DELETE api/categorias/{idCategoria}
## Excluindo uma categoria
Envie uma requisição **DELETE** utilizando o número do `id` como parâmetro da requisição `{idCategoria}` para excluir a categoria a que o `id` se refere.

#### Informações contidas no objeto de resposta
Mensagem informando o número do `id` do objeto que foi excluído do banco de dados.

#### Resposta em caso de erro
Caso informe um `id` inexistente no banco de dados, receberá a mensagem de erro: **{"error":"Categoria #*{idCategoria}* não encontrada."}**.


# POST api/categorias/{idCategoria}/videos
## Criando um novo vídeo
Crie um novo vídeo enviando uma requisição **POST** contendo os campos `título`, `url` e `descricao`. Todos são obrigatórios. Informe nos parâmetros da requisição o `id` da *categoria* a que este vídeo pertence.\
Após o envio, receberá como resposta um JSON contendo as informações do vídeo criado.

#### Informações contidas no objeto de resposta
- id
- titulo
- descricao
- url
- categoria_id
- createdAt
- updatedAt

#### Resposta no caso de erro
##### Campo não preenchido
Caso um ou mais dos campos obrigatórios não sejam preenchidos, receberá uma mensagem de erro **{"error":"Campo(s) '*nomeDoCampo*' não informado(s)."}**.

##### Formato inválido
Caso algum dos campos obrigatórios não sejam enviados no formado aceito *string*, receberá uma mensagem de erro **{"error":"Campo '*nomeDoCampo*' inválido. Deve ser do tipo 'string'"}**.

##### Envio de requisição com corpo vazio
Se a requisição for enviada sem nenhum parâmetro, receberá a mensagem de erro: **{"error":"Campo(s) não informado(s)."}**.


# GET /api/categorias/{idCategoria}/videos
## Exibindo todas os vídeos de uma categoria
Envie uma requisição **GET**, informando nos parâmetros da requisição o `id` da *categoria*, para receber uma lista contendo todos os vídeos relacionados à mesma.

#### Informações contidas no objeto de resposta
Lista de objetos contendo as seguintes informações de cada item:
- id
- titulo
- descricao
- url
- categoria_id
- createdAt
- updatedAt

#### Resposta em caso de erro
Caso informe um `id` inexistente no banco de dados, receberá a mensagem de erro: **{"error":"Categoria #*{idCategoria}* não encontrada."}**.


# GET /api/categorias/{idCategoria}/videos/{idVideo}
## Exibindo um vídeo
Envie uma requisição **GET**, informando nos parâmetros da requisição o `id` da *categoria*,  e o `id` do *vídeo* para exibir as informações de um único vídeo.

#### Informações contidas no objeto de resposta
- id
- titulo
- descricao
- url
- categoria_id
- createdAt
- updatedAt

#### Resposta em caso de erro
##### Requisição de ID de vídeo inválido
Caso informe um `id` inexistente no banco de dados, receberá a mensagem de erro: **{"error":"Video #*{idVideo}* não encontrado."}**.

##### Requisição de ID de categoria inválida
Caso informe um `id` inexistente no banco de dados, receberá a mensagem de erro: **{"error":"Categoria #*{idCategoria}* não encontrada."}**.


# PATCH /api/categorias/{idCategoria}/videos/{idVideo}
## Editando informações em um vídeo
Envie uma requisição **PATCH** utilizando os números de `categoria_id` e `id` como parâmetros da requisição `{idCategoria}` e `{idVideo}`, e informe no corpo da requisição os parâmetros que deseja alterar. Os parâmetros aceitos são `titulo`, `descricao` e/ou `url`.\
Após o envio, receberá como resposta um JSON contendo as informações atualizadas da categoria editada.

#### Informações contidas no objeto de resposta
- id
- titulo
- descricao
- url
- categoria_id
- createdAt
- updatedAt

#### Resposta em caso de erro
##### Envio de requisição com corpo vazio
Se a requisição for enviada sem nenhum parâmetro, receberá a mensagem de erro: **{"error":"Campo(s) não informado(s)."}**.


# DEL /api/categorias/{idCategoria}/videos/{idVideo}
## Excluindo um vídeo
Envie uma requisição **DELETE** utilizando os números de `categoria_id` e `id` como parâmetros da requisição `{idCategoria}` e `{idVideo}` para excluir o respectivo vídeo.

#### Informações contidas no objeto de resposta
Mensagem informando o número do `id` do objeto que foi excluído do banco de dados.

#### Resposta em caso de erro
##### Requisição de ID de vídeo inválido
Caso informe um `id` inexistente no banco de dados, receberá a mensagem de erro: **{"error":"Video #*{idVideo}* não encontrado."}**.

##### Requisição de ID de categoria inválida
Caso informe um `id` inexistente no banco de dados, receberá a mensagem de erro: **{"error":"Categoria #*{idCategoria}* não encontrada."}**.


# GET /api/videos?search={tituloVideo}
## Buscando um vídeo pelo título
Envie uma requisição **GET**, com o título do vídeo nos *query params*, para exibir uma lista com todos os vídeos cujos títulos sejam correspondentes.

#### Informações contidas no objeto de resposta
Lista de objetos contendo as seguintes informações de cada item:
- id
- titulo
- descricao
- url
- categoria_id
- createdAt
- updatedAt

#### Resposta em caso de erro
##### Busca por título inválido
Caso envie a requisição com um `título` inválido, receberá a mensagem de erro: **{"error":"Video #*{req.query.search}* não encontrado."}**.

###### Requisição sem *query params*
Caso envie uma requisição sem *query params*, receberá a mensagem de erro **{"error":"Campo(s) título não informado(s)."}**.


# GET /api/categorias/{idCategoria}/videos?page={numPagina}
## Exibindo todos os vídeos com paginação
Envie uma requisição **GET**, informando nos *query params* o número da página, para receber um JSON contendo cinco vídes de cada vez.

#### Informações contidas no objeto de resposta
- objeto indicando se há página anterior
- objeto indicando página atual
- objeto indicando se há próxima página\
\
Lista de objetos contendo as seguintes informações de cada item:
- id
- titulo
- descricao
- url
- categoria_id
- createdAt
- updatedAt

#### Resposta no caso de erro
Caso o banco de dados não contenha nenhum vídeo, receberá uma mensagem de erro: **{"error":"Categoria #*{idCategoria}* não encontrada."}**
