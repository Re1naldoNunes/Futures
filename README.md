# Future

## Descrição

O Future é um aplicativo interativo onde os usuários podem criar e visualizar 'futuros' criados por outros usuários. No entanto, há um toque intrigante: você não pode visualizar os futuros que você mesmo criou. Isso cria um ambiente de compartilhamento e descoberta, permitindo aos usuários explorar uma variedade de futuros enquanto contribuem com suas próprias visões.

## Instalação

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install
```

## Uso

Renomeie o arquivo `.env_example` para `.env`.
Em seu banco de dados crie o database e configure o arquivo `.env`.

- `DB_USER` = usuário do banco de dados, 
- `DB_PASSWORD` = senha do root,
- `DB_NAME` = nome do banco de dados,
- `DB_HOST` = servidor do banco de dados,
- `DB_DIALECT` = dialeto do banco de dados,
- `PORT` = porta do servidor,
- `SESSION_SECRET` = chave secreta para a sessão ( Exemplo de chave: 7c82b2fcb3f4626798cf5a4d2f2a8c6d ),
- `NODE_ENV` = development (projeto em desenvolvimento),
- `ADICIONAR_DADOS` = true (Adiciona futuros e o Usuario admin)

Para iniciar a aplicação, execute o seguinte comando:

```bash
npm start
```

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- `controllers`: Contém os métodos que alteram diretamente o banco de dados.
- `services`: Contém a lógica do aplicativo e se comunica com os controllers.
- `database`: Contém a conexão com o banco de dados e os modelos.
- `public`: Contém os arquivos públicos servidos pelo Express.
- `routers`: Define as rotas do aplicativo.
- `views`: Contém os templates usados para renderizar a resposta do servidor.
- `config`: Contém arquivos de configuração como `app.js`, `init.js`, `futurosMaster.js`.

## Configurações

No arquivo `futurosMaster.js` esta configurado os futuros iniciais e o usuario `admin` onde podera ser configurado mais futuros, caso não necessite da criação de futuros automaticos, colocar a variavel de anbiente `ADICIONAR_DADOS` como `false` no arquivo `.env`

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais detalhes.

## Contribuição

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de enviar uma pull request.

## Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue ou enviar uma pull request.
