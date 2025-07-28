# 🧹 react-safe-hooks

> 비동기 작업, 이벤트 리스너, 인터벌을 안전하게 관리해 React의 메모리 누수를 방지합니다.

이 라이브러리는 React에서 흔히 발생할 수 있는 **메모리 누수(memory leak)**를 예방하기 위한 커스텀 훅 모음입니다.  
`AbortController`, `clean up 함수`, 개발 중 워닝 로그 등을 활용하여 컴포넌트가 언마운트되거나 의존성이 변경될 때 **비동기 작업 중단**, **이벤트 리스너 제거**, **인터벌 정리** 등을 자동으로 수행합니다.

---

## ✨ 주요 기능

- ✅ `AbortController`를 활용한 비동기 작업 중단
- ✅ 전역 이벤트 리스너(`window`, `document` 등) 자동 정리
- ✅ `setInterval` 자동 제거
- 🛡️ 개발 모드에서 메모리 누수 가능성 워닝 출력

---

## 📦 설치 방법

```bash
npm install react-safe-hooks
```
