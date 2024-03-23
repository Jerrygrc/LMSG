// Definimos la lista de preguntas como un array donde cada posición tiene varios atributos
let listaPreguntas = [{
    pregunta: "¿Cuál es el peso atómico del oxígeno?", // pregunta de la primera posición del array
    opcion: [{ // array de opciones para la primera pregunta en la primera posición del array. Dentro de este can las respuestas y un booleano para saber si son correctas o no
            respuesta: "14,999 g/mol", 
            esCorrecta: false 
        },
        {
            respuesta: "15,999 g/mol", 
            esCorrecta: true 
        },
        {
            respuesta: "16,999 g/mol", 
            esCorrecta: false 
        },
    ]
},
{   //Se repite la estructura anterior para cada pregunta con sus posibles respuestas y la verificación de si son correctas o no
    pregunta: "¿Cómo se llama el proceso de paso de estado gaseoso a sólido de manera directa?", 
    opcion: [{
            respuesta: "Sublimación directa", 
            esCorrecta: true 
        },
        {
            respuesta: "Evaporación inversa", 
            esCorrecta: false 
        },
        {
            respuesta: "Congelación directa", 
            esCorrecta: false 
        },
    ]
},
{
    pregunta: "¿Por debajo de qué valor se define una presión sistólica normal en la mayoría de los adultos?", 
    opcion: [{
            respuesta: "110", 
            esCorrecta: false 
        },
        {
            respuesta: "115", 
            esCorrecta: false 
        },
        {
            respuesta: "120", 
            esCorrecta: true 
        },
    ]
}
];

// Variable para almacenar la última respuesta seleccionada en caso de que se clique más de una vez en una opción
let ultRespuestaEscogida = '';

// Variables para contar las respuestas acertadas y falladas 
let acertadas = 0;
let falladas = 0;

// Variable para guardar el índice de la pregunta que se está leyendo
let indicePreguntaActual = 0;

// Creamos estas variables para que sea más fácil acceder a cada elemento al que hemos puesto una id
let cajaInfoPregunta = document.getElementById('infoPregunta');
let cajaPregunta = document.getElementById('preguntaCaja');
let cajaOpciones = document.getElementById('opcionesCaja');
let btnSiguiente = document.getElementById('btnSiguiente');
let cajaResultado = document.getElementById('resultadoCaja');

// Creamos la función que mostrará las preguntas en el contenedor de preguntas definido en el HTML
function mostrarPregunta(indice) {
    // Creamos la variable pregunta y almacenamos en ella la que se vaya a mostrar 
    let pregunta = listaPreguntas[indice];

    // En la caja infoPregunta, con la propiedad textContent, mostramos la pregunta en la que estamos sumándole 1 al valor del indice y el total con la propiedad lenght del array de preguntas 
    cajaInfoPregunta.textContent = `Pregunta ${indice + 1} de ${listaPreguntas.length}`;

    // En la caja donde imprimimos las preguntas, con la propiedad innerHTML, accedemos a la misma en el array y a su valor con pregunta.pregunta
    cajaPregunta.innerHTML = pregunta.pregunta;

    // Con esta línea limpizamos la caja de opciones para que no se acumulen después las opciones de posteriores preguntas
    cajaOpciones.innerHTML = '';

    // Con el método forEach iteramos por las opciones de la pregunta en la que estamos
    pregunta.opcion.forEach((opcion, indiceOpcion) => {
        // Creamos un botón para cada una de las opciones que tiene cada respuesta
        let button = document.createElement('button');
        // Le damos al botón el texto que tiene almacenada la opción como respuesta
        button.textContent = opcion.respuesta;

        // Añadimos con pa propiedad classList y el método add estilos al botón 
        button.classList.add('bg-gray-200', 'font-semibold', 'px-4', 'py-2', 'rounded-md', 'mr-2', 'mb-2', 'hover:bg-gray-300');

        // Agregamos un evento con el método addEventListener para que cuando se haga click en el botón secuda lo que se especifica después
        button.addEventListener('click', () => {
            // Almacenamos en la variable el último botón clicado
            ultRespuestaEscogida = indiceOpcion;
            
            // Mostramos la opción seleccionada en la caja resultado para que el usuario sepa cual ha escogido finalmente
            cajaResultado.innerHTML = `Has escogido la opción <span class="text-blue-500 font-bold text-xl">${indiceOpcion + 1}</span>`;
        });

        // Con el método appendChild agregamos el botón como hijo de la cajaOpciones
        cajaOpciones.appendChild(button);
    });
}

// Con esta función comprobamos que la respuesta seleccionada es correcta
function comprobarRespuesta(esCorrecta) {
    // Con un if, que recibe el valor de esCorrecta, incrementamos las variables que almacenan las respuestas acertadas y falladas
    if (esCorrecta) {//si el valor es true se incrementa acertadas
        acertadas++;
    } else {//si es false se incrementa falladas
        falladas++;
    }
}

// Creamos en evento con el método addEventListener para que cuando se haga click con el ratón se ejecute el bloque de código entre corchetes
btnSiguiente.addEventListener('click', () => {
    // Almacenamos la pregunbta actual que se muestra
    let preguntaActual = listaPreguntas[indicePreguntaActual];

    // Almacenamos el valor del atributo esCorrecta de la opción que se clicó en úlitma instancia en la variable esCorrecta
    let esCorrecta = preguntaActual.opcion[ultRespuestaEscogida].esCorrecta;

    // Llamamos a la función para comprobar que la respuesta es correcta o no
    comprobarRespuesta(esCorrecta);

    // Incrementamos en 1 el índice del array de preguntas para pasar a la siguiente cuestión
    indicePreguntaActual++;

    // Con el siguiente condicional comprobamos si hay más preguntas
    if (indicePreguntaActual < listaPreguntas.length) {//si el índice de la pregunta es menor que la longitud del array de preguntas se ejecuta el código siguietne
        mostrarPregunta(indicePreguntaActual);//llamamos a la función mostrarPregunta() con el índice actualizado
        cajaResultado.textContent = '';//limpiamos la caja resultado de texto
        
    } else {
        // Si no hay más preguntas, mostramos el resultado final
        cajaInfoPregunta.style.display = 'none'; //ocultamos la caja de información sobre el número de preguntas 
        cajaPregunta.textContent = '¡Fin del QUIZ!';//mostramos el texto de 'final' en la caja de las preguntas
        cajaPregunta.classList.add('text-center', 'text-xl')//añadimos un formato la texto del final (centrado y más grande)
        cajaOpciones.innerHTML = '';//borramos la caja de las opciones de preguntas
        btnSiguiente.style.display = 'none';//ocultamos el bottón de 'siguiente pregunta'
        cajaResultado.textContent = `Has acertado ${acertadas} pregunta/s y fallado ${falladas}`;//ponemos en la caja resultado el texto con las acertadas y falladas
        cajaResultado.classList.add('bg-blue-600', 'text-white', 'p-2', 'text-center', 'rounded-md', 'mt-4', 'font-verdana');//añadimos un nuevo formato a la caja resultado
    }
});

// Llamamos a la función mostrarPregunta() para que se muestre al cargar la página
mostrarPregunta(indicePreguntaActual);
