import type { FC } from "react";
import { memo, useEffect } from "react";

import { clsx } from "clsx";

import { Loader2 } from "lucide-react";
import { useIntersectionObserver } from "usehooks-ts";
import cls from "./ChatMessagesLoader.module.scss";

interface ChatMessagesLoaderProps {
  className?: string;
  onIntersect: () => void;
}

/** Докстринг */
export const ChatMessagesLoader: FC<ChatMessagesLoaderProps> = memo(
  (props: ChatMessagesLoaderProps) => {
    const { className, onIntersect } = props;
    const { isIntersecting, ref } = useIntersectionObserver({
      threshold: 1,
    });

    useEffect(() => {
      if (isIntersecting) {
        onIntersect();
      }
    }, [isIntersecting]);
    return (
      <div ref={ref} className={clsx(cls.chat_messages_loader, className)}>
        <Loader2 size={24} className={cls.animate_spin} />
      </div>
    );
  }
);
