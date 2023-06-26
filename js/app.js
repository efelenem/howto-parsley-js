$(document).ready(() => {
	$('#userInfoForm .form-req').attr('data-parsley-required', true);
	
	// if(!$('#userInfoForm').parsley().isValid()) {
	// 	console.log('first validation');
	// 	$('#userInfoForm').parsley().validate();
	// 	$('#userInfoForm .parsley-error').toggleClass('parsley-error');
	// 	$("#userInfoForm .parsley-errors-list .error-msg").hide(0);
	// }
	
	$('#userInfoForm').parsley().on('field:validated', function() {
		console.log($('#userInfoForm').parsley().isValid(), 'validated fields');
		parsleyValidateButtons('#userInfoForm', '#btn-submit-info', '#btn-submit-invalid');
	});
	// .on('field:error', function() {
	// 	$(this.$element).css("border", "1px solid #dc2626");
	// 	$(this.$element).css("background-color", "#fee2e2");
	// }).on('field:success', function() {
	// 	$(this.$element).css("border", "1px solid #d1d5db");
	// 	$(this.$element).css("background-color", "#ffffff");
	// });

	$('#info-testf').on('keyup', function() {
		const value = $(this).val();
		if (value != '') {
			$('.hiddenf-container').removeClass('hidden');
			$('#hidden-field').attr('required', true).trigger('keyup');
		}
		else {
			$('.hiddenf-container').addClass('hidden')
			$('#hidden-field').attr('required', false).trigger('keyup');
			$('#hidden-field').val('');
		}
		
		$('#info-testr').val(value).trigger('change');
		console.log('info-testf keyup');
	});

	$('#hidden-field').on('keyup', function() {
		parsleyValidateButtons('#userInfoForm', '#btn-submit-info', '#btn-submit-invalid');
	});

	$(document).on('click', '#btn-submit-invalid', function(e) {
		e.preventDefault();
		
		if($('#userInfoForm').parsley().validate()) {
			$('#btn-submit-invalid').hide(0);
			$('#btn-submit-info').show(0);
			$("#userInfoForm .parsley-errors-list .error-msg").hide(0);
		}
		else {
			$('#btn-submit-info').hide(0);
			$('#btn-submit-invalid').show(0);
			$("#userInfoForm .parsley-errors-list .error-msg").show(0);
		}
	});

	$(document).on('click', '#btn-submit-info', function(e) {
		e.preventDefault();
		
		if($('#userInfoForm').parsley().validate()) {
			console.log('without errors');
		}
	});

	function parsleyValidateButtons(formId, mainBtn, invalidBtn) {
		$(mainBtn).hide(0);
		$(invalidBtn).show(0);
		
		if($(formId).parsley().isValid()) {
			$(mainBtn).show(0);
			$(invalidBtn).hide(0);
		}
	}
});
