from src.entries.group.role.rule.depends import RuleServiceDep
from src.entries.group.role.rule.enums import RuleEnum
from src.entries.group.role.rule.schemas import CreateRuleSchema


async def seed_rule(service: RuleServiceDep):
    for rule in RuleEnum:
        await service.create(CreateRuleSchema(value=rule.value))
