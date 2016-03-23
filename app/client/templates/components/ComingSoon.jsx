ComingSoon = React.createClass({
	render() {
		let content = this.props.content || "This feature is in development and will be completed soon! See you there!"
		return(
				<div className="jumbotron text-center">
					<h1>Coming Soon</h1>
					<p>{ content }</p>
				</div>
			);
	}
});
