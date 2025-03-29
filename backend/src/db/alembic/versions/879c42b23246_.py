"""empty message

Revision ID: 879c42b23246
Revises: ac7ea7701698
Create Date: 2025-03-29 20:54:57.196686

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '879c42b23246'
down_revision: Union[str, None] = 'ac7ea7701698'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('chat_title_key', 'chat', type_='unique')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('chat_title_key', 'chat', ['title'])
    # ### end Alembic commands ###
