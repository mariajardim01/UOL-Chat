const UUID = "f6c3a6f9-af9d-4197-b69b-9c3bdf2d15a4";
let name = prompt("Qual o seu nome?")
nameObject = {name : `${name}`}

function showChatMessages(response){
    
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
                }
    }
    
    
}

function showMessages () {
    const promice = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`);
    promice.then(showChatMessages)

}

function joinChat(){

    

    const joinedChat = () => {
        showMessages()
        
        setInterval(() => {
            axios.post(`https://mock-api.driven.com.br/api/v6/uol/status/${UUID}`,  nameObject )
              .then(response => console.log("Status enviado com sucesso!"))
              .catch(error => console.error("Erro ao enviar status:", error));
          }, 5000);

          

        
    } 

    const promice = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`,nameObject);
    promice.then(joinedChat)



}

function sendComment () {
    let text = document.querySelector(".commentText").value;
    newText = {
	from: name,
	to: "Todos",
	text: text,
	type: "message"
    }
    let promice = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`, newText)
    promice.then((response)=>console.log(response))

}

joinChat()