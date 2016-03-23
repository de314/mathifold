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
			}
		}
	},
	subjects: {
		subject: {
			url(slug) {
				return '/s/' + slug;
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