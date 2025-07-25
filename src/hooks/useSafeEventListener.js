import { useEffect, useRef, useCallback } from "react";

/**
 * 안전하게 이벤트 리스너를 등록하고, 컴포넌트 언마운트 시 자동으로 해제해주는 커스텀 훅입니다.
 * 개발 환경에서는 클린업이 제대로 안 될 경우 경고 메시지를 출력합니다.
 *
 * @param {string} eventName - 등록할 이벤트 이름 (예: "click", "mousemove")
 * @param {Function} handler - 이벤트 발생 시 실행할 콜백 함수
 * @param {EventTarget} [element=window] - 이벤트 리스너를 등록할 대상 요소 (기본값: window)
 */
export function useSafeEventListener(eventName, handler, element = window) {
  const cleanupCalled = useRef(false);
  const listenerActive = useRef(false);
  const handlerRef = useRef(handler);

  // 최신 handler를 항상 ref에 저장
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  // 실제 이벤트 핸들러 (항상 최신 handler 호출)
  const eventHandler = useCallback((event) => {
    handlerRef.current(event);
  }, []);

  useEffect(() => {
    const targetElement = element;

    if (!targetElement?.addEventListener) {
      console.warn(
        `[useSafeEventListener] "${eventName}"에 대해 유효하지 않은 요소가 전달되었습니다.`
      );
      return;
    }

    // 리스너 등록
    cleanupCalled.current = false;
    listenerActive.current = true;
    targetElement.addEventListener(eventName, eventHandler);

    // cleanup 함수
    return () => {
      cleanupCalled.current = true;
      listenerActive.current = false;
      targetElement.removeEventListener(eventName, eventHandler);
    };
  }, [eventName, eventHandler, element]);

  // 컴포넌트 언마운트 시 cleanup 검증
  useEffect(() => {
    return () => {
      if (
        listenerActive.current &&
        !cleanupCalled.current &&
        process.env.NODE_ENV === "development"
      ) {
        console.warn(
          `[useSafeEventListener] 메모리 누수 발견! ` +
            `"${eventName}" 이벤트 리스너가 해제되지 않았습니다! ` +
            `컴포넌트가 정상적으로 언마운트되고 있는지 확인해 주세요!`
        );
      }
    };
  }, [eventName]);
}
