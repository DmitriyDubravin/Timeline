import React, {Component} from 'react';

export default class MenuSwitch extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
        this.detectMouse();
    }
    detectMouse() {
        let detectingField = window.innerHeight / 4;
        window.addEventListener('mousemove', e => {
            if (e.clientY < detectingField) {
                if (!this.state.show) {
                    this.setState({show: !this.state.show});
                }
            } else {
                if (this.state.show) {
                    this.setState({show: !this.state.show});
                }
            }
        })
    }
    render() {
        let cls = 'menu-switch';
        cls += this.state.show ? ' shown' : '';
        return (
            <div className={cls}><span></span></div>
        )
    }
}