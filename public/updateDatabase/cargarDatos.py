import pandas as pd
import random as rand
from datetime import date
import sys

# Modificar según la ruta de cada quien
rutaExcel = "c:\\Users\\nenas\\OneDrive\\Documents\\GitHub\\C.MTY.TC2005B.413.2211.Equipo3\\public\\Excel\\" + sys.argv[1]
rutaTxt = "c:\\Users\\nenas\\OneDrive\\Documents\\GitHub\\C.MTY.TC2005B.413.2211.Equipo3\\public\\updateDatabase\\commands.txt"

def generarSQLInserts(data, row):
    checkUser = "checkIfUserExists("
    checkPrueba = "checkIfPruebaExists("
    userInsert = "insertUsuario("
    resTamizajeInsert = "insertResTamizaje("
    
    checkUser += "'" + str(df.iloc[row]["Nombre"]) + "'," #nombre
    checkUser += "'H'," if (df.iloc[row]["Genero"] == 1) else "'M'," #genero
    checkUser += str(df.iloc[row]["Parroquia"]) + ")" #parroquia
    
    checkPrueba += "'" + str(df.iloc[row]["Nombre"]) + "'," #nombre
    checkPrueba += "'" + str(df.iloc[row]["Fecha"])[:10] + "')" #Fecha
    
    userID = generateUserID(str(df.iloc[row]["Nombre"]))
    
    userInsert += "'" + userID + "',"
    userInsert += "'" + str(df.iloc[row]["Nombre"]) + "'," #nombre
    userInsert += str(date.today().year - df.iloc[row]["Edad"]) + "," #año nacimiento
    userInsert += "'H'," if (df.iloc[row]["Genero"] == 1) else "'M'," #genero
    userInsert += str(df.iloc[row]["Parroquia"]) + ")" #parroquia
    
    resTamizajeInsert += "'" + "',"#ID_Usuario
    resTamizajeInsert += str(df.iloc[row]["Reloj"]) + "," #Reloj,
    resTamizajeInsert += str(df.iloc[row]["O. Tiempo"]) + "," #Orient_Temp,
    resTamizajeInsert += str(df.iloc[row]["O. Espacio"]) + "," #Orient_Esp,
    resTamizajeInsert += str(df.iloc[row]["Registro"]) + "," #Registro,
    resTamizajeInsert += str(df.iloc[row]["Cálculo"]) + ","#Calculo,
    resTamizajeInsert += str(df.iloc[row]["Memoria"]) + ","#Memoria,
    resTamizajeInsert += str(df.iloc[row]["Eject."]) + ","#Eject,
    resTamizajeInsert += str(df.iloc[row]["GDS Total"]) + ","#GDS_Total,
    resTamizajeInsert += str(df.iloc[row]["Katz Total"]) + ","#Katz_Total,
    resTamizajeInsert += str(df.iloc[row]["LWB Total"]) + ","#LWB_Total,
    resTamizajeInsert += str(df.iloc[row]["Sarc F"]) + ","#Sarc_F,
    resTamizajeInsert += str(df.iloc[row]["Fuerza Domin."]) + ","#Fuerza_Domin,
    resTamizajeInsert += str(df.iloc[row]["SPPB Global"]) + ","#SPPB_Global,
    resTamizajeInsert += str(df.iloc[row]["CFS Frailty"]) + ","#CFS_Fraility,
    resTamizajeInsert += str(df.iloc[row]["Gijon"]) + ","#Gijon
    resTamizajeInsert += "'" + str(df.iloc[row]["Fecha"])[:10] + "')" #Fecha

    return (str(checkUser) + "$" +  str(checkPrueba) + "$" +  str(userInsert) + "$" +  str(resTamizajeInsert))

def generateUserID(nombre):
    ID = ""
    nombre = nombre.split()
    
    for i in range(0,3 if len(nombre) >= 3 else len(nombre)):
        ID += nombre[i][0]
    digitosFaltantes = 7 - len(ID)
    ID += str(rand.randint(int("1" + "0" * (digitosFaltantes-1)),int("9" * digitosFaltantes)))
    
    return ID
    
df = pd.read_excel(rutaExcel, engine='openpyxl')
f = open(rutaTxt,"w+")

if(not df.isnull().any().any()):
    for i in range(0, len(df.index)):
        res = (generarSQLInserts(df, i))
        f.write(str(res) + "\n")
        print(res)

f.close()