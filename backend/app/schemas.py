from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


Status = Literal["healthy", "warning", "critical"]


class Metric(BaseModel):
    label: str
    value: float
    delta: float
    trend: Literal["up", "down"]


class TrendPoint(BaseModel):
    date: str
    throughput: int
    errors: int


class DistributionItem(BaseModel):
    name: str
    value: int


class Event(BaseModel):
    id: int
    service: str
    status: Status
    region: str
    tags: list[str] = Field(default_factory=list)
    owner: str
    created_at: datetime


class EventCreate(BaseModel):
    service: str
    status: Status
    region: str
    tags: list[str] = Field(default_factory=list)
    owner: str


class EventsResponse(BaseModel):
    items: list[Event]
    total: int


class FilterOptions(BaseModel):
    statuses: list[str]
    regions: list[str]
    tags: list[str]
