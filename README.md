  mkdir supertestAPI
	cd supertestAPI/
 
  -- instalar o express-generator
	npm install -g express-generator
  -- gerar a estrutura do projeto
	express --view=hbs supertest
	cd supertest/
	npm install
	DEBUG=supertest:* npm start
	npm install nodemon
	--- alterar no arqivo package.json ->  "start": "nodemon ./bin/www"
	npm start
	npm install supertest --save-dev
	npm install --save-dev jest
	npm run test
