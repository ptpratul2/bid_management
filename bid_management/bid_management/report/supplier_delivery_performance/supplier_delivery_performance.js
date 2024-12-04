// Copyright (c) 2024, Himanshu Shivhare and contributors
// For license information, please see license.txt

frappe.query_reports["Supplier Delivery Performance"] = {
    "filters": [
        {
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Date",
            "default": "2023-04-01",
            "reqd": 1
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Date",
            "default": "2024-08-01",
            "reqd": 1
        }
    ]
};
