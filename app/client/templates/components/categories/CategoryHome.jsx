CategoryHome = React.createClass({
	getInitialState() {
	    return { };
	},
	componentWillMount() {
	    let self = this;
	    Meteor.call('categoryBySlug', this.props.slug, function(error, result) {
	    	if (!!error) {
	    		console.log(error);
	    		toastr.error(error.reason);
	    	} else {
	    		self.setState({
	    			cat: result
	    		});
	    	}
	    });
	},
	render() {
		let cat = this.state.cat;
		if (!cat) {
			return <Loader />;
		}
		return (
			<div className="category-home">
				<div className="cat-info">
					<h1>
						<img src={ cat.img } className="img-rounded" />
						{ cat.title }
					</h1>
				</div>
				<div className="subject-list-container">
					<SubjectList cat={ cat } />
				</div>
			</div>
		);
	}
});
