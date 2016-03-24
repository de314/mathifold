SubjectList = React.createClass({
	getInitialState() {
	    return { };
	},
	componentWillMount() {
	    let self = this,
	    	cat = this.props.cat;
	    Meteor.call('subjectsByCatId', cat._id, function(error, result) {
	        	if (!!error) {
	        		console.log(error);
	        		toastr.error(error.reason);
	        	} else {
	        		self.setState({
	        			subjects: result
	        		});
	        	}
	        });
	},
	updateMasonryLayout() {
		let $m = $('.subject-tiles-container').masonry({
	    	itemSelector: '.subject-tile-container'
	    });
	    $m.imagesLoaded().progress( function() {
	    	$m.masonry('layout');
	    });
	},
	componentDidMount() {
	    this.updateMasonryLayout();
	},
	componentDidUpdate(prevProps, prevState) {
	    this.updateMasonryLayout();  
	},
	renderSubject(sub) {
		return (
				<div className="col-xs-6 col-md-4 col-lg-3 subject-tile-container" key={ sub._id }>
					<SubjectTile subject={ sub } />
				</div>
			);
	},
	render() {
		let cat = this.props.cat,
			subjects = this.state.subjects;
		if (!cat || !_.isArray(subjects)) {
			return (
					<Loader />
				)
		}
		if (subjects.length === 0) {
			return (
					<div className="empty-subject-list">
						<em className="text-muted">
							This category does not contain any subjects.
						</em>
					</div>
				);
		}
		return (
			<div className="subject-list">
				<div className="subject-tiles-container">
					{ subjects.map(this.renderSubject) }
				</div>
			</div>
		);
	}
});
