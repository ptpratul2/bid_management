

frappe.ui.form.on('Tender', {
    submission_deadline: function (frm) {
        calculate_validity_end_date(frm);
    },
    tender_validity: function (frm) {
        calculate_validity_end_date(frm);
    },
    onload: function(frm) {
        // Set dynamic filters
        
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
                        docstatus: 1
                    }
                };
            });

            frm.set_query('consignee_address', 'items', function(doc, cdt, cdn) {
                return {
                    filters: {
                        link_doctype: "Customer",
                        link_name: frm.doc.organization
                    }
                };
            });

            frm.set_query('reporting_officer', 'items', function(doc, cdt, cdn) {
                return {
                    filters: {
                        link_doctype: "Customer",
                        link_name: frm.doc.organization
                    }
                };
            });
        
    },
	
    refresh: function(frm) {
        if (frm.doc.docstatus === 0 && !frm.doc.__islocal) {
            // Add custom buttons
            frm.add_custom_button(__('EMD'), () => frm.events.make_emd(frm), __('Create'));
            frm.add_custom_button(__('Quotation'), () => frm.events.make_quotation(frm), __('Create'));
            // frm.add_custom_button(__('Bank Guarantee'), () => frm.events.make_bank_guarantee(frm), __('Create'));

            // Set buttons group as primary
            frm.page.set_inner_btn_group_as_primary(__('Create'));
        }
        if (frm.doc.docstatus === 1) {
            // Add custom buttons
            frm.add_custom_button(__('Sales Order'), () => frm.events.make_sales_order(frm), __('Create'));
            frm.add_custom_button(__('Project'), () => frm.events.make_project(frm), __('Create'));
            // Set buttons group as primary
            frm.page.set_inner_btn_group_as_primary(__('Create'));
        }
    },

    make_emd: function(frm) {
        frappe.model.open_mapped_doc({
            method: "bid_management.bid_management.doctype.tender.tender.make_emd",
            frm: frm
        });
    },

    make_quotation: function(frm) {
        frappe.model.open_mapped_doc({
            method: "bid_management.bid_management.doctype.tender.tender.make_quotation",
            frm: frm
        });
    },

    make_sales_order: function(frm) {
        frappe.model.open_mapped_doc({
            method: "bid_management.bid_management.doctype.tender.tender.make_sales_order",
            frm: frm
        });
    },

    make_project: function(frm) {
        frappe.model.open_mapped_doc({
            method: "bid_management.bid_management.doctype.tender.tender.make_project",
            frm: frm
        });
    },

    make_bank_guarantee: function(frm) {
        frappe.model.open_mapped_doc({
            method: "bid_management.bid_management.doctype.tender.tender.make_bank_guarantee",
            frm: frm
        });
    },

	currency: function (frm) {
		let company_currency = erpnext.get_currency(frm.doc.company);
		if (company_currency != frm.doc.company) {
			frappe.call({
				method: "erpnext.setup.utils.get_exchange_rate",
				args: {
					from_currency: frm.doc.currency,
					to_currency: company_currency,
				},
				callback: function (r) {
					if (r.message) {
						frm.set_value("conversion_rate", flt(r.message));
						frm.set_df_property(
							"conversion_rate",
							"description",
							"1 " + frm.doc.currency + " = [?] " + company_currency
						);
					}
				},
			});
		} else {
			frm.set_value("conversion_rate", 1.0);
			frm.set_df_property("conversion_rate", "hidden", 1);
			frm.set_df_property("conversion_rate", "description", "");
		}

		frm.trigger("tender_amount");
		frm.trigger("set_dynamic_field_label");
	},

	tender_amount: function (frm) {
		frm.set_value(
			"base_tender_amount",
			flt(frm.doc.tender_amount) * flt(frm.doc.conversion_rate)
		);
	},

/* 	set_dynamic_field_label: function (frm) {
		if (frm.doc.opportunity_from) {
			frm.set_df_property("party_name", "label", frm.doc.opportunity_from);
		}
		frm.trigger("change_grid_labels");
		frm.trigger("change_form_labels");
	},

	make_supplier_quotation: function (frm) {
		frappe.model.open_mapped_doc({
			method: "erpnext.crm.doctype.opportunity.opportunity.make_supplier_quotation",
			frm: frm,
		});
	},

	make_request_for_quotation: function (frm) {
		frappe.model.open_mapped_doc({
			method: "erpnext.crm.doctype.opportunity.opportunity.make_request_for_quotation",
			frm: frm,
		});
	}, */

	change_form_labels: function (frm) {
		let company_currency = erpnext.get_currency(frm.doc.company);
		frm.set_currency_labels(["base_tender_amount"], company_currency);
		frm.set_currency_labels(["tender_amount"], frm.doc.currency);

		// toggle fields
		frm.toggle_display(
			["conversion_rate", "base_tender_amount"],
			frm.doc.currency != company_currency
		);
	},

/* 	change_grid_labels: function (frm) {
		let company_currency = erpnext.get_currency(frm.doc.company);
		frm.set_currency_labels(["base_rate", "base_amount"], company_currency, "items");
		frm.set_currency_labels(["rate", "amount"], frm.doc.currency, "items");

		let item_grid = frm.fields_dict.items.grid;
		$.each(["base_rate", "base_amount"], function (i, fname) {
			if (frappe.meta.get_docfield(item_grid.doctype, fname))
				item_grid.set_column_disp(fname, frm.doc.currency != company_currency);
		});
		frm.refresh_fields();
	},

	calculate_total: function (frm) {
		let total = 0,
			base_total = 0;
		frm.doc.items.forEach((item) => {
			total += item.amount;
			base_total += item.base_amount;
		});

		frm.set_value({
			total: flt(total),
			base_total: flt(base_total),
		});
	}, */
});

frappe.ui.form.on('Tender Item', {
    consignee_address: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        if (row.consignee_address) {
            frappe.call({
                method: "frappe.contacts.doctype.address.address.get_address_display",
                args: { address_dict: row.consignee_address },
                callback: function(r) {
                    if (r.message) {
                        frappe.model.set_value(cdt, cdn, 'address_display', r.message);
                    } else {
                        frappe.msgprint(__('Address display not found.'));
                    }
                },
                error: function(err) {
                    frappe.msgprint(__('Error fetching address: {0}', [err.message]));
                }
            });
        } else {
            frappe.model.set_value(cdt, cdn, 'address_display', '');
        }
    }
});

function calculate_validity_end_date(frm) {
    if (frm.doc.submission_deadline && frm.doc.tender_validity) {
        const submission_deadline = frappe.datetime.str_to_obj(frm.doc.submission_deadline);
        const validity_end_date = frappe.datetime.add_days(submission_deadline, frm.doc.tender_validity);
        frm.set_value('validity_end_date', frappe.datetime.obj_to_str(validity_end_date));
    } else {
        frm.set_value('validity_end_date', null); 
    }
}
