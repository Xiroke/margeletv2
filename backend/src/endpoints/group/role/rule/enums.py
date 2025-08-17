from enum import Enum


class RuleEnum(Enum):
    CAN_CRITICAL = "can_critical"
    CAN_EDIT_GROUP_SETTINGS = "can_edit_group"
    CAN_EDIT_ROLES = "can_edit_roles"
    CAN_SEND_MESSAGE = "can_send_message"
    CAN_INVITE = "can_invite"
