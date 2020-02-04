var config = {
    apiKey: "AIzaSyBcsheZ6x36DBxiSf_MukXfCcMdA4Wi-r8",
    authDomain: "me-robaron-ec0a8.firebaseapp.com",
    databaseURL: "https://me-robaron-ec0a8.firebaseio.com",
    projectId: "me-robaron-ec0a8",
    storageBucket: "me-robaron-ec0a8.appspot.com",
    messagingSenderId: "529797486610"
  };
  firebase.initializeApp(config);
  
  
  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1; //hoy es 0!
  var yyyy = hoy.getFullYear();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}

hoy = mm+'/'+dd+'/'+yyyy;


   var marker;          //variable del marcador
   var coords = {};    //coordenadas obtenidas con la geolocalización
   var ubicacion = {lat:0,lng:0,date:hoy};
   var i=0;  //contador para ID
  

    //Funcion principal
    initMap = function ()
      {

      document.getElementById("Guardar").onclick=function(){
         
        
          
          var task=firebase.database().ref("Ubicaciones");
          task.push(ubicacion);
          
           console.log(ubicacion);
          console.log(hoy);
          
          alert("Ubicacion Guardada");
      }

      //usamos la API para geolocalizar el usuario
        navigator.geolocation.getCurrentPosition(
          function (position){
            coords =  {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
           setMapa(coords);  //pasamos las coordenadas al metodo para crear el mapa


          },function(error){console.log(error);});

}



    function setMapa (coords)
      {
          //Se crea una nueva instancia del objeto mapa
          var map = new google.maps.Map(document.getElementById('map'),
          {
            zoom: 15,
            disableDefaultUI: true,
          center:new google.maps.LatLng(coords.lat,coords.lng),

      });

      //Creamos el marcador en el mapa con sus propiedades
      //para nuestro obetivo tenemos que poner el atributo draggable en true
      //position pondremos las mismas coordenas que obtuvimos en la geolocalización


      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(coords.lat,coords.lng),

      });
      //agregamos un evento al marcador junto con la funcion callback al igual que el evento dragend que indica
      //cuando el usuario a soltado el marcador
      marker.addListener('click', toggleBounce);

      marker.addListener( 'dragend', function (event)
      {

        console.log(this.getPosition().lat()+","+ this.getPosition().lng());
        ubicacion.lat=this.getPosition().lat();
        ubicacion.lng=this.getPosition().lng();

});
}

//callback al hacer clic en el marcador lo que hace es quitar y poner la animacion BOUNCE
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

// Carga de la libreria de google maps


    
    