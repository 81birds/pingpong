let balls = [];
const numBalls = 3;
const radius = 20;

function setup() {
  createCanvas(400, 400);

  // 重ならない初期位置を計算して配置
  for (let i = 0; i < numBalls; i++) {
    balls.push({
      x: 100 + i * 120, // 重ならない程度に離す
      y: 100 + i * 50,
      vx: random(-3, 3),
      vy: random(-3, 3),
      ballColor: color(random(255), random(255), random(255))
    });
  }
}

function draw() {
  background(220);

  for (let i = 0; i < balls.length; i++) {
    let b1 = balls[i];

    // 1. 他のボールとの衝突判定
    for (let j = i + 1; j < balls.length; j++) {
      let b2 = balls[j];
      
      // ボール中心間の距離を計算
      let d = dist(b1.x, b1.y, b2.x, b2.y);
      
      // 距離が直径（2 * radius）未満なら衝突
      if (d < radius * 2) {
        // 速度を入れ替えて跳ね返りを表現
        [b1.vx, b2.vx] = [b2.vx, b1.vx];
        [b1.vy, b2.vy] = [b2.vy, b1.vy];
        
        // ぶつかった時にも色を変える
        b1.ballColor = color(random(255), random(255), random(255));
        b2.ballColor = color(random(255), random(255), random(255));
        
        // 重なり防止：少しだけ位置を離す
        let overlap = radius * 2 - d;
        b1.x += (b1.vx > 0 ? 1 : -1) * overlap;
        b2.x += (b2.vx > 0 ? 1 : -1) * overlap;
      }
    }

    // 2. 壁との当たり判定
    if (b1.x + radius > width || b1.x - radius < 0) {
      b1.vx *= -1;
      b1.ballColor = color(random(255), random(255), random(255));
      b1.x = constrain(b1.x, radius, width - radius);
    }
    if (b1.y + radius > height || b1.y - radius < 0) {
      b1.vy *= -1;
      b1.ballColor = color(random(255), random(255), random(255));
      b1.y = constrain(b1.y, radius, height - radius);
    }

    // 3. 移動と描画
    b1.x += b1.vx;
    b1.y += b1.vy;
    fill(b1.ballColor);
    noStroke();
    circle(b1.x, b1.y, radius * 2);
  }
}


