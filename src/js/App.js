import React, { Component } from "react";
import ReactDOM from "react-dom";
import Notification from "../js/notification";
import '../styles/main.scss';


class App extends Component {
	constructor(props) {
		super(props);
		this.imageRef = React.createRef();
		this.buttonRef = React.createRef();
		this.hashOutput = React.createRef();
		this.notifications = React.createRef();

		this.state = {
			image: null,
			hash: null,
			account: null
		};
	}

  captureFile = (event) => {
		event.preventDefault();
		let target = event.target,
			files = target.files;

		if (FileReader && files && files.length) {
			let fileReader = new FileReader();
			fileReader.onload = () => {
				let image = this.imageRef.current;
				image.src = fileReader.result;

				fileReader.readAsArrayBuffer(files[0]);
				fileReader.onload = () => {
					this.buttonRef.current.style.display = "block";
					console.log(fileReader.result)
					this.setState({
						image: fileReader.result,
						hash: null
					});
				}
			}
			fileReader.readAsDataURL(files[0]);
    	}
  	}

	submitFile = (event) => {
		event.preventDefault()
	
		let binary = '';
		let bytes = new Uint8Array(this.state.image);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode( bytes[ i ] );
		}

		fetch('http://okto.pw:8080/image', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				image: window.btoa(binary),
			}),
		}).then(response => {
			return response.json();
		}).then(body => {
			console.log(body.text);
			this.hashOutput.current.innerHTML = body.text;
			this.setState({
				image: this.state.image,
				hash: body.text
			});
			this.hashOutput.current.style.display = "block";
			this.buttonRef.current.style.display = "none";
		});

		console.log(window.btoa(binary));
	}

	createNotification(title) {
		const element = <Notification value={title}/>;
		ReactDOM.render(element, this.notifications.current);
	}

	render() {
		return (
		<div className="main-container">
			<div className="form-holder">
				<div className="project-name">
					Konami App
				</div>
				<div className="form-holder__image-wrapper">
					<img className="form-holder__image" ref={this.imageRef} src="https://pro-spo.ru/images/stories/2014/elitefon.ru-38277.jpg"></img>
				</div>
				<div className="form-holder__buttons-wrapper">
					<label htmlFor="file-upload" className="form-holder__label">
						Загрузить
					</label>
					<input id="file-upload" type="file" className="form-holder__button" onChange={this.captureFile}/>
					<button className="form-holder__submit-button" ref={this.buttonRef} onClick={this.submitFile}>
						Обработать
					</button>
				</div>
				<div className="form-holder__hash-output" ref={this.hashOutput}></div>
			</div>
			<div className="notifications" ref={this.notifications}>
			</div>
		</div>
		);
	}
}

export default App;
