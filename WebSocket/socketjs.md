SockJS
====================================================================


일반적인 브라우저는 웹소켓 스펙을 지원해주지만 지원하지 않는 브라우저들이 있다. 이런 브라우저들에서도 같은 서비스 경험을 제공하는 것은 웹소켓만으로는 어렵다.
웹소켓을 지원하지 않는 브라우저에서는 웹소켓 통신을 흉내낼 수 있는 추가적인 솔루션이 필요한데 이를 위해서 나온 기술이 Socket.io와 SockJS이다. Socket.io는 Node기반 솔루션이라 백단도 JS여야 한다.
SockJS는 스프링 웹소켓에서도 지원하므로 요새는 SockJS를 대부분 사용한다.

- SockJS는 스키마가 WS가 아닌 HTTP
- 브라우저의 웹소켓 API를 직접 사용하지 않고 SockJS의 Lib 사용
- IE6이상 지원
- 서버측에서도 WebSocket이 아닌 SockJS Server 인터페이스 사용해야함.