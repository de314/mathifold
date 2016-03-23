Meteor.methods({
	categories() {
		return Categories.find().fetch();
	},
	categoryBySlug(slug) {
		return Categories.findOne({ slug: slug });
	},


	subjectsByCatId(catId) {
		return Subjects.find({ categoryId: catId }).fetch();
	}
});
