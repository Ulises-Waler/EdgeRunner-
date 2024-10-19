# `EdgeRunners`

Bienvenido a nuestro repositorio EdgeRunners, este proyecto nombrado CopsAlert es un sistema que mediante análisis de datos delictivos o de emergencia en tiempo real genera rutas más eficientes para las patrullas, esto es logrado mediante la Geolocalización y ayuda del C5, así mismo lograr un reporte más asertivo y sin mucha perdida de tiempo, de igual forma nos garantiza mejorar la seguridad y el tiempo que son fundamentales en casos de riesgo.

Aquí dejó la explicación para que así el proyecto sea ejecutable en el entorno local:

1.- Una vez ya clonado el repositorio con "git clone https://github.com/Ulises-Waler/EdgeRunner-.git" se entrara a la carpeta con 

cd EdgeRunners

2.-Una vez dentro se instalaran las dependencias que tenga nuestro proyecto del package.json con el comando:

npm i

3.- Ya que haya terminado de instalar las dependencias ahí mismo en la raíz vamos a correr el comando para inicializar la replica y así poder deployar nuestro proyecto, el comando sería:

dfx start --background --clean

se pone -- background --clean para que no secuestre nuestra terminal y no tengasmos que abrir otra terminal y así limpie las replicas que se han inicializado anteriormente

4.- Una vez que ejecutamos el comando anterior sería ya deployar los canisters, con el siguiente comando:

dfx deploy

esto empezará a construir nuestros canisters, tanto en el backend como en el frontend, una vez construidos aparezerán varias rutas la que requeremos sería la siguiente:

Frontend canister via browser
EdgeRunners_frontend:
http://127.0.0.1:4943/?canisterId=b77ix-eeaaa-aaaaa-qaada-cai
----------->http://b77ix-eeaaa-aaaaa-qaada-cai.localhost:4943/ <--------------------

6.- Copiariamos esta ruta y la pegaríamos en la barra de busqueda del navegador de preferencia

7.- Estaría nuestro proyecto mostrandose en ese momento.