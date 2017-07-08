var html = `<B>Hello, World!</ b>`;

var changed = html.replace(/(<\/ )/g, "</");

console.log(changed);