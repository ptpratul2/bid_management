from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in bid_management/__init__.py
from bid_management import __version__ as version

setup(
	name="bid_management",
	version=version,
	description="Tender/Bid management",
	author="Himanshu Shivhare",
	author_email="himanshushivhare047@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
