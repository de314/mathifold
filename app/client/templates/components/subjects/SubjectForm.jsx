SubjectForm = React.createClass({
	getInitialState() {
	    return {
	        sub: {},
	        cats: []
	    };
	},
	componentWillMount() {
	    let id = this.props.subId,
	    	self = this;
	    if (!!id) {
	    	Meteor.call('subjectById', id, function(error, result) {
	    		if (!!error) {
	    			console.log(error);
	    			toastr.error(error.reason);
	    		} else {
	    			self.setState({
	    				sub: result
	    			});
	    		}
	    	});
	    }
	    Meteor.call('categoryTitles', function(error, result) {
			if (!!error) {
				console.log(error);
				toastr.error(error.reason);
			} else {
				self.setState({
					cats: result
				});
			}
		});
	},
	handleSubmit(e) {
		e.preventDefault();
		let sub = {
			categoryId: e.target.catId.value,
			title: e.target.title.value,
			description: e.target.desc.value,
			slug: e.target.slug.value,
			img: e.target.img.value
		};
		if (!!this.state.sub) {
			_.extend(this.state.sub, sub);
			sub = this.state.sub;
		}
		Meteor.call('subjectPublish', sub, function(error, result) {
			if (!!error) {
				console.log(error);
				toastr.error(error.reason);
			} else {
				toastr.success('Success! Redirecting in 2s...');
				setTimeout(function() {
					FlowRouter.go(Urls.subjects.subject.url(result.slug));
				}, 1750);
			}
		});
	},
	renderCategoryOption(cat) {
		return <option value={ cat._id } key={ cat._id }>{ cat.title }</option>;
	},
	render() {
		let sub = this.state.sub || {},
			cats = this.state.cats || undefined;
		if ((!!this.props.subId && this.props.subId !== sub._id) || _.isEmpty(this.state.cats)) {
			return <Loader />
		}
		return (
			<div className="subject-form-page">
				<div className="breadcrumbs-container">
					{ Breadcrumbs.forIds(this.props.catId, sub._id) }
				</div>
				<div className="col-xs-8 col-xs-offset-2">
					<form className="subject-form" onSubmit={ this.handleSubmit }>
						<div className="form-group">
							<label htmlFor="catId">Category</label>
							<select name="catId" defaultValue={ this.props.catId } className="form-control">
								{ this.state.cats.map(this.renderCategoryOption) }
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" className="sub-title form-control" name="title" placeholder="Category Title" defaultValue={ sub.title } />
						</div>
						<div className="form-group">
							<label htmlFor="img">Image</label>
							<ImageDataUrlInput className="sub-img" preview='true' square='true' maxWidth='320' maxHeight='320' value={ sub.img } />
						</div>
						<div className="form-group">
							<label htmlFor="desc">Description</label>
							<textarea rows="10" className="sub-desc form-control" name="desc" placeholder="Category Description" defaultValue={ sub.description }></textarea>
						</div>
						<div className="form-group">
							<label htmlFor="slug">Url Slug</label>
							<input type="text" className="sub-slug form-control" name="slug" placeholder="Url Slug e.g. /geometry" defaultValue={ sub.slug } />
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		);
	}
});
