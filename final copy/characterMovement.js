function characterMovement(){
    // let up = get(xMain + 20, yMain)
    // let right = get(xMain + 35, yMain + 20)
    // let down = get(xMain + 20, yMain + 40)
    // let left = get(xMain, yMain + 20)
    let up = get(xMain + 25, yMain)
    let right = get(xMain + 45, yMain + 25)
    let down = get(xMain + 25, yMain + 50)
    let left = get(xMain, yMain + 25)

    if (keyIsDown(UP_ARROW) && up[0] == 0) {
        yMain -= speedR;
        playing = false;
    } else if (keyIsDown(RIGHT_ARROW) && right[0] == 0) {
        xMain += speedR;
        // playing = false;
    } else if (keyIsDown(DOWN_ARROW) && down[0] == 0) {
        yMain += speedR;
        playing = false;
    } else if (keyIsDown(LEFT_ARROW) && left[0] == 0) {
        xMain -= speedR;
        // playing = false;
    }
}