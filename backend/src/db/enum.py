from enum import StrEnum


# with StrEnum we can just get value from enum StrEnum.Field
# insted of writting Enum.Field.value
class AllNamesModels(StrEnum):
    USER = "UserModel"
    PERSONAL_CHAT = "PersonalChatModel"
    USER_TO_PERSONAL_CHAT = "UserToPersonalChatModel"
    CHAT = "ChatModel"
    GROUP = "GroupModel"
    USER_TO_GROUP = "UserToGroupModel"
    ROLE_GROUP = "RoleGroupModel"


class AllNamesTables(StrEnum):
    USER = "user"
    PERSONAL_CHAT = "personal_chat"
    USER_TO_PERSONAL_CHAT = "user_to_personal_chat"
    CHAT = "chat"
    GROUP = "group"
    USER_TO_GROUP = "user_to_group"
    ROLE_GROUP = "role_group"
