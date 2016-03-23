Categories = new Mongo.Collection('categories');

{
	let ModelSchema = new SimpleSchema({
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
		slug: {
			type: String,
			regEx: /[a-zA-Z]\w+/
		},
		subjectsCount: {
			type: Number,
			defaultValue: 0
		},
		topicsCount: {
			type: Number,
			defaultValue: 0
		},
		lessonsCount: {
			type: Number,
			defaultValue: 0
		}
	});

	Categories.attachSchema(ModelSchema);
}

Categories.allow({
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

Categories.deny({
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
