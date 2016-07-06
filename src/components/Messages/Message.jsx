import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Message extends Component{
	render(){
		const {message} = this.props;
		var formattedTime = this.formatTime(message.timeStamp);
		return(
			<div className="message">
				<strong>{message.user}</strong> {formattedTime} - {message.text}
			</div>
		)
	}

	formatTime(timestamp){
		var dt = new Date(timestamp * 1000);

		var hours = dt.getHours();
		var minutes = dt.getMinutes();
		var seconds = dt.getSeconds();

		if(hours < 10){
			hours = '0' + hours;
		}

		if(minutes < 10){
			minutes = '0' + minutes;
		}

		if(seconds < 10){
			seconds = '0' + seconds;
		}

		return hours+":"+minutes+":"+seconds
	}
}

export default Message