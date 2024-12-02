import frappe

def validate_duplicate_permission(doc, method):
    allowed_users = ["Administrator"]
    allowed_roles = ["System Manager"]

    # Check if the current user is allowed to duplicate
    if frappe.flags.in_copy:
        # Allow if the user is Administrator or has System Manager role
        if frappe.session.user not in allowed_users and not frappe.has_role(allowed_roles):
            frappe.throw(_("You are not allowed to duplicate this document."))
