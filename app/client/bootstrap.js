toastr.options = {
	"closeButton": false,
	"debug": false,
	"newestOnTop": true,
	"progressBar": false,
	"positionClass": "toast-bottom-right",
	"preventDuplicates": false,
	"onclick": null,
	"showDuration": "300",
	"hideDuration": "1000",
	"timeOut": "5000",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
};

File.prototype.convertToBase64 = function(cb){
	let fr = new FileReader();
	fr.onload = function(e) {
		if (_.isFunction(cb)) {
			cb(e.target.result);
		}
	};
	fr.readAsDataURL(this);
}
