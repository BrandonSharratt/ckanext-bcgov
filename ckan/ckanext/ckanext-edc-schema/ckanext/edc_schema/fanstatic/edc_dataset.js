var tags = [];

function select_bc_ocio() {
	fill_bc_ocio(bc_ocio_val);
}

/*-------------------------------------------------------------------*
 * This function is called when the resource status is changed on    *
 * creating/editing a dataset.                                       *
 *                                                                   *
 * If the chosen resource status is "obsolete" then an input for     *
 * replacement record must be added to the dataset form. Otherwise,  *
 * The replacement record input must be removed.                     *
 *-------------------------------------------------------------------*/
function check_resource_stat() {

	if ($("#field-resource_status").val() == "obsolete") {
		$("#replacement_record_container").show();
	}
	else {
		$("#field-replacement_record").val('');
		$("#replacement_record_container").hide();

	}

	if ($("#field-resource_status").val() == "historicalArchive") {
		$("#retension_expiry_date_container").show();
		$("#source_data_path_container").show();
	}
	else {
		$("#field-retention_expiry_date").val('');
		$("#field-source_data_path").val('');
		$("#retension_expiry_date_container").hide();
		$("#source_data_path_container").hide();
	}

}

/*-------------------------------------------------------------------*
 *  Adds another row of contact name and contact email to the list   *
 *  of contacts in dataset creation form.
 *-------------------------------------------------------------------*/
function add_contact(roles, orgs) {
	var numberOfContacts = $('.contacts').length;

	var html = '<div id="contact_' + numberOfContacts + '" class="contact control-group"> \
					<div class="contacts row-fluid"> \
						<div class="span6"> \
							<div class="control-group control-full"> \
								<label for="field-contacts-' + numberOfContacts + '-name" class="control-label"><span class="control-required">*</span> Name</label> \
								<div class="controls"> \
									<input id="field-contacts-' + numberOfContacts + '-name" \
								   	   		type="text" \
								   	   		name="contacts__' + numberOfContacts + '__name" \
								       		placeholder="Contact name"/> \
							    </div> \
							</div> \
							<div class="control-group"> \
								<label for="field-contacts-' + numberOfContacts + '-email" class="control-label"><span class="control-required">*</span> Email</label> \
								<div class="controls"> \
								<input id="field-contacts-' + numberOfContacts + '-email" \
							   	   		type="text" \
							   	   		name="contacts__' + numberOfContacts + '__email" \
							   	   		placeholder="Contact email"/> \
							   	</div> \
							</div> \
							<div class="control-group"> \
								<label class="control-label"></label> \
								<div class="controls"> \
									<div class="checkbox-inline"> \
										<input id="field-contacts-' + numberOfContacts + '-private" type="checkbox" name="contacts__' + numberOfContacts + '__private" class="private-contact" value="Display" checked="checked"/> \
										<label for="field-contacts-' + numberOfContacts + '-private">Contact Displayed</label> \
									</div> \
								</div> \
							</div> \
						</div> \
						<div class="span6"> \
							<div class="control-group"> \
								<label for="field-contacts-' + numberOfContacts + '-organization" class="control-label"><span class="control-required">*</span> Organization</label> \
								<div class="controls"> \
								 	<select id="field-contacts-' + numberOfContacts + '-organization" name="contacts__' + numberOfContacts + '__organization" data-module="autocomplete" data-group="org"> \
								 	<option value="" selected="selected" >Select an organization</option>';

	var selected_org_id = $("#field-org").val()
	for (var i = 0; i < orgs.length; i++) {
		if (orgs[i].id == selected_org_id) {
			html += '							 	<option value="' + orgs[i].id + '" selected="selected">' + orgs[i].name + '</option>';
		}
		else {
			html += '							 	<option value="' + orgs[i].id + '">' + orgs[i].name + '</option>';
		}
	}

	html += '				</select> \
						</div> \
					</div> \
					<div class="control-group"> \
					   	<label for="field-contacts-' + numberOfContacts + '-role" class="control-label"><span class="control-required">*</span> Role</label> \
					   	<div class="controls"> \
					   		<select id="field-contacts-' + numberOfContacts + '-role" name="contacts__' + numberOfContacts + '__role" data-module="autocomplete"> \
						   	<option value="" selected="selected">Select a contact role</option>';

	for (var i = 0; i < roles.length; i++) {
		html += '							 	<option value="' + roles[i].id + '">' + roles[i].name + '</option>';
	}

	html += '				</select> \
						</div> \
					</div> \
				</div> \
			<div class="item-link"><a onclick="remove_contact(' + numberOfContacts + '); return false;" class="btn btn-primary btn-xs">Delete </a></div> \
			<input id="field-contacts-' + numberOfContacts + '-delete" \
				   			type="hidden" \
				   			name="contacts__' + numberOfContacts + '__delete" \
				   			value="0"> \
			</div> \
		</div>';

	$("#contacts_list").append(html);
	$('#field-contacts-' + numberOfContacts + '-organization').select2();
	$('#field-contacts-' + numberOfContacts + '-role').select2();
}

