Urls = {
	home: {
		url() {
			return '/';
		}
	},
	categories: {
		category: {
			url(slug) {
				return '/c/' + slug;
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
			url(slug) {
				return '/s/' + slug;
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
			url(slug) {
				return '/t/' + slug;
			}
		},
		create: {
			url(catId, subId) {
				return '/manage/cat/' + catId + '/sub/' + subId + '/topic'
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