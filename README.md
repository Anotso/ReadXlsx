# ReadXlsx
Projeto que usa HTML, Javascript e libs de xlsx para realizar a leitura e processamento das informações conforme os modelos existentes no projeto para calcular a quota de cada integrante da lista de vaquinhas.

  - Leitura de arquivos independentes do Excel, um só de nomes e e-mails, e um outro com o produto, quantidade (qtd) e valor
  - Leitura de documento único dividido em pastas contento os dados

### Estrutura básica do documento

  - Arquivo com os nomes: nome, email
  - Arquivo com os produtos: produto, qtd, valor

### Forma de tratamento da informação

  - Aceita produtos em que a sua unidade de pedida é feita através de peso
  - Aceita números com casas decimais
  - Lógica proposta de que o arredondamento fosse feito jogando a diferença para o último participante da lista

### Instalação

Para usar o app é só clicar no link de download e dentro da sua pasta abrir o arquivo index.html direto no seu navegador, ou clone o código para o seu computador usando git.

### Bibliotecas

Todas as libs utilizadas são chamadas via CDN. Portanto, necessita de conexão com a internet para executar de forma plena.

  - Bootstrap
  - JQuery
  - JSZip
  - Xlsx JS
