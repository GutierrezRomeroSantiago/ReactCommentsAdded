import React, {Component} from "react";

export class ChatPage extends Component{

    constructor(){
        super();
        this.state = {
            message: "",
            messages: [
                {id: 0, text: "Hola"},
                {id: 1, text: "Hola"},
                {id: 2, text: "Hola"},
            ]
        }    
    }

    updateMessage(e){
        this.setState({
            message: e.target.value
        })
        console.log(this.state.message)
    }

    handleSubmit(e){
        console.log(this.state.message)
    }

    render(){

            const {messages} = this.state;
            const allmessages = messages.map(message => {
                return <li key={message.id}>{message.text}</li>
            })

        return(
            <div>
                {
                    allmessages
                }
                <form onSubmit={this.handleSubmit()}>
                    <input onChange={this.updateMessage()} type="text" placeholder="Escribe un mensaje" value="hola" />
                </form>
            </div>
        )
    }
}
