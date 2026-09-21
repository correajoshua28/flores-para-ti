const inicio = document.getElementById("inicio");
const escena = document.getElementById("escena");
const corazonFlores = document.getElementById("corazonFlores");

const girasolInicial = document.getElementById("girasolInicial");
const semilla = document.getElementById("semilla");


inicio.addEventListener("click", function () {

    const girasolInicial =
        document.getElementById("girasolInicial");

    const semilla =
        document.getElementById("semilla");

    inicio.style.pointerEvents = "none";


    // 1. Desaparece texto
    const titulo = inicio.querySelector("h1");
    const texto = inicio.querySelector("p");

    titulo.style.transition = "opacity 0.3s ease";
    texto.style.transition = "opacity 0.3s ease";

    titulo.style.opacity = "0";
    texto.style.opacity = "0";


    // =========================================
    // 2. EL GIRASOL SE CONCENTRA EN SU CENTRO
    // =========================================

    girasolInicial.style.transition =
        "transform 0.65s cubic-bezier(.4,0,.2,1), opacity 0.18s ease";

    girasolInicial.style.transform =
        "scale(0.20)";


    // =========================================
    // 3. DEL CENTRO DEL GIRASOL NACE LA SEMILLA
    // =========================================

    setTimeout(function () {

        // Obtener exactamente el centro del girasol
        const rectGirasol =
            girasolInicial.getBoundingClientRect();

        const rectTarjeta =
            document.querySelector(".tarjeta")
                .getBoundingClientRect();

        const centroX =
            rectGirasol.left -
            rectTarjeta.left +
            rectGirasol.width / 2;

        const centroY =
            rectGirasol.top -
            rectTarjeta.top +
            rectGirasol.height / 2;


        // Colocamos la semilla EXACTAMENTE
        // en el centro marrón del girasol
        semilla.style.left = centroX + "px";
        semilla.style.top = centroY + "px";

        semilla.classList.add("aparecer");

        // El girasol desaparece justo
        // cuando aparece su centro
        girasolInicial.style.opacity = "0";

    }, 570);



    // 4. Quitamos la portada,
    // pero todavía NO mostramos el árbol
    setTimeout(function () {

        inicio.classList.add("ocultar");

    }, 700);



    // 5. La semilla cae EN EL CENTRO
    setTimeout(function () {

        semilla.classList.add("caer");

    }, 720);

    // =========================================
    // 6. LA SEMILLA TOCA EL SUELO
    // =========================================

    setTimeout(function () {

        // Mostramos la escena:
        // aparece el suelo y empieza a crecer el árbol
        escena.classList.add("mostrar");

        // La semilla desaparece porque
        // de ese punto nace el árbol
        semilla.classList.add("desaparecer");

    }, 1700);

    
    // =========================================
    // EL ÁRBOL EMPIEZA A MOVERSE A LA DERECHA
    // MIENTRAS ESTÁ CRECIENDO
    // =========================================

    setTimeout(function () {

        const arbol =
            document.querySelector(".arbol");

        arbol.classList.add("mover-derecha");

    }, 2050);

    // =========================================
    // 7. DESPUÉS APARECEN LAS FLORES
    // =========================================

    setTimeout(function () {

        crearCorazon();

    }, 3800);

    setTimeout(function () {
        iniciarCaidaGirasoles();
    }, 5900);

    // =========================================
    // 8. MENSAJE SUPERIOR
    // =========================================

    setTimeout(function () {

        escribirMensajeSuperior();

    }, 5900);

    // =========================================
    // 9. MENSAJE DEL TIEMPO
    // =========================================

    setTimeout(function () {

        const mensajeTiempo =
            document.getElementById("mensajeTiempo");

        mensajeTiempo.classList.add("mostrar");

    }, 7900);

    // =========================================
    // 10. MOSTRAR CONTADOR
    // =========================================

    setTimeout(function () {

        const contadorAmor =
            document.getElementById("contadorAmor");

        contadorAmor.classList.add("mostrar");

        iniciarContador();

    }, 8200);

});


