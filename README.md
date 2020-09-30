# elasticsearch-geolocalizacion
elasticsearch javascript openstreetmap

Autor: Bryan Fuertes Malca (bryan87a@gmail.com)

Prerrequsitos:
- ElasticSearch: 7.9.0
 
  Les dejo instruccion para ejecutar el servicio con Docker:
  docker-compose -f docker-compose-elastic.yml up
 
 - Puede realizar las operaciones Api Rest a traves de algun cliente como Postman, o Gitbash. En este ejemplo he usado Insomnia.
   Importar consultas_elastic.json
 
 - Ficheros de la aplicación demo
 
  map.html : En este fichero se define la maquetación HTML (Ejecute este fichero en su navegador de preferencia Google Chrome).
 
  style.css : En este fichero se define los estilos de la visualización.
 
  map.js : Aca se hace la magia. La parte mas importante es la función "getData" que es la encargada de generar el JSON con el que "getInfo" hace la llamada "POST" al 
          ElasticSearch para que le devuelva los datos.
