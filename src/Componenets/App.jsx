import React from "react";
import {Card, CardDeck} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends React.Component{
    constructor(){
        super();
        this.state = {
            items:[
            {
                text:"Home",
                link:"/home"
            },
            {
                text:"About",
                link:"/about"
            },
            {
                text:"Contacts",
                link:"/contacts"
            },
            {
                text:"Login",
                link:"/login"
            },
            {
                text:"Users",
                link:"/users"
            },
        ]
    }
    }

    toggleActive=(text)=>{
        
        this.state.items.forEach((item)=>item.active=false);
        let item = this.state.items.find(x=>x.text===text);
        item.active = !item.active
        this.setState({items:this.state.items});
    }


    render(){
        return <Router>
            <Switch>
                <Route path="/about" >
                    <About />
                </Route>
                <Route path="/contacts" >
                    <Contacts />
                </Route>
                <Route path="/users" >
                    <UserList />
                </Route>
                <Route path="/login" >
                    <Login />
                </Route>
                <Route path="/" >
                    <Home />
                </Route>
            </Switch>
        </Router>
    }
}


class Home extends React.Component{
    render(){
        return <div>Welcome to Home Page</div>;
    }
}

class About extends React.Component{
    render(){
        return <div>Welcome to About Page</div>;
    }
}

class Contacts extends React.Component{
    render(){
        return <div>Contacts</div>;
    }
}


class UserList extends React.Component{

    constructor(){
        super();
        this.state={
            users:[],
            loading:false
        };
    }

    async componentDidMount(){
        this.setState({loading:true});
        setTimeout(async ()=>{

        
        let res= await fetch("https://reqres.in/api/users",{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        });
        let resJson = await res.json();
        this.setState({users:resJson.data,loading: false});
    },5000)
    }

    render(){
        return (
            <CardDeck>
            {!this.state.loading ? this.state.users.map((item)=>{
                return <UserView key={item.id}  user={item} />
            }): "Loading Users"}
            </CardDeck>
        )
    }
}

class Login extends React.Component{
    
    constructor(){
        super();
        this.state={
            email:"",
            password:""
        }
    }

    setInputValue=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    login=async ()=>{
        let user = {
            email:this.state.email,
            password:this.state.password
        }
        let res= await fetch("https://reqres.in/api/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(user)
        });
        let resJson = await res.json();
        if(resJson.token){
            alert("Login success");
        }else{
            alert(resJson.error)
        }
    }

    render(){
        return <div>
            <h1>Login</h1>
            Email:<input type="email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} name="email" /><br/>
            Password:<input type="password" value={this.state.password} onChange={this.setInputValue} name="password" /><br/>
            <button onClick={this.login}>Login</button>
        </div>
    }
}

class UserView extends React.Component{
    render(){
        return <div className="container">
            <div className="row">
            <Card >
                <Card.Img variant="top" src={this.props.user.avatar}  style={{ width: '100px', height : '100px' }} />
                <Card.Body>
                    <Card.Text>{this.props.user.first_name} {this.props.user.last_name}</Card.Text>
                    <Card.Text>{this.props.user.email} </Card.Text>
                </Card.Body>
             </Card>
            </div>
        </div>
    }
}

export default App;