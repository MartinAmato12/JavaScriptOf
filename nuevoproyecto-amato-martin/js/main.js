const BBDD = [
    {
        "id": 1,
        "nombre": "Campera Negra",
        "img": "./assets/img/camper.jpg.jfif",
        "precio": 80,
        "cantidad":1
    },
    {
        "id": 2,
        "nombre": "Mochila Amarilla",
        "img": "./assets/img/mochila.jpg.jfif",
        "precio": 25,
        "cantidad":1
    },
    {
        "id": 3,
        "nombre": "Zapatillas",
        "img": "./assets/img/zapa.jpg.jfif",
        "precio": 70,
        "cantidad":1
    },
    {
        "id": 4,
        "nombre": "Toallas",
        "img": "./assets/img/toa.jpg.jfif",
        "precio": 10,
        "cantidad":1
    },
    {
        "id": 5,
        "nombre": "Falda Skater",
        "img": "./assets/img/po.jpg.jfif",
        "precio": 70,
        "cantidad":1
    },
    {
        "id": 6,
        "nombre": "Traje de Baño",
        "img": "./assets/img/panti.jpg.jfif",
        "precio": 30,
        "cantidad":1
    },
    {
        "id": 7,
        "nombre": "Pantalon Largo",
        "img": "./assets/img/pantalon.jpg.jfif",
        "precio": 50,
        "cantidad":1
    },
    {
        "id": 8,
        "nombre": "Medias Largas",
        "img": "./assets/img/media.jpg.jfif",
        "precio": 5,
        "cantidad":1
    },
    {
        "id": 9,
        "nombre": "Remera vestido",
        "img": "./assets/img/remegran.jpg.jfif",
        "precio": 28,
        "cantidad":1
    },
    {
        "id": 10,
        "nombre": "Buzo con Capucha",
        "img": "./assets/img/bu.jpg.jfif",
        "precio": 90,
        "cantidad":1
    }
]


const carrito = [];
function renderizarProductos(){

    const tienda = document.getElementById('tienda');  

    // Botones de filtro
    const btnFiltros = [
        'Mayor precio', 
        'Menor precio', 
        'Alfabeticamente', 
        'Mas vendidos', 
        'Por Año',
        'Descuentos'];

    // Crear botones en el html 

    const divContainer = document.createElement('div');
    divContainer.classList.add('container', 'text-center');

    btnFiltros.forEach((btn)=> {
        
        const boton = document.createElement('button');
        boton.textContent = btn;
        boton.classList.add('btn', 'btn-primary', 'm-2');

        tienda.appendChild(boton);
    })

    // Creacion
    const btnMayorPrecio = document.querySelector('button:nth-child(1)');
    btnMayorPrecio.addEventListener('click', ()=>{
        
        const product = BBDD.sort((a,b)=> b.precio - a.precio);

        console.log(product);

        tienda.innerHTML = '';

        product.forEach((e)=>{
            
            console.log(e);
            const div = document.createElement('div');

            div.classList.add('col-12');
            div.classList.add('col-md-4');
            div.classList.add('mb-5');
            div.classList.add('d-flex');
            div.classList.add('justify-content-center');

            div.innerHTML = `
            <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${e.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${e.nombre}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p>${e.precio}€</p>
                <button class="btn btn-primary" id="${e.id}">Añadir al carrito</button>
            </div>
            </div>
        `
            div.querySelector('button').addEventListener('click', ()=>{
                agregarProductosAlCarrito(e.id);
            
            })

            tienda.appendChild(div);
        })

    })


    BBDD.forEach((p)=> {
        
        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p>${p.precio}€</p>
                <button class="btn btn-primary" id="${p.id}">Añadir al carrito</button>
            </div>
        </div>
        `

        tienda.appendChild(producto);

        producto.querySelector('button').addEventListener('click', ()=>{
            
            agregarProductosAlCarrito(p.id);
            
        })

    })

}


renderizarProductos();

function agregarProductosAlCarrito(id){
    
    let producto = BBDD.find(producto => producto.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id === id);

    if(productoEnCarrito){
        
        productoEnCarrito.cantidad++;

        console.log(carrito);

        alert(`La cantidad del producto ${producto.nombre} fue modificada`);

    }else {
        
        producto.cantidad = 1;

        carrito.push(producto);

        console.log(carrito);

        alert('Producto agregado correctamente al carrito')
    }

    renderizarCarrito();
    calcularTotal();
}

function renderizarCarrito(){

    const d = document;
    let carritoHTML = d.querySelector('#carrito');

    carritoHTML.innerHTML = '';

    carrito.forEach((p, index)=> {
    
        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p>${p.precio}€</p>
                <p>Cantidad: ${p.cantidad}</p>
                <button class="btn btn-danger">Eliminar</button>
            </div>
        </div>
        `

        producto.querySelector('button').addEventListener('click', ()=>{
        
            eliminarProductoDelCarrito(index)
        })

        carritoHTML.appendChild(producto);
    })
}

function eliminarProductoDelCarrito(indice){

    carrito[indice].cantidad--;
    alert(`La cantidad del producto ${carrito[indice].nombre} disminuyo`);

    if(carrito[indice].cantidad === 0){

        carrito.splice(indice,1);
        alert('El producto fue eliminado del carrito');
    }

    renderizarCarrito();
    calcularTotal()
}

function calcularTotal(){

    let total = 0;

    carrito.forEach((p)=>{
    
        total += p.precio * p.cantidad;
    })

    console.log(total);

    const t = document.getElementById('total');

    t.innerHTML = `<h5>${total}€</h5>`

}


const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

btn.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});


