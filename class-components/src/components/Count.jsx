import { Component } from "react";

export default class Count extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
                <div>{this.props.count}</div>
            </>
        )
    }
}