function remove_contact(index) {
	$('#field-contacts-' + index + '-delete').val('1');
	$('#contact_' + index).hide();
}


function add_date(date_types) {
	var numberOfDates = $('.date').length;


	var html = '<div id="dataset_date_' + numberOfDates + '" class="date control-group"> \
				<div class="row-fluid"> \
					<div class="span5"> \
						<div class="control-group"> \
							<label for="field-dates-' + numberOfDates + '-type" class="control-label"><span class="control-required">*</span> Date type</label> \
							<div class="controls"> \
								<select id="field-dates-' + numberOfDates + '-type" name="dates__' + numberOfDates + '__type" data-module="autocomplete"> \
									<option value="" selected="selected">Select a date type</option>';

	for ( var i = 0; i < date_types.length; i++) {
		html += '							<option value="' + date_types[i].id + '">' + date_types[i].name + '</option>';
	}

	html += '					</select> \
							</div> \
						</div> \
					</div> \
					<div class="span5"> \
						<div class="control-group"> \
							<label for="field-dates-' + numberOfDates + '-date" class="control-label"><span class="control-required">*</span> Date</label> \
							<div class="controls"> \
								<input 	id="field-dates-' + numberOfDates + '-date" \
							   	   		type="text" \
							   	   		name="dates__' + numberOfDates + '__date" \
							   	   		value="" \
							   	   		placeholder="YYYY-MM-DD" \
							   	   		class="datefield"/> \
							</div> \
						</div> \
					</div> \
					<div class="span2"> \
						<div class="item-link"> <a onclick="remove_date(' + numberOfDates + '); return false;" class="btn btn-primary btn-xs">Delete </a> </div> \
							<input id="field-dates-' + numberOfDates + '-delete" \
							   			type="hidden" \
							   			name="dates__' + numberOfDates + '__delete" \
							   			value="0"> \
						</div> \
					</div> \
				</div> \
			</div>';

	$("#date_list").append(html);
	$('#field-dates-' + numberOfDates + '-type').select2();
	$('#field-dates-' + numberOfDates + '-date').datepicker({ dateFormat: "yy-mm-dd", showOtherMonths: true, selectOtherMonths: true });
}

function remove_date(index) {
	$('#field-dates-' + index + '-delete').val('1');
	$('#dataset_date_' + index).hide();
}


function add_more_info() {
	var numberOfInfoLinks = $('.more_info').length;

	var html = '<div id="more_info_' + numberOfInfoLinks + '" class="more_info control-group"> \
					<div class="row-fluid"> \
						<div class="span10"> \
							<div class="control-group"> \
								<label for="field-more_info-' + numberOfInfoLinks + '-link" class="control-label"><span class="control-required">*</span> More info</label> \
								<div class="controls"> \
									<input id="field-more_info-' + numberOfInfoLinks + '-link" \
										type="text" \
										name="more_info__' + numberOfInfoLinks + '__link" \
										value="" \
										placeholder="http://www.data.gov.bc.ca/dbc/geographic"/> \
								</div> \
							</div> \
						</div> \
						<div class="span2"> \
							<div class="item-link"> <a onclick="remove_info_link(' + numberOfInfoLinks + '); return false;" class="btn btn-primary btn-xs">Delete </a> </div> \
						</div> \
						<input id="field-more_info-' + numberOfInfoLinks + '-delete" \
							type="hidden" \
							name="more_info__' + numberOfInfoLinks + '__delete" \
							value="0"> \
					</div> \
				</div>';

	$("#info_list").append(html);
}

function remove_info_link(index) {
	$('#field-more_info-' + index + '-delete').val('1');
	$('#more_info_' + index).hide();
}



function hideDeletedRecords() {
	var numberOfContacts = $('.contacts').length;
	var numberOfDates = $('.dates').length;
	var numberOfInfoLinks = $('.more_info')

	//Hide all deleted records
	for (i = 0; i < numberOfContacts; i++) {
		var delete_stat  = $('#field-contacts-' + i + '-delete').val();
		if (delete_stat == '1') {
			$('#contact_' + i).hide();
		}
	}

	for (i = 0; i < numberOfDates; i++) {
		var delete_stat  = $('#field-dates-' + i + '-delete').val();
		if (delete_stat == '1') {
			$('#dataset_date_' + i).hide();
		}
	}

	for (i = 0; i < numberOfInfoLinks; i++) {
		var delete_stat  = $('#field-more_info-' + i + '-delete').val();
		if (delete_stat == '1') {
			$('#more_info_' + i).hide();
		}
	}

}

