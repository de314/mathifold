Meteor.methods({
	categories() {
		return Categories.find().fetch();
	},
	categoryBySlug(slug) {
		return Categories.findOne({ slug: slug });
	},
	categoryCreate(cat) {
		if (!ContentPolicies.canCreateCategory()) {
			throw new Meteor.Error(403, 'Insufficient Priviledges');
		}
		let id = Categories.insert(cat);
		if (!id) {
			throw new Meteor.Error(500, 'An unexpected error occured.');	
		}
		return Categories.findOne(id);
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
