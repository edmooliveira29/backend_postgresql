
# 📌 Backend_postgresql

🚀 **Awesome project developed with TypeORM and PostgreSQL**

## 📖 Sobre o projeto

Este projeto é uma API backend construída com **Node.js, Express e TypeORM**, utilizando **PostgreSQL** como banco de dados. O ambiente de desenvolvimento é configurado para rodar dentro de um **container Docker**.

## ⚡ Tecnologias utilizadas

-   **Node.js**
    
-   **Express.js**
    
-   **TypeORM**
    
-   **PostgreSQL**
    
-   **Docker**
    
-   **Nodemon** (para hot-reload em desenvolvimento)
    

----------

## 🚀 Como executar o projeto no modo desenvolvimento

### 1️⃣ **Clonar o repositório**

```
git clone https://github.com/username/repo-name.git
cd backend_postgresql
```

### 2️⃣ **Criar o arquivo** `**.env**`

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
POSTGRES_HOST_DEVELOPMENT='172.17.0.2'
POSTGRES_PORT_DEVELOPMENT='5432'
POSTGRES_USERNAME_DEVELOPMENT='postgres'
POSTGRES_PASSWORD_DEVELOPMENT='admin'
POSTGRES_DATABASE_DEVELOPMENT='db_sql_dev'
```

### 3️⃣ **Subir o banco de dados com Docker**

Instalar Docker 
```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

 sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Se você não tiver o PostgreSQL instalado, pode rodá-lo via Docker:


```
docker run --name postgres_dev -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=db_sql_dev -p 5432:5432 -d postgres
```

> Para obter o IP do container Docker:
```
docker inspect -f '{{ .NetworkSettings.IPAddress }}' postgres_dev
```

> Para verificar se o container está rodando:

```
docker ps
```

### 4️⃣ **Instalar as dependências**

```
npm install
```

### 5️⃣ **Rodar as migrations do TypeORM**

```
npm run migrations:dev
```

### 6️⃣ **Iniciar o servidor no modo desenvolvimento**

```
npm run dev
```

O servidor estará rodando em **http://localhost:3000**

----------

## 📜 Scripts disponíveis

### Rodar o servidor em modo de desenvolvimento

```
npm run dev
```

### Rodar migrations no ambiente de desenvolvimento

```
npm run migrations:dev
```

----------

## 📌 Observações
    
-   O banco de dados deve estar rodando antes de iniciar a aplicação.
    

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

----------

🔗 **Autor:**  [Edmo de Oliveira Leite](https://github.com/edmooliveira29/backend_postgresql)