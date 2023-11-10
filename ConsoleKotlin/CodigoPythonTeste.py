
# Importa a biblioteca geocoder
import geocoder
# Importa a biblioteca que faz conexão com o BD
import mysql.connector
# Importa as bibliotecas que captura data e hora
from datetime import date
from datetime import datetime

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

        if mydb.is_connected():
            db_info = mydb.get_server_info()
            mycursor = mydb.cursor()
        
            sql_querry = 'INSERT INTO geolocalizacao (endereco, latitude, longitude, data_atual, hora_atual,fkDispositivo) VALUES (%s, %s, %s, %s, %s, %s)'
        
            valores = [local, latitude, longitude, data_atual, hora_atual,fkDispositivo]
            mycursor.execute(sql_querry, valores)
            mydb.commit()
            mycursor.close()
            mydb.close()
    else:
        print("Não foi possível obter a localização com base no IP.")
except Exception as e:
    print(f"Erro ao obter a localização: {str(e)}")

