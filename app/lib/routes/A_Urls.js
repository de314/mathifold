Urls = {
	home: {
		url() {
			return '/';
		}
	},
	categories: {
		category: {
			url(catId) {
				return '/cat/' + catId;
			},
			edit: {
				url(catId) {
					return '/manage/cat/' + catId;
				}
			}
		},
		create: {
			url() {
				return '/manage/cat';
			}
		}
	},
	subjects: {
		subject: {
			url(subId) {
				return '/sub/' + subId;
			},
			edit: {
				url(catId, subId) {
					return '/manage/' + catId + '/' + subId;
				}
			}
		},
		create: {
			url(catId) {
				return '/manage/' + catId + '/sub'
			}
		}
	},
	topics: {
		topic: {
			url(topId) {
				return '/top/' + topId;
			},
			edit: {
				url(catId, subId, topicId) {
					return '/manage/' + catId + '/' + subId + '/' + topicId;
				}
			}
		},
		create: {
			url(catId, subId) {
				return '/manage/' + catId + '/' + subId + '/topic';
			}
		}
	},
	lessons: {
		lesson: {
			url(lessId) {
				return '/less/' + lessId;
			},
			edit: {
				url(catId, subId, topicId, lessonId) {
					return '/manage/' + catId + '/' + subId + '/' + topicId + '/' + lessonId;
				}
			}
		},
		create: {
			url(catId, subId, topId) {
				return '/manage/' + catId + '/' + subId + '/' + topId + '/lesson';
			}
		}
	},
	forums: {
		url() {
			return '/f';
		}
	},
	blog: {
		url() {
			return '/b';
		}
	},
	about: {
		url() {
			return '/a';
		}
	}
}