

const contenidoDelCarrito = document.querySelector(`#carrito`)


const grande=document.querySelector(`.grande`)
const punto=document.querySelectorAll(`.punto`)

//carrusel
punto.forEach( ( cadaPunto , i )=> {

    punto[i].addEventListener('click',()=>{

        let posicionPic  = i
        let operacion = posicionPic * -50

        grande.style.transform = `translateX(${ operacion }%)`

        punto.forEach( ( cadaPunto , i )=>{
            punto[i].classList.remove('activo')
        })
        punto[i].classList.add('activo')

    })
})




$(document).ready(() => {
    let productos = [
        {
            id: 1,
            img: "img/naruto.jpg",
            nombre: "Naruto",
            precio: 600,
    
    
        },
        {
            id: 2,
            img: "img/csm.png",
            nombre: "Chainsaw man",
            precio: 400,
    
    
        },
        {
            id: 3,
            img: "img/Gantzvol1.jpg",
            nombre: "Gantz",
            precio: 550,
    
    
    
        },
        {
            id: 4,
            img: `img/kk.jpg`,
            nombre: "Kingdom",
            precio: 500,
    
    
        },
        {
            id: 5,
            img: `img/sola.jpg`,
            nombre: "Solanin",
            precio: 450,
    
    
        },
        {
            id: 6,
            img: `img/pluto.jpg`,
            nombre: "Pluto",
            precio: 700,
    
    
        },
        {
            id: 7,
            img: `img/Volume_01.jpg`,
            nombre: "Tokyo ghoul",
            precio: 499,
    
    
        },
        {
            id: 8,
            img: `img/monster.jpg`,
            nombre: "Monster",
            precio: 500,
    
    
        },
    ]

    let html = ""
    for (const producto of productos) {
        html += `<div class="card">
            <img class="mangasImg " src="${producto.img}">
            <p class="tituloManga cardManga">${producto.nombre}</p>
            <p class="precioManga cardManga">$ ${producto.precio}</p>
            <button id="${producto.id}" class="agregarACarrito">Agregar a carrito</button>
        
        
        </div>`
        $(`#container`).html(html)

      
    }
  

let carroLocal=[]




    //Agregar carrito

    $(`.agregarACarrito`).click((event) => {
        

        const boton = event.target;
        const data = boton.closest(`.card`)
       
        const tituloManga = data.querySelector(`.tituloManga`).textContent
        const precioManga = data.querySelector(`.precioManga`).textContent
      
        carroLocal.push(tituloManga)
        añadirACarrito(tituloManga, precioManga)
        
        //storage

    function getEvent(){
        let listaProductos=localStorage.getItem(`localCarro`)
        if(listaProductos==null){
            carroLocal=[]
        }else{
            carroLocal=JSON.parse(listaProductos)
        }
        return carroLocal
    }

localStorageCarro(carroLocal)
    
function localStorageCarro(lista){
    localStorage.setItem(`localCarro`,JSON.stringify(lista))
}
        
        //localStorage
   
        // let productosArray=JSON.parse(localStorage.getItem(`productosArray`)) || []
        // productosArray.push(tituloManga)
        // //convierto array en json
        // let productosArrayJSON=JSON.stringify(productosArray)
        // //guardo json
        // localStorage.setItem(`productosArray`,productosArrayJSON)
    

        //mostrar productos
        // document.addEventListener(`DOMContentLoaded`,(event)=>{
        //     let productosObjArray=JSON.parse(localStorage.getItem(`productosArray`))
        //     productosObjArray.forEach(function(arrayElement){
        //         añadirACarrito(arrayElement)
        //     })
        // })
    
       
    

    })

  




})


    


const añadirACarrito = (tituloManga, precioManga) => {

    //Aumentar cantidad y que no se repita el producto

    const tituloItem = document.getElementsByClassName(`shoppingCartItemTitle`)
    for (let i = 0; i < tituloItem.length; i++) {
        if (tituloItem[i].innerText === tituloManga) {
            let elementoCantidad = tituloItem[i].parentElement.parentElement.parentElement.querySelector(
                `.shoppingCartItemQuantity`)
            elementoCantidad.value++
            carritoTotalPrecio()

            return;

        }

    }



$(`#carrito`).append(`
 
<div class="row shoppingCartItem">
<div class="col-6">
    <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
     
        <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${tituloManga}</h6>
    </div>
</div>
<div class="col-2">
    <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
        <p class="item-price mb-0 shoppingCartItemPrice">${precioManga}</p>
    </div>
</div>
<div class="col-4">
    <div
        class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
        <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
            value="1">
        <button class="btn btn-danger buttonDelete" type="button">X</button>
    </div>
</div>
</div>
`)


    
    //Sacar del carrito 
    $(`.buttonDelete`).click((event) => {

        const click = event.target;
        click.closest(`.shoppingCartItem`).remove()
        carritoTotalPrecio()
    })
    //Aumentar productos 
    $(`.shoppingCartItemQuantity`).change((event) => {
        const cantidad = event.target
        if (cantidad.value <= 0) {
            cantidad.value = 1;
        }
        carritoTotalPrecio()
    })

    carritoTotalPrecio()
   


}

