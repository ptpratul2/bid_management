frappe.ui.form.on('Tender', {
    onload: function(frm) {
        frm.set_query('contact_person', function() {
            return {
                filters: {
                    link_doctype: 'Customer',
                    link_name: frm.doc.organization
                }
            };
        });
        frm.set_query('sales_order', function() {
            return {
                filters: {
                    customer: frm.doc.organization,
                    docstatus:1
                }
            };
        });
        frm.set_query('consignee_address', 'items', function(doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            return {
                filters: {
                    link_doctype: "Customer", // Linking with Customer DocType
                    link_name: frm.doc.organization // Filtering by parent organization field
                }
            };
        });
        frm.set_query('reporting_officer', 'items', function(doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            return {
                filters: {
                    link_doctype: "Customer", // Linking with Customer DocType
                    link_name: frm.doc.organization // Filtering by parent organization field
                }
            };
        });
    }
});

frappe.ui.form.on('Tender Item', {
    consignee_address: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        if (row.consignee_address) {
            // Fetch the address display using frappe.call
            frappe.call({
                method: "frappe.contacts.doctype.address.address.get_address_display",
                args: {
                    address_dict: row.consignee_address
                },
                callback: function(r) {
                    if (r.message) {
                        frappe.model.set_value(cdt, cdn, 'address_display', r.message);
                    }
                }
            });
        } else {
            // Clear the address_display if no consignee_address is set
            frappe.model.set_value(cdt, cdn, 'address_display', '');
        }
    }
});
