import java.io.File

object ScriptGeolocalizacaoPython {

    var PythonExe: List<Process> = listOf()

    val host = "localhost"
    val user = "root"
    val passwd = "root"
    val database = "trackware"

    fun criarPython(python: Int): String {

            val pythonGeral = """
   # Importa a biblioteca geocoder
   import geocoder
   # Importa a biblioteca que faz conexão com o BD
   import mysql.connector
   # Importa as bibliotecas que captura data e hora
   from datetime import date
   from datetime import datetime

   # Função para estabelecer uma conexão com o BD
   def connect_to_mysql():
       try:
           # Configurações de conexão com o BD
           config = {
               'host': 'localhost', 
               'user': 'root',
               'password': 'root', 
               'database': 'trackware'
           }

           # Conecta-se com o BD
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

           # Verificando se as coordenadas de latitude e longitude estão disponíveis
           if g.latlng:
               latitude, longitude = g.latlng
               local = g.address

               print("Localização obtida com sucesso:")
               print(f"Localização: {local}")
               print(f"Latitude: {latitude}")
               print(f"Longitude: {longitude}")
          # Capturando as informações de data e hora do momento da captura
               data_atual = date.today()
               dataBR = '{}/{}/{}'.format(data_atual.day, data_atual.month, data_atual.year)
               hora_atual = datetime.now()
               horaBR = hora_atual.strftime("%H:%M:%S")
               print("Data da captura: ",dataBR, "Hora da captura: ", horaBR)
               fkDispositivo = $python

               # Inserindo as informações de localização no BD
               insert_location_in_mysql(conexao, local, latitude, longitude, data_atual, hora_atual, fkDispositivo)
           else:
               print("Não foi possível obter a localização com base no IP.")
       except Exception as e:
           print(f"Erro ao obter a localização: {str(e)}")

   # Função para inserir informações de localização no BD
   def insert_location_in_mysql(conexao, local, latitude, longitude, data_atual, hora_atual,fkDispositivo):
       try:
           # Cria um cursor para executar comandos SQL
           cursor = conexao.cursor()

           # Está definindo a consulta SQL para inserir dados na tabela do BD
           inserir_dados = "INSERT INTO geolocalizacao (endereco, latitude, longitude, data_atual, hora_atual,fkDispositivo) VALUES (%local, %latitude, %longitude, %data_atual, %hora_atual, %fkDispositivo)"

           # Valores que serão inseridos
           valores = (local, latitude, longitude, data_atual, hora_atual,fkDispositivo)

           # Executa a consulta com os valores passados
           cursor.execute(inserir_dados, valores)

           # Faz commit das alterações no banco de dados
           conexao.commit()
           print("Dados inseridos no banco de dados MySQL com sucesso!")

       except mysql.connector.Error as erro:
           print(f"Erro ao inserir dados no banco de dados MySQL: {erro}")

       finally:
           # Fecha o cursor
           cursor.close()

   # Chama a função para estabelecer a conexão com o BD
   conexao_mysql = connect_to_mysql()

   if conexao_mysql:
       # Chama a função para obter a localização com base no IP da máquina atual
       get_location_by_ip(conexao_mysql)

       # Fecha a conexão com o banco de dados MySQL
       conexao_mysql.close()


    """.trimIndent()

            val nomeArquivoPython1 = "ScriptGeolocalizacaoPython.py"
            File(nomeArquivoPython1).writeText(pythonGeral)
            return nomeArquivoPython1
        }

        fun executarScript(arquivo1: String) {
            val pythonProcess1 = Runtime.getRuntime().exec("py $arquivo1")
            PythonExe = listOf(pythonProcess1)
        }

        fun pararScript() {
            for (process in PythonExe) {
               process.destroyForcibly()
            }
        }
    }