function select_branch(org_branches) {
	var org_id = $('#field-org').val();

	var branches = [];
	for (var i = 0; i < org_branches.length; i++) {
		if (org_branches[i].id == org_id) {
			branches = org_branches[i].branches;
			break;
		}
	}

	var options = "<option></option>";
	for (var i = 0; i < branches.length; i++) {
		options += '<option value="' + branches[i].id + '">' + branches[i].title + '</option>';
	}

	$("#field-sub_org").find('option').remove().end().append(options);
	$("#field-sub_org").select2({
									placeholder : "Select a branch",
									width : "220px"
								});

	$('[data-group="org"]').val(org_id)
	$('[data-group="org"]').select2();
}


$("#form-edc_dataset").submit(function( event ) {
	var suborg_id = $("#field-sub_org").val();
	var org_id = $('#field-org').val();
	owner_org = (suborg_id) ? suborg_id : org_id;
	//Add the select organization id as the owner of the dataset.
	$("#field-owner_org").val(owner_org);
});


var previous_state;

$("#field-edc_state").change(function() {
	var selected_state = $("#field-edc_state").val()

	if (selected_state == "PENDING PUBLISH") {
		$("#state_confirm_dialog").dialog({
			resizable:false,
			height:400,
			width:600,
			modal:true,
			buttons:{
				"Confirm & Save":function(){
					$("#field-edc_state").val("PENDING PUBLISH");
					previous_state = "PENDING PUBLISH";
					$("#save1").hide();
					$("#save2").hide();
					$(this).dialog("close");
				},
				"Cancel":function() {
					$("#field-edc_state").val(previous_state);
					$("#field-edc_state").select2(
							{
								width : "220px"
							});
					console.log("state: " + previous_state);
					$(this).dialog("close")
				}
			}
		})
	}
	else {
		previous_state = selected_state;
	}

});


$('.private-contact').change(function(){

    if($(this).prop('checked')){
          $(this).val('Display');
     }else{
          $(this).val('Private');
     }

});

$('#field-tags').select2({
	width: '758px',
	placeholder: "eg. economy, mental health, government",
	tags: true,
	tokenSeparators: [','],
	minimumInputLength: 1,
	createSearchChoice: function(term) {
		return {
			id: $.trim(term),
			text: $.trim(term)
		};
	},
	data : tags,

	initSelection: function(element, callback) {

        var data = [];

        function splitVal(string, separator) {
            var val, i, l;
            if (string === null || string.length < 1) return [];
            val = string.split(separator);
            for (i = 0, l = val.length; i < l; i = i + 1) val[i] = $.trim(val[i]);
            return val;
        }

        $(splitVal(element.val(), ",")).each(function () {
            data.push({
            	id: this,
            	text: this
            	});
        });

        callback(data);
	}
});

/*-------------------------------------------------------------------*
 * This function preloads the list of available keywords.            *
 *-------------------------------------------------------------------*/
function load_keywords() {
	$.get('/api/3/action/tag_list', function( data ) {
		tags_data = data.result;
		for (i = 0; i < tags_data.length; i++) tags.push({id: tags_data[i], text: tags_data[i]});
	});
}

/*-------------------------------------------------------------------*
 * Updates dataset URL when the title is changed.                    *
 *-------------------------------------------------------------------*/
$("#field-title").on('keyup change', function(){
	var titleText = $(this).val().trim();
	urlText = titleText.replace(/\W+/g, "-").toLowerCase();
	if (urlText.length > 100) {
		urlText = urlText.substring(0, 100);
	}
	$("#field-name").val(urlText);
});


/*-------------------------------------------------------------------*
 * Initialization on loading dataset creation/edit page.             *
 *-------------------------------------------------------------------*/
$(function() {
	just_loaded = true;
	check_resource_stat();
	hideDeletedRecords();
	$( ".datefield" ).datepicker({ dateFormat: "yy-mm-dd", showOtherMonths: true, selectOtherMonths: true });
	$("#field-retention_expiry_date").datepicker({ dateFormat: "yy-mm-dd", showOtherMonths: true, selectOtherMonths: true });

	$(document).ready(function() {
		previous_state = $("#field-edc_state").val();

		var $datasetForm = $('#form-edc_dataset');
		if($datasetForm.hasClass('archived')) {
			$datasetForm.find('input, select, textarea, button, a.btn').each(function() {
				$(this).attr('disabled', 'disabled');
			});
		}

		load_keywords();

	});

});
