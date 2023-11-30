import java.io.File
import java.io.FileFilter

object CodigoPython {

    fun executarPython(fkDispositivo:Int){
        var codigoPython = """
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
        # Inserindo as informações de localização no SQL Server
        mydb_sql_server = pymssql.connect(server='52.45.132.234',
                                          user='sa',
                                          password='#Gfsptech',
                                          database='trackware')

        if mydb_sql_server:
            print("Conexão bem-sucedida ao SQL Server.")
            with mydb_sql_server.cursor() as mycursor_sql_server:
                sql_query_sql_server = f"INSERT INTO geolocalizacao (endereco, latitude, longitude, fkDispositivo) VALUES ('{local}', {latitude}, {longitude}, {$fkDispositivo})"
                valores_sql_server = (local, latitude, longitude, data_atual, hora_atual, $fkDispositivo)
                mycursor_sql_server.execute(sql_query_sql_server)

            mydb_sql_server.commit()
            print("Dados inseridos com sucesso no SQL Server.")
    else:
        print("Não foi possível obter a localização com base no IP.")
except Exception as e:
    print(f"Erro ao obter a localização: {str(e)}")
"""

        val nomearquivo = "CodigoPythonTeste.py"

        File(nomearquivo).writeText(codigoPython)
        Runtime.getRuntime().exec("py $nomearquivo")

    }
}