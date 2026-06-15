from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Sales(Base):

    __tablename__ = "sales"

    id = Column(Integer, primary_key=True)

    order_id = Column(String)
    order_date = Column(String)

    category = Column(String)
    region = Column(String)

    product_name = Column(String)

    sales = Column(Float)


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    name = Column(String)
    email = Column(String, unique=True)

    password = Column(String)