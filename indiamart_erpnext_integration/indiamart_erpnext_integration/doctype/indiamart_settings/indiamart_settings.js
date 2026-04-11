// Copyright (c) 2021, GreyCube Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Indiamart Settings', {
	refresh: function (frm) {
		if (frm.is_new() == undefined && frm.doc.enabled == 1) {
			frm.add_custom_button('Manually Pull Lead', () => {
				let now_time = frappe.datetime.now_datetime()
				let d = new frappe.ui.Dialog({
					title: 'Use only, when you need to retrigger indimart lead pull for a particular time frame',
					fields: [{
							label: 'Start Date Time',
							fieldname: 'start_time',
							fieldtype: 'Datetime',
							default: moment(frappe.datetime.now_datetime()).subtract({
								minutes: 5
							}),
							reqd: 1
						},
						{
							label: 'End Date Time',
							fieldname: 'end_time',
							fieldtype: 'Datetime',
							default: frappe.datetime.now_datetime(),
							reqd: 1
						}

					],
					primary_action_label: 'Fetch',
					primary_action(values) {
						console.log(values);
						frappe.call({
							method: 'indiamart_erpnext_integration.indiamart_erpnext_controller.manual_pull_indiamart_leads',
							args: {
								start_time: values.start_time,
								end_time: values.end_time
							},
							callback: (r) => {
								// on success
								console.log(r)
								frappe.msgprint(__('Execution started successfully'));
							},
							error: (r) => {
								// on error
							}
						})

						d.hide();
					}
				});

				d.show();
			})
		}
	}
});