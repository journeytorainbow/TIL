## HTTPS는 왜 필요할까 ?

구글의 보안 담당 디렉터인 파리사 타브리즈는 다음과 같은 말을 했습니다.

```
 “사용자들은 자신의 컴퓨터와 해당 사이트 서버 간 직접 연결이 됐다고 생각하지만, 사실 두 지점 사이에는 상당히 많은 연결 지점이 있다. 사용자의 비밀번호나 신용카드 정보, URL 정보 등이 각 지점을 그대로 통과하기 때문에 보안 담당자들이 ‘중간자(Man in the Middle)’라고 부르는 악의적인 사업자, 해커들이 암호화되지 않은 정보들을 가로챌 수 있다”
```

이처럼 일반적인 HTTP 프로토콜을 이용한 웹 페이지 이용은 보안상 매우 취약합니다. 사용자와 웹 서버간 통신 내용을 다른 사람이 얼마든지 볼 수 있기 때문이죠~

https는 웹 프로토콜인 http에 보안소켓레이어(SSL)나 전송계층보안(TLS)을 적용해 전송 데이터를 암호화했다는 것을 뜻한다. 
사용자가 입력하는 내용을 암호로 바꿔 서버에 전달하기 때문에 해커가 개인정보 데이터를 탈취하더라도 해독이 거의 불가능하다.

## HTTPS는 어떤 원리로 돌아갈까 ?
SSL(Secure Socket Layer) 프로토콜은 처음에 Netscape사에서 웹서버와 브라우저 사이의 보안을 위해 만들었다. SSL은 Certificate Authority(CA)라 불리는 서드 파티로부터 서버와 클라이언트의 인증을 하는데 사용된다. 아래는 SSL이 어떻게 작동하는지에 대한 간단한 과정을 설명한 것이다.

