ContentPolicies = {
	canCreateCategory(userId = Meteor.userId()) {
		return !!userId;
	},
	canEditCategory(catId, userId = Meteor.userId()) {
		return !!catId && !!userId;
	},


	canCreateSubject(userId = Meteor.userId()) {
		return !!userId;
	},
	canEditSubject(subId, userId = Meteor.userId()) {
		return !!subId && !!userId;
	},


	canCreateTopic(userId = Meteor.userId()) {
		return !!userId;
	},
	canEditTopic(topicId, userId = Meteor.userId()) {
		return !!topicId && !!userId;
	},


	canCreateLesson(userId = Meteor.userId()) {
		return !!userId;
	},
	canEditLesson(lessonId, userId = Meteor.userId()) {
		return !!lessonId && !!userId;
	}
}