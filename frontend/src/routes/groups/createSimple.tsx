import { createFileRoute } from '@tanstack/react-router';

import { CreateSimpleGroupPage } from '@/pages/CreateSimpleGroupPage/ui/CreateSimpleGroupPage';

export const Route = createFileRoute('/groups/createSimple')({
  component: CreateSimpleGroupPage,
});
