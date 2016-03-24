Lessons = new Mongo.Collection('lessons');

{
	let ModelSchema = new SimpleSchema({
		createdAt: {
			type: Date
		},
		categoryId: {
			type: String
		},
		subjectId: {
			type: String
		},
		topicId: {
			type: String
		},
		title: {
			type: String
		},
		img: {
			type: String,
			optional: true
		},
		description: {
			type: String
		},
		content: {
			type: String
		},
		tags: {
			type: [ String ]
		}
	});

	Lessons.attachSchema(ModelSchema);
}

Lessons.allow({
	insert() {
		return false;
	},
	update() {
		return false;
	},
	remove() {
		return false;
	}
});

Lessons.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});
