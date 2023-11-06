# Importa a biblioteca geocoder
import geocoder
# Importa a biblioteca que faz conexão com o BD
import mysql.connector

# Função para estabelecer uma conexão com o banco de dados MySQL
def connect_to_mysql():
    try:
        # Configurações de conexão com o banco de dados MySQL
        config = {
            'host': 'localhost', # Host do banco de dados
            'user': 'root',# Nome de usuário
            'password': 'root', # Senha
            'database': 'Geolocalizacao'# Nome do banco de dados
        }

        # Conecta-se com o banco de dados MySQL
        conexao = mysql.connector.connect(**config)
        print("Conexão ao banco de dados MySQL estabelecida com sucesso!")
        return conexao

    except mysql.connector.Error as erro:
        print(f"Erro na conexão ao banco de dados MySQL: {erro}")
        return None

# Função para obter a localização com base no IP da máquina
def get_location_by_ip(conexao):
    try:
        # Usando 'geocoder.ip('me') para obter a localização com base no IP da máquina atual
        g = geocoder.ip('me')

        # Verifica se as coordenadas de latitude e longitude estão disponíveis
        if g.latlng:
            latitude, longitude = g.latlng
            location = g.address

            print("Localização obtida com sucesso:")
            print(f"Localização: {location}")
            print(f"Latitude: {latitude}")
            print(f"Longitude: {longitude}")

            # Insere as informações de localização no banco de dados MySQL
            insert_location_in_mysql(conexao, location, latitude, longitude)
        else:
            print("Não foi possível obter a localização com base no IP.")
    except Exception as e:
        print(f"Erro ao obter a localização: {str(e)}")

# Função para inserir informações de localização no banco de dados MySQL
def insert_location_in_mysql(conexao, location, latitude, longitude):
    try:
        # Cria um cursor para executar comandos SQL
        cursor = conexao.cursor()

        # Está definindo a consulta SQL para inserir dados na tabela do banco de dados
        inserir_dados = "INSERT INTO local (localizacao, latitude, longitude) VALUES (%s, %s, %s)"

        # Valores a serem inseridos
        valores = (location, latitude, longitude)

        # Executa a consulta com os valores
        cursor.execute(inserir_dados, valores)

        # Faz commit das alterações no banco de dados
        conexao.commit()
        print("Dados inseridos no banco de dados MySQL com sucesso!")

    except mysql.connector.Error as erro:
        print(f"Erro ao inserir dados no banco de dados MySQL: {erro}")

    finally:
        # Fecha o cursor
        cursor.close()

# Chama a função para estabelecer a conexão com o banco de dados MySQL
conexao_mysql = connect_to_mysql()

if conexao_mysql:
    # Chama a função para obter a localização com base no IP da máquina atual
    get_location_by_ip(conexao_mysql)

    # Fecha a conexão com o banco de dados MySQL
    conexao_mysql.close()
