from src.entries.group.role.rule.enums import RuleEnum

creator_rules = [
    RuleEnum.CAN_CRITICAL,
    RuleEnum.CAN_EDIT_GROUP_SETTINGS,
    RuleEnum.CAN_EDIT_ROLES,
    RuleEnum.CAN_SEND_MESSAGE,
    RuleEnum.CAN_INVITE,
]

admin_rules = [
    RuleEnum.CAN_EDIT_GROUP_SETTINGS,
    RuleEnum.CAN_EDIT_ROLES,
    RuleEnum.CAN_SEND_MESSAGE,
    RuleEnum.CAN_INVITE,
]

newbie_rules = [
    RuleEnum.CAN_SEND_MESSAGE,
    RuleEnum.CAN_INVITE,
]

__all__ = ["creator_rules", "admin_rules", "newbie_rules"]
