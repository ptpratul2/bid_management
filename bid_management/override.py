import frappe
from erpnext.stock.doctype.quality_inspection_template.quality_inspection_template import get_template_details


def custom_get_template_details(template):
    if not template:
        return []

    return frappe.get_all(
        "Item Quality Inspection Parameter",
        fields=[
            "specification",
            "value",
            "acceptance_formula",
            "numeric",
            "formula_based_criteria",
            "min_value",
            "max_value",
            "custom_sensor_type",
            "custom_sensor_description",
            "custom_range",
            "custom_uom",
        ],
        filters={"parenttype": "Quality Inspection Template", "parent": template},
        order_by="idx",
    )

# Monkey patching: Override the default method
get_template_details.__code__ = custom_get_template_details.__code__
