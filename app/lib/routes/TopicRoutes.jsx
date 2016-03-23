FlowRouter.route(Urls.topics.topic.url(':id'), {
	name: 'topicById',
	action(params) {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <TopicHome topicId={ params.id } />
		});
	}
});

FlowRouter.route(Urls.topics.create.url(':catId', ':subId'), {
	name: 'topicCreate',
	action(params) {

		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <TopicForm catId={ params.catId } subId={ params.subId } />
		});
	}
});

FlowRouter.route(Urls.topics.topic.edit.url(':catId', ':subId', ':topicId'), {
	name: 'topicEdit',
	action(params) {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <ComingSoon />
		});
	}
});
