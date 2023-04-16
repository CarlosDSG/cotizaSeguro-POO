//? Contamos desde el año actual 20 años atras
const max = new Date().getFullYear();
min = max - 20;

const select = document.getElementById('anio');
for (let i = max; i >= min; i--) {
	let option = document.createElement('option');
	option.value = i;
	option.innerText = i;
	select.appendChild(option);
}

// * Clase Seguro
class Seguro {
	constructor(marca, year, tipo) {
		(this.marca = marca), (this.year = year), (this.tipo = tipo);
	}
	cotizarSeguro() {
		// 1 = americano 1.20
		// 2 = asiarico 1.07
		// 3 = europeo 1.32
		let cantidad;
		const saldoBase = 2500;
		switch (this.marca) {
			case '1':
				cantidad = saldoBase * 1.2;
				break;
			case '2':
				cantidad = saldoBase * 1.07;
				break;
			case '3':
				cantidad = saldoBase * 1.32;
				break;
		}
		const diferenciaYear = new Date().getFullYear() - this.year;
		cantidad -= (diferenciaYear * 3 * cantidad) / 100;
		if (this.tipo === 'basico') {
			cantidad *= 1.3;
		} else {
			cantidad *= 1.5;
		}
		return cantidad;
	}
}

/* -------------------------------------------------- */
//* Clase  Interfaz
class Interfaz {
	mostrarError(mensaje, tipo) {
		const div = document.getElementById('check');

		if (tipo === 'error') {
			div.classList.add('mensaje', 'error');
		} else {
			div.classList.add('mensaje', 'correcto');
		}
		div.innerHTML = mensaje;
		setTimeout(function () {
			document.querySelector('.mensaje').remove();
		}, 3000);
	}
	mostrarResultado(marca, year, tipo, total) {
		const resultado = document.getElementById('resultado');
		const template = `
		<div>
		<p class="header">Tu resumen</p>
		<p>Marca: ${marca} </p>
		<p>Año: ${year} </p>
		<p>Tipo: ${tipo} </p>
		<p>Total: $ ${total} </p>
		</div>
		`;

		const spiner = document.querySelector('#cargando img');
		spiner.style.display = 'block';
		setTimeout(function () {
			spiner.style.display = 'none';
			resultado.innerHTML = template;
		}, 3000);
	}
}
const interfaz = new Interfaz();
/* ------------------------------------------------ */

//? Leemos los datos del formulario
let marca = document.querySelector('#marca');
let year = document.querySelector('#anio');
const MensajeError = document.getElementById('mensaje-error');

const form = document.getElementById('cotizar-seguro');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const tipo = document.querySelector('input[name="tipo"]:checked').value;
	const marcaSeleccionada = marca.value;
	const yearSeleccionado = year.value;
	if (tipo === '' || marcaSeleccionada === '' || yearSeleccionado === '') {
		interfaz.mostrarError('Debe seleccionar todos los datos', 'error');
	} else {
		const seguro = new Seguro(marcaSeleccionada, yearSeleccionado, tipo);
		interfaz.mostrarResultado(
			marca.options[marca.selectedIndex].textContent,
			yearSeleccionado,
			tipo,
			seguro.cotizarSeguro()
		);
		interfaz.mostrarError('Enviado Correctamente', 'correcto');
	}
});
