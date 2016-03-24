TopicHome = React.createClass({
	getInitialState() {
	    return { };
	},
	componentWillMount() {
	    let self = this;
	    Meteor.call('topicById', this.props.topicId, function(error, result) {
	    	if (!!error) {
	    		console.log(error);
	    		toastr.error(error.reason);
	    	} else {
	    		self.setState({
	    			topic: result
	    		});
	    	}
	    });
	},
	render() {
		let topic = this.state.topic;
		if (!topic) {
			return <Loader />;
		}
		let manageEle = '';
		if (ContentPolicies.canCreateTopic()) {
			manageEle = (
					<div className="topic-manage"> 
						<a href={ Urls.topics.topic.edit.url(topic.categoryId, topic.subjectId, topic._id) } className="btn btn-primary"><i className="fa fa-pencil"></i> Edit</a>
					</div>
				);
		}
		return (
			<div className="topic-home">
				<div className="breadcrumbs-container">
					{ Breadcrumbs.forTopic(topic) }
				</div>
				<div className="topic-info">
					<h1>
						<img src={ topic.img } className="img-rounded" />
						{ topic.title }
					</h1>
				</div>
				{ manageEle }
				<div className="subject-list-container">
					<em className="text-muted">Lessons coming soon...</em>
				</div>
			</div>
		);
	}
});
