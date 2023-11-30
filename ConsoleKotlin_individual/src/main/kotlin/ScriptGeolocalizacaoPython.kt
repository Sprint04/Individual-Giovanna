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
from datetime import date, datetime
# Importa a biblioteca que faz conexão com o BD server
import pymssql


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
        #Capturando as informações de data e hora do momento da captura
        data_atual = date.today()
        dataBR = '{}/{}/{}'.format(data_atual.day, data_atual.month, data_atual.year)
        hora_atual = datetime.now()
        horaBR = hora_atual.strftime("%H:%M:%S")
        print("Data da captura: ",dataBR, "Hora da captura: ", horaBR)
    
        fkDispositivo = 1

        #Inserindo as informações de localização no BD
        mydb = mysql.connector.connect(host = 'localhost',user = 'root',password = 'root', database = 'trackware')

        if mydb_sql_server:
            print("Conexão bem-sucedida ao SQL Server.")
            with mydb_sql_server.cursor() as mycursor_sql_server:
                sql_query_sql_server = f"INSERT INTO geolocalizacao (endereco, latitude, longitude, fkDispositivo) VALUES ('{local}', {latitude}, {longitude}, {$python})"
                valores_sql_server = (local, latitude, longitude, data_atual, hora_atual, fkDispositivo)
                mycursor_sql_server.execute(sql_query_sql_server)

            mydb_sql_server.commit()
            print("Dados inseridos com sucesso no SQL Server.")
    else:
        print("Não foi possível obter a localização com base no IP.")
except Exception as e:
    print(f"Erro ao obter a localização: {str(e)}")

    """.trimIndent()

        val nomeArquivoPython1 = "ScriptGeolocalizacaoPython.py"
        File(nomeArquivoPython1).writeText(pythonGeral)
        return nomeArquivoPython1
    }

    fun executarScript(arquivo1: String) {
        val pythonProcess1 = Runtime.getRuntime().exec("python $arquivo1")
        PythonExe = listOf(pythonProcess1)
    }

    fun pararScript() {
        for (process in PythonExe) {
            process.destroyForcibly()
        }
    }
}
