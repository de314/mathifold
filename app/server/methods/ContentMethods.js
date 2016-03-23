Meteor.methods({
	categories() {
		return Categories.find().fetch();
	},
	categoryBySlug(slug) {
		return Categories.findOne({ slug: slug });
	},


	subjectsByCatId(catId) {
		return Subjects.find({ categoryId: catId }).fetch();
	},
	subjectBySlug(slug) {
		return Subjects.findOne({ slug: slug });
	},


	topicsByCatId(catId) {
		return Topics.find({ categoryId: catId }).fetch();
	},
	topicsBySubId(subId) {
		return Topics.find({ subjectId: subId }).fetch();
	},
	topicBySlug(slug) {
		return Topics.findOne({ slug: slug });
	}
});
