function clear_context(context) {
    const height = context.canvas.height;
    const width = context.canvas.width;
    context.clearRect(0, 0, width, height);
}