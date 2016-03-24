Breadcrumbs = React.createClass({
	propTypes: {
		cat: React.PropTypes.object,
		catId: React.PropTypes.string,
	    sub: React.PropTypes.object,
	    subId: React.PropTypes.string,
	    topic: React.PropTypes.object,
	    topicId: React.PropTypes.string,
	    lesson: React.PropTypes.object,
	    lessonId: React.PropTypes.string
	},
	getInitialState() {
	    return {
	        b: []
	    };
	},
	componentWillMount() {
		let params = {
				catId: this.props.catId,
				subId: this.props.subId,
				topId: this.props.topicId,
				lessId: this.props.lessonId
			},
			{ cat: cat,
				sub: sub,
				topic: topic,
				lesson: lesson
			} = this.props;
		if (!!lesson) {
			_.extend(params, {
				catId: lesson.categoryId,
				subId: lesson.subjectId,
				topId: lesson.topicId,
				lessId: lesson._id
			});
		} else if (!!topic) {
			_.extend(params, {
				catId: topic.categoryId,
				subId: topic.subjectId,
				topId: topic._id
			});
		} else if (!!sub) {
			_.extend(params, {
				catId: sub.categoryId,
				subId: sub._id
			});
		} else if (!!this.props.cat) {
			_.extend(params, {
				catId: cat._id
			});
		}
	    let self = this;
	    if (!_.isEmpty(params)) {
	    	Meteor.call('breadcrumbs', params, function(error, result) {
	    		if (!!error) {
	    			console.log(error);
	    			toastr.error(error.reason);
	    		} else {
	    			self.setState({
	    				b: result
	    			});
	    		}
	    	});
	    }
	},
	renderCrumb(c) {
		return <li key={ c.title }><a href={ c.url }>{ c.title }</a></li>
	},
	render() {
		let b = this.state.b;
		return (
			<div className="breadcrumbs-list">
				<ol className="breadcrumb">
					{ b.map(this.renderCrumb) }
				</ol>
			</div>
		);
	}
});

_.extend(Breadcrumbs, {
	forIds(catId, subId, topicId, lessonId) {
		return <Breadcrumbs catId={ catId } subId={ subId } topicId={ topicId } lessonId={ lessonId } />;
	},
	forCat(cat) {
		return <Breadcrumbs cat={ cat } />;
	},
	forSub(sub) {
		return <Breadcrumbs sub={ sub } />;
	},
	forTopic(top) {
		return <Breadcrumbs topic={ top } />;
	},
	forLesson(less) {
		return <Breadcrumbs lesson={ less } />;
	}
});
