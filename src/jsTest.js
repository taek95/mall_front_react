// primitive type : Boolean, Null, Undefined, Number, String, Symbol , 깊은 복사
// var : 중복선언 가능, 재할당 가능, 범위 : 함수
// let : 중복선언 불가, 재할당 가능, 범위 : 블록
// const : 중복선언 불가, 재할당 불가, 범위 : 블록
var a = 3;
var a = 4; 
let number = 2;
let num = '2';
const a = 3;

// object type : key, value로 이루어진 것 , reference type , 얕은 복사
// 자바의 map 
// obj.name 하면 ellie 찾음
let obj = {
    name: 'ellie',
    age: 5
}
let obj2 = obj;
obj.name = 'james'
// obj2.name 은 james가 나온다.
// Q1. obj를 const로 한다면? 
obj = {
    name: 'james'
}
// 여기서 obj[name] 은 안된다. 
// 새롭게 주소값이 변경되는 할당은 안됨, 하지만 그 주소값이 가르키고 있는 안의 값들은 변경 가능
// 만드는 다른 방법
var grade = {};
grade['aa'] = 10;

var gra = new Object();
gra['aaa'] = 11;
// 값을 가져올 땐 gra['aaa'], gra.aaa, gra['a' + 'aa']
// gra.'aa'+'a' 이렇게는 안됨


// 문자열
// 변수에 선언안하고 써도 적용 된다.
// 길이 : 'aaa'.length
// 대문자변환 : str.toUpperCase() 
// 해당 문자의 가장 앞의 인덱스 찾기 : 'aaa'.indexOf('a') , 'Hello World'.indexOf('World') => 6, 뛰어쓰기도 인덱스 차지
// 양쪽 공백 없애주기 : str.trim()
// "1" + "1" => "11"


// 배열
var co = ["aaa","zzz", 123];
// co[0] => aaa
// 길이 : co.length
// 추가 : co.push("aa")
// 삭제 : co.pop()


// 함수
// 함수도 자료형 
// 함수 선언식
function a() {
    console.log("hello")
}
// 함수 표현식, 변수의 이름으로 호출가능
const aa = function b() {

};
// 그래서 함수 이름이 없어도 작동가능
// const aa = function() {} 
a();
aa();


const stringFive = '5';
const numberFive = 5;
// loose equality, with type conversion
// stringFive == numberFive 는 true , 반대는 !=

// strict equality, no type conversion
// stringFive === numberFive 는 false , 반대는 !==
const e1 = {name:'a'}
const e2 = {name:'a'}
const e3 = e1
// e1 == e2 ?
// e1 === e2 ?
// e1 === e3 ?
// 0 == false?
// 0 === false?
// '' == false?
// '' === false?
// null == undefined?
// null === undefined?



// switch
const bbbb = 'ee';
switch(bbbb){
    case 'ee':
        console.log('dafadf');
        break;
    // 둘의 내용이 같으면 이렇게 가능
    case 'dd':
    case 'xx':
        console.log('dddafadf');
        break;    
    default:
        break;
}