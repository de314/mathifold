FlowRouter.route('/c/:slug', {
	name: 'categoryBySlug',
	action() {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <ComingSoon />
		});
	}
});
