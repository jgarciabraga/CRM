from faker import Faker
import random
import requests
import json
import mysql.connector
from random import randint

fake = Faker()

def create_venda_produto():

    url_venda = "http://localhost:3001/venda"
    url_vendaproduto = "http://localhost:3001/vendaProduto"

    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        port = 3306,
        database="crm"
    )
    mycursor = mydb.cursor()

    for i in range(1,800):
        id_vendedor = int(randint(1, 200))
        id_cliente = int(randint(110, 209))
        query = f"""select id 
        from EnderecoEntrega
        WHERE id_cliente = {id_cliente};"""
        mycursor.execute(query)
        row = mycursor.fetchone()
        id_endEnt = int(row[0])
        print(row)
        print(id_endEnt)
        qtd_produtos = int(randint(1,10))
        id_produtos = []
        preco_produtos = []
        for k in range(1,qtd_produtos+1):
            id_prod = (randint(1,300))
            query_p = f"""select preco 
            from Produto
            WHERE id = {id_prod};"""
            mycursor.execute(query_p)
            row = mycursor.fetchone()
            print(row)
            print(row[0])
            preco_produtos.append(float(row[0]))
            id_produtos.append(id_prod)
        
        data_venda = {
            "id_vendedor": id_vendedor,
            "id_cliente": id_cliente,
            "id_endereco_entrega": id_endEnt,
            "total": round(sum(preco_produtos), 2)
        }

        response = requests.post(url_venda, json=data_venda)
        print(response.status_code)

        for l in range(len(id_produtos)):
            data_vendaProduto = {
                "id_produto": int(id_produtos[l]),
                "id_venda": i
            }

            response = requests.post(url_vendaproduto, json=data_vendaProduto)
            print(response.status_code)
        


def apaga_deletedAt():
    
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        port = 3306,
        database="crm"
    )
    mycursor = mydb.cursor()
    for i in range(1,107):
        query = f"""UPDATE PfPj 
        SET deletedAt = null 
        WHERE id = {i};"""
        mycursor.execute(query)
        mydb.commit()
        print(mycursor.rowcount, "record(s) affected")

def populate_produto(qtd:int):
    
    url = "http://localhost:3001/produto"
    total = 30
    nomes = [fake.word() for i in range(total)]
    descricoes = [fake.paragraph() for i in range(total)]
    precos = [float(round(random.uniform(10, 2000), 2)) for i in range(total)]

    for i in range(qtd):
        sort = int(random.uniform(0, total-1))
        data = {
            "nome": str(nomes[sort]),
            "descricao": str(descricoes[sort]),
            "preco": float(precos[sort]),
            "deletedAt": None
        }
        response = requests.post(url, json=data)
        print(response.status_code)

def populate_funcionario(qtd:int):

    url = "http://localhost:3001/funcionario"
    tipos = ["Diretor","Vendedor","Gerente"]
    estados = ["MG","SP","RJ","PR","ES","SC"]
    for i in range(qtd):
        cpf = ''.join(str(random.randint(0, 9)) for _ in range(11))
        tipo = tipos[random.randint(0,2)]
        permissao = ""
        if tipo == "Diretor":
            permissao = "admin"
        else:
            permissao = "blocked"
        salario = random.uniform(1.0, 10.0) * 1000
        email = fake.email()
        cep = ''.join(str(random.randint(0, 9)) for _ in range(5))
        endereco = fake.address()
        estado = estados[random.randint(0,5)]
        municipio = fake.city()
        nome = fake.name()
        telefone = ''.join(str(random.randint(0, 9)) for _ in range(9))
        data = {
            "cpf":cpf,
            "tipo":tipo,
            "permissao":permissao,
            "salario":salario,
            "email":email,
            "cep":cep,
            "senha":"1234",
            "endereco":endereco,
            "estado":estado,
            "municipio":municipio,
            "nome":nome,
            "telefone":telefone,
            "deletedAt":None
        }
        response = requests.post(url, json=data)
        print(response.status_code)

def delete_funcionario(id:int):
    url = "http://localhost:3001/funcionario" + "/" + str(id)
    data = {}
    response = requests.delete(url, json=data)
    print(response.status_code)
    print(response.text)

