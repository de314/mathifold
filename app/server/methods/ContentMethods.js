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
		if (!!params.lessId) {
			let temp = Lessons.findOne(params.lessId, { fields: { title: 1 }});
			if (!!temp) {
				b.push({
					title: temp.title,
					url: Urls.lessons.lesson.url(temp._id)
				});
			}
		}
		return b;
	},


	categories() {
		return Categories.find({}, { sort: Categories.defaultSort }).fetch();
	},
	categoryTitles() {
		return Categories.find({}, { fields: { title: 1}, sort: { title: 1 }}).fetch();
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
			return Subjects.find({ categoryId: catId }, { fields: { title: 1}, sort: { title: 1 }}).fetch();
		}
		return Subjects.find({}, { fields: { title: 1}, sort: { title: 1 }}).fetch();
	},
	subjectsByCatId(catId) {
		return Subjects.find({ categoryId: catId }, { sort: Subjects.defaultSort }).fetch();
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
		let val = Subjects.findOne(id);
		Meteor.defer(() => { StatHelpers.syncForSubject(val); });
		return val;
	},



	topicTitles(subId) {
		return Topics.find({ subjectId: subId }, { fields: { title: 1}, sort: { title: 1 }}).fetch();
	},
	topicsByCatId(catId) {
		return Topics.find({ categoryId: catId }, { sort: { countLessons: -1 }}).fetch();
	},
	topicsBySubId(subId) {
		return Topics.find({ subjectId: subId }, { sort: { countLessons: -1 }}).fetch();
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
		let val = Topics.findOne(id);
		Meteor.defer(() => { StatHelpers.syncForTopic(val); });
		return val;
	},



	lessonsByTopId(topId) {
		return Lessons.find({ topicId: topId }, { sort: { createdAt: -1 }}).fetch();
	},
	lessonById(lessId) {
		return Lessons.findOne(lessId);
	},
	lessonPublish(lesson) {
		let id;
		if (!!lesson._id) {
			id = lesson._id;
			if (!ContentPolicies.canEditLesson(id)) {
				throw new Meteor.Error(403, 'Insufficient Priviledges');
			}
			Lessons.update(id, { $set: lesson });
		} else {
			if (!ContentPolicies.canCreateLesson()) {
				throw new Meteor.Error(403, 'Insufficient Priviledges');
			}
			lesson.createdAt = new Date();
			id = Lessons.insert(lesson);
		}
		if (!id) {
			throw new Meteor.Error(500, 'An unexpected error occured.');	
		}
		let val = Lessons.findOne(id);
		Meteor.defer(() => { StatHelpers.syncForLesson(val); });
		return val;
	}
});