function crearCorazon() {

    corazonFlores.innerHTML = "";

    const flores = [];

    // Cantidad que intentaremos colocar
    const cantidadObjetivo = 950;

    // Evita que dos flores queden prácticamente en el mismo sitio
    const distanciaMinima = 0.72;

    // Evita un bucle infinito si ya no queda espacio
    const maxIntentos = 120000;

    let intentos = 0;


    while (
        flores.length < cantidadObjetivo &&
        intentos < maxIntentos
    ) {

        intentos++;


        // Posición completamente aleatoria
        const x = Math.random() * 34 - 17;
        const y = Math.random() * 30 - 14;


        // =========================================
        // 1. COMPROBAR QUE ESTÉ DENTRO DEL CORAZÓN
        // =========================================

        const formula =
            Math.pow(
                x * x +
                y * y -
                100,
                3
            )
            -
            x * x *
            Math.pow(y, 3);


        if (formula > 0) {
            continue;
        }


        // =========================================
        // 2. COMPROBAR DISTANCIA CON OTRAS FLORES
        // =========================================

        let demasiadoCerca = false;


        for (let j = 0; j < flores.length; j++) {

            const dx =
                x - flores[j].x;

            const dy =
                y - flores[j].y;


            const distancia =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distancia < distanciaMinima) {

                demasiadoCerca = true;

                break;
            }
        }


        // Si está demasiado cerca de otra,
        // buscamos otra posición.
        if (demasiadoCerca) {
            continue;
        }


        // =========================================
        // 3. POSICIÓN ACEPTADA
        // =========================================

        flores.push({

            x: x,

            y: y,

            escala:
                0.68 +
                Math.random() * 0.18,

            rotacion:
                -15 +
                Math.random() * 30

        });

    }


    // =========================================
    // MEZCLAR ORDEN DE APARICIÓN
    // =========================================

    for (let i = flores.length - 1; i > 0; i--) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        const temp = flores[i];

        flores[i] = flores[j];

        flores[j] = temp;
    }


    // =========================================
    // CREAR LAS FLORES
    // =========================================

    flores.forEach(function (datos, indice) {

        const flor =
            document.createElement("img");


        flor.classList.add(
            "flor-corazon"
        );


        // 68% girasoles - 32% gerberas
        const tipoFlor =
            Math.random() < 0.68
                ? "g1.png"
                : "ger2.png";

        flor.src =
            "img/" + tipoFlor;

        flor.dataset.tipoFlor =
            tipoFlor;

        flor.draggable = false;


        // MANTENEMOS EL TAMAÑO Y POSICIÓN
        // DEL CORAZÓN QUE YA CONSEGUIMOS

        let posX = 50 + datos.x * 6.6;
        let posY = 52 - datos.y * 5.15;


        /*
        MARCAR MEJOR LOS DOS LÓBULOS SUPERIORES
        DEL CORAZÓN
        */
        if (datos.y > 6) {

            const intensidad =
                (datos.y - 6) / 8;

            /*
            Alejamos ligeramente las flores
            superiores del centro.
            */
            if (datos.x < 0) {
                posX -= intensidad * 7;
            } else {
                posX += intensidad * 7;
            }


            /*
            Las flores que están MUY cerca del centro
            bajan un poco para crear la hendidura ❤️
            */
            const cercaCentro =
                1 - Math.min(
                    Math.abs(datos.x) / 5,
                    1
                );

            posY +=
                intensidad *
                cercaCentro *
                7;
        }


        flor.style.left = posX + "%";
        flor.style.top = posY + "%";


        flor.style.setProperty(
            "--escala-flor",
            datos.escala
        );


        flor.style.setProperty(
            "--rotacion-flor",
            datos.rotacion + "deg"
        );


        corazonFlores.appendChild(flor);


        // Aparición desordenada
        setTimeout(function () {

            flor.classList.add(
                "aparecer"
            );

        }, indice * 2.2);

    });


    console.log(
        "Flores colocadas:",
        flores.length
    );

}


function escribirMensajeSuperior() {

    const mensaje =
        document.getElementById("mensajeSuperior");

    const texto =
        "Flores Amarillas para el amor de mi vida 💛";

    let indice = 0;

    mensaje.innerHTML = "";
    mensaje.classList.add("escribiendo");

    function escribir() {

        if (indice < texto.length) {

            mensaje.textContent +=
                texto.charAt(indice);

            indice++;

            setTimeout(
                escribir,
                85
            );

        } else {

            mensaje.classList.remove(
                "escribiendo"
            );

            // TERMINÓ EL TÍTULO
            // AHORA EMPIEZA EL MENSAJE
            escribirMensajeAmor();
        }
    }

    escribir();
}



function iniciarContador() {

    /*
        AQUÍ COLOCA LA FECHA REAL
        EN LA QUE COMENZÓ TU RELACIÓN.
    */
    const fechaInicio =
        new Date(2024, 11, 25, 0, 0, 0);


    function actualizarContador() {

        const ahora = new Date();

        let diferencia =
            ahora.getTime() -
            fechaInicio.getTime();


        if (diferencia < 0) {
            diferencia = 0;
        }


        const dias =
            Math.floor(
                diferencia /
                (1000 * 60 * 60 * 24)
            );


        const horas =
            Math.floor(
                (
                    diferencia /
                    (1000 * 60 * 60)
                ) % 24
            );


        const minutos =
            Math.floor(
                (
                    diferencia /
                    (1000 * 60)
                ) % 60
            );


        const segundos =
            Math.floor(
                (
                    diferencia /
                    1000
                ) % 60
            );


        document.getElementById("dias").textContent =
            dias;

        document.getElementById("horas").textContent =
            String(horas).padStart(2, "0");

        document.getElementById("minutos").textContent =
            String(minutos).padStart(2, "0");

        document.getElementById("segundos").textContent =
            String(segundos).padStart(2, "0");
    }


    actualizarContador();

    setInterval(
        actualizarContador,
        1000
    );
}



