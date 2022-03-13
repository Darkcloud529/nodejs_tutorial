var relationship1 = {
    name : 'smlee',
    friends: ['dog', 'cat', 'beer'],
    logFriends: function() {
        var that = this; // relationship1 을 가리키는 this를 that에 저장
        this.friends.forEach(function(friend) {
            console.log(this.name, friend); // this vs that 일때 결과가 다르다 
        });
    },
};
relationship1.logFriends();

//ES5+ 문법, 화살표 함수
const relationship2 = {
    name:'smlee',
    friends: ['dog', 'cat', 'beer'],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        });
    }
};
relationship2.logFriends();