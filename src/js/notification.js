import React, { Component } from "react";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.instance = React.createRef();
    }

    closeNotification = (event) => {
        event.preventDefault();
        this.instance.current.remove();
    }

	render() {
		return (
            <div className="notifications__pop-up" ref={this.instance}>
                <a href="#" className="close" onClick={this.closeNotification}></a>
                {this.props.value}
            </div>		
		);
	}
}

export default Notification;