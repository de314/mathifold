FlowRouter.route(Urls.lessons.lesson.url(':id'), {
	name: 'lessonById',
	action(params) {
		
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <LessonHome lessId={ params.id } />
		});
	}
});

FlowRouter.route(Urls.lessons.create.url(':catId', ':subId', ':topId'), {
	name: 'lessonCreate',
	action(params) {

		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <LessonForm catId={ params.catId } subId={ params.subId } topId={ params.topId } />
		});
	}
});

FlowRouter.route(Urls.lessons.lesson.edit.url(':catId', ':subId', ':topId', ':lessId'), {
	name: 'topicEdit',
	action(params) {
		ReactLayout.render(MainLayout, {
			header: <Header />,
			content: <LessonForm catId={ params.catId } subId={ params.subId } topId={ params.topId } lessId={ params.lessId } />
		});
	}
});
