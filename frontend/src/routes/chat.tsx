import { ChatPage } from '@/pages/ChatPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat')({
  component: ChatPage,
});
