Meteor.publishCounter = function(params) {
	let count = 0,
		init = true,
		pub = params.handle,
		collection = params.collection,
    countId = params.id,
    name = params.name;

	// observeChanges only returns after the initial `added` callbacks
	// have run. Until then, we don't want to send a lot of
	// `self.changed()` messages - hence tracking the
	// `initializing` state.
	var handle = collection.find(params.filter, params.options).observeChanges({
			added(id) {
				count++;
				if (!init) {
					pub.changed(name, countId, {count: count});
				}
			},
			removed(id) {
				count--;
				pub.changed(name, countId, {count: count});
			}
		});
	// Instead, we'll send one `self.added()` message right after
	// observeChanges has returned, and mark the subscription as
	// ready.
	init = false;
	pub.added(name, countId, {count: count});
	pub.ready();

	// Stop observing the cursor when client unsubs.
	// Stopping a subscription automatically takes
	// care of sending the client any removed messages.
	pub.onStop(function () {
		handle.stop();
	});
};

StatHelpers = {
	syncContentCounts() {
		console.log('sync-ing counts...');
		let cats = Categories.find({}, { fields: { _id: 1 }}).fetch().map((cat) => { return cat._id }),
			subs = Subjects.find({}, { fields: { _id: 1 }}).fetch().map((sub) => { return sub._id }),
			tops = Topics.find({}, { fields: { _id: 1 }}).fetch().map((top) => { return top._id });
		_.each(cats, StatHelpers.syncCategory);
		_.each(subs, StatHelpers.syncSubject);
		_.each(tops, StatHelpers.syncTopic);
	},
	syncCategory(catId) {
		Categories.update(catId, { $set: {
			subjectsCount: Subjects.find({ categoryId: catId }).count(),
			topicsCount: Topics.find({ categoryId: catId }).count(),
			lessonsCount: Lessons.find({ categoryId: catId }).count()
		}});
	},
	syncSubject(subId) {
		Subjects.update(subId, { $set: {
			topicsCount: Topics.find({ subjectId: subId }).count(),
			lessonsCount: Lessons.find({ subjectId: subId }).count()
		}});
	},
	syncTopic(topId) {
		Topics.update(topId, { $set: {
			lessonsCount: Lessons.find({ topicId: topId }).count()
		}});
	},
	syncForSubject(sub) {
		StatHelpers.syncCategory(sub.categoryId);
	},
	syncForTopic(top) {
		StatHelpers.syncCategory(top.categoryId);
		StatHelpers.syncSubject(top.subjectId);
	},
	syncForLesson(less) {
		StatHelpers.syncCategory(less.categoryId);
		StatHelpers.syncSubject(less.subjectId);
		StatHelpers.syncTopic(less.topicId);
	}
};

Meteor.startup(() => {
	Migrations.add({
		version: 1,
		up() {
			Categories.update({}, { $unset: { slug: "" }}, { multi: true });
			Subjects.update({}, { $unset: { slug: "" }}, { multi: true });
			Topics.update({}, { $unset: { slug: "" }}, { multi: true });
		}
	});

	Migrations.migrateTo('latest');

	StatHelpers.syncContentCounts();

	Meteor.setInterval(StatHelpers.syncContentCounts, 30 * 60 * 1000);
});
