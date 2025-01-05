const UUID = "a32de56b-03d7-4fc9-8e6f-05c349670da0";
let name = ""
let to = "Todos"
let status = "Público"

function showChatMessages(response){
    let chat = document.querySelector(".chat")
    chat.innerHTML = ""

    for (let i = 0; i< response.data.length; i++ ){
        console.log(response.data[i])
        if (response.data[i].type == "status"){
        
        let chat = document.querySelector(".chat")
        chat.innerHTML += `
        <div class="comment gray">
                <p>
                <span class="commentData">${response.data[i].time}</span>
                <span class="commentOwner">${response.data[i].from}</span>
                <span class="to">para</span>
                <span class="commentReceiver">Todos :</span>
                <span class="commentBody">${response.data[i].text}</span>
                </p>
            </div>`
        }
        else if (response.data[i].type == "message"){
        
            let chat = document.querySelector(".chat")
            chat.innerHTML += `
            <div class="comment">
                    <p>
                    <span class="commentData">${response.data[i].time}</span>
                    <span class="commentOwner">${response.data[i].from}</span>
                    <span class="to">para</span>
                    <span class="commentReceiver">${response.data[i].to} :</span>
                    <span class="commentBody">${response.data[i].text}</span>
                    </p>
                </div>`
            }
            else if (response.data[i].type == "private_message"){
                if (response.data[i].from == name || response.data[i].to == name){
        
                let chat = document.querySelector(".chat")
                chat.innerHTML += `
                <div class="comment red">
                        <p>
                        <span class="commentData">${response.data[i].time}</span>
                        <span class="commentOwner">${response.data[i].from}</span>
                        <span class="to">para</span>
                        <span class="commentReceiver">${response.data[i].to} :</span>
                        <span class="commentBody">${response.data[i].text}</span>
                        </p>
                    </div>`
                }}
    }
    
    
}

function showMessages () {
    const promice = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`);
    promice.then(showChatMessages)
    console.log("chamei")
    
    
    

}

function joinChat(){
    
    if (name == ""){ 
        name = prompt("Qual o seu nome?")
        nameObject = {name : `${name}`}}
        
    

    const joinedChat = () => {
        setInterval(showMessages,3000)
        
        setInterval(() => {
            axios.post(`https://mock-api.driven.com.br/api/v6/uol/status/${UUID}`,  nameObject )
              .then(response => console.log("Status enviado com sucesso!"))
              .catch(error => console.error("Erro ao enviar status:", error));
          }, 4000);

          

        
    } 

    function reloadPage(){
        alert("Esse nome já foi usado ou não é valido, por favor insira outro nome");
        window.location.reload()
    }

    const promice = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`,nameObject);
    promice.then(joinedChat)
    promice.catch(reloadPage)



}

function sendComment () {
    let textElement = document.querySelector(".commentText"); // Seleciona o elemento input
    let text = textElement.value; // Pega o valor digitado
    if (status == "Público"){
        console.log(status)
        newText = {
            from: name,
            to: to,
            text: text,
            type: "message"
        }
;} else{
    console.log(status)
    newText = {
        from: name,
        to: to,
        text: text,
        type: "private_message"
    }

}


let promice = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`, newText);
promice.then((response) => {
    console.log(response);
    textElement.value = ""; 
}).catch((error) => {
    window.location.reload();
});

}



function showParticipants(){
    let listParticipants = document.querySelector(".listContacts");
    listParticipants.innerHTML =
                 `<div class="contact" onclick="chooseTo(this)">
                    <div style="display: flex;">
                    <ion-icon name="people"></ion-icon>
                    <div class="nameContact">Todos</div>
                    </div>
                    <ion-icon class="show contactCheck" name="checkmark-outline" style="color: #28BB25;"></ion-icon>
                </div>`


            function showParticipantsContact(response){
                    console.log(response)
                    if (response.data != null ){
                        for (let i = 0; i < response.data.length; i++){
                            if (response.data[i].name != name){
                
                            listParticipants.innerHTML += `
                            <div class="contact" onclick="chooseTo(this)">
                                    <div style="display: flex;">
                                        <ion-icon name="person-circle"></ion-icon>
                                        <div class="nameContact">${response.data[i].name}</div>
                                    </div>
                                    <ion-icon class="noShow contactCheck" name="checkmark-outline" style="color: #28BB25;"></ion-icon>
                            </div>`}
                    }
                }
                }

    const promice = axios.get(`https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`)
    console.log("participantes")
    promice.then(showParticipantsContact)

    
}

function showSideBar(){
    
    const sideBar = document.querySelector("aside")
    sideBar.classList.add("show")
    const filter = document.querySelector(".filter")
    filter.classList.add("show")
    


    status = "Público"
    to = "Todos"
    
    
    
    
}

function retrieveSideBar() {
    const sideBar = document.querySelector("aside")
    sideBar.classList.remove("show")
    const filter = document.querySelector(".filter")
    filter.classList.remove("show")

}

function atualizarCommentStatus() {
    let htmlStatus = document.querySelector(".commentStatus")
    htmlStatus.innerHTML = `Enviando para ${to} (${status})`
}

function chooseTo(participant){
    let contactName = participant.querySelector(".nameContact")
    to = contactName.innerHTML
    console.log(to)
    
    atualizarCommentStatus()
    let contacts = document.querySelectorAll(".contactCheck")
    
    
    for (let i = 0; i<contacts.length; i++){
        let parent = contacts[i].parentNode
        let nameContact = parent.querySelector(".nameContact")
        nameContact = nameContact.innerHTML

        if(nameContact == to){
        contacts[i].classList.remove("noShow")
        
        }
        else{
        contacts[i].classList.add("noShow")
        }
    }
    
    

}

function chooseStatus(statusChosen){
    let statusName = statusChosen.querySelector(".nameContact")
    status = statusName.innerHTML
    console.log(status)

    atualizarCommentStatus()
    let allStatus = document.querySelectorAll(".statusCheck")

    
    for (let i = 0; i<allStatus.length; i++){
        let parent = allStatus[i].parentNode
        let nameContact = parent.querySelector(".nameContact")
        nameContact = nameContact.innerHTML

        if(nameContact == status){
            allStatus[i].classList.remove("noShow")
        
        }
        else{
            allStatus[i].classList.add("noShow")
        }
    }


}

setInterval(() => {
    window.scrollTo({
      top: document.body.scrollHeight, 
      behavior: 'smooth' 
    });
  }, 3000);

setInterval(showParticipants,10000)


joinChat()
