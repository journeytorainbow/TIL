// 네오는 평소 프로도가 비상금을 숨겨놓는 장소를 알려줄 비밀지도를 손에 넣었다. 그런데 이 비밀지도는 숫자로 암호화되어 있어 위치를 확인하기 위해서는 암호를 해독해야 한다. 다행히 지도 암호를 해독할 방법을 적어놓은 메모도 함께 발견했다.

// 지도는 한 변의 길이가 n인 정사각형 배열 형태로, 각 칸은 “공백”(“ “) 또는 “벽”(“#”) 두 종류로 이루어져 있다.
// 전체 지도는 두 장의 지도를 겹쳐서 얻을 수 있다. 각각 “지도 1”과 “지도 2”라고 하자. 지도 1 또는 지도 2 중 어느 하나라도 벽인 부분은 전체 지도에서도 벽이다. 지도 1과 지도 2에서 모두 공백인 부분은 전체 지도에서도 공백이다.
// “지도 1”과 “지도 2”는 각각 정수 배열로 암호화되어 있다.
// 암호화된 배열은 지도의 각 가로줄에서 벽 부분을 1, 공백 부분을 0으로 부호화했을 때 얻어지는 이진수에 해당하는 값의 배열이다.

function secretMap(arr1, arr2) {
    var results = [];

    arr1.forEach((e, i) => {
        // 두 배열 중에 1이 하나라도 있으면 벽 이므로 비트 연산자 OR를 이용
        results.push(e | arr2[i]);
    })

    return results;
}

// 숫자로 된 지도를 이진수를 "#"과 공백으로 표현한 지도로 변환
function convertCodeToMap(arr) {
    return arr.map(e => {
        //JS에는 replaceAll이 없으므로 정규식을 이용해서 구현
        return e.toString(2).replace(/1/gi, "#").replace(/0/gi, " ");
    });
}

// 예제 값
var arr1 = [46, 33, 33 ,22, 31, 50];
var arr2 = [27 ,56, 19, 14, 14, 10];

// 정답 출력
console.log(convertCodeToMap(secretMap(arr1, arr2)));