//Funcion carrito
function carritoTotalPrecio() {
    let total = 0
    const shoppingCartTotal = document.querySelector(`.precioTotal`)
    const shoppingCartItem = document.querySelectorAll(`.shoppingCartItem`)
    shoppingCartItem.forEach(element => {
        const precioShoppingCart = element.querySelector(`.shoppingCartItemPrice`)

        const textPrecio = Number(precioShoppingCart.textContent.replace(`$`, ``))
        const cantidadShoppingCar = document.querySelector(`.shoppingCartItemQuantity`);
        const textCantidad = Number(cantidadShoppingCar.value)

        total = total + textPrecio * textCantidad;

    })
    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`

   

}

//Boton comprar

$(`.botonCarritoTotal`).click(() => {
   let carroItemTitulo=document.querySelector(`.shoppingCartItemTitle`) 
    
    
        contenidoDelCarrito.innerHTML = ""
        carritoTotalPrecio()
        
        
    
   


})



//Formulario
let rutaFormulario=document.querySelector(`.formulario`)
let home=document.querySelector(`.home`)






function formulario(){
   
    
    home.innerHTML="";
    $(`.home`).append(`
    <div class="container">
    <form id="formulario">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email</label>
      <input type="email" class="form-control mailFormulario" id="exampleInputEmail1" aria-describedby="emailHelp">
      
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Contraseña</label>
      <input type="password" class="form-control contraseñaFormulario" id="exampleInputPassword1">
    </div>
    
    <button type="submit" class="btn btn-primary botonIngreso">Ingresa</button>
  </form></div>`)

  function limpiarFormulario() {
    document.querySelector("#formulario").reset();
  }


//validar formulario



let nombreRegistro=[]
  console.log(nombreRegistro)
for(email of nombreRegistro){
    console.log("a")
}
  

//   console.log(nombreRegistro);

$(`.botonIngreso`).click(()=>{
    let mailFormulario=""
    let contraseñaFormulario=""
    mailFormulario=document.querySelector(`.mailFormulario`).value
    contraseñaFormulario=document.querySelector(`.contraseñaFormulario`).value
   

    registro()
  

    if(mailFormulario===""||mailFormulario===null){
        swal("Por favor, complete todos los datos correspondientes");

    // }if(mailFormulario===asd){
    //     console.log("usuario registrado")
    }
    
    
    if(contraseñaFormulario===""||contraseñaFormulario===""){
        swal("Por favor, complete todos los datos correspondientes");


    

    }else{
        swal("Bienvenido");
        limpiarFormulario()
        

    }
   
    
    

    
})


function registro(){
    $(`.home`).append(`<form>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control emailLocal" id="exampleInputEmail1" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary botonLocal">Submit</button>
  </form>`)
  
  //storage registro
  function añadirUsuario(pemail){
    let newUsuario={
        email:pemail,
    }
    nombreRegistro.push(newUsuario)
   jsonStorageUsuario(nombreRegistro)

}


$(`.botonLocal`).click(()=>{
    console.log("asd")
    let guardarMail=document.querySelector(`.emailLocal`).value
    
    añadirUsuario(guardarMail)
})

function getStorageUsuario(){
        let storageUsuario=localStorage.getItem("localRegistro")
    if(storageUsuario==null){
        nombreRegistro=[]
    }else{
        
        nombreRegistro=JSON.parse(storageUsuario)
    }
    return nombreRegistro
    
}


function jsonStorageUsuario(plista){
    localStorage.setItem("localRegistro",JSON.stringify(plista))

}
function validarUsuario(){
    let listaUsuario=añadirUsuario()
    for(let i=0;i<nombreRegistro.length;i++){
        if(pemail==nombreRegistro[i][0]){
            sessionStorage.setItem("usuario",nombreRegistro[i][0]+``)
        }
    }
}



}

}




//ruta formulario


window.onhashchange=function(){
    loadContent()+window.location.href
}

function loadContent(event){
    if(event)event.preventDefault();
    formulario()

}






// window.addEventListener(`hashchange`,()=>{
//     ruta(window.location.hash)
// })




// const ruta=(ruta)=>{
//     home.innerHTML="";
//     rutaFormulario.innerHTML="";
//     switch(ruta){
//         case `#/formulario`:
//         return formulario()
//         break
//     }
   
// }





//footer


$(".footer").append(`<footer class="footer">
<div class="nombreFooter">
    <p>Venta Mangas</p>


</div>

<div class="infoFooter">
    <p>Gracias por visitarnos</p>


</div>`)