# Copyright (c) 2024, Himanshu Shivhare and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class EmployeeWeekoff(Document):
    def before_save(self):
        if self.employee and self.holiday_list:            
            employee_doc = frappe.get_doc("Employee", self.employee)
            employee_doc.holiday_list = self.holiday_list
            employee_doc.save()

 