1.
[웹브라우저] SSL로 암호화된 페이지를 요청하게 된다. (일반적으로 https://가 사용된다)

2.
[웹서버] Public Key를 인증서와 함께 전송한다.

3.
[웹브라우저] 인증서가 자신이 신용있다고 판단한 CA(일반적으로 trusted root CA라고 불림)로부터 서명된 것인지 확인한다. (역주:Internet Explorer나 Netscape와 같은 웹브라우저에는 이미 Verisign, Thawte와 같은 널리 알려진 root CA의 인증서가 설치되어 있다) 또한 날짜가 유효한지, 그리고 인증서가 접속하려는 사이트와 관련되어 있는지 확인한다.

4.
[웹브라우저] Public Key를 사용해서 랜덤 대칭 암호화키(Random symmetric encryption key)를 비릇한 URL, http 데이터들을 암호화해서 전송한다.

5.
[웹서버] Private Key를 이용해서 랜덤 대칭 암호화키와 URL, http 데이터를 복호화한다.

6.
[웹서버] 요청받은 URL에 대한 응답을 웹브라우저로부터 받은 랜덤 대칭 암호화키를 이용하여 암호화해서 브라우저로 전송한다.

7.
[웹브라우저] 대칭 키를 이용해서 http 데이터와 html문서를 복호화하고, 화면에 정보를 뿌려준다.

여기서 간단한 개념 정도는 알아두어야 할 것이다.

1.3.1. 개인키/공개키(Private Key/Public Key):

Private key/Public Key를 이용한 암호화는 하나의 키로 암호화하고 나머지 다른 하나로 복호화할 수 있도록 되어있다. 이해하기 어렵겠지만 필자를 믿어라. (역주:독자가 PKI(Public Key Infrastructure)에 대해서 잘 모른다면 이에 대한 간단한 문서를 읽어보기를 권한다) 앞에서 암호화한 키로만 암호화를 할 수 있는 것이 아니라 반대 방향으로 복호화한 키로도 암호화할 수도 있다.(당연히 앞에서 암호화한 키가 이번엔 복호화하는 키가 되는 것이다) 이러한 키쌍은 소수(prime number)로부터 생성되며, 그 길이(Bit 단위)는 암호화의 강도를 나타낸다.

Private Key/Public Key는 이러한 키쌍을 관리하는 방법이다. 한개의 키는 안전한 장소에 자기만 알 수 있도록 보관하고(Private Key) 다른 하나는 모든 사람에게 퍼뜨리는 것(Public Key)이다. 그렇게 하면 그 사람들이 당신에게 메일을 보낼 때 암호화해서 보낼 수 있으며, 당신만이 그 암호를 풀 수 있다. 반대로 다른 사람에게 메일을 보낼 일이 있으면 Private Key를 이용해 암호화 할 수 있다. 그러면 그 사람들은 복호화해서 볼 수 있다. 그러나 이 방법은 모든 사람이 Public Key를 가지고 있어야 하기 때문에 그리 안전한 방법이 아니다. (역주:오히려 역효과를 일으킬 수 있다. 단순하게 메시지, 파일에 암호화, 서명을 할 생각이면 PGP나 GnuPG를 권한다)

1.3.2. 인증서(Certificate):

당신과 접속해있는 사람이나 웹 사이트가 믿을 수 있는지 어떻게 판단할 수 있을까? 한 웹사이트 관리자가 있다고 가정하자. 그 사람이 당신에게 이 사이트가 믿을만하다고 (심각할 정도로) 열심히 설명했다. 당신이 그 사이트의 인증서를 설치해 주기를 바라면서 말이다. 한두번도 아니고 매번 이렇게 해야한다면 귀찮지 않겠는가?

인증서는 여러 부분으로 이루어져있다. 아래는 인증서 속에 들어있는 정보의 종류를 나타낸 것이다.

1.
인증서 소유자의 e-mail 주소

2.
소유자의 이름

3.
인증서의 용도

4.
인증서 유효기간

5.
발행 장소

6.
Distinguished Name (DN)

- Common Name (CN)

- 인증서 정보에 대해 서명한 사람의 디지털 ID

7.
Public Key

8.
해쉬(Hash)

SSL의 기본 구조는 당신이 인증서를 서명한 사람을 신뢰한다면, 서명된 인증서도 신뢰할 수 있다는 것이다. 이것은 마치 트리(Tree)와 같은 구조를 이루면서 인증서끼리 서명하게 된다. 그러면 최상위 인증서는? 이 인증서를 발행한 기관을 Root Certification Authority(줄여서 Root CA)라고 부르며, 유명한 인증 기관(역주:Verisign, Thawte, Entrust, etc)의 Root CA 인증서는 웹브라우저에 기본적으로 설치되어 있다. 이러한 인증 기관은 자신들이 서명한 인증서들을 관리할 뿐만 아니라 철회 인증서(Revoked Certificate)들도 관리하고 있다. 그러면 Root CA의 인증서는 누가 서명을 했을까? 모든 Root CA 인증서는 자체 서명(Self Signed)되어 있다.

1.3.3. 대칭키(The Symmetric key):

Private Key/Public Key 알고리즘은 정말 대단한 알고리즘이지만, 비실용적이라는 단점이 있다. 비대칭(Asymmetric)이란 하나의 키로 암호화를 하면 다른 키가 있어야 복호화를 할 수 있는 것을 뜻한다. 즉, 하나의 키로 암호화/복호화를 할 수 없다는 말이다. 대칭키(Symmetric Key)는 하나의 키로 암호화/복호화를 하게 된다. 대칭키를 사용하면 비대칭키보다 훨씬 빠르게 암호화/복호화를 할 수 있다. 그렇지만 속도 때문에 대칭키를 이용한다는 것은 너무 위험하다.

만약 당신의 적이 키를 입수해 버리면 여태까지 암호화된 정보가 모두 무용지물이 되어버리게 된다. 그래서 대칭키 알고리즘을 사용한 키를 상대방에게 전송하려면 인터넷과 같은 통로는 너무나도 위험하기 때문에 직접 손으로 전달해야만 한다. 귀찮지 않은가? 해결책은 대칭키를 비대칭키로 암호화시켜서 전송하면 된다. (역주:위에서 살펴본 웹서버와 브라우저의 관계에서 볼 수 있었다) 자신의 Private Key만 안전하게 관리하면 Public Key로 암호화되어 안전하게 전송할 수 있다.(여기서 보안은 죽음이나 협박 등을 제외한다) 또한 대칭키는 매번 랜덤으로 선택되는데, 이렇게되면 만약 대칭키가 누출되어도 다음번에는 다른 키가 사용되기 때문에 안전하다.

1.3.4. 암호화 알고리즘(Encryption Algorithm):

암호화 알고리즘은 대칭이든 비대칭이든 간에 상당히 많은 종류가 있다. 일반적으로 암호화 알고리즘으로 특허를 낼 수 없다. 만약 Henri Paincare가 암호화 알고리즘으로 특허를 낸다면 Albert Einstein으로부터 고소당할 수 있는 것이다. 단, USA에서는 암호화 알고리즘으로 특허를 낼 수 있다.(역주:또한 군사법으로 보호받게 된다.) OpenSSL의 경우에는 암호화 알고리즘으로 특허를 낼 수 없고, 군사법이나 보안법에 저촉되지 않는 국가에서 개발되고 있다.

실제로 알고리즘이 어떻게 사용되는지 살펴보자. 웹서버와 브라우저는 서로 통신을 하는 동안 서로 어떤 알고리즘을 사용할 수 있는지 확인하게 된다. 다음에 서로 이해할 수 있는 일반적인 알고리즘을 선택한 후 통신이 이루어지게 된다. OpenSSL은 컴파일해서 삽입할 알고리즘을 택할 수 있다. 그렇게 하면 암호화 알고리즘에 제한을 걸고 있는 국가에서도 사용할 수 있게 된다.

1.3.5. 해쉬(Hash):

해쉬는 해쉬 함수에 의해 만들어지는 숫자다. 이 함수는 단방향으로 연산되는 함수다. 즉, 한번 해쉬함수로 원본으로부터 해쉬값을 생성했다면, 해쉬값으로부터 원본 메시지를 알아내는 것이 불가능하다. 해쉬의 용도는 원본 메시지가 손상이 되었는지를 알아내는데 있으며, 해쉬값을 변경시키지 않고 원본을 조작하는 것은 극히 어렵다. 그래서 해쉬 함수는 패스워드 메커니즘을 비릇한 소프트웨어의 손상 유무(MD5 sum)를 가리는데도 이용할 수 있으며, 메시지의 손상을 방지하기 위해 널리 쓰이고 있다.

1.3.6. 서명(Signing):

서명은 특정 메시지를 내가 작성했다는 것을 인증하는 역할을 한다. Text가 될 수도 있고, 인증서 등등이 될 수 있다. 메시지에 서명하기 위해서는 아래의 순서를 따라야 한다.

1.
해쉬 생성

2.
Private Key로 해쉬 암호화

3.
암호화된 해쉬와 서명된 인증서를 메시지에 추가

4.
받는 사람은 따로 해쉬를 생성

5.
받은 메시지에 포함된 해쉬를 Public Key를 이용해서 복호화

6.
4, 5번 과정에서 생성된 해쉬를 비교

1.3.7. 암호문(Pass Phrase):

암호문(Pass Phrase)은 기존의 패스워드(Password)를 확장한 시스템이다. 예전의 Unix 시스템의 암호(Password)는 8자가 한계였다. 암호문이라는 것은 단순히 암호의 한계가 더 길어졌다는 것을 뜻한다. 당연히 8자가 한계인 것보다 보안이 강력하다. 최근의 Unix 시스템은 MD5를 사용하고 있기 때문에 암호의 길이 제한이 없어졌다.


(역주:암호문은 SSL에서 키가 누출되었을 경우, 최종 보안 장치이기 때문에, 중요한 키에는 반드시 새겨두어야 한다.)


## HTTPS를 내 웹 서버에 적용시킬려면 ?
그렇다면 내 아파치 웹 서버에 HTTPS를 어떻게 적용시킬 수 있을까 ?
일단 CA는 도메인 별로 인증서를 등록할 수 있다.

때문에 같은 웹서버에서 서비스하는 페이지라도 도메인이 다르면 다른 인증서를 사용해야한다.

우선 사전 준비 작업으로 CA에서 인증서를 구매해야한다. 구매를 하면 다음과 같은 인증서 파일들을 획득할 수 있다.
이상의 절차를 통해서 얻은 정보는 크게 4가지다. 이 정보들을 이용해서 SSL을 제공하는 방법을 알아보자.

ssl.key : 서버쪽 비공개키
ssl.crt : 디지털 인증서
ca.pem : ROOT CA 인증서
sub.class1.server.ca.pem : 중계자 인증서

SSL을 서비스하는 마지막 단계는 웹서버에 인증서를 설치하는 것이다. SSL 통신을 할 때 사용할 인증서를 웹서버에게 알려주면 웹서버는 정해진 절차에 따라서 SSL 통신을 하게 된다.

인증서를 웹서버에 설치하는 방법은 웹서버 별로 다르다.

http://www.startssl.com/?app=20

1. apache 설치

1
sudo apt-get install apache2;
2. 아파치의 SSL 모듈을 활성화 한다.

1
sudo a2enmod ssl
3. 아피치를 재시작 한다.

1
sudo service apache2 restart
4. SSL 인증서 관련된 파일을 위치시킬 디렉토리를 만든다.

1
sudo mkdir /etc/apache2/ssl
5. /etc/apache2/ssl 디렉토리에 인증서 파일들을 위치시킨다. 파일들의 경로는 아래와 같다.

/etc/apache2/ssl/ca.pem
/etc/apache2/ssl/ssl.crt
/etc/apache2/ssl/ssl.key
/etc/apache2/ssl/sub.class1.server.ca.pem
6. 보안을 위해서 디렉토리와 파일의 권한을 조정한다.

디렉토리와 파일의 소유자는 root로 지정한다.

1
sudo chown -R root:root /etc/apache2/ssl;
파일의 권한을 600(소유자만 읽기, 쓰기 허용)

1
sudo chmod 600 /etc/apache2/ssl/*.*
디렉토리의 권한을 700(소유자만 읽기, 쓰기, 실행 허용)

1
sudo chmod 700 /etc/apache2/ssl;
팔자의 경우 아래와 같은 상태가 되었다.


7. virtualhost를 설정한다. 하나의 웹서버(apache)에서 여러개의 서비스를 도메인 별로 운영할 수 있도록 돕는 apache의 기능이다. 기본 설정 파일인 /etc/apache2/sites-available/default-ssl을 수정한다. 아래에서는 편집기로 nano를 사용하고 있다. nano에 대한 사용법은 nano 수업을 참고한다.

1
sudo nano /etc/apache2/sites-available/default-ssl
8. 파일의 내용에서 지시자의 값을 아래와 같이 변경한다.  예제 파일은 http://www.startssl.com/?app=21를 참고한다.

1
2
3
4
SSLCertificateFile    /etc/apache2/ssl/ssl.crt
SSLCertificateKeyFile /etc/apache2/ssl/ssl.key
SSLCertificateChainFile /etc/apache2/ssl/sub.class1.server.ca.pem
SSLCACertificateFile /etc/apache2/ssl/ca.pem
9. 버추얼 호스트 default-ssl을 활성화된 서비스로 등록한다.

1
sudo a2ensite default-ssl
10. apache를 재시작한다. 재시작 할 때 비밀번호를 물어보는 경우가 있다. 이것은 비공개키를 생성하는 단계에서 입력한 비밀번호를 입력하면 된다.


11. https 프로토콜로 접속한다. (구글 크롬 기준) 아래와 같이 녹색 자물쇠가 도메인 앞에 표시되고, 인증서와 관련된 팝업이 표시된다면 SSL 서비스를 성공적으로 제공하기 시작한 것이다.
