ImageDataUrlInput = React.createClass({
	getInitialState() {
	    return { };
	},
	getInputName() {
		return this.props.inputName || 'img';
	},
	scale(base64) {
		let img = document.createElement("img"),
			canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d");

		img.src = base64;
		ctx.drawImage(img, 0, 0);

		let MAX_WIDTH = this.props.maxWidth || 800,
			MAX_HEIGHT = this.props.maxHeight || 800,
			width = img.width,
			height = img.height;

		if (width > height) {
			if (width > MAX_WIDTH) {
				height *= MAX_WIDTH / width;
				width = MAX_WIDTH;
			}
		} else {
			if (height > MAX_HEIGHT) {
				width *= MAX_HEIGHT / height;
				height = MAX_HEIGHT;
			}
		}
		canvas.width = width;
		canvas.height = height;
		ctx.drawImage(img, 0, 0, width, height);

		return canvas.toDataURL("image/png");
	},
	squareCrop(base64) {
		let img = document.createElement("img"),
			canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d");

		img.src = base64;
		ctx.drawImage(img, 0, 0);

		let width = img.width,
			height = img.height,
			size = Math.min(width, height),
			wOffset = 0,
			hOffset = 0;

		if (width > height) {
			wOffset = (width - height) / 2;
		} else {
			hOffset = (height - width) / 2;
		}
		canvas.width = size;
		canvas.height = size;
		ctx.drawImage(img, wOffset, hOffset, size, size, 0, 0, size, size);

		return canvas.toDataURL("image/png");
	},
	handleInputChange(e) {
		let self = this,
			files = e.target.files,
			file = _.isObject(files) ? files[0] : undefined;
		if (!!file) {
			console.log('converting file');
			file.convertToBase64(function(base64){
				if (self.props.square) {
					base64 = self.squareCrop(base64);
				}
				base64 = self.scale(base64);
				$("[name='" + self.getInputName() + "']").val(base64);
				self.setState({
					img: base64
				});
				console.log('done', base64.length);
			});
		}
	},
	renderPreview(url) {
		if (this.props.preview && _.isString(url)) {
			return (
					<div className="input-preview">
						<img src={url} alt=""/>
					</div>
				)
		}
		return <div>&nbsp;</div>;
	},
	render() {
		let className = "image-data-url-input " + this.props.className,
			inputName = this.getInputName();
		if (!this.state.img && !!this.props.value) {
			this.state.img = this.props.value;
		}
		return (
			<div className={ className }>
				<div className="row">
					<div className="input-container col-xs-9">
						<input type="file" className="form-control" name={ 'img' + Math.random() } onChange={ this.handleInputChange } />
						<input type="hidden" name={ inputName } />
					</div>
					<div className="col-xs-3">
						{ this.renderPreview(this.state.img) }
					</div>
				</div>
			</div>
		);
	}
});
