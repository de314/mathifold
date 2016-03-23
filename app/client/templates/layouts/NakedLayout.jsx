NakedLayout = React.createClass({
	render() {
		return (
			<div className="app-container">
				<div>
					{ this.props.header }
				</div>
				<div>
					{ this.props.content }
				</div>
			</div>
		);
	}
});