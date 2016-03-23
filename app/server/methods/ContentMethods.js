Meteor.methods({
	categories() {
		return Categories.find().fetch();
	},
	categoryTitles() {
		return Categories.find({}, { fields: { title: 1}}).fetch();
	},
	categoryBySlug(slug) {
		return Categories.findOne({ slug: slug });
	},
	categoryById(id) {
		return Categories.findOne({ _id: id });
	},
	categoryPublish(cat) {
		let id;
		if (!!cat._id) {
			id = cat._id;
			if (!ContentPolicies.canEditCategory(id)) {
				throw new Meteor.Error(403, 'Insufficient Priviledges');
			}
			Categories.update(id, { $set: cat });
		} else {
			if (!ContentPolicies.canCreateCategory()) {
				throw new Meteor.Error(403, 'Insufficient Priviledges');
			}
			id = Categories.insert(cat);
		}
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
	subjectById(subId) {
		return Subjects.findOne(subId);
	},
	subjectPublish(sub) {
		let id;
		if (!!sub._id) {
			id = sub._id;
			if (!ContentPolicies.canEditSubject(id)) {
				throw new Meteor.Error(403, 'Insufficient Priviledges');
			}
			Subjects.update(id, { $set: sub });
		} else {
			if (!ContentPolicies.canCreateSubject()) {
				throw new Meteor.Error(403, 'Insufficient Priviledges');
			}
			id = Subjects.insert(sub);
		}
		if (!id) {
			throw new Meteor.Error(500, 'An unexpected error occured.');	
		}
		return Subjects.findOne(id);
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
