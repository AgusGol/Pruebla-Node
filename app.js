let autos = require('./autos');
let persona = {
    nombre: 'Juan',
    capacidadDePagoEnCuotas: 3000000,
    capacidadDePagoTotal: 100000000
}
let concesionaria = {
   autos: autos,
   buscarAuto: function(patente){

      let indiceAuto = -1;
      autos.forEach(function(element, index){
         if(element.patente == patente){
            indiceAuto = index;
            return element;
         }
      })
      if (indiceAuto != -1) {return autos[indiceAuto]}
      else return null;
},
    venderAuto: function(patente){
        this.buscarAuto(patente).vendido = true;

    return this.autos;
},
    autosParaLaVenta: function(){
        return this.autos.filter(elemento => {
        return elemento.vendido == false;})
    },
    autos0km: function(max){
        let autosNuevos = this.autosParaLaVenta();
        return autosNuevos.filter(elemento => {
            return elemento.km < max;})
    },

    listaDeVentas: function(){
        let listaVentas = [];
        this.autos.forEach(element => {
            if (element.vendido == true){
                listaVentas.push(element.precio)
            }
        })
        return listaVentas
    },
    totalDeVentas: function() {
        let totalVentas = 0;
        totalVentas = this.listaDeVentas().reduce(function(element, acu){return element + acu});
        return totalVentas;
    },
    puedeComprar: function(persona,auto){
        let precioAuto = auto.precio;
        let cuotasAuto = auto.cuotas;
        return (persona.capacidadDePagoTotal >= precioAuto  && persona.capacidadDePagoEnCuotas >= (precioAuto/cuotasAuto))
    },
    autosQuePuedeComprar: function(persona){
      let autosEnVenta= this.autosParaLaVenta();
      let autosQ = [];
      autosEnVenta.forEach(function(element){
            if ( concesionaria.puedeComprar(persona,element) == true){
                autosQ.push(element);
            }
      })
      console.log(autosQ);
      return autosQ;
    }
};


//console.log(concesionaria.buscarAuto('APL123'));
//console.log(concesionaria.autos0km(100));
//console.log(concesionaria.listaDeVentas());
//console.log(concesionaria.totalDeVentas());

console.log(concesionaria.autosQuePuedeComprar(persona));