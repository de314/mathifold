FlowRouter.route('/', {
	name: 'home',
	action() {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <Home />
		});
	}
});

FlowRouter.route('/f', {
	name: 'forumsHome',
	action() {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <ComingSoon />
		});
	}
});

FlowRouter.route('/b', {
	name: 'blogHome',
	action() {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <ComingSoon />
		});
	}
});

FlowRouter.route('/a', {
	name: 'aboutHome',
	action() {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <ComingSoon />
		});
	}
});
