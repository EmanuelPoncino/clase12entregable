let autosImportados = require("./autos");

let concesionaria = {
  autos: autosImportados,
  buscarAuto: function (patente) {
    return this.autos.find((auto) => auto.patente === patente) || null;
  },
  venderAuto: function (patente) {
    let autoEncontrado = this.buscarAuto(patente);
    return autoEncontrado
      ? ((autoEncontrado.vendido = true), autoEncontrado)
      : null;
  },
  autosParaLaVenta: function () {
    return this.autos.filter((auto) => auto.vendido == false);
  },
  autosNuevos: function () {
    let autosNoVendidos = this.autosParaLaVenta();
    let autosNuevos = autosNoVendidos.filter((auto) => auto.km < 100);
    return autosNuevos;
  },
  listaDeVentas: function () {
    return this.autos.filter((auto) => auto.vendido).map((auto) => auto.precio);
  },
  totalDeVentas: function () {
    let ventas = this.listaDeVentas();
    return ventas.reduce((acumulador, precio) => acumulador + precio, 0);
  },
  puedeComprar: function (auto, persona) {
    let costoTotal = auto.precio;
    let cuotaMensual = costoTotal / auto.cuotas;
    return (
      costoTotal <= persona.capacidadDePagoTotal &&
      cuotaMensual <= persona.capacidadDePagoEnCuotas
    );
  },
  autosQuePuedeComprar: function (persona) {
    let autoDisponibles = this.autosParaLaVenta();
    return autoDisponibles.filter((auto) => this.puedeComprar(auto, persona));
  },
};

// agrego 1
// modifico 1

