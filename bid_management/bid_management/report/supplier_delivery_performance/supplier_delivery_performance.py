import frappe
from frappe.utils import flt

def execute(filters=None):
    columns, data = [], []

    # Define the columns
    columns = [
        {"label": "Supplier", "fieldname": "supplier", "fieldtype": "Link", "options": "Supplier", "width": 200},
        {"label": "Average Delivery Delay", "fieldname": "avg_delivery_delay", "fieldtype": "Float", "width": 150},
        {"label": "Total Orders", "fieldname": "total_orders", "fieldtype": "Int", "width": 100},
        {"label": "Completed Orders", "fieldname": "completed_orders", "fieldtype": "Int", "width": 120}
    ]

    # Fetch the data
    data = get_supplier_performance_data(filters)

    return columns, data

def get_supplier_performance_data(filters):
    # Validate date filters
    if not filters.get("from_date") or not filters.get("to_date"):
        frappe.throw("Please set From Date and To Date")

    # Perform the query
    query = """
        SELECT
            po.supplier AS supplier,
            AVG(DATEDIFF(pr.posting_date, poi.schedule_date)) AS avg_delivery_delay,
            COUNT(DISTINCT po.name) AS total_orders,
            SUM(CASE WHEN po.status = 'Completed' THEN 1 ELSE 0 END) AS completed_orders
        FROM
            `tabPurchase Receipt` pr
        JOIN
            `tabPurchase Order Item` poi ON poi.parent = pr.purchase_order_number
        JOIN
            `tabPurchase Order` po ON po.name = poi.parent
        WHERE
            pr.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY
            po.supplier
        ORDER BY
            avg_delivery_delay ASC
    """

    # Execute query and fetch data
    result = frappe.db.sql(query, filters, as_dict=True)
    return result
