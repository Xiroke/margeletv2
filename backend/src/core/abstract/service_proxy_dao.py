class ProxyServiceToDao:
    """redirects the function call if it is not in the service in the dao"""

    def __init__(self, dao: any):  # type: ignore
        self.dao = dao

    def __getattr__(self, name):
        """Call methods from dao if they not exist in service"""
        return getattr(self.dao, name)
