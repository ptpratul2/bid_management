

# install.py

import frappe

def before_install():
    required_apps = {"erpnext": "15.x"}
    for app, version in required_apps.items():
        if app not in frappe.get_installed_apps():
            frappe.throw(f"{app} must be installed before installing Bid Management.")
        # Check ERPNext version
        installed_version = frappe.get_attr(f"{app}.app_version")
        if not installed_version.startswith(version):
            frappe.throw(f"Bid Management requires {app} version {version}. Found {installed_version}.")
