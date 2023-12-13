var contadorDeElementos = 1;

function agregarElemento() {
    contadorDeElementos++;

    let elementsList = document.getElementById('elements');

    let newElement = document.createElement('li');
    newElement.id = 'food' + contadorDeElementos;

    newElement.innerHTML = `
    <button onclick="borrarElemento(event)" class="botnoX" id="boton${contadorDeElementos}">x</button>
        <form action="">
            <label for="nameForFood${contadorDeElementos}">Nombre del alimento</label>
            <input type="text" name="nameForFood${contadorDeElementos}" id="nameForFood.${contadorDeElementos}">

            <label for="peso${contadorDeElementos}">Peso</label>
            <input type="number" name="peso${contadorDeElementos}" id="peso.${contadorDeElementos}">

            <label for="calorias${contadorDeElementos}">Calorías</label>
            <input type="number" name="calorias${contadorDeElementos}" id="calorias.${contadorDeElementos}">
            <p><p/>
        </form>
    `;

    elementsList.appendChild(newElement);
}

function borrarElemento(event) {
    // Obtener el botón que activó el evento
    const boton = event.target;

    // Obtener el elemento padre (li) del botón y eliminarlo
    const elementoPadre = boton.parentNode;
    elementoPadre.remove();
}

function encontrarCombinacionOptima(alimentos, pesoMaximo) {
    const n = alimentos.length;

    // Crear una matriz para almacenar las soluciones parciales
    const dp = new Array(n + 1).fill(null).map(() => new Array(pesoMaximo + 1).fill(0));

    // Calcular la combinación óptima
    for (let i = 1; i <= n; i++) {
        const { calorias, peso } = alimentos[i - 1];
        for (let j = 0; j <= pesoMaximo; j++) {
            if (peso <= j) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - peso] + calorias);
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    // Reconstruir la combinación óptima
    let i = n;
    let j = pesoMaximo;
    const combinacionOptima = [];

    while (i > 0 && j > 0) {
        if (dp[i][j] !== dp[i - 1][j]) {
            const { nombre, calorias, peso } = alimentos[i - 1];
            combinacionOptima.push({ nombre, calorias, peso });
            j -= peso;
        }
        i--;
    }

    // Invertir el orden de los elementos en combinacionOptima
    combinacionOptima.reverse();

    return combinacionOptima;
}

function mostrarResultado(alimentosOptimos) {
    const NodoResultados = document.getElementById('result');

    let newElement = document.createElement('ul');
    newElement.id = `comidaOptima`;

    for (let index = 0; index < alimentosOptimos.length; index++) {
        const { nombre, calorias, peso } = alimentosOptimos[index];

        // Crear un nuevo elemento para cada alimento y agregarlo a la lista
        let listItem = document.createElement('li');
        listItem.id = nombre;

        listItem.innerHTML = `
            <form action="">
                <label for="${nombre}"> ${nombre}</label>
                <label for="${nombre}${peso}">Peso : ${peso}</label>
                <label for="${nombre}${calorias}">Calorias : ${calorias}</label>
                <p></p>
            </form>
        `;

        // Agregar el nuevo elemento a la lista
        newElement.appendChild(listItem);
    }

    // Agregar la lista al nodo de resultados
    NodoResultados.appendChild(newElement);
}


function calcularElementos() {
    // Obtener los valores de las dos condiciones
    const resultadoAnterior = document.getElementById('comidaOptima')

    console.log(resultadoAnterior)

    resultadoAnterior ? resultadoAnterior.remove() : null

    const minCalories = parseInt(document.getElementById('minCalories').value);
    const maxWeight = parseInt(document.getElementById('maxWeight').value);

    // Obtener la lista de elementos
    const elementsList = document.getElementById('elements').getElementsByTagName('form');

    const listOfElementsValues = []

    console.log(elementsList[0].querySelector(`[name="nameForFood1"]`).value)
    console.log(elementsList)
    
    Array.from(elementsList).forEach((form,indice) => {
        const objeto = {
            nombre: form.querySelector(`[name="nameForFood${indice+1}"]`).value,
            calorias: form.querySelector(`[name="calorias${indice+1}"]`).value,
            peso: form.querySelector(`[name="peso${indice+1}"]`).value
        };
    
        listOfElementsValues.push(objeto);
    });

    console.log({listOfElementsValues})

     let combinacion = encontrarCombinacionOptima(listOfElementsValues, maxWeight)

     console.log({combinacion})

     mostrarResultado(combinacion)
}