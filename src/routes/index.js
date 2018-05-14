import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getblockdata } from '../actions/block';
import { addresult } from '../actions/result';
import { clearresult } from '../actions/result';
import _ from 'lodash';
import Block from '../components/Block';
import Result from '../components/Result';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockdata1: [],
            blockdata2: [],
            ch1: 0,
            ch2: 0,
            isloading: true,
            st: false
        }
        this.reset = this.reset.bind(this);
        this.start = this.start.bind(this);
    }


    componentWillMount = () => {
        this.props.getdata();
    }

    componentWillReceiveProps = (nextProps) => {
        if ((nextProps.blockdata.length !== this.state.blockdata1.length) || (!_.isEqual(nextProps.blockdata, this.state.blockdata1))) {
            this.setState({ blockdata1: nextProps.blockdata, blockdata2: nextProps.blockdata, ch1: Math.floor(Math.random() * nextProps.blockdata.length), ch2: Math.floor(Math.random() * nextProps.blockdata.length), isloading: false });
        }
    }
    loading() {
        if (this.state.isloading) {
            return (
                <div>
                    轉圈圈中
                </div>
            );
        } else {
            return (
                <div>
                    <div style={{ float: 'left' }}>
                        <Block data={this.state.blockdata1[this.state.ch1]} />
                    </div>
                    <div style={{ float: 'left' }}>
                        {this.ans()}
                    </div>
                    <div style={{ float: 'left' }}>
                        <Block data={this.state.blockdata2[this.state.ch2]} />
                    </div>
                    <button style={{ marginTop: '50px' }} onClick={this.reset}>Reset</button>
                    <button style={{ marginLeft: '10px' }} onClick={this.start}>Start</button>
                </div>
            );
        }
    }
    reset() {
        this.setState({ ch1: Math.floor(Math.random() * this.state.blockdata1.length), ch2: Math.floor(Math.random() * this.state.blockdata1.length), blockdata1: this.props.blockdata, blockdata2: this.props.blockdata });
        this.props.clearresult();
    }
    start() {
        this.setState({ st: 'true' });
        let i = [true, false];
        let who = i[Math.floor(Math.random() * 2)];
        let x1 = Object.assign({}, this.state.blockdata1[this.state.ch1]);
        let x2 = Object.assign({}, this.state.blockdata2[this.state.ch2]);
        let x1value = Object.values(x1);
        let x2value = Object.values(x2);
        while (true) {
            let sk = Math.floor(Math.random() * 3) + 1;
            if (who) {
                this.props.addresult([`${x1.name} 用 ${x1value[sk + 1].name} 對 ${x2.name} 造成了 ${x1value[sk + 1].damage}的傷害`]);
                console.log(1);
                if ((x2.health - x1value[sk + 1].damage) <= 0) {
                    x2.health = 0;
                    let temp = Object.assign({}, this.state.blockdata2);
                    temp[this.state.ch2] = x2;
                    this.setState({ blockdata2: temp });

                    break;
                } else {
                    x2.health = x2.health - x1value[sk + 1].damage;
                }
                let temp = Object.assign({}, this.state.blockdata2);
                temp[this.state.ch2] = x2;
                this.setState({ blockdata2: temp });
            } else {
                console.log(2);
                this.props.addresult([`${x2.name} 用 ${x2value[sk + 1].name} 對 ${x1.name} 造成了 ${x2value[sk + 1].damage}的傷害`]);
                if ((x1.health - x2value[sk + 1].damage) <= 0) {
                    x1.health = 0;
                    let temp = Object.assign({}, this.state.blockdata1);
                    temp[this.state.ch1] = x1;
                    this.setState({ blockdata1: temp });
                    break;
                } else {
                    x1.health = x1.health - x2value[sk + 1].damage;
                }
                let temp = Object.assign({}, this.state.blockdata1);
                temp[this.state.ch1] = x1;
                this.setState({ blockdata1: temp });
            }
            who = !who;
        }

    }
    ans() {
        if (this.props.result.length === 0) {
            return (
                <div>
                    <Result data='尚未開始對戰' />
                </div>
            );
        } else {
            return (
                <div>
                    {
                        
                        console.log(this.props.result)
                    }
                    {
                        _.map(this.props.result, (value, index) => (
                            <Result key={index} data={value} />
                    ))
                }
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                {this.loading()}
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        blockdata: state.blockdata,
        result: state.result
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getdata: () => {
            dispatch(getblockdata())
        },
        addresult: (data) => {
            dispatch(addresult(data))
        },
        clearresult: () => {
            dispatch(clearresult());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index);