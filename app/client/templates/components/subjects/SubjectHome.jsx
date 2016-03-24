SubjectHome = React.createClass({
	getInitialState() {
	    return { };
	},
	componentWillMount() {
	    let self = this;
	    Meteor.call('subjectById', this.props.subId, function(error, result) {
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
		let manageEle = '';
		if (ContentPolicies.canCreateSubject()) {
			manageEle = (
					<div className="subject-manage"> 
						<a href={ Urls.subjects.subject.edit.url(sub.categoryId, sub._id) } className="btn btn-primary"><i className="fa fa-pencil"></i> Edit</a>
						<a href={ Urls.topics.create.url(sub.categoryId, sub._id) } className="btn btn-primary"><i className="fa fa-plus"></i> New Topic</a>
					</div>
				);
		}
		return (
			<div className="subject-home">
				<div className="breadcrumbs-container">
					{ Breadcrumbs.forSub(sub) }
				</div>
				<div className="sub-info">
					<h1>
						<img src={ sub.img } className="img-rounded" />
						{ sub.title }
					</h1>
				</div>
				{ manageEle }
				<div className="subject-list-container">
					<TopicsList sub={ sub } />
				</div>
			</div>
		);
	}
});
