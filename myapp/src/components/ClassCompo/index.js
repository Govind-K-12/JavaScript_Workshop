import (Component) from react;

class Home extends Component{
    state = {username:"somesh",age:26}
    render(){
        const{udername, age} = this.state
        return(
            <div>
                <h1>(username)</h1>
            </div>
        )
    }
}