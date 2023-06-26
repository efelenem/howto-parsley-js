window.ParsleyConfig = {
	focus: 'none',
	triggerAfterFailure: 'input change',
	errorClass: 'parsley-error',
	classHandler: function (elem, isRadioOrCheckbox) {
		var inputType = $(elem.$element).attr("type");

		if(inputType == "text") {
			$(elem.$element).attr("data-parsley-pattern", "[ a-zA-Z0-9@#.,-='\(\)\/_\u00f1\u00d1]*");
			$(elem.$element).attr("data-parsley-pattern-message", "Invalid Format");

			$(elem.$element).on("keyup", function(e){
				var string = $(elem.$element).val();
				$(elem.$element).val(string.replace(/[&\\+$~%":;*?<>{}=|!^`]/g, ""));
			});

			$(elem.$element).bind('paste', function() {
				var string = $(elem.$element).val();
				$(elem.$element).val(string.replace(/[&\\+$~%":;*?<>{}=|!^`]/g, ""));
			}); 
		}
	},
	errorTemplate: '<span class="error-msg"></span>',
};

// DEFAULT INPUT BEHAVIORS
$(document).ready(() => {
	window.Parsley.addValidator('mobile', {
		requirementType: 'string',
		validateNumber: function(value, requirement) {
			const strlen = `${value}`.length;
			return strlen >= requirement;
		},
		messages: {
			en: 'Invalid mobile number format.',
		}
	});
	
	$('.input-mobile-no').on("keyup", function(e){
		const string = $(this).val();
		$(this).val(string.replace(/^[\D\sA-Za-z]*$/g, ""));
	});

	$('.input-datepicker').datepicker({
		dateFormat: 'mm/dd/yy'
	}).prop('autocomplete', 'off');
});
