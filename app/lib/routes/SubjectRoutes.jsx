FlowRouter.route('/s/:slug', {
	name: 'subjectBySlug',
	action(params) {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <SubjectHome slug={ params.slug } />
		});
	}
});

FlowRouter.route('/manage/:catId/sub', {
	name: 'subjectCreate',
	action(params) {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <SubjectForm catId={ params.catId } />
		});
	}
});

FlowRouter.route('/manage/:catId/:subId', {
	name: 'subjectEdit',
	action(params) {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <SubjectForm catId={params.catId } subId={ params.subId } />
		});
	}
});
