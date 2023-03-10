# Sistema de Estacionamiento

Este proyecto contiene una aplicación para el control de estacionamiento de vehículos. Está diseñada para registrar y calcular el tiempo de estacionamiento de diferentes tipos de vehículos, así como para generar informes de pago para los residentes.

## Diagrama de Clases

Clase Vehículo:
Atributos:
-Placa
-Tipo
Métodos:
-Registrar Entrada
-Registrar Salida
-Calcular Tarifa

Clase Oficial:
Atributos:
-Placa
-Tipo
Métodos:
-Registrar Estancia

Clase Residente:
Atributos:
-Placa
-Tipo
Métodos:
-Calcular Tiempo Estacionado
-Calcular Pago

Clase No Residente:
Atributos:
-Placa
-Tipo
Métodos:
-Calcular Pago

## Diagrama de Secuencia

1) El empleado elije la opción “registrar entrada” y introduce el número de placa del coche.
2) La aplicación apunta la hora de entrada del vehículo.
3) El empleado elije la opción “registrar salida” e introduce el número de placa del coche.
4) La aplicación realiza las acciones correspondientes al tipo de vehículo.
5) Para los vehículos oficiales, la aplicación asocia la estancia (hora de entrada y hora de salida) con el vehículo. 
6) Para los vehículos residentes, la aplicación suma la duración de la estancia al tiempo total acumulado. 
7) Para los vehículos no residentes, la aplicación obtiene el importe a pagar.
8) El empleado elije la opción “dar de alta vehículo oficial” e introduce el número de placa.
9) La aplicación añade el vehículo a la lista de vehículos oficiales.
10) El empleado elije la opción “dar de alta vehículo de residente” e introduce el número de placa.
11) La aplicación añade el vehículo a la lista de vehículos de residentes.
12) El empleado elije la opción “Comienza mes”.
13) La aplicación elimina las estancias registradas en los coches oficiales y pone a cero el tiempo estacionado por los vehículos de residentes.
14) El empleado elije la opción “generar informe de pagos de residentes”.
15) La aplicación devuelve la información almacenada que detalla el tiempo estacionado y el dinero a pagar por cada uno de los vehículos de residentes.