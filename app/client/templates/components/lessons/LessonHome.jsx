LessonHome = React.createClass({
	propTypes: {
	    lessId: React.PropTypes.string.isRequired
	},
	getInitialState() {
	    return { };
	},
	componentWillMount() {
		let self = this;
		Meteor.call('lessonById', this.props.lessId, function(error, result) {
			if (!!error) {
				console.log(error);
				toastr.error(error.reason);
			} else {
				self.setState({
					less: result
				});
			}
		});
	},
	render() {
		let less = this.state.less;
		if (!less) {
			return <Loader />;
		}
		let manageEle = '';
		if (ContentPolicies.canEditLesson(less._id)) {
			manageEle = (
					<div className="lesson-manage"> 
						<a href={ Urls.lessons.lesson.edit.url(less.categoryId, less.subjectId, less.topicId, less._id) } className="btn btn-primary"><i className="fa fa-pencil"></i> Edit</a>
					</div>
				);
		}
		return (
			<div className="lesson-home">
				<div className="breadcrumbs-row">
					{ Breadcrumbs.forLesson(less) }
				</div>
				{ manageEle }
				<LessonInfo less={ less } />
				<div className="less-content">
					<div className="panel panel-default">
						<div className="panel-body">
							<Html content={ less.content } />
						</div>
					</div>
				</div>
			</div>
		);
	}
});
