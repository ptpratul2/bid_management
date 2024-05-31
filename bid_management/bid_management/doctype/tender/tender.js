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
