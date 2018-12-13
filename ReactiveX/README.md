ReactiveX - Rx
===========================

Rx는 비동기 데이터 스트림을 처리하는 api를 제공하는 라이브러리이다. 

Rx는 MS의 volta라는 프로젝트의 일부로 탄생했다가 volta 프로젝트 중단이후 단독으로 발전되고 있다.

Rx의 탄생 배경은 비동기 프로그래밍 문제를 해결하는데 있다. 비동기 프로그래밍은 어렵다. 비동기 코드가 많아지만 제어의 흐름이 복잡하게 얽혀 코드를 예측하기 어려워진다. 따라서 전통적은 절차지향 프로그래밍에서는 이 문제를 해결하기 어려워졌다.

그렇다면 리액티브 프로그래밍이란 무엇인가?

리액티브 매니페스토에 따르면 이 시대의 소프트웨어는 좋은 반응성(Responsive)을 가져야 하며, 좋은 반응성을 갖기 위해 회복 탄력성(Resilient)와 유연성(Elastic)을 갖도록 시스템을 설계해야 한다. 이를 달성하기 위해서 메시지 기반으로 시스템과 시스템, 모듈과 모듈이 통신해야 한다. 

이런 흐름으로 위키에 나와있는 리액티브 프로그래밍의 정의는 이렇다.

```
데이터 플로우와 상태 변경을 전파한다는 생각에 근간을 둔 프로그래밍 패러다임
```

- [Observable](./observable.md)