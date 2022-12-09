

// x는 오른쪽, y는 아래쪽으로 픽셀 단위로 증가
window.onload = function () {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d");
    let timer = 0
    let Game_timer = 0
    let boxs_x = [] //오른쪽에서 나오는 박스들 
    let boxs_y = [] //왼쪽에서 나오는 박스들 
    let boxs_xy1 = [] //오른쪽 아래에서 나오는 박스들 
    let boxs_xy3 = [] //오른쪽 위에서 나오는 박스들 
    let boxs_xy2 = [] //왼쪽 아래에서 나오는 박스들 
    let boxs_xy4 = [] //왼쪽 위에서 나오는 박스들 
    let boxs_xy5 = [] //플레이어을 향해서 나오는 박스들 
    let mouse_x = 0;
    let mouse_y = 0;
    let animation;
    let collsion = false;
    //난이도 결정해주는 변수 3,4,5,6,7,8,9
    var difficulty = Math.floor((Math.random() * (40 - 30))) + 30;
    var running = true;

    // canvas 가로 및 세로의 반값 > 150
    let canvas_width = canvas.width = window.innerWidth
    let canvas_height = canvas.height = window.innerHeight - 5

    //아래에서 나오는 박스에 대한 위치 및 스타일 함수
    class box_y {
        constructor() {
            this.x = Math.floor((Math.random() * canvas_width)) + 1;
            this.y = canvas_height;
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //오른쪽에서 나오는 박스에 대한 위치 및 스타일 함수
    class box_x {
        constructor() {
            this.x = canvas_width;
            this.y = Math.floor((Math.random() * canvas_height)) + 1
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //오른쪽 아래 대각선에서 나오는 박스에 대한 위치 및 스타일
    class box_xy1 {
        constructor() {
            this.x = canvas_width;
            this.y = Math.floor((Math.random() * canvas_height)) + 1
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //오른쪽 위 대각선에서 나오는 박스에 대한 위치 및 스타일
    class box_xy3 {
        constructor() {
            this.x = canvas_width;
            this.y = Math.floor((Math.random() * canvas_height)) + 1
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //왼쪽 아래 대각선에서 나오는 박스에 대한 위치 및 스타일
    class box_xy2 {
        constructor() {
            this.x = 0;
            this.y = Math.floor((Math.random() * canvas_height)) + 1
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //왼쪽 위 대각선에서 나오는 박스에 대한 위치 및 스타일
    class box_xy4 {
        constructor() {
            this.x = 0;
            this.y = Math.floor((Math.random() * canvas_height)) + 1
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //플레이어을 항하는 박스에 대한 위치 및 스타일
    class box_xy5 {
        constructor() {
            this.x = canvas_width;
            this.y = mouse_y;
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
   
    
    //마우스와 오른쪽에서 나오는 박스 충돌 감지해주는 함수
    function Collision_x(box_x) {
        if
            (
            ((box_x.x <= mouse_x && mouse_x <= box_x.x + 50)
                ||
                (box_x.x <= mouse_x && mouse_x <= box_x.x + 50))
            &&
            ((box_x.y <= mouse_y && mouse_y <= box_x.y + 50)
                ||
                (box_x.y <= mouse_y && mouse_y <= box_x.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            console.log("살아남은 시간 :" + Game_timer + "초")
            console.log("끝")
        }
    }
    //마우스와 아래에서 나오는 박스 충돌 감지해주는 함수
    function Collision_y(box_y) {
        if
            (
            ((box_y.x <= mouse_x && mouse_x <= box_y.x + 50)
                ||
                (box_y.x <= mouse_x && mouse_x <= box_y.x + 50))
            &&
            ((box_y.y <= mouse_y && mouse_y <= box_y.y + 50)
                ||
                (box_y.y <= mouse_y && mouse_y <= box_y.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            console.log("살아남은 시간 :" + Game_timer+ "초")
            console.log("끝")
        }
    }
    //마우스와 오른쪽 아래 대각선에서 나오는 박스 충돌 감지해주는 함수
    function Collision_y(box_xy1) {
        if
            (
            ((box_xy1.x <= mouse_x && mouse_x <= box_xy1.x + 50)
                ||
                (box_xy1.x <= mouse_x && mouse_x <= box_xy1.x + 50))
            &&
            ((box_xy1.y <= mouse_y && mouse_y <= box_xy1.y + 50)
                ||
                (box_xy1.y <= mouse_y && mouse_y <= box_xy1.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            console.log("살아남은 시간 :" + Game_timer+ "초")
            console.log("끝")
        }
    }
    //마우스와 오른쪽 위 대각선에서 나오는 박스 충돌 감지해주는 함수
    function Collision_y(box_xy3) {
        if
            (
            ((box_xy3.x <= mouse_x && mouse_x <= box_xy3.x + 50)
                ||
                (box_xy3.x <= mouse_x && mouse_x <= box_xy3.x + 50))
            &&
            ((box_xy3.y <= mouse_y && mouse_y <= box_xy3.y + 50)
                ||
                (box_xy3.y <= mouse_y && mouse_y <= box_xy3.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            console.log("살아남은 시간 :" + Game_timer+ "초")
            console.log("끝")
        }
    }
    //마우스와 왼쪽 아래 대각선에서 나오는 박스 충돌 감지해주는 함수
    function Collision_y(box_xy2) {
        if
            (
            ((box_xy2.x <= mouse_x && mouse_x <= box_xy2.x + 50)
                ||
                (box_xy2.x <= mouse_x && mouse_x <= box_xy2.x + 50))
            &&
            ((box_xy2.y <= mouse_y && mouse_y <= box_xy2.y + 50)
                ||
                (box_xy2.y <= mouse_y && mouse_y <= box_xy2.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            console.log("살아남은 시간 :" + Game_timer+ "초")
            console.log("끝")
        }
    }
    //마우스와 위 왼쪽 대각선에서 나오는 박스 충돌 감지해주는 함수
    function Collision_y(box_xy4) {
        if
            (
            ((box_xy4.x <= mouse_x && mouse_x <= box_xy4.x + 50)
                ||
                (box_xy4.x <= mouse_x && mouse_x <= box_xy4.x + 50))
            &&
            ((box_xy4.y <= mouse_y && mouse_y <= box_xy4.y + 50)
                ||
                (box_xy4.y <= mouse_y && mouse_y <= box_xy4.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            console.log("살아남은 시간 :" + Game_timer+ "초")
            console.log("끝")
        }
    }
    //마우스와 마우스 현재 위치로 향하는 박스 충돌 감지해주는 함수
    function Collision_y(box_xy5) {
        if
            (
            ((box_xy5.x <= mouse_x && mouse_x <= box_xy5.x + 50)
                ||
                (box_xy5.x <= mouse_x && mouse_x <= box_xy5.x + 50))
            &&
            ((box_xy5.y <= mouse_y && mouse_y <= box_xy5.y + 50)
                ||
                (box_xy5.y <= mouse_y && mouse_y <= box_xy5.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            console.log("살아남은 시간 :" + Game_timer+ "초")
            console.log("끝")
        }
    }
    //박스들이 움직이는 애니메이션 함수
    function Frameanimation() {
        animation = requestAnimationFrame(Frameanimation)
        timer++;
        Game_timer++;
        clear()
        //여기 있는 숫자가 적으면 적을수록 박스가 많이 나옴
        if (timer % difficulty === 0) {
            let box_xNew = new box_x //오른쪽 박스
            let box_yNew = new box_y //왼쪽 박스
            let box_xyNew1 = new box_xy1 //오른쪽 아래 박스
            let box_xyNew3 = new box_xy3 //오른쪽 위 박스
            let box_xyNew2 = new box_xy2 //왼쪽 아래 박스
            let box_xyNew4 = new box_xy4 //왼쪽 위 박스

            boxs_x.push(box_xNew) //오른쪽 박스
            boxs_y.push(box_yNew) //왼쪽 박스
            boxs_xy1.push(box_xyNew1) //오른쪽 아래 박스
            boxs_xy3.push(box_xyNew3) //오른쪽 위 박스 
            boxs_xy2.push(box_xyNew2) //왼쪽 아래 박스
            boxs_xy4.push(box_xyNew4) //왼쪽 위 박스
        }
        //플레이어를 향해서 날라오는 박스가 나오는 시간
        if (timer % 30 === 0) {
            let box_xyNew5 = new box_xy5 //플레이어 향하는 박스
            boxs_xy5.push(box_xyNew5) //플레이어 향하는 박스
        }
        // 오른쪽에서 박스가 나옴
        boxs_x.forEach((object, index, array) => {
            if (object.x < 0) {
                array.splice(index, 1);
            }
            object.x -= 10
            Collision_x(object)
            object.draw()
        })
        //아래에서 박스가 나옴  
        boxs_y.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.y -= 10;
            Collision_y(object)
            object.draw()
        })
        //오른쪽 아래 대각선에서 박스가 나옴
        boxs_xy1.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.y -= 5;
            object.x -= 10;
            Collision_y(object)
            object.draw()
        })
        //오른쪽 위 대각선에서 박스가 나옴
        boxs_xy3.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.y += 5;
            object.x -= 10;
            Collision_y(object)
            object.draw()
        })
        //왼쪽 아래 대각선에서 박스가 나옴
        boxs_xy2.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.y -= 5;
            object.x += 10;
            Collision_y(object)
            object.draw()
        })
        //왼쪽 위 대각선에서 박스가 나옴
         boxs_xy4.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.y += 5
            object.x += 10;
            Collision_y(object)
            object.draw()
        })
        //플레이어을 향해 박스가 옴
        boxs_xy5.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.x -= 15;
            Collision_y(object)
            object.draw()
        })
    }

    Frameanimation()

    window.addEventListener("keydown", e => {
        const key = e.keyCode;
        if(!running){

            if(key == 82){
                location.reload();
            }
        }
      });

    //마우스 위치 함수
    canvas.addEventListener('mousemove', function (e) {
        mouse_x = e.clientX
        mouse_y = e.clientY
    });


    //마우스 화면 밖으로 나가면
    canvas.addEventListener('mouseout', function(e) {
        cancelAnimationFrame(animation);
        running = false;
      });
    
    //부정행위 금지 함수
    setTimeout(function() { 
        if(mouse_x == 0){
            alert("부정행위 금지")
            cancelAnimationFrame(animation);
            location.reload();
        }
     }, 500);

    //초기화 함수
    function clear() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