def populate_diretor(qtd:int):

    url = "http://localhost:3001/diretor"
    tipo = "Diretor"
    for i in range(qtd):
        if i == 0:
            estado = "SP"
            email = "jgarciabraga@magazinealvo.com.br"
            nome = "José Garcia"
        else:
            estado = "RJ"
            email = "iohanpetterson@magazinealvo.com.br"
            nome = "Iohan Petterson"

        cpf = ''.join(str(random.randint(0, 9)) for _ in range(11))
        permissao = "admin"
        salario = random.uniform(1.0, 10.0) * 1000
        cep = ''.join(str(random.randint(0, 9)) for _ in range(5))
        endereco = fake.address()
        municipio = fake.city()
        nome = fake.name()
        telefone = ''.join(str(random.randint(0, 9)) for _ in range(9))
        telefone_trabalho = ''.join(str(random.randint(0, 9)) for _ in range(9))
        data = {
            "cpf":cpf,
            "tipo":tipo,
            "permissao":permissao,
            "salario":salario,
            "email":email,
            "cep":cep,
            "senha":"1234@",
            "endereco":endereco,
            "estado":estado,
            "municipio":municipio,
            "nome":nome,
            "telefone":telefone,
            "telefone_trabalho":telefone_trabalho
        }
        response = requests.post(url, json=data)
        print(response.status_code)
        print(response.text)

def populate_gerente():

    url = "http://localhost:3001/gerente"
    tipo = "Gerente"
    lojas = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    #lojas = [1]
    for i in range(len(lojas)):
        if i <= 10:
            estado = 'SP'
        else:
            estado = 'RJ' 
        cpf = ''.join(str(random.randint(0, 9)) for _ in range(11))
        permissao = "user"
        salario = random.uniform(1.0, 5.0) * 1000
        cep = ''.join(str(random.randint(0, 9)) for _ in range(5))
        endereco = fake.address()
        municipio = fake.city()
        primeiro_nome = fake.first_name()
        segundo_nome = fake.last_name()
        nome = primeiro_nome + ' ' + segundo_nome
        email = str(primeiro_nome).lower() + str(segundo_nome).lower() + "@magazinealvo.com.br"
        telefone = ''.join(str(random.randint(0, 9)) for _ in range(9))
        telefone_trabalho = ''.join(str(random.randint(0, 9)) for _ in range(9))
        data = {
            "id_loja": lojas[i],
            "cpf":cpf,
            "tipo":tipo,
            "permissao":permissao,
            "salario":salario,
            "email":email,
            "cep":cep,
            "senha":"1234@",
            "endereco":endereco,
            "estado":estado,
            "municipio":municipio,
            "nome":nome,
            "tipo":"Gerente",
            "telefone":telefone,
            "telefone_trabalho":telefone_trabalho
        }
        response = requests.post(url, json=data)
        print(response.status_code)
        print(response.text)

def populate_vendedor(qtd:int):

    url = "http://localhost:3001/vendedor"
    tipo = "Vendedor"
    lojas = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    #lojas = [1]
    for i in range(len(lojas)):
        for k in range(qtd):
            if i <= 10:
                estado = 'SP'
            else:
                estado = 'RJ' 
            cpf = ''.join(str(random.randint(0, 9)) for _ in range(11))
            permissao = "blocked"
            salario = random.uniform(1.0, 2.0) * 1000
            cep = ''.join(str(random.randint(0, 9)) for _ in range(5))
            endereco = fake.address()
            municipio = fake.city()
            primeiro_nome = fake.first_name()
            segundo_nome = fake.last_name()
            nome = primeiro_nome + ' ' + segundo_nome
            email = str(primeiro_nome).lower() + str(segundo_nome).lower() + "@magazinealvo.com.br"
            telefone = ''.join(str(random.randint(0, 9)) for _ in range(9))
            data = {
                "id_loja": lojas[i],
                "cpf":cpf,
                "tipo":tipo,
                "permissao":permissao,
                "salario":salario,
                "email":email,
                "cep":cep,
                "senha":"1234@",
                "endereco":endereco,
                "estado":estado,
                "municipio":municipio,
                "nome":nome,
                "tipo":tipo,
                "telefone":telefone,
            }
            response = requests.post(url, json=data)
            print(response.status_code)
            print(response.text)

