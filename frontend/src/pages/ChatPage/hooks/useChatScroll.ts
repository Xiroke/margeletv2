import { ResultAsync } from 'neverthrow';
import { useCallback, useRef } from 'react'

export function useChatScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isLoadingMoreRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    const { clientHeight, scrollHeight, scrollTop } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // dont scroll if user read old message
    if (distanceFromBottom >= 500) {
      return;
    }

    container.scrollTo({
      behavior: 'smooth',
      top: scrollHeight,
    });
  }, [])

  const onTopIntersect = useCallback(async(loadMoreData: () => any) => {
    const container = containerRef.current;
    if (!container || isLoadingMoreRef.current) return;

    const prevScrollHeight = container.scrollHeight;
    const prevScrollTop = container.scrollTop;

    isLoadingMoreRef.current = true;
    const result = await ResultAsync.fromPromise(
      loadMoreData(),
      error => error as {detail: string
      });

    isLoadingMoreRef.current = false;

    if (result.isErr()) {
      return;
    }

    const newScrollHeight = container.scrollHeight;
    const heightDiff = newScrollHeight - prevScrollHeight;

    container.scrollTo({
      top: prevScrollTop + heightDiff,
    });
  }, [])

  return { containerRef, onTopIntersect, scrollToBottom }
}
