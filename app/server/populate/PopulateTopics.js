Meteor.startup(() => {
	if (Topics.find().count() === 0) {
		let geoCat = Categories.findOne({ slug: 'geo' }),
			geoclaSub = Subjects.findOne({ slug: 'geocla' }),
			defualtTopics = [
				{
					categoryId: geoCat._id,
					subjectId: geoclaSub._id,
					title: 'Triangles',
					img: '/images/ph.png',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'triangles'
				}, {
					categoryId: geoCat._id,
					subjectId: geoclaSub._id,
					title: 'Circles',
					img: '/images/ph.png',
					description: 'This is what I am talking about. A general subject in mathematics.',
					slug: 'circles'
				}
			];
		_.each(defualtTopics, function(t) {
			Topics.insert(t);
		});
	}
});