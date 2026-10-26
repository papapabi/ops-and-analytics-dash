from datetime import datetime, timedelta

from .schemas import DistributionItem, Event, Metric, TrendPoint


METRICS: list[Metric] = [
    Metric(label="Total Orders", value=12480, delta=8.2, trend="up"),
    Metric(label="Active Incidents", value=12, delta=-4.1, trend="down"),
    Metric(label="SLA Compliance", value=99.2, delta=0.8, trend="up"),
    Metric(label="Avg. Resolution Time", value=42, delta=-6.0, trend="down"),
]

TREND: list[TrendPoint] = [
    TrendPoint(date="Mon", throughput=820, errors=21),
    TrendPoint(date="Tue", throughput=910, errors=18),
    TrendPoint(date="Wed", throughput=870, errors=25),
    TrendPoint(date="Thu", throughput=980, errors=14),
    TrendPoint(date="Fri", throughput=1025, errors=12),
    TrendPoint(date="Sat", throughput=770, errors=9),
    TrendPoint(date="Sun", throughput=860, errors=11),
]

DISTRIBUTION: list[DistributionItem] = [
    DistributionItem(name="Payments", value=34),
    DistributionItem(name="Fulfillment", value=26),
    DistributionItem(name="Auth", value=18),
    DistributionItem(name="Catalog", value=14),
    DistributionItem(name="Notifications", value=8),
]

EVENTS: list[Event] = []

seed = [
    ("payment-worker", "healthy", "us-east", ["payments", "queue"], "Ava"),
    ("order-sync", "warning", "eu-west", ["orders", "sync"], "Mina"),
    ("auth-gateway", "critical", "us-west", ["auth", "api"], "Liam"),
    ("catalog-indexer", "healthy", "ap-south", ["catalog", "search"], "Noah"),
    ("fulfillment-eta", "warning", "us-east", ["shipping"], "Emma"),
    ("billing-ledger", "healthy", "eu-west", ["billing"], "Olivia"),
    ("notification-bus", "critical", "us-east", ["notifications", "queue"], "Sophia"),
    ("inventory-stream", "healthy", "us-west", ["inventory", "stream"], "Mason"),
]

for i, row in enumerate(seed, start=1):
    service, status, region, tags, owner = row
    EVENTS.append(
        Event(
            id=i,
            service=service,
            status=status,
            region=region,
            tags=tags,
            owner=owner,
            created_at=datetime.utcnow() - timedelta(hours=i * 3),
        )
    )
