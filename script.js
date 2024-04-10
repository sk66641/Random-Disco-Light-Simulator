function getRandomColor() {

    // range of Math.random(): [0,1)
    // Generating random nubmers for [a, b]: parseInt(a + Math.random()*(b+1-a))
    let val1 = parseInt(0 + Math.random() * (255 + 1 - 0));
    let val2 = parseInt(0 + Math.random() * (255 + 1 - 0));
    let val3 = parseInt(0 + Math.random() * (255 + 1 - 0));
    return `rgb(${val1}, ${val2}, ${val3})`;

}

var random_color = `${getRandomColor()}`;

do {

    var type = prompt("1:) To choose gradient between conic & linear, Type: \n -> 'c' or 'C' for conic \n -> 'l' or 'L' for linear");

    if (type != 'c' && type != 'l' && type != 'C' && type != 'L') {
        alert("Please enter 'c' or 'C' for conic or 'l' or 'L' for linear");

    }

} while (type != 'c' && type != 'l' && type != 'C' && type != 'L');

do {

    var set_time = Number(prompt("2:) Set time interval in 'milliseconds':"));
    var set_time_condition;

    if (isNaN(set_time)) {

        alert("Please enter a valid time interval");
        set_time_condition = true;

    }
    else {

        if (set_time < 0) {
            alert("Please enter a valid time interval");
            set_time_condition = true;
        }
        else if (set_time > 0) {
            set_time_condition = false;
        }
    }


} while (set_time_condition);

do {

    var n = Number(prompt("3:) Enter number of random colors:"));
    var n_condition;

    if (isNaN(n)) {

        alert("Please enter a positive integer greater than or equal to '1'");
        n_condition = true;

    }
    else {

        if (n < 1) {

            alert("Please enter a positive integer greater than or equal to '1'");
            n_condition = true;

        }
        else if (n >= 1) {

            if (Number.isInteger(n)) {
                n_condition = false;
            }
            else {
                alert("Please enter a positive integer greater than or equal to '1'");
                n_condition = true;
            }
        }
    }

} while (n_condition);

alert("𝘙𝘢𝘯𝘥𝘰𝘮 𝘋𝘪𝘴𝘤𝘰 𝘓𝘪𝘨𝘩𝘵 𝘚𝘪𝘮𝘶𝘭𝘢𝘵𝘰𝘳 (𝘸𝘪𝘵𝘩 💖 𝘣𝘺 '𝘬𝘶𝘮𝘢𝘳 𝘴𝘢𝘯𝘶')");

function number(n) {

    var ch = `${getRandomColor()}, `;

    while (n >= 2) {
        ch += `${getRandomColor()}, `;
        n = n - 1;
    }

    return ch;
}

setInterval(() => {
    random_color = `${getRandomColor()}`;
}, `${set_time}`);

if (n == 1) {

    document.body.style.backgroundColor = `${getRandomColor()}`
    setInterval(() => {
        document.body.style.backgroundColor = `${getRandomColor()}`
    }, `${set_time}`);
}

else if (n > 1) {


    if (type == "c" || type == "C") {

        document.body.style.background = `conic-gradient(${random_color}, ${number(n - 1)} ${random_color})`;
        setInterval(() => {
            // document.body.style.backgroundColor = `${getRandomColor()}`
            document.body.style.background = `conic-gradient(${random_color}, ${number(n - 1)} ${random_color})`;
        }, `${set_time}`);

    }
    else if (type == "l" || type == "L") {

        document.body.style.background = `linear-gradient(${number(n - 1)} ${random_color})`;
        setInterval(() => {
            // document.body.style.backgroundColor = `${getRandomColor()}`
            document.body.style.background = `linear-gradient(${number(n - 1)} ${random_color})`;
        }, `${set_time}`);

    }
}

