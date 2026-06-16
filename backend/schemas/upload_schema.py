from pydantic import BaseModel


class MappingRequest(BaseModel):

    sales: str

    category: str

    region: str | None = None

    date: str | None = None