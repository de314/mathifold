SubjectHome = React.createClass({
	getInitialState() {
	    return { };
	},
	componentWillMount() {
	    let self = this;
	    Meteor.call('subjectBySlug', this.props.slug, function(error, result) {
	    	if (!!error) {
	    		console.log(error);
	    		toastr.error(error.reason);
	    	} else {
	    		self.setState({
	    			sub: result
	    		});
	    	}
	    });
	},
	render() {
		let sub = this.state.sub;
		if (!sub) {
			return <Loader />;
		}
		return (
			<div className="subject-home">
				<div className="sub-info">
					<h1>
						<img src={ sub.img } className="img-rounded" />
						{ sub.title }
					</h1>
				</div>
				<div className="subject-list-container">
					<TopicsList sub={ sub } />
				</div>
			</div>
		);
	}
});
