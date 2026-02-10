
  const mp = new MercadoPago(
    "APP_USR-8d8c5944-6c71-48b9-b331-6673ce48e98d",
    { locale: "es-AR" }
  );

  function verMediosPago(){

    console.log(arrayPedido)

document.getElementById("paymentBrick_container").innerHTML=``;
    //MEDIOS DE PAGO
    let nombre= document.getElementById("nombre").value.trim();
    let dni= document.getElementById("dni").value.trim();
    let celular= document.getElementById("celular").value.trim();
    let domicilio= document.getElementById("domicilio").value.trim();
    let partido= document.getElementById("partido").value.trim();
    let localidad= document.getElementById("localidad").value.trim();

      // 🔴 VALIDACIÓN
  if (!nombre || !dni || !celular || !domicilio || !partido || !localidad) {
    alert("Debe completar los datos del Comprador");
    return
  }

  setTimeout(() => {
    
  document.getElementById("paymentBrick_container").scrollIntoView({
            behavior: "smooth",
            block: "start"
    });
    
  }, 2000);


const totalPagarNumber=Number(totalPagar.textContent)

const bricksBuilder = mp.bricks();

  bricksBuilder.create("payment", "paymentBrick_container", {
    initialization: {
      amount: totalPagarNumber
    },
    customization: {
      paymentMethods: {
        creditCard: "all",
        debitCard: "all",
        ticket: "all"
      }
    },
    callbacks: {
      onReady: () => {
        console.log("✅ Brick listo");
      },


      onSubmit: async (data) => {

  const cliente = {
    nombre: document.getElementById("nombre").value.trim(),
    dni: document.getElementById("dni").value.trim(),
    celular: document.getElementById("celular").value.trim(),
    domicilio: document.getElementById("domicilio").value.trim(),
    partido: document.getElementById("partido").value.trim(),
    localidad: document.getElementById("localidad").value.trim(),
    email: data.formData?.payer?.email
  };

  // 🔴 VALIDACIÓN
  if (!cliente.nombre || !cliente.dni || !cliente.celular) {
    alert("Debe completar nombre, DNI y celular");

    // ❌ CANCELA EL SUBMIT DEL BRICK
    throw new Error("Datos del comprador incompletos");
    // o: return Promise.reject("Datos incompletos");
  }

  // ✅ CONTINÚA SOLO SI TODO ESTÁ OK
  const res = await fetch(
    "https://crearPago-xhlrljateq-uc.a.run.app",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentData: data,
        cliente,
        compra:arrayPedido,
        precio: totalPagarNumber
      })
    }
  );

  const result = await res.json();
  console.log("🎯 RESPUESTA BACKEND:", result);

  mostrarResultado(result);



},

      onError: (error) => {
        console.error("❌ Error Brick:", error);
      }
    }
  });

  }
  

  // --------------------------------------------------
  // RENDER RESULTADO
  // --------------------------------------------------
function mostrarResultado(result) {
  const cont = document.getElementById("resultadoPago");

  // TARJETA
  if (result.tipo === "tarjeta") {
    cont.innerHTML = `
      <div class="resultado-card aprobado">
        <h3>✅ Pago con tarjeta</h3>
        <p class="estado">Estado: <b>${result.status}</b></p>
        <p class="id">ID: ${result.payment_id}</p>
      </div>
    `;
    return;
  }

  // TICKET (PagoFacil / Rapipago)
  if (result.ticket_url) {
    cont.innerHTML = `
      <div class="resultado-card pendiente">
        <h3>🧾 Pago pendiente</h3>
        <p class="estado">Descarga el Comprobante</b></p>

        <a href="${result.ticket_url}" target="_blank" class="btn-cupon">
          Ver cupón de pago
        </a>

        <div class="info-extra">
          <p>Código de barras</p>
          <code>${result.barcode ?? "—"}</code>
        </div>

        <p class="vence">Vence: ${result.expires ?? "—"}</p>
      </div>
    `;
  }
}

  document.getElementById("paymentBrick_container").setAttribute("class", "cardPay")