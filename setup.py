from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in indiamart_erpnext_integration/__init__.py
from indiamart_erpnext_integration import __version__ as version

setup(
	name="indiamart_erpnext_integration",
	version=version,
	description="Indiamart CRM API i.e. Lead integration with ERPNext by GreyCube.in",
	author="GreyCube Technologies",
	author_email="admin@greycube.in",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
