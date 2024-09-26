frappe.ui.form.on('Tender', {
    onload: function(frm) {
        frm.set_query('contact_person', function() {
            return {
                filters: {
                    link_doctype: 'Customer',
                    link_name: frm.doc.customer_name
                }
            };
        });
         frm.set_query('sales_order', function() {
            return {
                filters: {
                    customer: frm.doc.customer_name,
                    docstatus:1
                }
            };
        });
    }
});

// frappe.ui.form.on('Tender', {
//     onload: function(frm) {
//         // Apply filter for consignee_address field in the tender_item child table
//         frm.fields_dict['tender_item'].grid.get_field('consignee_address').get_query = function(doc, cdt, cdn) {
//             let child = locals[cdt][cdn];
//             console.log(child);
//             // if (!frm.doc.customer_name) {
//             //     frappe.msgprint(__('Please select a Customer first.'));
//             //     return false;
//             // }
//             return {
//                 filters: {
//                     customer: frm.doc.customer_name
//                 }
//             };
//         };
//     }
// });

// frappe.ui.form.on("Tender", "refresh", function(frm) {
//     frm.fields_dict['tender_item'].grid.get_field('consignee_address').get_query = function(doc, cdt, cdn) {
//         var child = locals[cdt][cdn];
//         //console.log(child);
//         return {    
//             filters:[
//                 ['IS_IT_OK_FIELD', '=', child.CHECKBOX_FIELD]
//             ]
//         }
//     }
// });

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
