CategoryHome = React.createClass({
	getInitialState() {
	    return { };
	},
	componentWillMount() {
	    let self = this;
	    Meteor.call('categoryById', this.props.catId, function(error, result) {
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
		let manageEle = '';
		if (ContentPolicies.canCreateCategory()) {
			manageEle = (
					<div className="cat-manage"> 
						<a href={ Urls.categories.category.edit.url(cat._id) } className="btn btn-primary"><i className="fa fa-pencil"></i> Edit</a>
						<a href={ Urls.subjects.create.url(cat._id) } className="btn btn-primary"><i className="fa fa-plus"></i> New Subject</a>
					</div>
				);
		}
		return (
			<div className="category-home">
				<div className="breadcrumbs-container">
					{ Breadcrumbs.forCat(cat) }
				</div>
				<div className="cat-info">
					<h1>
						<img src={ cat.img } className="img-rounded" />
						{ cat.title }
					</h1>
				</div>
				{ manageEle }
				<div className="subject-list-container">
					<SubjectList cat={ cat } />
				</div>
			</div>
		);
	}
});
