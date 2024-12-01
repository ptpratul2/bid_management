$(window).on('hashchange', page_changed);
$(window).on('load', page_changed);

function page_changed(event) {
    // Waiting for the page to load completely
    frappe.after_ajax(function () {
        var route = frappe.get_route();

        if (route[0] === "Form") {
            var doctype = route[1];

            // Check if the event handler is already set
            if (!frappe.ui.form.on[doctype]) {
                frappe.ui.form.on(doctype, {
                    refresh: function (frm) {
                        console.log("doctype = " + frm.doctype);
                        if (frappe.user_roles.includes("Administrator") || frappe.user_roles.includes("Desk User")) {
                            cur_frm.page.menu.find('[data-label="' + __("Duplicate") + '"]').parent().parent().remove();
                        }
                    }
                });
            }
        }
    });
}
