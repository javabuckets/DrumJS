/**
 * Image positioning and image scaling (x, y, w, h) are optional parameters
 */
function drawImage(context, sprite, x, y, w, h) {
    x = x || 0;
    y = y || 0;
    w = w || sprite.img.width;
    h = h || sprite.img.height;
    context.drawImage(sprite.img, x, y, w, h);
}