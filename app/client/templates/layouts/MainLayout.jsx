MainLayout = React.createClass({
	render() {
		return (
			<div className="app-container">
				<div className="header-container">
					{ this.props.header }
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xs-12 main-content-container">
							{ this.props.content }
						</div>
					</div>
				</div>
			</div>
		);
	}
});