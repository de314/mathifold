Meteor.methods({
	breadcrumbs(params) {
		let b = [ { title: 'Home', url: Urls.home.url() } ];
		if (!!params.catId) {
			let temp = Categories.findOne(params.catId, { fields: { title: 1 }});
			if (!!temp) {
				b.push({
					title: temp.title,
					url: Urls.categories.category.url(temp._id)
				});
			}
		}
		if (!!params.subId) {
			let temp = Subjects.findOne(params.subId, { fields: { title: 1 }});
			if (!!temp) {
				b.push({
					title: temp.title,
					url: Urls.subjects.subject.url(temp._id)
				});
			}
		}
		if (!!params.topId) {
			let temp = Topics.findOne(params.topId, { fields: { title: 1 }});
			if (!!temp) {
				b.push({
					title: temp.title,
					url: Urls.topics.topic.url(temp._id)
				});
			}
		}
		// if (!!params.lessId) {
		// 	ctx.cat = Categories.findOne(catId, { fields: { title: 1 }});
		// }
		return b;
	},


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



	subjectTitles(catId) {
		if (!!catId) {
			return Subjects.find({ categoryId: catId }, { fields: { title: 1}}).fetch();
		}
		return Subjects.find({}, { fields: { title: 1}}).fetch();
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
	topicById(id) {
		return Topics.findOne(id);
	},
	topicPublish(topic) {
		let id;
		if (!!topic._id) {
			id = topic._id;
			if (!ContentPolicies.canEditTopic(id)) {
				throw new Meteor.Error(403, 'Insufficient Priviledges');
			}
			Topics.update(id, { $set: topic });
		} else {
			if (!ContentPolicies.canCreateTopic()) {
				throw new Meteor.Error(403, 'Insufficient Priviledges');
			}
			id = Topics.insert(topic);
		}
		if (!id) {
			throw new Meteor.Error(500, 'An unexpected error occured.');	
		}
		return Topics.findOne(id);
	}
});