def populate_loja(qtd:int):

    url = "http://localhost:3001/loja"
    for i in range(qtd):
        if i < 10:
            estado = "SP"
            id_diretor = 1
        else:
            estado = "RJ"
            id_diretor = 2
        nome = "Magazine Alvo" + str(fake.name())
        cep = ''.join(str(random.randint(0, 9)) for _ in range(5))
        endereco = fake.address()
        municipio = fake.city()
        telefone = ''.join(str(random.randint(0, 9)) for _ in range(9))
        data = {
            "nome":nome,
            "cep":cep,
            "endereco":endereco,
            "estado":estado,
            "municipio":municipio,
            "telefone":telefone,
            "id_diretor": id_diretor
        }
        response = requests.post(url, json=data)
        print(response.status_code)
        print(response.text)

def populate_cliente_pf(qtd:int):

    url = "http://localhost:3001/pfpjClientePf"
    for i in range(qtd):
        estado = "RJ"
        primeiro_nome = fake.first_name()
        segundo_nome = fake.last_name()
        nome = primeiro_nome + ' ' + segundo_nome
        email = str(primeiro_nome).lower() + str(segundo_nome).lower() + "@gmail.com"
        cpf = ''.join(str(random.randint(0, 9)) for _ in range(11))
        cep = ''.join(str(random.randint(0, 9)) for _ in range(5))
        endereco = fake.address()
        municipio = fake.city()
        nome = fake.name()
        telefone = ''.join(str(random.randint(0, 9)) for _ in range(9))
        data = {
            "cpf":cpf,
            "tipo_cliente":"PF",
            "email":email,
            "cep":cep,
            "endereco":endereco,
            "estado":estado,
            "municipio":municipio,
            "nome":nome,
            "telefone":telefone,
        }
        response = requests.post(url, json=data)
        print(response.status_code)
        print(response.text)

def populate_cliente_pj(qtd:int):

    url = "http://localhost:3001/pfpjClientePj"
    for i in range(qtd):
        estado = "SP"
        primeiro_nome = fake.first_name()
        segundo_nome = fake.last_name()
        nome_contato = primeiro_nome + ' ' + segundo_nome
        cnpj = ''.join(str(random.randint(0, 9)) for _ in range(11))
        cep = ''.join(str(random.randint(0, 9)) for _ in range(5))
        endereco = fake.address()
        municipio = fake.city()
        n_fantasia =  fake.company()
        nome_fantasia =  n_fantasia + ' ' + fake.company_suffix()
        email = str(primeiro_nome).lower() + str(segundo_nome).lower() + "@" + n_fantasia.lower().replace(" ", "") + ".com"
        telefone = ''.join(str(random.randint(0, 9)) for _ in range(9))
        data = {
            "cnpj":cnpj,
            "tipo_cliente":"PJ",
            "email":email,
            "cep":cep,
            "endereco":endereco,
            "estado":estado,
            "municipio":municipio,
            "nome_contato":nome_contato,
            "nome": nome_fantasia,
            "nome_fantasia": nome_fantasia,
            "telefone":telefone,
        }
        response = requests.post(url, json=data)
        print(response.status_code)
        print(response.text)

def populate_enderecoEntrega(qtd:int):

    url = "http://localhost:3001/enderecoEntrega"
    for i in range(110,qtd):
        estado = "SP"
        cep = ''.join(str(random.randint(0, 9)) for _ in range(5))
        endereco = fake.address()
        municipio = fake.city()
        telefone = ''.join(str(random.randint(0, 9)) for _ in range(9))
        data = {
            "id_cliente": i,
            "endereco":endereco,
            "cep": cep,
            "estado":estado,
            "municipio":municipio,
            "telefone":telefone,
        }
        response = requests.post(url, json=data)
        print(response.status_code)
        print(response.text)

if __name__ == "__main__":

   #for i in [x for x in range(240,430,1)]:
       #delete_funcionario(i)
   
   #populate_produto(200)
   #populate_diretor(2)
   #populate_loja(20)
   #populate_vendedor(10)
   #populate_gerente()
   #populate_cliente_pf(99)
   #populate_cliente_pj(99)
   #apaga_deletedAt()
   #populate_enderecoEntrega(210);
   create_venda_produto()
