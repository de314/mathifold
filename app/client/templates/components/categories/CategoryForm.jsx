CategoryForm = React.createClass({
	handleSubmit(e) {
		e.preventDefault();
		let cat = {
			title: e.target.title.value,
			description: e.target.desc.value,
			slug: e.target.slug.value,
			img: '/images/ph.png'
		};
		Meteor.call('categoryCreate', cat, function(error, result) {
			if (!!error) {
				console.log(error);
				toastr.error(error.reason);
			} else {
				toastr.success('Category Created Successfully');
				setTimeout(function() {
					FlowRouter.go(Urls.categories.category.url(result.slug));
				}, 1750);
			}
		});
		
	},
	render() {
		return (
			<div className="col-xs-8 col-xs-offset-2">
				<form className="category-form" onSubmit={ this.handleSubmit }>
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input type="text" className="cat-title form-control" name="title" placeholder="Category Title" />
					</div>
					<div className="form-group">
						<label htmlFor="desc">Description</label>
						<textarea rows="10" className="cat-desc form-control" name="desc" placeholder="Category Description"></textarea>
					</div>
					<div className="form-group">
						<label htmlFor="slug">Url Slug</label>
						<input type="text" className="cat-slug form-control" name="slug" placeholder="Url Slug e.g. /geometry" />
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		);
	}
});
