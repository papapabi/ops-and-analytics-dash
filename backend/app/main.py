from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from .mock_data import DISTRIBUTION, EVENTS, METRICS, TREND
from .schemas import Event, EventCreate, EventsResponse, FilterOptions


app = FastAPI(title="Operations & Analytics API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/metrics")
def metrics():
    return METRICS


@app.get("/api/trends")
def trends():
    return TREND


@app.get("/api/distribution")
def distribution():
    return DISTRIBUTION


@app.get("/api/filters", response_model=FilterOptions)
def filters() -> FilterOptions:
    statuses = sorted({item.status for item in EVENTS})
    regions = sorted({item.region for item in EVENTS})
    tags = sorted({tag for item in EVENTS for tag in item.tags})
    return FilterOptions(statuses=statuses, regions=regions, tags=tags)


@app.get("/api/events", response_model=EventsResponse)
def events(
    search: str | None = None,
    statuses: list[str] | None = Query(default=None),
    regions: list[str] | None = Query(default=None),
    tags: list[str] | None = Query(default=None),
) -> EventsResponse:
    items = EVENTS

    if search:
        needle = search.lower().strip()
        items = [
            item
            for item in items
            if needle in item.service.lower()
            or needle in item.owner.lower()
            or needle in item.region.lower()
        ]

    if statuses:
        selected = {s.lower() for s in statuses}
        items = [item for item in items if item.status.lower() in selected]

    if regions:
        selected = {r.lower() for r in regions}
        items = [item for item in items if item.region.lower() in selected]

    if tags:
        selected = {t.lower() for t in tags}
        items = [
            item for item in items if selected.intersection({tag.lower() for tag in item.tags})
        ]

    sorted_items = sorted(items, key=lambda row: row.created_at, reverse=True)
    return EventsResponse(items=sorted_items, total=len(sorted_items))


@app.post("/api/events", response_model=Event)
def create_event(payload: EventCreate) -> Event:
    event = Event(id=max((e.id for e in EVENTS), default=0) + 1, **payload.model_dump())
    EVENTS.append(event)
    return event