function escribirMensajeAmor() {

    const mensaje =
        document.getElementById("mensajeAmor");

    const texto = `Entre girasoles y gerberas quise guardar un pedacito de todo lo que siento por ti.

    Los girasoles buscan siempre la luz, y de alguna manera tú te convertiste en la mía.

    Las gerberas llenan de color este corazón, como tú llenas de alegría mis días.

    Y aunque estas flores algún día puedan caer, mi amor por ti seguirá floreciendo. 🌻❤️`;

    let indice = 0;

    mensaje.textContent = "";
    mensaje.classList.add("escribiendo");

    function escribir() {

        if (indice < texto.length) {

            mensaje.textContent +=
                texto.charAt(indice);

            indice++;

            setTimeout(
                escribir,
                55
            );

        } else {

            mensaje.classList.remove(
                "escribiendo"
            );
        }
    }

    escribir();
}


function iniciarCaidaGirasoles() {

    const escena =
        document.getElementById("escena");

    const corazon =
        document.getElementById("corazonFlores");

    // Evita iniciar el efecto dos veces
    if (corazon.dataset.caidaActiva === "1") {
        return;
    }

    corazon.dataset.caidaActiva = "1";


    function crearFlorCayendo() {

        const flores =
            Array.from(
                corazon.querySelectorAll(".flor-corazon")
            );

        if (flores.length === 0) {
            return;
        }


        const rectCorazon =
            corazon.getBoundingClientRect();

        const centroX =
            rectCorazon.left +
            rectCorazon.width / 2;


        /*
            Preferimos flores del lado izquierdo
            y de la zona media/inferior.

            Así parece que realmente se desprenden
            del árbol hacia la izquierda.
        */
        let candidatas =
            flores.filter(function (flor) {

                const rect =
                    flor.getBoundingClientRect();

                const centroFlor =
                    rect.left +
                    rect.width / 2;

                return centroFlor <
                    centroX + rectCorazon.width * 0.05;
            });


        if (candidatas.length === 0) {
            candidatas = flores;
        }


        const original =
            candidatas[
                Math.floor(
                    Math.random() *
                    candidatas.length
                )
            ];


        const rectFlor =
            original.getBoundingClientRect();

        const rectEscena =
            escena.getBoundingClientRect();


        const flor =
            document.createElement("img");

        flor.className =
            "flor-cayendo";

        // Usamos exactamente la misma imagen
        // de la flor que se está desprendiendo
        flor.src = original.src;

        flor.draggable = false;


        flor.style.left =
            (
                rectFlor.left -
                rectEscena.left +
                rectFlor.width / 2
            ) + "px";


        flor.style.top =
            (
                rectFlor.top -
                rectEscena.top +
                rectFlor.height / 2
            ) + "px";


        /*
            Cada flor tiene una caída diferente.
        */

        const desplazamientoX =
            -100 -
            Math.random() * 190;

        const balanceo1 =
            -20 +
            Math.random() * 40;

        const balanceo2 =
            -15 +
            Math.random() * 30;

        const duracion =
            3.5 +
            Math.random() * 1.3;

        const giro =
            -250 -
            Math.random() * 300;


        flor.style.setProperty(
            "--caida-x",
            desplazamientoX + "px"
        );

        flor.style.setProperty(
            "--balanceo-1",
            balanceo1 + "px"
        );

        flor.style.setProperty(
            "--balanceo-2",
            balanceo2 + "px"
        );

        flor.style.setProperty(
            "--giro-final",
            giro + "deg"
        );

        flor.style.setProperty(
            "--duracion-caida",
            duracion + "s"
        );


        const tamano =
            18 + Math.random() * 7;

        flor.style.width = tamano + "px";
        flor.style.height = tamano + "px";
        flor.style.objectFit = "contain";


        escena.appendChild(flor);


        setTimeout(function () {

            flor.remove();

        }, duracion * 1000 + 200);
    }


    /*
        FLUJO CONTINUO.

        Cada 220 ms decidimos si cae una flor.

        Como cada flor tarda alrededor de 4 segundos,
        siempre habrá varias simultáneamente.
    */

    setInterval(function () {

        crearFlorCayendo();

        /*
            Algunas veces soltamos una segunda flor
            poco después.

            Esto rompe el patrón mecánico sin
            producir una lluvia exagerada.
        */

        if (Math.random() < 0.25) {

            setTimeout(function () {

                crearFlorCayendo();

            }, 90 + Math.random() * 130);
        }

    }, 220);
}
