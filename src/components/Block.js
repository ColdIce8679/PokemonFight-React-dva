import React, { Component } from 'react'

class Block extends Component {
    render(){
        return(
            <div style={{width: '300px', height: '65    0px',padding: '0 15px 0 15px',border:'5px solid',margin: '50px' }}>
                <img src={this.props.data.img} style={{width: '200px',margin:'0 37px 0 37px'}} alt=""/>
                <h1 style={{textAlign:'center'}}>{this.props.data.name}</h1>
                <hr/>
                <h5>Health</h5>
                <p style={{marginLeft: '20px'}}>剩餘：{this.props.data.health}</p>
                <h5>First Skill</h5>
                <p style={{marginLeft: '20px'}}>名稱：{this.props.data.skill1.name}</p>
                <p style={{marginLeft: '20px'}}>傷害：{this.props.data.skill1.damage}</p>
                <h5>Second Skill</h5>
                <p style={{marginLeft: '20px'}}>名稱：{this.props.data.skill2.name}</p>
                <p style={{marginLeft: '20px'}}>傷害：{this.props.data.skill2.damage}</p>
                <h5>Third Skill</h5>
                <p style={{marginLeft: '20px'}}>名稱：{this.props.data.skill3.name}</p>
                <p style={{marginLeft: '20px'}}>傷害：{this.props.data.skill3.damage}</p>
            </div>
        );
    };
}

export default Block;