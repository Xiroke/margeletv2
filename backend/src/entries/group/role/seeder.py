from src.entries.group.role.rule.enums import RuleEnum

creator_permissions = [
    RuleEnum.CAN_CRITICAL,
    RuleEnum.CAN_EDIT_GROUP_SETTINGS,
    RuleEnum.CAN_EDIT_ROLES,
    RuleEnum.CAN_SEND_MESSAGE,
    RuleEnum.CAN_INVITE,
]

admin_permissions = [
    RuleEnum.CAN_EDIT_GROUP_SETTINGS,
    RuleEnum.CAN_EDIT_ROLES,
    RuleEnum.CAN_SEND_MESSAGE,
    RuleEnum.CAN_INVITE,
]

newbie_permissions = [
    RuleEnum.CAN_SEND_MESSAGE,
    RuleEnum.CAN_INVITE,
]
