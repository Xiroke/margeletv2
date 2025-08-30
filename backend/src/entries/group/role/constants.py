from src.entries.group.role.rule.enums import RuleEnum

creator_rules = [
    RuleEnum.CAN_CRITICAL.value,
    RuleEnum.CAN_EDIT_GROUP_SETTINGS.value,
    RuleEnum.CAN_EDIT_ROLES.value,
    RuleEnum.CAN_SEND_MESSAGE.value,
    RuleEnum.CAN_INVITE.value,
]

admin_rules = [
    RuleEnum.CAN_EDIT_GROUP_SETTINGS.value,
    RuleEnum.CAN_EDIT_ROLES.value,
    RuleEnum.CAN_SEND_MESSAGE.value,
    RuleEnum.CAN_INVITE.value,
]

member_rules = [
    RuleEnum.CAN_SEND_MESSAGE.value,
    RuleEnum.CAN_INVITE.value,
]


__all__ = ["creator_rules", "admin_rules", "member_rules"]
