# Copyright (c) 2024, Himanshu Shivhare and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc


class Tender(Document):
	pass

@frappe.whitelist()
def make_emd(source_name, target_doc=None):
	def postprocess(source, doc):
		doc.project_type = "External"
		doc.project_name = source.name

	doc = get_mapped_doc("Tender", source_name, {
		"Tender": {
			"doctype": "EMD",
			"validation": {
				"docstatus": ["=", 0]
			},
			"field_map":{
				"name" : "custom_tender",
				"customer_name" : "customer",
				"estimated_tender_amount":"estimated_costing",
				"tender_no":"tender_no"
			}
		},
	}, target_doc, postprocess)
	return doc
@frappe.whitelist()
def make_quotation(source_name, target_doc=None):
	def postprocess(source, doc):
		doc.project_type = "External"
		doc.project_name = source.name

	doc = get_mapped_doc("Tender", source_name, {
		"Tender": {
			"doctype": "Quotation",
			"validation": {
				"docstatus": ["=", 0]
			},
			"field_map":{
				"name" : "custom_tender",
				"customer_name" : "customer",
				"estimated_tender_amount":"estimated_costing"
			}
		},
	}, target_doc, postprocess)
	return doc

@frappe.whitelist()
def make_sales_order(source_name, target_doc=None):
	def postprocess(source, doc):
		doc.project_type = "External"
		doc.project_name = source.name

	doc = get_mapped_doc("Tender", source_name, {
		"Tender": {
			"doctype": "Sales Order",
			"validation": {
				"docstatus": ["=", 0]
			},
			"field_map":{
				"name" : "custom_tender",
				"customer_name" : "customer",
				"estimated_tender_amount":"estimated_costing"
			}
		},
	}, target_doc, postprocess)
	return doc

@frappe.whitelist()
def make_project(source_name, target_doc=None):
	def postprocess(source, doc):
		doc.project_type = "External"
		doc.project_name = source.name

	doc = get_mapped_doc("Tender", source_name, {
		"Tender": {
			"doctype": "Project",
			"validation": {
				"docstatus": ["=", 0]
			},
			"field_map":{
				"name" : "custom_tender",
				"customer_name" : "customer",
				"estimated_tender_amount":"estimated_costing"
			}
		},
	}, target_doc, postprocess)
	return doc

@frappe.whitelist()
def make_bank_guarantee(source_name, target_doc=None):
	def postprocess(source, doc):
		doc.project_type = "External"
		doc.project_name = source.name

	doc = get_mapped_doc("Tender", source_name, {
		"Tender": {
			"doctype": "Bank Guarantee",
			"validation": {
				"docstatus": ["=", 0]
			},
			"field_map":{
				"name" : "custom_tender",
				"customer_name" : "customer",
				"estimated_tender_amount":"estimated_costing"
			}
		},
	}, target_doc, postprocess)
	return doc

@frappe.whitelist()
def update_tender_with_project(doc, method):
    # Check if the project is linked to a tender
    if doc.custom_tender:
        # Update the tender with the project name
        tender = frappe.get_doc("Tender", doc.custom_tender)
        tender.project = doc.name
        tender.save()
