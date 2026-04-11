frappe.ui.form.on('Integration Request', {
    refresh:function (frm) {
        $('div').find('.document-link[data-doctype="ToDo"]').hide();
		$('div').find('.document-link[data-doctype="Indiamart Lead"]').remove();
		if (frm.is_new() == undefined && frm.doc.integration_request_service=='Indiamart') {

			frappe.call('indiamart_erpnext_integration.indiamart_erpnext_integration.doctype.indiamart_lead.indiamart_lead.get_connected_indiamart_lead_for_integration_request', {
				integration_request: frm.doc.name
			}).then(r => {
				console.log(r,'r')
				if (r.message && r.message != undefined) {
					let count=r.message.length
					let link = $(`
			<div class="document-link" data-doctype="Indiamart Lead">
				<div class="document-link-badge" data-doctype="Indiamart Lead"> <span class="count">${count}</span> <a
					class="badge-link">Indiamart Lead</a> </div> <span class="open-notification hidden"
				title="Open Indiamart Lead"> </span></div>
			`);

					link.on('click', function () {
						frappe.route_options = {
							'name': ['in', r.message]
						};
						frappe.set_route("List", "Indiamart Lead", "List");

					})
					$('div').find('.document-link[data-doctype="ToDo"]').after(link);
				}
			})
		}	
    }
})