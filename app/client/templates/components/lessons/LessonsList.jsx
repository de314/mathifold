LessonsList = React.createClass({
	propTypes: {
	    topId: React.PropTypes.string
	},
	getInitialState() {
	    return { };
	},
	componentWillMount() {
	    let self = this,
	    	topId = this.props.topId;
	    Meteor.call('lessonsByTopId', topId, function(error, result) {
	    	if (!!error) {
	    		console.log(error);
	    		toastr.error(error.reason);
	    	} else {
	    		self.setState({
	    			lessons: result
	    		});
	    	}
	    });
	},
	renderLesson(less) {
		return (
				<div className="lesson-info-container panel panel-default" key={ less._id }>
					<LessonInfo less={ less } linked={ true } />
				</div>
			);
	},
	render() {
		let lessons = this.state.lessons;
		if (!_.isArray(lessons)) {
			return <Loader />;
		}
		return (
			<div className="lessons-list">
				{ lessons.map(this.renderLesson) }
			</div>
		);
	}
});
