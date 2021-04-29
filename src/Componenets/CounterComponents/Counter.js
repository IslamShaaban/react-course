import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Switch} from 'antd'
import './Counter.css'

class Counter extends React.Component {
    
    constructor() {
        super()
        this.state = {
            counter: 0,
            username : {
                'id' : 1,
                'jobTitleName' : 'Full Stack Engineer',
                'firstName' : 'islam',
                'lastName' : 'shaaban',
                'preferedFullName' : 'Islam Shaaban',
                'employeeCode'  : 'E1',
                'region'    : 'Eg',
                'phoneNumber':'01280937943',
                'emailAddress':'islamshaaban10@gmail.com'
            }
        }
    }

    counterIncremental=()=>{
        this.setState({
            counter : this.state.counter+1
        })
    }
    counterDecremental=()=>{
        this.setState({
            counter : this.state.counter-1
        })
    }
    render() {
        return(
            <div className='counter-component container col-md-3 position-relative'>
                <div className="Part1">
                <h1>Part 1</h1>
                <div className='ml-5'>{this.state.counter}</div>
                <Button type="primary" className='ml-5' onClick={this.counterIncremental}>Increaser</Button>
                <Button type="ghost" className='ml-5' onClick={this.counterDecremental}>Decreaser</Button>
                <Switch></Switch>
                </div>
                <div className="Part2">
                    <h1>Part 2</h1>
                    { Object.entries(this.state.username).map((t,k) => <li>{t[0]}: {t[1]}</li>) } 
                </div>
            </div>
        )
    }
}

export default Counter