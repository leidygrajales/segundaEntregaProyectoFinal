// comunicacion del lado del cliente
const socket = io();

// 3. armamos la funcion render
const renderMessages = (data) => {
  const htmlMessages = data.map(({ author: { email, name, lastname, age, username, avatarurl }, message, timestamp }) => {
    return (`
      <tr>
        <td scope="row">
          <img class="rounded-circle" style="width: 30px;" src="${avatarurl}"/>
        </td>
        <td scope="row">${email}</td>
        <td scope="row">${name}</td>
        <td scope="row">${lastname}</td>
        <td scope="row">${age}</td>
        <td scope="row">${username}</td>
        <td scope="row">${message}</td>
        <td scope="row">${new Date(timestamp).toLocaleString()}</td>
      </tr>
    `)
  }).join(' ')

  document.getElementById('message-list').innerHTML = htmlMessages
}

const alertMsj = (data) => {
  console.log('alertMsj data', data);
  // renderizamos la data en el div de la plantilla HTML
  document.getElementById('toastmsg').insertAdjacentHTML('beforeend', `
            <div id="newMessageToast${data.length}" name="newMessageToast${data.length}" class="toast bottom-0 end-0 text-bg-primary border-0"
              role="alert"
              aria-live="assertive"
              aria-atomic="true">
              <div class="d-flex">
                <div class="toast-body">
                  Nuevo mensaje de:  ${data[data.length - 1].author.name}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
              </div>
            </div>
            `)

  new bootstrap.Toast($(`#newMessageToast${data.length}`), {
    animation: true,
    autohide: true,
    delay: 2000
  }).show()
}

//4.  funcion que se ejecuta cuando doy al btn enviar
const addMessage = () => {
  const authorEmail = document.getElementById('authorEmail').value
  const authorName = document.getElementById('authorName').value
  const authorLastName = document.getElementById('authorLastName').value
  const authorAvatar = document.getElementById('authorAvatar').value
  const authorAge = document.getElementById('authorAge').value
  const authorUserName = document.getElementById('authorUserName').value
  const textMsg = document.getElementById('textMsg').value

  // document.getElementById('messageForm').reset();

  const information = {
    author: {
      email: authorEmail,
      name: authorName,
      lastname: authorLastName,
      age: authorAge,
      username: authorUserName,
      avatarurl: authorAvatar
    },
    message: textMsg
  }

  //enviamos la data al server
  socket.emit('new-message', information)
  return false
}

//2.eventos para enviar (emit ) y recibir con (on) mensajes
socket.on('messages', data => {
  const authorSchema = new normalizr.schema.Entity('authors', {}, { idAttribute: "mail" });
  const textSchema = new normalizr.schema.Entity('text');
  const mensajeSchema = new normalizr.schema.Entity('messages', {
    author: authorSchema,
    text: [textSchema]
  });

  const denormalized_data = normalizr.denormalize(data.result, [mensajeSchema], data.entities)

  renderMessages(denormalized_data)

  if (denormalized_data.length > 0) {
    alertMsj(denormalized_data)
  }

  // Guardamos el tamaño de la data y hacemos el porcentaje
  const dataSize = JSON.stringify(data).length
  const denormalizedDataSize = JSON.stringify(denormalized_data).length

  // Logica del porcentaje
  const porcentajeC = parseInt((dataSize * 100) / denormalizedDataSize)

  document.getElementById('compresion-info').innerText = `Centro de mensajes (Compresión: ${porcentajeC}%)`

})